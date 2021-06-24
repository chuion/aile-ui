import AileTable from './src/Table.vue'
import { checkType } from '../../utils'

AileTable.install = function (Vue, option = {}) {
  // 检查参数安全
  if (checkType(option) !== 'object') {
    throw Error(`Invalid plugin option: Expect object, got ${checkType(option)}!`)
  }

  // 挂载全局配置
  Vue.prototype.$aileTable = {
    config: option.config || {}, // 特殊配置项
    table: option.table || {}, // <el-table />的属性
    tableColumn: option.tableColumn || {}, // <el-table-column />的属性
    pagination: option.pagination || {} // <el-pagination />的属性
  }

  // 注册全局组件
  Vue.component(AileTable.name, AileTable)
}

export default AileTable
