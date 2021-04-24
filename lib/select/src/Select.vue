<template>
  <el-select
    ref="select"
    v-scroll="handleLoadMore"
    class="aile-select"
    :filterable="calcFilterable"
    :remote="calcRemote"
    :default-first-option="calcDefaultFirstOption"
    :loading="loading && currentPage === 1"
    :remote-method="mergeConfig.method ? getRemoteList : remoteMethod"
    v-bind="$attrs"
    :popper-append-to-body="calcPopperAppendToBody"
    @change="handleChange"
    v-on="$listeners"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>
    <slot>
      <el-tooltip
        v-for="item in options"
        :key="JSON.stringify(item)"
        :content="calcLabel(item)"
        v-bind="mergeConfig.tooltip"
        :disabled="tooltipDisable(item)"
      >
        <el-option
          :value="calcValue(item)"
          :label="calcLabel(item)"
          :disabled="calcDisabled(item)"
        />
      </el-tooltip>
    </slot>

    <template #empty>
      <slot name="empty" />
    </template>
  </el-select>
</template>

<script>
import isEqual from './isEqual';

// AileSelect的默认参数，可通过传入props.config进行覆盖
const DefaultConfig = {
  // queryKey的值为空时，是否允许继续发送请求
  // 参数可选类型: Boolean
  notNull: false,

  // 设置el-option的label和value的格式化
  // 参数可选类型: [String, Function]
  itemLabel: undefined,
  itemValue: undefined,

  // 设置禁用条件默认为disabled
  // 参数可选类型: [Boolean, Function]
  itemDisable: false,

  // dataSource 初始下拉列表
  // 参数可选类型: Array
  dataSource: [],

  // 组件会Watch该属性，当属性值为true时，清空当前的Options
  // 参数可选类型: Boolean
  clearSignal: false,

  // 是否开启无限滚动
  // 参数可选类型: Boolean
  scrollable: true,

  // 组件是否显示Tooltip
  // 参数可选类型: [Boolean, Function]
  itemShowTooltip: false,

  // tooltip参数，支持<el-tooltip>的全部属性设置
  // 参数可选类型: Obejct
  tooltip: { 'open-delay': 1000, placement: 'top' },

  // method 为远程请求API
  // 参数可选类型: Function
  method: undefined,

  // 远程搜索的参数名称
  // 参数可选类型: String
  queryKey: '',

  // 远程搜索的其他参数，会和queryKey合并
  // 参数可选类型: Object
  requestParams: {},

  // 是否只执行一次初始化请求（用于仅将API传入并获取下拉列表，但不需要远程搜索）
  onceRequest: false,

  // pageField,sizeField 为分页字段名称
  pageField: 'page_index',
  sizeField: 'page_size',

  // 页容量
  pageSize: 20,

  // respDataField/respTotalField 请求结果的data/total字段名称
  respDataField: 'data',
  respTotalField: 'total',

  // 请求成功后事件回调
  // 参数可选类型: Function
  respFormatter: list => list
};

