import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './demo-styles/index.scss'

export default ({ Vue, isSever }) => {
  Vue.use(Element);
  Vue.mixin({
    mounted() {
      import('aile-ui').then(function(module) {
        Vue.use(module.default,{
          tooltip: {
            attrs: {
              placement: 'top', 
              openDelay: 200
            },
            themes: [
              {
                name: 'kitty',
                bodyStyle: {
                  padding: '10px',
                  background: '#DF0E60',
                  border: '1px solid #000',
                  color: '#FFF',
                  fontSize: '14px',
                  fontWeight: 'bolder'
                },
                arrowStyle: {
                  backgroundColor: '#DF0E60',
                  borderColor: '#000'
                }
              }
            ]
          }
        })
      })
    }
  })
};