<template>
  <el-form-item
    v-bind="mergeAttrs"
    :prop="propPath"
    :required="isRequired"
    :class="[
      'aile-form-item',
      formClass && formClass + '-item',
      calcLabelPosition && `is-label-${calcLabelPosition}`,
      column.class,
      (column.renderLabel || showCustomLabel) && 'is-hide-hex',
    ]"
    v-on="$listeners"
  >
    <!-- Label -->
    <template v-if="column.renderLabel || showCustomLabel" #label>
      <span
        v-if="column.renderLabel"
        :class="['aile-form-item__label-wrap', isRequired && 'is-required']"
        :style="labelStyle"
      >
        <render
          :form="form"
          :root="root"
          :render="column.renderLabel"
          :scope="{ itemIndex }"
          :merge-config="mergeConfig"
        />
      </span>
      <span
        v-if="!column.renderLabel && showCustomLabel"
        :class="['aile-form-item__label-wrap', isRequired && 'is-required']"
        :style="labelStyle"
      >
        {{ column.label }}
      </span>
    </template>

    <!-- render children -->
    <section
      v-if="column.children"
      :class="[
        'aile-form-item__object',
        formClass && formClass + '-item__object',
        column.children && !column.children.length && 'is-empty',
      ]"
    >
      <template v-if="column.layout">
        <el-row v-bind="column.layout">
          <el-col
            v-for="(col, index) in objectColumns"
            :span="getColSpan(col)"
            v-bind="col.layout"
            :key="index"
          >
            <aile-form-item
              :column="col"
              :form="form[column.prop]"
              :root="root"
              :parent-prop-path="propPath"
              :item-index="itemIndex"
              :merge-config="mergeConfig"
              :merge-form-attrs="mergeFormAttrs"
              :merge-form-item-attrs="mergeFormItemAttrs"
            />
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <aile-form-item
          v-for="(col, index) in objectColumns"
          :key="index"
          :column="col"
          :form="form[column.prop]"
          :root="root"
          :parent-prop-path="propPath"
          :item-index="itemIndex"
          :merge-config="mergeConfig"
          :merge-form-attrs="mergeFormAttrs"
          :merge-form-item-attrs="mergeFormItemAttrs"
        />
      </template>
    </section>

    <!-- render array items -->
    <section
      v-else-if="column.items"
      :class="[
        'aile-form-item__array',
        formClass && formClass + '-item__array',
      ]"
    >
      <div
        v-for="(value, index) in form[column.prop]"
        :key="index"
        class="array-item"
      >
        <div class="array-item__content">
          <template v-if="column.layout">
            <el-row v-bind="column.layout">
              <el-col
                v-for="(col, idx) in column.items(value, root)"
                :key="idx"
                v-bind="col.layout"
                :span="getColSpan(col)"
              >
                <aile-form-item
                  v-if="!col.show || col.show(form[column.prop], root, index)"
                  :key="index + '-' + idx"
                  :column="col"
                  :form="value"
                  :root="root"
                  :parent-prop-path="getParentPropForArray(index)"
                  :item-index="index"
                  :merge-config="mergeConfig"
                  :merge-form-attrs="mergeFormAttrs"
                  :merge-form-item-attrs="mergeFormItemAttrs"
                />
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <template v-for="(col, idx) in column.items(value, root)">
              <aile-form-item
                v-if="!col.show || col.show(form[column.prop], root, index)"
                :key="index + '-' + idx"
                :column="col"
                :form="value"
                :root="root"
                :parent-prop-path="getParentPropForArray(index)"
                :item-index="index"
                :merge-config="mergeConfig"
                :merge-form-attrs="mergeFormAttrs"
                :merge-form-item-attrs="mergeFormItemAttrs"
              />
            </template>
          </template>
          <i class="array-item__index">{{ index + 1 }}</i>
        </div>
        <el-tooltip content="删除" :open-delay="1000">
          <i
            class="array-item__delete el-icon-close"
            :class="[disabled && 'is-disabled']"
            @click="handleDeleteItem(index)"
          />
        </el-tooltip>
      </div>
      <div class="array-add" :class="[disabled && 'is-disabled']">
        <el-button
          :icon="
            {}.hasOwnProperty.call(column, 'buttonClass')
              ? column.buttonClass
              : 'el-icon-plus'
          "
          :disabled="disabled"
          size="mini"
          type="primary"
          plain
          @click="handleAddItem"
        >
          {{ column.buttonText || "新增" }}
        </el-button>
      </div>
    </section>

    <!-- render components -->
    <template v-else>
      <div class="aile-form-item__render">
        <render
          :form="form"
          :root="root"
          :render="column.render"
          :scope="{ itemIndex }"
          :merge-config="mergeConfig"
        />
      </div>
    </template>

    <!-- render error -->
    <template v-if="column.renderError" v-slot:error="error">
      <render
        :form="form"
        :root="root"
        :render="column.renderError"
        :scope="{ ...error, itemIndex }"
        :merge-config="mergeConfig"
      />
    </template>
  </el-form-item>
