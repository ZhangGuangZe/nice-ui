import { App } from 'vue'
import ButtonPlugin, { Button } from '../src/components/button'

export { Button }

const plugins = [ButtonPlugin]

export default {
  version: '0.0.1',
  install(app: App) {
    plugins.forEach(plugin => app.use(plugin))
  }
}
