import AileInput from './src/Input.vue';

AileInput.install = function(Vue, option = {}) {
  const defaultOption = { clearable: false };
  if ({}.toString.call(option.config) !== '[object Object]') {
    option.config = {
      trim: false,
      width: undefined
    };
  }
  Vue.prototype.$aileInput = { ...defaultOption, ...option };
  Vue.component(AileInput.name, AileInput);
};

export default AileInput;
