import React, {useState, useEffect, FC} from 'react'
import Progress from '../Progress'
import classNames from 'classnames'
import {FileItem, UploadListProps} from './interface'
import scopedClass from '../../utils/scopedClass'
import Icon from '../Icon'

const sc = scopedClass('Kyong-upload')

const UploadList: FC<UploadListProps> = props => {
  const {files = [], onRemove, onPreview} = props
  // 声明一个名为“count”的新状态变量
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked count times`
  }, [])

  const fileCls = (file: {status: string}) => {
    // 对应已完成的是一个新增的file-finish  其他的就是普通状态
    return [
      sc('list-file'),
      classNames({
        [sc(`list-file-finish`)]: file.status === 'finished',
      }),
    ].join(' ')
  }

  const handlePreview = (file: FileItem) => {
    onPreview && onPreview(file)
  }

  const handleRemove = (file: FileItem) => {
    onRemove && onRemove(file)
  }

  const parsePercentage = (val: string) => {
    // 使用10进制去解析数值
    return parseInt(val, 10)
  }
  return (
    <ul className={sc('list')}>
      {files.map((file: any, index: number) => {
        return (
          <li
            key={index}
            className={fileCls(file)}
            // onClick={() => {
            //   handleClick(file)
            // }}
          >
            <span
              onClick={() => {
                handlePreview(file)
              }}
            >
              <Icon icon="file" /> {file.name}
            </span>
            {file.status === 'finished' ? (
              <div
                className={sc('list-remove')}
                onClick={() => {
                  handleRemove(file)
                }}
              >
                <Icon icon="close"></Icon>
              </div>
            ) : null}
            <div style={{marginTop: 5}}>
              {file.showProgress ? <Progress strokeHeight={3} percent={parsePercentage(file.percentage)} /> : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
export default UploadList
