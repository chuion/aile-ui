import AileTooltip from './src/Tooltip';
import { registerTheme } from './src/theme';

AileTooltip.install = function(Vue, option = {}) {
  const defaultOption = { placement: 'bottom', openDelay: 0, config: {} };
  if ({}.toString.call(option.config) !== '[object Object]') {
    option.config = {};
  }
  Vue.prototype.$aileTooltip = { ...defaultOption, ...option };
  Vue.component(AileTooltip.name, AileTooltip);

  if ({}.hasOwnProperty.call(option, 'themes')) {
    const themeList = JSON.parse(JSON.stringify(option.theme || []));
    registerTheme(themeList || []);
    delete option.themes;
  }
};

export default AileTooltip;
