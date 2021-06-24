<script>
export default {
  name: 'AileRender',
  functional: true,
  props: {
    scope: {
      type: Object,
      default: () => ({})
    },
    render: {
      type: Function,
      default: function() {}
    },
    cellEmptyText: {
      type: Object,
      default: () => ({})
    }
  },
  render: (h, ctx) => ctx.props.render(h, ctx.props.scope) || (<span className="aile-table-item__placeholder">{ctx.props.cellEmptyText}</span>)
};
</script>
