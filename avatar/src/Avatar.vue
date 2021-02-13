<template>
  <el-avatar
    class="aile-avatar"
    :fit="calcFit"
    :shape="calcShape"
    :src="mergeConfig.srcFormatter(src)"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot>
      <span class="aile-avatar__label" :style="mergeConfig.labelStyle">
        {{ mergeConfig.labelFormatter(label || mergeConfig.defaultLabel) }}
      </span>
    </slot>
  </el-avatar>
</template>

<script>
const DefaultConfig = {
  labelStyle: {
    fontSize: '16px',
    backgroundColor: '#3381D0'
  },
  defaultLabel: 'Unknown',
  labelFormatter: name => name.slice(0, 2).toUpperCase(),
  srcFormatter: src => {
    if (!src) {
      return '';
    }
    if (src.startsWith('http')) {
      return src;
    }
    return 'data:image/jpeg;base64,' + src;
  }
};

export default {
  name: 'AileAvatar',

  props: {
    fit: {
      type: String,
      default: undefined
    },
    shape: {
      type: String,
      default: undefined
    },
    src: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
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
        ...this.$aileAvatar.config,
        ...this.config
      };
    },
    calcFit() {
      if (this.fit === undefined) {
        return this.$aileAvatar.fit;
      }
      return this.fit;
    },
    calcShape() {
      if (this.shape === undefined) {
        return this.$aileAvatar.shape;
      }
      return this.shape;
    }
  }
};
</script>

<style scoped>
.aile-avatar .aile-avatar__label {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bolder;
}
</style>
