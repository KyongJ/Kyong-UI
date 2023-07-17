import React from 'react'
import Upload from '../upload'

export default function index() {
  return (
    <Upload
      onError={(e: any) => {
        console.log('e', e)
      }}
      onSuccess={() => {
        console.log('上传成功')
      }}
      headers={{token: '1'}}
      defaultFileList={[]}
      action="test"
      multiple
      accept="*"
    />
  )
}
