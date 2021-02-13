import AileAutoComplete from './src/AutoComplete.vue';

AileAutoComplete.install = function(Vue, option = {}) {
  const defaultOption = { clearable: false };
  if ({}.toString.call(option.config) !== '[object Object]') {
    option.config = { trim: false, width: undefined };
  }
  Vue.prototype.$AileAutoComplete = { ...defaultOption, ...option };
  Vue.component(AileAutoComplete.name, AileAutoComplete);
};

export default AileAutoComplete;
