<template>
  <el-tooltip
    ref="aileTooltip"
    v-bind="mergeAttrs"
    class="aile-tooltip"
    :popper-class="calcPopperClass"
    v-on="$listeners"
  >
    <template #content>
      <slot name="content" />
    </template>
    <slot />
  </el-tooltip>
</template>

<script>
import { mergeClass } from '../../../utils/index.js';

const DefaultProps = {
  placement: 'bottom',
  showAfter: 0
};

export default {
  name: 'AileTooltip',

  inheritAttrs: false,
  props: {
    popperClass: {
      type: [String, Array, Object],
      default: ''
    }
  },
  computed: {
    mergeAttrs() {
      return {
        ...DefaultProps, // 默认属性
        ...this.$aileTooltip.attrs, // 全局属性
        ...this.$attrs // 组件属性
      };
    },
    calcPopperClass() {
      return mergeClass(['aile-tooltip__popper', this.popperClass]);
    }
  }
};
</script>
