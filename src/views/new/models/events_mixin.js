export default {
  methods: {
    clickedRemoveButtonHandler() {
      console.log(123);
      this.$emit('removeButtonClicked');
    },
  },
};
