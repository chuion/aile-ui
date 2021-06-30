import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AileUI from 'aile-ui'
import './demo-styles/index.scss'

export default ({ Vue, options, router }) => {
  Vue.use(Element);
  // console.log(AileUI)
  Vue.use(AileUI)
};