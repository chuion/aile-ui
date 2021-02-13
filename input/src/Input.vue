<template>
  <el-input
    ref="input"
    v-bind="$attrs"
    :style="calcStyle"
    :clearable="shouldClearable"
    :value="value"
    v-on="$listeners"
    @keydown.native="handleKeydown"
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
export default {
  name: 'AileInput',
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
  data() {
    return {
      defaultConfig: {
        width: undefined,
        trim: undefined
      }
    };
  },
  computed: {
    shouldClearable() {
      return typeof this.clearable === 'undefined' ? this.$aileInput.clearable : this.clearable;
    },

    shouldTrim() {
      return typeof this.mergeConfig.trim === 'undefined' ? this.$aileInput.config.trim : this.mergeConfig.trim;
    },

    calcStyle() {
      const style = {};
      if (this.mergeConfig.width) style.width = this.mergeConfig.width;
      return style;
    },

    mergeConfig() {
      return { ...this.defaultConfig, ...this.$aileInput.config, ...this.config };
    }
  },
  methods: {
    handleKeydown(event) {
      if (event.keyCode === 32 && this.shouldTrim) {
        // 判断是否是在前后键入空格
        // index 键入位置
        const { input, textarea } = this.$refs.input.$refs;
        const index = input ? input.selectionStart : textarea.selectionStart;
        if (index === 0 || index === event.target.value.length) {
          event.preventDefault();
        }
      }
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
