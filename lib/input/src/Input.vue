<template>
  <el-input
    ref="input"
    v-bind="mergeAttrs"
    :style="calcStyle"
    :class="[$attrs['show-word-limit'] && 'show-word-limit']"
    v-on="$listeners"
    @change="handleChange"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
  </el-input>
</template>

<script>
import { DefaultConfig, DefaultInputAttrs } from "./config";

export default {
  name: "AileInput",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    mergeConfig() {
      return {
        ...DefaultConfig,
        ...this.$aileInput.config,
        ...this.config,
      };
    },
    mergeAttrs() {
      return {
        ...DefaultInputAttrs,
        ...this.$aileInput.attrs,
        ...this.$attrs,
      };
    },
    calcStyle() {
      const style = {};
      if (this.mergeConfig.width) style.width = this.mergeConfig.width;
      return style;
    },
  },
  methods: {
    handleChange(val) {
      if (this.mergeConfig.lazyTrim) {
        val = val.trim();
        this.$emit("input", val);
      }
      this.$emit("change", val);
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
    select() {
      this.$refs.input.select();
    },
  },
};
</script>

<style scoped>
.show-word-limit.el-textarea ::v-deep .el-input__count {
  line-height: 14px;
}

.show-word-limit.el-input.el-input--suffix > ::v-deep .el-input__inner {
  padding-right: 85px;
}

.show-word-limit.el-input > ::v-deep .el-input__inner {
  padding-right: 65px;
}
</style>
