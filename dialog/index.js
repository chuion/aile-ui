import AileDialog from './src/Dialog';

AileDialog.install = function(Vue, option = {}) {
  const defaultOption = {
    width: '50%',
    appendToBody: false,
    modalAppendToBody: true,
    closeOnClickModal: true,
    closeOnPressEscape: true
  };

  if ({}.toString.call(option.config) !== '[object Object]') {
    option.config = {};
  }

  Vue.prototype.$aileDialog = {
    ...defaultOption,
    ...option
  };
  Vue.component(AileDialog.name, AileDialog);
};

export default AileDialog;
