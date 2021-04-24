<template>
  <div
    v-if="state !== 'hide'"
    class="aile-placement"
    :class="`aile-placement--${state}`"
    :style="style"
  >
    <template v-if="state === 'init'">
      <slot name="init">
        <div class="aile-placement__img">
          <template v-if="calcInitSrc">
            <img
              :src="calcInitSrc"
              class="img"
              :style="imgStyle"
            >
          </template>
        </div>
        <div class="aile-placement__desc">
          {{ calcInitText }}
        </div>
      </slot>
    </template>
    <template v-if="state === 'empty'">
      <slot name="empty">
        <div class="aile-placement__img">
          <template v-if="calcEmptySrc">
            <img
              :src="calcEmptySrc"
              class="img"
              :style="imgStyle"
            >
          </template>
        </div>
        <div class="aile-placement__desc">
          {{ calcEmptyText }}
        </div>
      </slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AilePlacement',
  props: {
    loading: {
      type: Boolean,
      default: undefined
    },
    empty: {
      required: true,
      type: Boolean,
      default: undefined
    },
    emptySrc: {
      type: String,
      default: undefined
    },
    emptyText: {
      type: String,
      default: undefined
    },
    initSrc: {
      type: String,
      default: undefined
    },
    initText: {
      type: String,
      default: undefined
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    imgWidth: {
      type: String,
      default: undefined
    },
    imgHeight: {
      type: String,
      default: undefined
    }
  },
  data() {
    return { state: undefined };
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height
      };
    },
    imgStyle() {
      return {
        width: this.imgWidth || this.mergeConfig.imgWidth || '76px',
        height: this.imgHeight || this.mergeConfig.imgHeight || '76px'
      };
    },
    mergeConfig() {
      return {
        ...this.$ailePlacement,
        ...this.config
      };
    },
    calcInitText() {
      return this.initText || this.mergeConfig.initText;
    },
    calcEmptyText() {
      return this.emptyText || this.mergeConfig.emptyText;
    },
    calcInitSrc() {
      return this.initSrc || this.mergeConfig.initSrc;
    },
    calcEmptySrc() {
      return this.emptySrc || this.mergeConfig.emptySrc;
    }
  },
  watch: {
    loading(newVal, oldVal) {
      if (newVal === true) {
        this.state = 'loading';
      }
      if (newVal === false && oldVal === true) {
        this.changeState();
      }
    },
    empty: {
      handler() {
        this.changeState();
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loading !== undefined) {
      this.state = 'init';
    } else {
      this.changeState();
    }
  },
  methods: {
    changeState() {
      if (this.empty) {
        this.state = 'empty';
      } else {
        this.state = 'hide';
      }
    }
  }
};
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
