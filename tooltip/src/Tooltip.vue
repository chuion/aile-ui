<template>
  <el-tooltip
    ref="aileTooltip"
    v-model="showPopper"
    v-bind="$attrs"
    class="aile-tooltip"
    :placement="calcPlacement"
    :open-delay="calcOpenDelay"
    :popper-class="'aile-tooltip__popper' + ' ' + popperClass"
    v-on="$listeners"
  >
    <template #content>
      <slot name="content" />
    </template>
    <slot />
  </el-tooltip>
</template>

<script>

export default {
  name: 'AileTooltip',
  props: {
    config: {
      // maxWidth 最大宽度
      type: Object,
      default: () => ({})
    },
    placement: {
      type: String,
      default: undefined
    },
    openDelay: {
      type: Number,
      default: 0
    },
    popperClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showPopper: false,
      defaultConfig: { maxWidth: undefined }
    };
  },
  computed: {
    mergeConfig() {
      return {
        ...this.defaultConfig,
        ...this.$aileTooltip.config,
        ...this.config
      };
    },
    calcPlacement() {
      if (this.placement === undefined) {
        return this.$aileTooltip.placement;
      }
      return this.placement;
    },
    calcOpenDelay() {
      return this.openDelay || this.$aileTooltip.openDelay;
    },
    calcMaxWidth() {
      return this.mergeConfig.maxWidth;
    },
    calcStyle() {
      const maxWidth = this.calcMaxWidth ? { maxWidth: this.calcMaxWidth } : {};
      return { ...maxWidth };
    }
  },
  watch: {
    showPopper(val) {
      if (val) {
        const dom = this.$refs.aileTooltip.$refs.popper;
        for (const key in this.calcStyle) {
          if (Object.prototype.hasOwnProperty.call(this.calcStyle, key)) {
            dom.style[key] = this.calcStyle[key];
          }
        }
      }
    }
  }
};
</script>
