import {CSSProperties} from 'react'

export interface UploadProps {
  /**
   * @description 自定义样式
   */
  style?: CSSProperties
  /**
   * @description 自定义类名
   * @default string
   */
  className?: string
  /**
   * @description 远程上传地址
   * @default 无
   */
  action: string
  /**
   * @description 发送请求时自定义请求头
   * @default {}
   */
  headers?: Record<string, string>
  /**
   * @description 是否支持多选
   * @default false
   */
  multiple?: boolean
  /**
   * @description 上传所需额外参数或返回上传额外参数的方法
   * @default {}
   */
  data?: Record<string, string>
  /**
   * @description 上传文件的键名
   * @default file
   */
  name?: string
  /**
   * @description 是否携带cookie上传
   * @default false
   */
  withCredentials?: boolean
  /**
   * @description 是否展示文件列表
   * @default false
   */
  showFileList?: boolean
  /**
   * @description 上传控件的类型 选择或者拖拽
   * @default 无
   */
  type?: string
  /**
   * @description 默认文件列表
   * @default []
   */
  defaultFileList?: FileItem[]
  /**
   * @description 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名
   */
  format?: string[]
  /**
   * @description 允许的文件类型，参考MDN<input>accept属性
   * @default *
   */
  accept?: string
  /**
   * @description 文件大小限制，单位 kb
   */
  maxSize?: number
  /**
   * @description 是否禁用
   */
  disabled?: boolean
  /**
   * @description 上传前回调函数
   * @default noop
   */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**
   * 文件上传时的钩子，返回字段为 event, file, fileList
   */
  onProgress?: (e: ProgressEvent<EventTarget>, fileItem: FileItem, fileList: FileItem[]) => boolean | Promise<File>
  /**
   * 文件上传成功时的钩子，返回字段为 response, file, fileList
   */
  onSuccess?: any
  /**
   * 文件上传失败时的钩子，返回字段为 error, file, fileList
   */
  onError?: any
  /**
   * 文件列表移除文件时的钩子，返回字段为 file, fileList
   */
  onRemove?: any
  /**
   * 点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
   */
  onPreview?: any
  /**
   * 文件超出指定大小限制时的钩子，返回字段为 file, fileList
   */
  onExceededSize?: any
  /**
   * 文件格式验证失败时的钩子，返回字段为 file, fileList
   */
  onFormatError?: any

  children?: React.ReactNode
}

export interface AjaxProps {
  action: string
  data: Record<string, string | Blob>
  filename: string
  file: File
  withCredentials: boolean
  headers: Record<string, string>
  onProgress: (arg0: ProgressEvent<EventTarget>, percent: number) => void
  onError: (arg0: Error | ProgressEvent<EventTarget>, arg1: undefined) => void
  onSuccess: (arg0: any) => void
}

export interface UploadListProps {
  files: FileItem[]
  onRemove?: (file: FileItem) => void
  onPreview?: (file: FileItem) => void
}

export interface FileItem {
  uid: string
  name: string
  status: string
  file?: File
  url?: string
  percentage?: number
  showProgress?: boolean
}
