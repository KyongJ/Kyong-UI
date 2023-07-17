import React, {useState, useEffect, useRef, useCallback, FC} from 'react'
import Button from '../Button'
import classNames from 'classnames'
// import UploadList from './UploadList'
import ajax from './ajax'
import scopedClass from '../../utils/scopedClass'
import {FileItem, UploadProps} from './interface'
import Icon from '../Icon'
// import { FormItemContext } from '../Form/FormItem'

// const PropTypes = require('prop-types')

const sc = scopedClass('Kyong-upload')

const Upload: FC<UploadProps> = props => {
  const {
    action,
    headers = {},
    multiple = false,
    data = {},
    name = 'file',
    withCredentials = false,
    showFileList = true,
    type = 'select',
    format = [],
    accept,
    maxSize,
    className = '',
    style,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onRemove,
    onPreview,
    onExceededSize,
    onFormatError,
    defaultFileList = [],
    disabled = false,
  } = props

  //   const FormParent: any = useContext(FormItemContext)
  // 强制更新视图方法 end
  //   const [dragOver, setDragOver] = useState(false)
  //   const [, setFileList] = useState<any>([])
  //   const [tempIndex, setTempIndex] = useState(1)
  const dragOver = useRef<any>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<FileItem[]>(defaultFileList)

  const classnames = classNames(sc('wrapper'), {
    [sc('select')]: type === 'select',
    [sc('drag')]: type === 'drag',
    [sc('dragOver')]: type === 'drag' && dragOver,
  })

  const changeFileItem = <T,>(fileItem: FileItem, key: string, value: T) => {
    setFileList(fileList => {
      return fileList.map(_ => {
        if (_.uid === fileItem.uid) {
          return {
            ..._,
            [key]: value,
          }
        }
        return _
      })
    })
  }

  const handleClick = () => {
    if (disabled) return
    inputRef.current && inputRef.current.click()
  }

  const checkFile = (file: File) => {
    // 上传文件 校验 传递的是一个数组
    if (format.length) {
      const fileFormat = file.name.split('.').pop()?.toLocaleLowerCase()
      const checked = format.some((item: string) => item.toLocaleLowerCase() === fileFormat)
      // if (!checked) {
      //   onFormatError(file, fileListRef.current)
      //   return false
      // }
    }

    // 判断传输大小
    if (maxSize) {
      // if (file.size > maxSize * 1024) {
      //   onExceededSize(file, fileListRef.current)
      //   return false
      // }
    }
    return true
  }

  const beforeUploadFile = async (file: File): Promise<boolean> => {
    if (beforeUpload) {
      try {
        const res = await beforeUpload(file)
        return !(typeof res === 'boolean' && !res)
      } catch (e) {
        return false
      }
    } else {
      return true
    }
  }

  const handleProgress = (e: ProgressEvent<EventTarget>, fileItem: FileItem, percent: number) => {
    onProgress && onProgress(e, fileItem, fileList)
    // console.log(fileItem)
    console.log(percent)
    changeFileItem(fileItem, 'percentage', percent || 0)
  }

  const handleSuccess = (res: any, fileItem: FileItem) => {
    if (fileItem) {
      // 文件上传状态变更为finished完成
      changeFileItem(fileItem, 'status', 'finished')

      onSuccess && onSuccess(res, fileItem, fileList)
      // 触发向上查找，form-change事件  此处可以暂时屏蔽
      //   this.dispatch('tbFormItem', 'form-change', _file)
      // setTimeout(() => {
      //   // 上传成功500ms之后对应的上传进度条就不要在展示了
      //   _file.showProgress = false
      //   forceUpdate()
      // }, 500)
    }
  }

  const handleError = (err: any, response: any, fileItem: FileItem) => {
    // 更改上传文件为失败文件
    changeFileItem(fileItem, 'status', 'error')

    // 删除这个文件
    // fileListArr.splice(fileListArr.indexOf(_file), 1)
    // setFileList(fileListRef.current)
    // 触发上传失败的钩子
    onError && onError(err, response, fileItem)
  }

  const uploadFile = async (file: File, fileItem: FileItem) => {
    if (!(await beforeUploadFile(file))) return
    if (!checkFile(file)) return
    // 改变状态
    // changeFileItem(fileItem, 'status', 'uploading')

    ajax({
      headers: headers, // 自定义的请求头
      withCredentials: withCredentials, // 当前请求为跨域类型时是否在请求中协带cookie
      file: file, // 文件
      data: data, //附带参数
      filename: name, // 上传文件的key值
      action: action, // 上传地址
      // 上传时的钩子
      onProgress: (e, percent) => {
        handleProgress(e, fileItem, percent)
      },
      // 上传成功的钩子
      onSuccess: res => {
        handleSuccess(res, fileItem)
      },
      // 上传失败触发的钩子
      onError: (err, response) => {
        handleError(err, response, fileItem)
      },
    })
  }

  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || []
    const list: FileItem[] = []
    for (let i = 0; i < files.length; i++) {
      list.push({
        uid: String(Math.random() * 1000),
        status: 'unUpload',
        percentage: 0,
        name: files[i].name,
        file: files[i],
      })
      await uploadFile(files[i], list[list.length - 1])
    }

    inputRef.current && (inputRef.current.value = '')
    setFileList([...fileList, ...list])
  }

  return (
    <div className="Kyong-upload">
      <div
        className={classnames}
        onClick={handleClick}
        // onDrop={onDrop}
        // onDragOver={(e: any) => {
        //   e.preventDefault()
        //   dragOver.current = true
        // }}
        // onDragLeave={(e: any) => {
        //   e.preventDefault()
        //   dragOver.current = false
        // }}
      >
        <input
          ref={inputRef}
          type="file"
          className={sc('input')}
          onChange={fileChange}
          multiple={multiple}
          accept={accept}
        />
        {props.children || (
          <Button btnType="primary" icon={<Icon icon={'arrow-circle-up'} />}>
            点击上传
          </Button>
        )}
      </div>
      {/* <slot name='tip'></slot> */}
      {/* {props.tip} */}
      {/* {showFileList ? (
        <UploadList
          files={fileListRef.current}
          fileRemove={handleRemove}
          filePreview={handlePreview}
        ></UploadList>
      ) : null} */}
    </div>
  )
}
export default Upload
