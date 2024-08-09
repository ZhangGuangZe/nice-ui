import { defineConfig } from 'vitepress'
import demoBlockPlugin from 'vitepress-theme-demoblock'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nice-ui",
  description: "一套轻量级的 Vue3 组件库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
   /*  nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ], */

    sidebar: {
      '/': [
        { text: '快速开始', link: '/', items: [] },
        {
          text: '通用',
          items: [{ text: 'Button 按钮', link: '/components/button/' }]
        },
      ]
    },

    /* socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ] */
  },
  markdown: {
    config: (md) => {
      md.use(demoBlockPlugin)
    }
  }
})
