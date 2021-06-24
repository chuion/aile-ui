export const DefaultConfig = {
  width: undefined,
  lazyTrim: false,

  /**
   * data 选项列表
   * 参数可选类型: Array[String] / Array[Object]
   */
  data: [],

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
  //    nonEmpty: false,

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
  //    onceRequest: false,

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
  respFormatter: list => list
}

export const DefaultAutocompleteAttrs = {}
