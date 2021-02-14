<template>
  <el-link
    v-bind="$attrs"
    class="aile-link"
    :class="[mergeConfig.ellipsis && 'is-ellipsis']"
    :style="calcStyle"
    :underline="calcUnderline"
    v-on="$listeners"
  >
    <slot />
    <template #icon>
      <slot name="icon" />
    </template>
  </el-link>
</template>

<script>
const DefaultConfig = {
  // 是否支持超出部分省略号显示
  ellipsis: false,

  // Link的最大宽度
  maxWidth: '100%',

  // 自定义inputInner的最大宽度，不传则使用默认计算规则
  // 无icon属性及icon插槽时，默认100%，加入icon属性减去20px，加入icon插槽再减去20px
  inputMaxWidth: ''
};

export default {
  name: 'AileLink',

  props: {
    underline: {
      type: Boolean,
      default: undefined
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    mergeConfig() {
      return {
        ...DefaultConfig,
        ...this.$aileSelect.config,
        ...this.config
      };
    },
    calcUnderline() {
      if (this.underline === undefined) {
        return this.$aileLink.underline;
      }
      return this.underline;
    },
    calcStyle() {
      const inputMaxWidth = ['100%'];
      if (this.$attrs.icon) inputMaxWidth.push('20px');
      if (this.$slots.icon) inputMaxWidth.push('20px');
      return {
        '--maxWidth': this.mergeConfig.maxWidth,
        '--inputMaxWidth': `calc(${inputMaxWidth.join(' - ')})`
      };
    }
  }
};
</script>

<style scoped>
.aile-link {
  max-width: var(--maxWidth);
}

.aile-link.is-ellipsis::v-deep span.el-link--inner {
  max-width: var(--inputMaxWidth);
  height: auto;
  display: inline-block;
  line-height: 1;
  padding: 3px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