</template>

<script>
import { mergeAttrs } from '../../../utils';
/* eslint-disable vue/no-mutating-props */
import Render from './Render';
import { getPropByPath } from './utils';

export default {
  name: 'AileFormItem',
  components: { Render },

  inheritAttrs: false,
  props: {
    column: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      default: () => ({})
    },
    root: {
      type: Object,
      default: () => ({})
    },
    mergeConfig: {
      type: Object,
      default: () => ({})
    },
    mergeFormAttrs: {
      type: Object,
      default: () => ({})
    },
    mergeFormItemAttrs: {
      type: Object,
      default: () => ({})
    },
    parentPropPath: {
      type: String,
      default: ''
    },

    itemIndex: {
      type: Number,
      default: -1
    }
  },
  computed: {
    mergeAttrs() {
      const res = mergeAttrs(this.mergeFormItemAttrs, this.column, { prop: this.propPath });
      ['render', 'children', 'items', 'layout'].forEach(key => {
        delete res[key];
      });
      return res;
    },
    propPath() {
      if (!this.parentPropPath) {
        return this.column.prop;
      }
      return this.parentPropPath + '.' + this.column.prop;
    },

    objectColumns() {
      if (!this.column.children || !Array.isArray(this.column.children)) {
        return [];
      }
      return this.column.children.filter(
        item => !item.show ||
          item.show(this.form[this.column.prop], this.root, this.itemIndex)
      );
    },

    disabled() {
      return this.mergeAttrs.disabled || this.mergeFormAttrs.disabled;
    },

    formClass() {
      return this.$aileForm ? this.$aileForm.formClass : '';
    },
    calcLabelWidth() {
      return this.column.labelWidth || this.mergeFormAttrs.labelWidth;
    },
    calcLabelPosition() {
      return this.column.labelPosition || this.mergeFormAttrs.labelPosition;
    },
    labelStyle() {
      if (['left', 'right', 'center'].includes(this.calcLabelPosition)) {
        return {
          display: 'inline-block',
          width: this.calcLabelWidth,
          textAlign: this.calcLabelPosition
        };
      }
      return {};
    },
    isRequired() {
      if (this.column.required) return true;
      const rules = this.getRules();
      let res = false;

      if (rules && rules.length) {
        rules.every(rule => {
          if (rule.required) {
            res = true;
            return false;
          }
          return true;
        });
      }
      return res;
    },
    showCustomLabel() {
      return (
        this.calcLabelWidth && {}.hasOwnProperty.call(this.column, 'label')
      );
    }
  },
  watch: {
    column: {
      handler() {
        this.generateRender();
      },
      immediate: true
    }
  },
  methods: {
    getRules() {
      let formRules = this.mergeFormAttrs.rules;
      const selfRules = this.column.rules;
      const requiredRule = this.column.required
        ? [{ required: !!this.column.required }]
        : [];

      const prop = getPropByPath(formRules, this.column.prop || '');
      formRules = formRules ? prop.o[this.column.prop || ''] || prop.v : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },

    /**
     * 设置fomatter和默认渲染样式
     */
    generateRender() {
      // 存在render函数，直接使用
      if (this.column.render) return;

      // 不存在render函数，但是存在formatter函数，则构造相应render函数
      if (this.column.formatter) {
        this.column.render = (h, form, root) => {
          let value = this.column.formatter(form, root);
          if (!value && value !== 0) {
            value = this.mergeConfig.emptyText;
          }
          return <span class={[this.column.class]}>{value}</span>;
        };
        return;
      }

      // 不存在render函数和formatter函数，则构造默认render函数
      this.column.render = (h, form) => {
        if (this.column.prop) {
          let value = (this.$attrs.value && this.$attrs.value[this.column.prop]) || (form && form[this.column.prop]);
          if (!value && value !== 0) {
            value = this.mergeConfig.emptyText;
          }
          return <span class={[this.column.class]}>{value}</span>;
        }
        return <span>{this.mergeConfig.emptyText}</span>;
      };
    },

    /**
     * 获取上一级的完整prop路径
     */
    getParentPropForArray(idx) {
      return `${this.propPath}.${idx}`;
    },

    /**
     * 生成新的数组项
     */
    _getNewArrayItem(obj, column) {
      column.forEach(it => {
        if (Object.prototype.hasOwnProperty.call(it, 'children')) {
          obj[it.prop] = {};
          this._getNewArrayItem(obj[it.prop], it.children);
        } else if (Object.prototype.hasOwnProperty.call(it, 'item')) {
          obj[it.prop] = [];
        } else {
          obj[it.prop] = {}.hasOwnProperty.call(it, 'defaultValue')
            ? it.defaultValue
            : undefined;
        }
      });
      return obj;
    },

    /**
     * 数组新增元素
     */
    handleAddItem() {
      let item = {};
      const column = this.column.items(this.form, this.root);
      item = this._getNewArrayItem(item, column);
      this.form[this.column.prop].push(item);
    },

    /**
     * 数组删除元素
     */
    handleDeleteItem(idx) {
      this.form[this.column.prop].splice(idx, 1);
    },

    getColSpan(col) {
      const defaultSpan = Math.floor(
        24 /
          (
            this.column.children ||
            this.column.items(this.form[this.column.prop], this.root)
          ).length
      );
      if (col.layout && col.layout.span) {
        return col.layout.span;
      }
      return defaultSpan;
    }
  }
};
</script>

