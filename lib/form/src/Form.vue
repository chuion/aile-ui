<template>
  <el-form
    ref="elForm"
    v-bind="$attrs"
    :model="model"
    :class="['aile-form', formClass]"
    :rules="rules"
    :disabled="disabled"
    v-on="$listeners"
  >
    <template v-if="layout">
      <el-row v-bind="layout">
        <el-col v-for="(item, idx) in column" :key="idx" :span="getColSpan(item)">
          <aile-form-item
            v-if="!item.show || item.show(model, model)"
            v-bind="$attrs"
            :column="item"
            :empty-words="emptyWords"
            :form="model"
            :root-form="model"
            :label-position="labelPosition"
            :label-width="labelWidth"
            :form-rules="rules"
            :disabled="disabled"
          />
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <template v-for="(item, idx) in column">
        <aile-form-item
          v-if="!item.show || item.show(model, model)"
          :key="idx"
          v-bind="$attrs"
          :column="item"
          :empty-words="emptyWords"
          :form="model"
          :root-form="model"
          :label-position="labelPosition"
          :label-width="labelWidth"
          :form-rules="rules"
          :disabled="disabled"
        />
      </template>
    </template>
  </el-form>
</template>

<script>
import AileFormItem from './FormItem';

export default {
  name: 'AileForm',
  components: { AileFormItem },
  props: {
    column: {
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String,
      default: ''
    },
    model: {
      type: Object,
      default: () => ({})
    },
    labelPosition: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    layout: {
      type: Object,
      default: null
    }
  },
  computed: {
    emptyWords() {
      return (
        this.emptyText || (this.$aileForm && this.$aileForm.emptyText) || ''
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
      const defaultSpan = Math.floor(24 / Object.keys(this.column.length));
      if (col.layout && col.layout.span) {
        return col.layout.span;
      }
      return defaultSpan;
    }
  }
};
</script>

<style scoped>
.aile-form.el-form--inline {
  display: flex;
}
</style>
