export const DefaultConfig = {
  /**
   * 关于列表配置
   * ————————————————————————————————————————————————
   */

  /**
   * data 选项列表
   * 参数可选类型: Array[String] / Array[Object]
   */
  data: [],

  /**
   * 是否清空选项列表
   * 参数可选类型: Boolean
   * aileSelect内部会Watch该属性，当属性值为true时，清空当前的选项列表
   */
  isClear: false,

  /**
   * 关于el-option的配置
   * ————————————————————————————————————————————————
   */

  /**
   * 设置el-option的label的格式化
   * 参数可选类型: [String, Function]
   */
  label: undefined,

  /**
   * 设置el-option的value的格式化
   * 参数可选类型: [String, Function]
   */
  value: undefined,

  /**
   * 设置el-option的disabled的格式化
   * 参数可选类型: [Boolean, Function]
   */
  disabled: false,

  /**
   * 设置el-option是否需要显示tooltip
   * 参数可选类型: [Boolean, Function]
   */
  showTooltip: false,

  /**
   * 设置tooltip采用的组件名称
   * 参数可选类型: 'aile-tooltip' | 'el-tooltip'
   * 默认采用 AileTooltip，如果是按需加载，则需手动配置为 'el-tooltip'
   */
  tooltipComponent: 'aile-tooltip',

  /**
   * 关于滚动加载
   * ————————————————————————————————————————————————
   */

  /**
   * remoteMethod 为远程请求函数
   * 参数可选类型: Function 需要返回 Promise
   */
  remoteMethod: undefined,

  /**
   * 当queryField的值为空时，是否允许继续发送请求
   * 参数可选类型: Boolean
   */
  nonEmpty: false,

  /**
   * 是否开启滚动加载
   * 参数可选类型: Boolean
   */
  scrollable: true,

  /**
   * 是否只执行一次初始化请求
   * 参数可选类型: Boolean
   * 用于仅将API传入并获取下拉列表，但不需要远程搜索
   */
  onceRequest: false,

  /**
   * 远程搜索的参数名称
   * 参数可选类型: String
   */
  queryField: '',

  /**
   * 分页：当前页参数名称
   * 参数可选类型: String
   */
  pageField: 'page_index',

  /**
   * 分页：页容量参数名称
   * 参数可选类型: String
   */
  sizeField: 'page_size',

  /**
 * 分页：页容量默认值
 * 参数可选类型: Number
 */
  // 页容量
  pageSize: 20,

  /**
   * 远程搜索的其他参数，会和queryField合并
   * 参数可选类型: Object
   */
  requestParams: {},

  /**
   * 请求返回结果数据字段名称，默认为data
   * 参数可选类型: String
   */
  respDataField: 'data',

  /**
   * 请求返回结果总数字段名称，默认为total
   * 参数可选类型: String
   */
  respTotalField: 'total',

  /**
   * 请求成功后事件回调
   * 参数可选类型: Function
   */
  respFormatter: list => list,

  /**
   * 所有请求均展示loading效果，默认为false，仅展示初次加载的loading
   * 参数可选类型: Boolean
   */
  showEachLoading: false
}

export const DefaultSelectAttrs = {
  remote: false,
  filterable: false,
  popperAppendToBody: false,
  defaultFirstOption: true
}

export const DefaultTooltipAttrs = { placement: 'top' }
