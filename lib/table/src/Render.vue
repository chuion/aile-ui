<script>
export default {
  name: 'AileRender',
  functional: true,
  props: {
    scope: {
      type: Object,
      default: () => {}
    },
    render: {
      type: Function,
      default: function() {}
    }
  },
  render: (h, ctx) => (ctx.props.render
    ? ctx.props.render(h, ctx.props.scope) || (
      <span>{ctx.parent.calcEmptyTextForCols}</span>
    )
    : '')
};
</script>