<style scoped>
.aile-form-item__object {
  border: 1px solid #eee;
  /* background-color: #f4f4f5; */
  border-radius: 4px;
  padding: 24px 20px;
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.aile-form-item__object > .el-form-item:not(:last-of-type) {
  margin-bottom: 22px;
}

.aile-form-item__object.is-empty {
  padding: 0;
}

.aile-form-item__array .array-item {
  display: flex;
  border: 1px solid #efefef;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 24px 20px;
  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
}

.aile-form-item__array .array-item__content {
  flex: 1;
}

.aile-form-item__array .array-item__content > .el-form-item:not(:last-of-type) {
  margin-bottom: 22px;
}

.aile-form-item__array .array-item__content > .el-form-item:last-of-type {
  margin-bottom: 0;
}

.aile-form-item__array .array-item__index {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  background: #eee;
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
}

.aile-form-item__array .array-item__delete {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #f0595a;
  right: 20px;
  cursor: pointer;
}

.aile-form-item__array .array-item__delete.is-disabled {
  display: none;
  pointer-events: none;
}

.aile-form-item__array .array-add {
  width: 100%;
  display: flex;
}

.aile-form-item__array .array-add.is-disabled {
  display: none;
}

.aile-form-item ::v-deep .el-form-item__label {
  display: flex;
}

.aile-form-item__label-wrap {
  box-sizing: border-box;
  padding: 0 5px;
}

.aile-form-item.is-label-right,
.aile-form-item.is-label-left {
  display: flex;
  flex-direction: row;
}

/* .aile-form-item.is-label-right ::v-deep .el-form-item__label,
.aile-form-item.is-label-left ::v-deep .el-form-item__label {
  max-height: 40px;
} */

.aile-form-item.is-label-right
  ::v-deep
  .el-form-item__label
  .aile-form-item__label-wrap.is-required::before,
.aile-form-item.is-label-left
  ::v-deep
  .el-form-item__label
  .aile-form-item__label-wrap.is-required::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}

.aile-form-item.is-label-right ::v-deep .el-form-item__label::before,
.aile-form-item.is-label-left ::v-deep .el-form-item__label::before {
  display: none;
}

.aile-form-item.is-label-right ::v-deep .el-form-item__content,
.aile-form-item.is-label-left ::v-deep .el-form-item__content {
  margin-left: 0 !important;
  flex: 1;
}

.aile-form-item.is-label-top {
  display: flex;
  flex-direction: column;
}

.aile-form-item.is-label-top ::v-deep .el-form-item__content {
  margin-left: 0 !important;
}

.aile-form-item.is-label-top ::v-deep > .el-form-item__label {
  width: auto;
  align-self: baseline;
}

.aile-form-item.is-label-right ::v-deep > .el-form-item__label {
  text-align: right !important;
}

.aile-form-item.is-label-left ::v-deep > .el-form-item__label {
  text-align: left !important;
}

.aile-form-item__render {
  width: 100%;
}
</style>
