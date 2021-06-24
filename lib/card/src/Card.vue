<template>
  <div
    :style="cardStyle"
    :class="cardClassList"
  >
    <template v-if="calcTitle">
      <div
        :class="headerClassList"
        :style="headerStyleList"
      >
        <slot name="title">
          <!-- 普通标题 -->
          <span
            v-if="isSimpleTitle"
            class="title"
          >{{ calcTitle }}</span>
          <!-- 可切换标题 -->
          <el-tabs
            v-else
            v-model="selectedTab"
            class="tabs"
          >
            <el-tab-pane
              v-for="item in calcTitle"
              :key="item.value"
              :label="item.label"
              :name="item.value"
            />
          </el-tabs>
        </slot>
        <!-- 右侧slot -->
        <slot name="sub" />
      </div>
    </template>

    <div
      v-loading="loading"
      :class="['aile-card__body', bodyClass]"
      :style="bodyStyle"
    >
      <template v-if="loading || showEmpty">
        <slot name="empty">
          <div class="empty-place">
            暂无数据
          </div>
        </slot>
      </template>
      <template v-else>
        <slot :activeTitle="selectedTab" />
      </template>
    </div>
  </div>
</template>

<script>
import { mergeClass } from '../../../utils'
import { DefaultConfig } from './config'
export default {
  name: 'AileCard',

  inheritAttrs: false,
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    // Card标题
    title: {
      type: [String, Array],
      default: ''
    },
    // 仅针对title为数组的情况
    // 设置lazyLoad为true，则不进行标题初始化操作，外部可调用'$refs.Card.setActiveTitle(tab)'激活选项卡
    lazyLoad: {
      type: Boolean,
      default: false
    },
    // showEmpty为true时，展示空白占位组件
    showEmpty: {
      type: Boolean,
      default: false
    },
    // loading为true时，Card内容部分展示加载动画
    loading: {
      type: Boolean,
      default: false
    },
    activeTitle: {
      type: String,
      default: ''
    },
    headerClass: {
      type: [String, Array, Object],
      default: ''
    },
    headerStyle: {
      type: Object,
      default: () => ({})
    },
    bodyClass: {
      type: [String, Array, Object],
      default: ''
    },
    bodyStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return { selectedTab: '' }
  },
  computed: {
    mergeConfig () {
      return {
        ...DefaultConfig,
        ...this.$aileCard.config,
        ...this.config,
        ...this.$attrs
      }
    },
    calcTitle () {
      if (this.isSimpleTitle) {
        return this.title
      }
      return this.title.map(item => ({
        label: item.label || item,
        value: item.value || item
      }))
    },
    isSimpleTitle () {
      return typeof this.title === 'string'
    },
    cardStyle () {
      const { width, height, minHeight } = this.mergeConfig
      return {
        width,
        height,
        minHeight,
        ...(this.$attrs.style || {})
      }
    },
    cardClassList () {
      return mergeClass(
        [
          'aile-card',
          this.mergeConfig.shadow && `is-${this.mergeConfig.shadow}-shadow`
        ],
        this.$attrs.class
      )
    },
    headerClassList () {
      return mergeClass(
        'aile-card__body',
        this.mergeConfig.headerClass,
        this.headerClass
      )
    },
    headerStyleList () {
      return {
        ...this.mergeConfig.headerStyle,
        ...this.headerStyle
      }
    },
    bodyClassList () {
      return mergeClass(
        'aile-card__body',
        this.mergeConfig.bodyClass,
        this.bodyClass
      )
    },
    bodyStyleList () {
      return {
        ...this.mergeConfig.bodyStyle,
        ...this.bodyStyle
      }
    }
  },
  watch: {
    selectedTab (val) {
      this.$emit('change', val)
    },
    activeTitle (val) {
      this.setActiveTitle(val)
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (
        !this.lazyLoad &&
        Array.isArray(this.calcTitle) &&
        this.calcTitle.length
      ) {
        this.setActiveTitle(this.calcTitle[0].value || this.calcTitle[0].label)
      }
    },

    /**
     * 设置当前活跃的标签
     */
    setActiveTitle (tab) {
      this.selectedTab = tab
    }
  }
}
</script>

<style scoped>
.aile-card {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.aile-card.is-always-shadow {
  box-shadow: 0px 0px 14px 2px rgba(43, 43, 43, 0.07);
}

.aile-card.is-hover-shadow:hover,
.aile-card.is-hover-shadow:focus {
  box-shadow: 0px 0px 14px 2px rgba(43, 43, 43, 0.07);
}

.aile-card__header {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 4px 4px 0 0;
}

.aile-card__header .title {
  font-size: 16px;
  color: #333;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.aile-card__header .tabs :deep(.el-tabs__header) {
  margin-bottom: 0;
}

.aile-card__header .tabs :deep(.el-tabs__header .el-tabs__item) {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.aile-card__body {
  position: relative;
  width: 100%;
  height: calc(100% - 40px);
  padding: 10px 18px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aile-card__body .empty-place {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
