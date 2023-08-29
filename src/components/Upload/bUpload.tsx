import React, {useState, useEffect, useRef, useCallback, FC} from 'react'
import Button from '../Button'
// import UploadList from './UploadList'
import ajax from './utils/request'
import scopedClass from '../../utils/scopedClass'
import Icon from '../Icon'
import request from './utils/request'
import workerBuilder from '../../utils/workerBuilder'
import hashWorker from './utils/hashWorker'
// import { FormItemContext } from '../Form/FormItem'

// const PropTypes = require('prop-types')

const sc = scopedClass('Kyong-upload')

const CHUNK_SIZE = 1 * 1024 * 1024

export interface BUploadProps {
  action: string
  name: string
}

type Chunk = {
  chunk: Blob
  hash?: string
  progress?: number
}

const BUpload: FC<BUploadProps> = props => {
  const {action, name = 'file'} = props
  const [fileName, setFileName] = useState('')
  const [chunkList, setChunkList] = useState<Chunk[]>([])
  const [file, setFile] = useState<File>({} as File)
  const [fileHash, setFileHash] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [hashPercentage, setHashPercentage] = useState(0)

  // 获取文件后缀名
  const getFileSuffix = (fileName: string) => {
    const arr = fileName.split('.')
    if (arr.length > 0) {
      return arr[arr.length - 1]
    }
    return ''
  }

  // 拆分文件
  const splitFile = (file: File, size = CHUNK_SIZE) => {
    const fileChunkList = []
    let curChunkIndex = 0
    while (curChunkIndex <= file.size) {
      const chunk = file.slice(curChunkIndex, curChunkIndex + size)
      fileChunkList.push({chunk: chunk})
      curChunkIndex += size
    }
    return fileChunkList
  }

  // 选择文件
  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files || []
    if (!file) return
    setFileName(file.name)
    setFile(file)
    // 文件分片
    const chunkList = splitFile(file)
    setChunkList(chunkList)
  }

  // 上传分片
  const uploadChunks = async (chunksData: Chunk[]) => {
    const formDataList = chunksData.map((chunks, index) => {
      const formData = new FormData()
      formData.append('chunk', chunks.chunk)
      formData.append('hash', chunks.hash || '')
      formData.append('suffix', getFileSuffix(fileName))
      return formData
    })

    const requestList = formDataList.map((formData, index) => {
      return request({
        action: action,
        data: formData,
        onProgress: (e, percent) => {
          const list = [...chunksData]
          list[index].progress = percent
          setChunkList(list)
        },
      })
    })
    // 上传文件
    Promise.all(requestList).then(() => {
      // 延迟发送合并请求，方便观察服务器合并文件的步骤
      setTimeout(() => {
        //执行合并操作
        // mergeRequest(hash)
      }, 1000)
    })
  }

  // 计算文件hash
  const calculateHash = (chunkList: Chunk[]) => {
    return new Promise(resolve => {
      const worker = new workerBuilder(hashWorker)
      worker.postMessage({chunkList: chunkList})
      worker.onmessage(e => {
        const {percentage, hash} = e.data
        setHashPercentage(percentage)
        if (hash) {
          // 当hash计算完成时，执行resolve
          resolve(hash)
        }
      })
    })
  }

  // 秒传：验证文件是否存在服务器
  const verfileIsExist = async (fileHash: string, suffix: string) => {
    const {data} = await request({
      url: 'http://localhost:3001/verFileIsExist',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        fileHash: fileHash,
        suffix: suffix,
      }),
    })
    return JSON.parse(data)
  }

  //上传
  const handleUpload = () => {
    if (!fileName) {
      return
    }
    //1、计算hash
    const hash = calculateHash(chunkList)
    //2、验证文件是否存在服务器，实现秒传
    //后端返回已经上传的文件列表，前端获取到id后进行过滤即可进行秒传

    //3、格式话chunks数据
    const chunksData = chunkList
      .map(({chunk}, index) => ({
        chunk: chunk,
        hash: hash + '-' + index,
        progress: 0,
      }))
      .filter(item2 => {
        // 过滤掉已上传的块
        const arr = item2.hash.split('-')
        return true
      })
    // 保存分片数据
    setChunkList(chunksData)
    // 开始上传分片
    uploadChunks(chunksData)
  }

  return (
    <div className="Kyong-upload">
      <div
      // onClick={handleClick}
      >
        <input ref={inputRef} type="file" onChange={fileChange} />
        <Button btnType="primary" icon={<Icon icon={'arrow-circle-up'} />}>
          点击上传
        </Button>
      </div>
    </div>
  )
}
export default BUpload
