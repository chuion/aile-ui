<template>
  <el-input
    ref="input"
    v-bind="$attrs"
    :style="calcStyle"
    :class="[$attrs['show-word-limit'] && 'show-word-limit']"
    :clearable="shouldClearable"
    :value="value"
    v-on="$listeners"
    @change="handleChange"
    @keydown.native="handleKeydown"
    @keyup.native="handleKeyup"
  >
    <template
      v-if="$slots.prepend"
      slot="prepend"
    >
      <slot name="prepend" />
    </template>
    <template
      v-if="$slots.append"
      slot="append"
    >
      <slot name="append" />
    </template>
    <template
      v-if="$slots.prefix"
      slot="prefix"
    >
      <slot name="prefix" />
    </template>
    <template
      v-if="$slots.suffix"
      slot="suffix"
    >
      <slot name="suffix" />
    </template>
  </el-input>
</template>

<script>
const DefaultConfig = {
  width: undefined,
  trim: 'none'
};

export default {
  name: 'AileInput',

  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    clearable: {
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
        ...this.$aileInput.config,
        ...this.config
      };
    },
    shouldClearable() {
      return typeof this.clearable === 'undefined'
        ? this.$aileInput.clearable
        : this.clearable;
    },
    calcStyle() {
      const style = {};
      if (this.mergeConfig.width) style.width = this.mergeConfig.width;
      return style;
    }
  },
  methods: {
    handleKeydown(event) {
      // 判断是否是在前后键入空格
      if (event.keyCode === 32 && this.mergeConfig.trim === 'strict') {
        // index 键入位置
        const { input, textarea } = this.$refs.input.$refs;
        const index = input ? input.selectionStart : textarea.selectionStart;
        if (index === 0 || index === event.target.value.length) {
          event.preventDefault();
        }
      }
    },
    handleKeyup(event) {
      this.$emit('keyup', event);
    },
    handleChange(val) {
      if (this.mergeConfig.trim === 'weak') {
        val = val.trim();
        this.$emit('input', val);
      }
      this.$emit('change', val);
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
    select() {
      this.$refs.input.select();
    }
  }
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
