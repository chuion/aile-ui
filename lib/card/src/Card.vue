<template>
  <div
    :style="{
      width,
      height,
      minHeight
    }"
    :class="['aile-card', `is-${calcShadow}-shadow`]"
  >
    <template v-if="calcTitle">
      <div
        :class="['aile-card__header', headerClass]"
        :style="headerStyle"
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
        <slot name="header" />
      </div>
    </template>

    <div
      v-loading="loading"
      :class="['aile-card__content', contentClass]"
      :style="contentStyle"
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
export default {
  name: 'AileCard',

  props: {
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
    // Card宽度，默认100%
    width: {
      type: String,
      default: '100%'
    },
    // Card高度，默认100%
    height: {
      type: String,
      default: '100%'
    },
    // Card最小高度，默认'auto'
    minHeight: {
      type: String,
      default: 'auto'
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
    shadow: {
      type: String,
      default: undefined
    },
    activeTitle: {
      type: String,
      default: ''
    },

    headerClass: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    },
    headerStyle: {
      type: Object,
      default: () => ({})
    },
    contentStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return { selectedTab: '' };
  },
  computed: {
    calcTitle() {
      if (this.isSimpleTitle) {
        return this.title;
      }
      return this.title.map(item => ({
        label: item.label || item,
        value: item.value || item
      }));
    },
    calcShadow() {
      if (this.shadow === undefined) {
        return this.$aileCard.shadow;
      }
      return this.shadow;
    },
    isSimpleTitle() {
      return typeof this.title === 'string';
    }
  },
  watch: {
    selectedTab(val) {
      this.$emit('change-title', val);
    },
    activeTitle(val) {
      this.setActiveTitle(val);
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (
        !this.lazyLoad &&
        Array.isArray(this.calcTitle) &&
        this.calcTitle.length
      ) {
        this.setActiveTitle(this.calcTitle[0].value || this.calcTitle[0].label);
      }
    },

    /**
     * 设置当前活跃的标签
     */
    setActiveTitle(tab) {
      this.selectedTab = tab;
    }
  }
};
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

.aile-card.is-hover-shadow:hover, .aile-card.is-hover-shadow:focus {
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

.aile-card__header .tabs ::v-deep .el-tabs__header {
  margin-bottom: 0;
}

.aile-card__header .tabs ::v-deep .el-tabs__header .el-tabs__item {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.aile-card__content {
  position: relative;
  width: 100%;
  height: calc(100% - 40px);
  padding: 10px 18px;
  box-sizing: border-box;
  background: #fff;
}

.aile-card__content .empty-place {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
