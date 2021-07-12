<template>
  <el-form
    ref="elForm"
    v-bind="mergeFormAttrs"
    :model="model"
    :class="['aile-form', formClass]"
    v-on="$listeners"
  >
    <template v-if="mergeConfig.layout">
      <el-row v-bind="mergeConfig.layout">
        <el-col
          v-for="(item, idx) in filteredColumns"
          :key="idx"
          v-bind="item.layout || {}"
          :span="getColSpan(item)"
        >
          <aile-form-item
            :column="item"
            :form="model"
            :root="model"
            :merge-config="mergeConfig"
            :merge-form-attrs="mergeFormAttrs"
            :merge-form-item-attrs="mergeFormItemAttrs"
          />
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <aile-form-item
        v-for="(item, idx) in filteredColumns"
        :key="idx"
        :column="item"
        :form="model"
        :root="model"
        :merge-config="mergeConfig"
        :merge-form-attrs="mergeFormAttrs"
        :merge-form-item-attrs="mergeFormItemAttrs"
      />
    </template>
  </el-form>
</template>

<script>
import AileFormItem from './FormItem.vue';
import {
  DefaultConfig,
  DefaultFormAttrs,
  DefaultFormItemAttrs
} from './config';
import { mergeAttrs } from '../../../utils';

export default {
  name: 'AileForm',
  components: { AileFormItem },

  inheritAttrs: false,
  props: {
    // 绑定表单值
    model: {
      type: Object,
      required: true,
      default: () => ({})
    },

    // 列参数
    columns: {
      type: Array,
      required: true,
      default: () => []
    },

    // 配置项
    config: {
      type: Object,
      default: () => ({})
    },

    // el-form 属性
    form: {
      type: Object,
      default: () => ({})
    },

    // el-form-item 属性
    formItem: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    mergeConfig() {
      return {
        ...DefaultConfig,
        ...this.$aileForm.config,
        ...this.config
      };
    },
    mergeFormAttrs() {
      return mergeAttrs(DefaultFormAttrs, this.$aileForm.form, this.$attrs, this.form);
    },
    mergeFormItemAttrs() {
      return mergeAttrs(DefaultFormItemAttrs, this.$aileForm.formItem, this.formItem);
    },
    filteredColumns() {
      return this.columns.filter(
        item => !item.show || item.show(this.model, this.model)
      );
    },
    formClass() {
      return this.$aileForm ? this.$aileForm.formClass : '';
    }
  },
  methods: {
    validate(cb) {
      return this.$refs.elForm.validate(cb);
    },
    validateField(props, cb) {
      return this.$refs.elForm.validateField(props, cb);
    },
    resetFields() {
      return this.$refs.elForm.resetFields();
    },
    clearValidate(props) {
      return this.$refs.elForm.clearValidate(props);
    },
    getColSpan(col) {
      if (col.layout && col.layout.span) {
        return col.layout.span;
      }
      if (!this.columns.length) {
        return 24;
      }
      return Math.floor(24 / this.columns.length);
    }
  }
};
</script>

<style scoped>
.aile-form.el-form--inline {
  display: flex;
}
.aile-form.el-form--inline ::v-deep .aile-form-item__object {
  display: flex;
  padding: 0;
  background: transparent;
  border: none;
}
</style>
