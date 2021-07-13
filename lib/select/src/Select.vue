<template>
  <el-select
    ref="select"
    v-scroll="handleLoadMore"
    class="aile-select"
    v-bind="mergeSelectAttrs"
    :remote="isRemote"
    :remote-method="mergeConfig.remoteMethod ? getRemoteList : remoteMethod"
    :loading="showRemoteLoading"
    @change="handleChange"
    v-on="$listeners"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>

    <slot>
      <component
        :is="mergeConfig.tooltipComponent"
        v-for="item in options"
        :key="JSON.stringify(item)"
        v-bind="mergeTooltipAttrs"
        :content="calcLabel(item)"
        :disabled="tooltipDisable(item)"
      >
        <el-option
          :value="calcValue(item)"
          :label="calcLabel(item)"
          :disabled="calcDisabled(item)"
        />
      </component>
    </slot>

    <template #empty>
      <slot name="empty" />
    </template>
  </el-select>
</template>

<script>
import isEqual from './isEqual';
import {
  DefaultConfig,
  DefaultSelectAttrs,
  DefaultTooltipAttrs
} from './config.js';

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
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
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

    remoteMethod: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      options: [],
      remoteLoading: false,
      currentPage: 1,
      total: 0,
      payload: '',
      selectedOptions: []
    };
  },
  computed: {
    // 配置项
    mergeConfig() {
      return {
        ...DefaultConfig,
        ...this.$aileSelect.config,
        ...this.config
      };
    },

    // el-select 属性
    mergeSelectAttrs() {
      const res = {
        ...DefaultSelectAttrs, // 默认属性
        ...this.$aileSelect.attrs, // 全局属性
        ...this.$attrs
      };
      delete res.tooltip;
      return res;
    },

    // el-tooltip 属性
    mergeTooltipAttrs() {
      return {
        ...DefaultTooltipAttrs,
        ...this.$aileSelect.tooltip,
        ...this.$attrs.tooltip
      };
    },

    /**
     * 是否采用远程搜索
     */
    isRemote() {
      if (this.mergeConfig.onceRequest) return false;
      if (this.mergeConfig.remoteMethod) return true;
      return this.mergeSelectAttrs.remote;
    },

    /**
     * 是否可以继续滚动加载
     */
    canLoadMore() {
      return (
        this.mergeConfig.scrollable &&
        this.mergeConfig.remoteMethod &&
        this.currentPage * this.mergeConfig.pageSize < this.total
      );
    },

    /**
     * 是否显示Loading效果
     */
    showRemoteLoading() {
      if (this.mergeSelectAttrs.loading) {
        return true;
      }
      if (this.mergeConfig.showEachLoading) {
        return this.remoteLoading;
      }
      return this.currentPage === 1 && this.remoteLoading;
    }
  },
  watch: {
    'mergeConfig.isClear'(val) {
      if (val) {
        this._reset();
      }
    },
    'mergeConfig.data'(newVal, oldVal) {
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
    this.$refs.select.$refs.popper.$el.addEventListener(
      'mousewheel',
      this.cleanTooltip
    );
    this.$once('hook:beforeDestroy', () => {
      this.$refs.select.$refs.popper.$el.removeEventListener(
        'mousewheel',
        this.cleanTooltip
      );
    });
  },
  methods: {
    /**
     * 初始化组件
     */
    async init() {
      const config = this.mergeConfig;

      // 如果存在传入的列表，则使用传入的列表作为下拉列表
      if (config.data.length) {
        const list = config.data;
        this._updateOptionList(list, list.length);
        this.selectedOptions = config.data;
      } else if (config.remoteMethod) {
        // 执行自定义远程搜索方法
        await this.getRemoteList();
      } else {
        // 执行原始远程执行方法，默认为空函数执行
        await this.remoteMethod();
      }
      if (this.$listeners.inited) {
        this.$emit('inited', this.options);
      }
    },

    /**
     * 计算可选项绑定的value
     */
    calcValue(item) {
      if (this.mergeConfig.value) {
        if (typeof this.mergeConfig.value === 'function') {
          return this.mergeConfig.value(item);
        } else {
          return item[this.mergeConfig.value];
        }
      }
      return item;
    },

    /**
     * 计算可选项显示的label
     */
    calcLabel(item) {
      if (this.mergeConfig.label) {
        if (typeof this.mergeConfig.label === 'function') {
          return this.mergeConfig.label(item);
        } else {
          return item[this.mergeConfig.label];
        }
      }
      return item;
    },

    /**
     * 计算可选项是否需要禁用
     */
    calcDisabled(item) {
      if (this.mergeConfig.disabled) {
        if (typeof this.mergeConfig.disabled === 'function') {
          return this.mergeConfig.disabled(item);
        } else {
          return item[this.mergeConfig.disabled];
        }
      }
      return item.disabled;
    },

    /**
     * 计算可选项是否需要禁用tooltip
     */
    tooltipDisable(item) {
      if (typeof this.mergeConfig.showTooltip === 'boolean') {
        return !this.mergeConfig.showTooltip;
      } else if (typeof this.mergeConfig.showTooltip === 'function') {
        return !this.mergeConfig.showTooltip(item);
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
      if (config.nonEmpty && !this.payload) return;

      // 构造请求参数
      const query = { ...config.requestParams };
      if (config.queryField && this.payload) {
        query[config.queryField] = this.payload;
      }

      try {
        this.remoteLoading = true;
        const resp = await config.remoteMethod(query);
        this._updateOptionList(
          resp[config.respDataField],
          resp[config.respTotalField]
        );
      } catch (error) {
        this._reset();
      } finally {
        this.remoteLoading = false;
      }
    },

    /**
     * 需要分页的请求方式
     */
    async fetchOptionListByScroll() {
      const config = this.mergeConfig;

      // 判断是否存在非空条件
      if (config.nonEmpty && !this.payload) return;

      // 构造请求参数
      const query = {
        [config.pageField]: this.currentPage,
        [config.sizeField]: config.pageSize,
        ...config.requestParams
      };
      if (config.queryField && this.payload) {
        query[config.queryField] = this.payload;
      }

      try {
        this.remoteLoading = true;
        const resp = await config.remoteMethod(query);
        this._updateOptionList(
          resp[config.respDataField],
          resp[config.respTotalField]
        );
      } catch {
        this._reset();
      } finally {
        this.remoteLoading = false;
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
          item => this.selectedOptions.find(opt => this.calcValue(opt) === item) ||
            this.options.find(opt => this.calcValue(opt) === item)
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
      const body = window.document.getElementsByTagName('body')[0];
      const tooltips = window.document.getElementsByClassName('el-tooltip__popper');
      const length = tooltips.length;
      for (let i = length - 1; i >= 0; i--) {
        body.removeChild(tooltips[i]);
      }
    }
  }
};
</script>
