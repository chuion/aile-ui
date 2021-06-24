import AileForm from './src/Form.vue'
import { checkType } from '../../utils'

AileForm.install = function (Vue, option = {}) {
  // 检查参数安全
  if (checkType(option) !== 'object') {
    throw Error(`Invalid plugin option: Expect object, got ${checkType(option)}!`)
  }

  // 挂载全局配置
  Vue.prototype.$aileForm = {
    config: option.config || {}, // 特殊配置项
    form: option.form || {}, // <el-form />的属性
    formItem: option.formItem || {} // <el-form-item />的属性
  }

  // 注册全局组件
  Vue.component(AileForm.name, AileForm)
}

export default AileForm
