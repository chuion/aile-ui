import AileTooltip from './src/Tooltip.vue'
import { registerTheme } from './src/theme.js'
import { checkType } from '../../utils'

AileTooltip.install = function (Vue, option = {}) {
  // 检查参数安全
  if (checkType(option) !== 'object') {
    throw Error(`Invalid plugin option: Expect object, got ${checkType(option)}!`)
  }
  // 注册主题
  if ({}.hasOwnProperty.call(option, 'themes')) {
    registerTheme(option.themes || [])
  }
  // 挂载全局配置
  Vue.prototype.$aileTooltip = {
    // config: option.config || {},
    attrs: option.attrs || {}
  }
  // 注册全局组件
  Vue.component(AileTooltip.name, AileTooltip)
}

export default AileTooltip
