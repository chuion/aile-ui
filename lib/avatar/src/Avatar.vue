<template>
  <el-avatar
    class="aile-avatar"
    v-bind="mergeAttrs"
    :src="avatarSrc"
    :style="avatarStyle"
    v-on="$listeners"
  >
    <slot>
      <span
        class="aile-avatar__label"
        :style="mergeConfig.labelStyle"
      >
        {{ mergeConfig.labelFormatter(label || mergeConfig.labelPlaceholder) }}
      </span>
    </slot>
  </el-avatar>
</template>

<script>
import { DefaultConfig, DefaultAvatarAttrs } from './config'

export default {
  name: 'AileAvatar',

  inheritAttrs: false,
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    src: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    mergeConfig () {
      return {
        ...DefaultConfig,
        ...this.$aileAvatar.config,
        ...this.config
      }
    },
    mergeAttrs () {
      return {
        ...DefaultAvatarAttrs,
        ...this.$aileAvatar.attrs,
        ...this.$attrs
      }
    },
    avatarSrc () {
      return this.mergeConfig.srcFormatter(this.src)
    },

    avatarStyle () {
      if (!this.mergeConfig.size) {
        return this.$attrs.style || {}
      }

      return {
        width: this.mergeConfig.size,
        height: this.mergeConfig.size,
        ...(this.$attrs.style || {})
      }
    }
  }
}
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
