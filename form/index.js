import AileForm from './src/Form';

AileForm.install = function(Vue, option = {}) {
  const defaultOption = {
    emptyText: '',
    formClass: ''
  };
  Vue.prototype.$aileForm = {
    ...defaultOption,
    ...option
  };
  Vue.component(AileForm.name, AileForm);
};

export default AileForm;
