import Theme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import DemoBlock from "vitepress-theme-demoblock/dist/client/components/DemoBlock.vue";
import Demo from "vitepress-theme-demoblock/dist/client/components/Demo.vue";

import NiButton from '../../../src/components/button/src/button'
import '../../../src/index.scss'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('NiButton', NiButton),
    app.component('DemoBlock', DemoBlock),
    app.component('Demo', Demo)
  }
}