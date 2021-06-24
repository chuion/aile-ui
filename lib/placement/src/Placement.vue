<template>
  <div
    v-if="state !== 'hide'"
    class="aile-placement"
    :class="`aile-placement--${state}`"
    :style="calcStyle"
  >
    <template v-if="state === 'init'">
      <slot name="init">
        <div class="aile-placement__img">
          <template v-if="mergeConfig.initImageSrc">
            <img
              :src="mergeConfig.initImageSrc"
              class="img"
              :style="imageStyle"
            >
          </template>
        </div>
        <div class="aile-placement__desc">
          {{ mergeConfig.initText }}
        </div>
      </slot>
    </template>
    <template v-if="state === 'empty'">
      <slot name="empty">
        <div class="aile-placement__img">
          <template v-if="mergeConfig.emptyImageSrc">
            <img
              :src="mergeConfig.emptyImageSrc"
              class="img"
              :style="imageStyle"
            >
          </template>
        </div>
        <div class="aile-placement__desc">
          {{ mergeConfig.emptyText }}
        </div>
      </slot>
    </template>
  </div>
</template>

<script>
import { DefaultConfig } from './config'

export default {
  name: 'AilePlacement',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    empty: {
      required: true,
      type: Boolean,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: undefined
    },
    width: {
      type: String,
      default: undefined
    },
    height: {
      type: String,
      default: undefined
    }
  },
  data () {
    return { state: undefined }
  },
  computed: {
    mergeConfig () {
      return {
        ...DefaultConfig,
        ...this.$ailePlacement.config,
        ...this.config
      }
    },
    calcStyle () {
      return {
        width: this.width || this.mergeConfig.width,
        height: this.height || this.mergeConfig.height
      }
    },
    imageStyle () {
      return {
        width: this.mergeConfig.imageWidth,
        height: this.mergeConfig.imageHeight
      }
    }
  },
  watch: {
    loading (newVal, oldVal) {
      if (newVal === true) {
        this.state = 'loading'
      }
      if (newVal === false && oldVal === true) {
        this.changeState()
      }
    },
    empty: {
      handler () {
        this.changeState()
      },
      immediate: true
    }
  },
  mounted () {
    if (this.loading !== undefined) {
      this.state = 'init'
    } else {
      this.changeState()
    }
  },
  methods: {
    changeState () {
      if (this.empty) {
        this.state = 'empty'
      } else {
        this.state = 'hide'
      }
    }
  }
}
</script>

<style scoped>
.aile-placement {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
}
.aile-placement__img {
  margin-bottom: 10px;
}
.aile-placement__img .img{
  font-size: 76px;
  width: 100%;
  height: 100%;
}
</style>