export default {
  name: 'AileSelect',
  directives: {
    scroll: {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector(
          '.el-select-dropdown .el-select-dropdown__wrap'
        );
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          /**
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },

  inheritAttrs: false,
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    remote: {
      type: Boolean,
      default: undefined
    },
    filterable: {
      type: Boolean,
      default: undefined
    },
    remoteMethod: {
      type: Function,
      default: () => {}
    },
    popperAppendToBody: {
      type: Boolean,
      default: undefined
    },
    defaultFirstOption: {
      type: Boolean,
      default: undefined
    }
  },
  data() {
    return {
      options: [],
      loading: false,
      currentPage: 1,
      total: 0,
      payload: '',
      selectedOptions: []
    };
  },
  computed: {
    mergeConfig() {
      return {
        ...DefaultConfig,
        ...this.$aileSelect.config,
        ...this.config
      };
    },

    /**
     * 是否远程搜索
     */
    calcRemote() {
      if (this.mergeConfig.onceRequest) return false;
      if (this.mergeConfig.method) return true;
      if (this.remote === undefined) {
        return this.$aileSelect.remote;
      }
      return this.remote;
    },

    /**
     * 可搜索
     */
    calcFilterable() {
      if (this.mergeConfig.method) return true;
      if (this.filterable === undefined) {
        return this.$aileSelect.filterable;
      }
      return this.filterable;
    },

    /**
     * 将下拉框添加至body
     */
    calcPopperAppendToBody() {
      if (this.popperAppendToBody === undefined) {
        return this.$aileSelect.popperAppendToBody;
      }
      return this.popperAppendToBody;
    },

    /**
     * 默认选择第一个下拉项
     */
    calcDefaultFirstOption() {
      if (this.defaultFirstOption === undefined) {
        return this.$aileSelect.popperAppendToBody;
      }
      return this.defaultFirstOption;
    },

    /**
     * 是否可以继续滚动加载
     */
    canLoadMore() {
      return (
        this.mergeConfig.scrollable &&
        this.mergeConfig.method &&
        this.currentPage * this.mergeConfig.pageSize < this.total
      );
    }
  },
  watch: {
    'mergeConfig.clearSignal'(val) {
      if (val) {
        this._reset();
      }
    },
    'mergeConfig.dataSource'(newVal, oldVal) {
      if (!isEqual(newVal, oldVal)) {
        this._updateOptionList(newVal, newVal.length);
      }
    },
    'mergeConfig.requestParams'(newVal, oldVal) {
      if (!isEqual(newVal, oldVal)) {
        this.getRemoteList();
      }
    }
  },
  mounted() {
    this.init();
    this.$refs.select.$refs.popper.$el.addEventListener('mousewheel', this.cleanTooltip);
    this.$once('hook:beforeDestroy', () => {
      this.$refs.select.$refs.popper.$el.removeEventListener('mousewheel', this.cleanTooltip);
    });
  },
  methods: {
    /**
     * 初始化组件
     */
    async init() {
      const config = this.mergeConfig;

      // 如果存在传入的列表，则使用传入的列表作为下拉列表
      if (config.dataSource.length) {
        const list = config.dataSource;
        this._updateOptionList(list, list.length);
        this.selectedOptions = config.dataSource;
      } else if (config.method) {
        // 执行自定义远程搜索方法
        await this.getRemoteList();
      } else {
        // 执行原始远程执行方法，默认为空函数执行
        await this.remoteMethod();
      }

      if (this._events.inited) {
        this.$emit('inited', this.options);
      }
    },

    /**
     * 计算可选项绑定的value
     */
    calcValue(item) {
      if (this.mergeConfig.itemValue) {
        if (typeof this.mergeConfig.itemValue === 'function') {
          return this.mergeConfig.itemValue(item);
        } else {
          return item[this.mergeConfig.itemValue];
        }
      }
      return item;
    },

    /**
     * 计算可选项显示的label
     */
    calcLabel(item) {
      if (this.mergeConfig.itemLabel) {
        if (typeof this.mergeConfig.itemLabel === 'function') {
          return this.mergeConfig.itemLabel(item);
        } else {
          return item[this.mergeConfig.itemLabel];
        }
      }
      return item;
    },

    /**
     * 计算可选项是否需要禁用
     */
    calcDisabled(item) {
      if (this.mergeConfig.itemDisable) {
        if (typeof this.mergeConfig.itemDisable === 'function') {
          return this.mergeConfig.itemDisable(item);
        } else {
          return item[this.mergeConfig.itemDisable];
        }
      }
      return item.disabled;
    },

    /**
     * 计算可选项是否需要禁用tooltip
     */
    tooltipDisable(item) {
      if (typeof this.mergeConfig.itemShowTooltip === 'boolean') {
        return !this.mergeConfig.itemShowTooltip;
      } else if (typeof this.mergeConfig.itemShowTooltip === 'function') {
        return !this.mergeConfig.itemShowTooltip(item);
      }
    },

    /**
     * 根据配置中的 scrollable 决定采用何种请求方式
     */
    async getRemoteList(payload = '') {
      this.payload = payload;
      this.currentPage = 1;
      this.total = 0;
      if (this.mergeConfig.scrollable) {
        await this.fetchOptionListByScroll();
      } else {
        await this.fetchOptionListOnce();
      }
    },

    /**
     * 更新选项列表
     * @param {array} list 列表数组
     * @param {number} total 列表总数
     */
    _updateOptionList(list, total) {
      const res = this.mergeConfig.respFormatter(list);

      if (total) {
        this.total = total;
      }
      if (!this.currentPage || this.currentPage === 1) {
        this.options = res;
      } else {
        this.options.push(...res);
      }
    },

    /**
     * 重置下拉列表
     */
    _reset() {
      this.options = [];
      this.currentPage = 1;
      this.total = 0;
      this.payload = '';
    },

    /**
     * 无需分页的请求方式
     */
    async fetchOptionListOnce() {
      const config = this.mergeConfig;

      // 判断是否存在非空条件
      if (config.notNull && !this.payload) return;

      // 构造请求参数
      const query = { ...config.requestParams };
      if (config.queryKey && this.payload) {
        query[config.queryKey] = this.payload;
      }

      try {
        this.loading = true;
        const resp = await config.method(query);
        this._updateOptionList(
          resp[config.respDataField],
          resp[config.respTotalField]
        );
      } catch (error) {
        this._reset();
      } finally {
        this.loading = false;
      }
    },

    /**
     * 需要分页的请求方式
     */
    async fetchOptionListByScroll() {
      const config = this.mergeConfig;

      // 判断是否存在非空条件
      if (config.notNull && !this.payload) return;

      // 构造请求参数
      const query = {
        [config.pageField]: this.currentPage,
        [config.sizeField]: config.pageSize,
        ...config.requestParams
      };
      if (config.queryKey && this.payload) {
        query[config.queryKey] = this.payload;
      }

      try {
        this.loading = true;
        const resp = await config.method(query);
        this._updateOptionList(
          resp[config.respDataField],
          resp[config.respTotalField]
        );
      } catch {
        this._reset();
      } finally {
        this.loading = false;
      }
    },

    /**
     * 滚动加载更多数据
     */
    handleLoadMore() {
      if (!this.canLoadMore) return;
      this.currentPage++;
      this.fetchOptionListByScroll();
    },

    /**
     * 选择下拉项时的操作
     */
    handleChange(selected) {
      if (Array.isArray(selected)) {
        this.selectedOptions = selected.map(
          item => this.selectedOptions.find(opt => this.calcValue(opt) === item) || this.options.find(opt => this.calcValue(opt) === item)
        );
        this.$emit('select', this.selectedOptions);
      } else {
        this.$emit(
          'select',
          this.options.find(item => selected === this.calcValue(item))
        );
      }
    },

    /**
     * 兼容原生Select方法
     * -----------------------------------
     */

    focus() {
      this.$refs.select.focus();
    },
    blur() {
      this.$refs.select.blur();
    },
    // 清理tooltip Dom元素
    cleanTooltip() {
      const body = document.getElementsByTagName('body')[0];
      const tooltips = document.getElementsByClassName('el-tooltip__popper');
      const length = tooltips.length;
      for (let i = length - 1; i >= 0; i--) {
        body.removeChild(tooltips[i]);
      }
    }
  }
};
</script>

