import {defineConfig} from 'dumi'
import path from 'path'

const repo = 'Kyong-UI' // 项目名(也就是你的仓库名)

export default defineConfig({
  title: 'KyongUI',
  mode: 'site',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  base: process.env.SITE_BUILD_ENV === 'PREVIEW' ? undefined : `/${repo}`,
  publicPath: process.env.SITE_BUILD_ENV === 'PREVIEW' ? undefined : `/${repo}/`,
  // more config: https://d.umijs.org/config
})
