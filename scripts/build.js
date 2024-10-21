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
// 组件目录
const componentsDir = path.resolve(__dirname, '../src/components')

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
    // 创建单个组件的package.json
    fs.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    // 全量
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

// 单个构建
const buildSingle = async name => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(componentsDir, name),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      outDir: path.resolve(outputDir, name)
    }
  })
  createPackageJson(name)
}

// 执行输出
const buildLib = async () => {
  // 全量打包
  await buildAll()

  // 按需打包
  fs.readdirSync(componentsDir)
    .filter(name => {
      // 寻找组件中的 index.ts 文件
      const componentDir = path.resolve(componentsDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async name => await buildSingle(name))
}

buildLib()
