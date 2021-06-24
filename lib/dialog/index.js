import AileDialog from './src/Dialog.vue'
import { checkType } from '../../utils'

AileDialog.install = function (Vue, option = {}) {
  // 检查参数安全
  if (checkType(option) !== 'object') {
    throw Error(`Invalid plugin option: Expect object, got ${checkType(option)}!`)
  }
  // 挂载全局配置
  Vue.prototype.$aileDialog = {
    config: option.config || {},
    attrs: option.attrs || {}
  }
  // 注册全局组件
  Vue.component(AileDialog.name, AileDialog)
}

export default AileDialog
