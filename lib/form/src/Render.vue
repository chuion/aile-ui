<script>
export default {
  name: "AileRender",
  functional: true,
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    rootForm: {
      type: Object,
      default: () => {},
    },
    render: {
      type: Function,
      default: function () {},
    },
    scope: {
      type: Object,
      default: () => ({}),
    },
    mergeConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  render: (h, ctx) =>
    ctx.props.render(
      h,
      ctx.props.form,
      ctx.props.rootForm,
      ctx.props.scope
    ) || <span>{ctx.props.mergeConfig.emptyText}</span>,
};
</script>
