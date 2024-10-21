import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import url from 'url'
import fs from 'fs-extra'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})

// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
// 输出目录
const outputDir = path.resolve(__dirname, '../build')

// rollup 配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

const createPackageJson = name => {
  const fileStr = `{
  "name": "${name ? name : 'nice-ui'}",
  "version": "0.0.1",
  "main": "${name ? 'index.umd.js' : 'nice-ui.umd.js'}",
  "module": "${name ? 'index.es.js' : 'nice-ui.es.js'}",
  "author": "front-boy",
  "description": "一个用了都说好的组件库",
  "keywords": ["vue3", "组件库", "tsx", "UI"],
  "license": "ISC"
}`
  if (name) {
    fs.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    fs.outputFile(path.resolve(outputDir, 'package.json'), fileStr, 'utf-8')
  }
}

// 全量构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: entryFile,
        name: 'nice-ui',
        fileName: 'nice-ui',
        formats: ['es', 'umd']
      },
      outDir: outputDir
    }
  })
  createPackageJson()
}

// 执行输出
const buildLib = async () => {
  await buildAll()
}

buildLib()
