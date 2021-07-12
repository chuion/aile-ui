<template>
  <el-link
    class="aile-link"
    :class="[mergeConfig.ellipsis && 'is-ellipsis']"
    :style="calcStyle"
    v-bind="mergeAttrs"
  >
    <slot />
    <template #icon>
      <slot name="icon" />
    </template>
  </el-link>
</template>

<script>
import { DefaultConfig, DefaultLinkAttrs } from './config.js';

export default {
  name: 'AileLink',

  inheritAttrs: false,
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    mergeConfig() {
      return {
        ...DefaultConfig,
        ...this.$aileLink.config,
        ...this.config
      };
    },
    mergeAttrs() {
      return {
        ...DefaultLinkAttrs,
        ...this.$aileLink.attrs,
        ...this.$attrs
      };
    },
    calcStyle() {
      if (this.mergeConfig.inputMaxWidth) {
        return {
          '--maxWidth': this.mergeConfig.maxWidth,
          '--inputMaxWidth': this.mergeConfig.inputMaxWidth
        };
      }
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
  text-decoration: none !important;
}

.aile-link.is-ellipsis::v-deep span.el-link--inner {
  /* max-width: var(--inputMaxWidth); */
  height: auto;
  display: inline-block;
  line-height: 1;
  padding: 3px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
