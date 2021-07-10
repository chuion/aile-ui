<template>
  <el-dialog
    :visible.sync="showDialog"
    v-bind="mergeAttrs"
    :custom-class="calcCustomClass"
    @closed="handleClosed"
    v-on="$listeners"
  >
    <template #title>
      <slot name="title" />
    </template>
    <slot />
    <template v-if="!mergeConfig.hideFooter" #footer>
      <div
        class="aile-dialog__footer"
        :class="[`is-align-${mergeConfig.footerAlign}`]"
      >
        <slot name="footer">
          <el-button
            v-if="mergeConfig.showConfirm"
            :type="mergeConfig.confirmType"
            size="small"
            :loading="mergeConfig.confirmLoading"
            :disabled="mergeConfig.confirmDisabled"
            @click="handleConfirm"
          >
            {{ mergeConfig.confirmText }}
          </el-button>
          <el-button
            v-if="mergeConfig.showCancel"
            :type="mergeConfig.cancelType"
            size="small"
            @click="handleCancel"
          >
            {{ mergeConfig.cancelText }}
          </el-button>
        </slot>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mergeClass } from '../../../utils';
import { DefaultConfig, DefaultDialogAttrs } from './config';

export default {
  name: 'AileDialog',

  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
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
        ...this.$aileDialog.config,
        ...this.config
      };
    },
    mergeAttrs() {
      return {
        ...DefaultDialogAttrs,
        ...this.$aileDialog.attrs,
        ...this.$attrs
      };
    },
    calcCustomClass() {
      return mergeClass(
        ['aile-dialog', this.mergeConfig.hideFooter && 'is-hide-footer'],
        this.$attrs.class
      );
    },
    showDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },
  methods: {
    async handleCancel() {
      if (this.$listeners && this.$listeners.cancel) {
        await this.$emit('cancel', this.done);
      } else if (this.mergeAttrs['before-close']) {
        this.mergeAttrs['before-close'](this.done);
      } else {
        this.done();
      }
    },
    handleClosed() {
      this.$emit('update:visible', false);
      if (this.$listeners && this.$listeners.closed) {
        this.$emit('closed');
      }
    },
    handleConfirm() {
      this.$emit('confirm', this.done);
    },
    done() {
      this.$emit('update:visible', false);
    }
  }
};
</script>

<style scoped>
.aile-dialog::v-deep .el-dialog__body {
  padding: 20px 20px 0;
}

.aile-dialog::v-deep.is-hide-footer .el-dialog__body {
  padding: 20px;
}

.aile-dialog__footer {
  width: 100%;
  display: flex;
}

.aile-dialog__footer.is-align-right {
  justify-content: flex-end;
}

.aile-dialog__footer.is-align-center {
  justify-content: center;
}

.aile-dialog__footer.is-align-left {
  justify-content: flex-start;
}
</style>
