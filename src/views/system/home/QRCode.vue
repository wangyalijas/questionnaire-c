<template>
  <div class="qrcode">
    <el-dialog
      title="二维码"
      :visible.sync="visible"
      width="20%">
      <img :src="qrCode" alt="二维码">
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'QRCode',
  props: {
    isOpen: Boolean,
    qrCode: String,
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    isOpen(value) {
      this.visible = value;
    },
    visible(value) {
      if (value === false) {
        this.$emit('closeItem');
      }
    },
  },
};
</script>

<style lang="scss">
.qrcode {
  .el-dialog__body {
    text-align: center;
  }
}
</style>
