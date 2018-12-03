<template>
  <div class="answer">
    <span class="title-index">{{fatherIndex}}:主观题</span>
    <div>
      <el-input
        v-model="insideValue.name"
        placeholder="请输入题目名称"
      ></el-input>
    </div>
    <div class="delete">
      <i class="el-icon-close" @click="clickedRemoveButtonHandler"></i>
    </div>
  </div>
</template>

<script>
import EventsMixin from './events_mixin';

export default {
  props: {
    value: {
      type: Object,
    },
    fatherIndex: Number,
  },
  data() {
    return {
      insideValue: null,
    };
  },
  watch: {
    value(value) {
      this.initialInsideValue(value);
    },
    insideValue(value) {
      this.$emit('input', value);
    },
  },
  methods: {
    initialInsideValue(value = this.value) {
      this.insideValue = value;
    },
    validate() {
      if (!this.insideValue.name) {
        this.$message('未填写名称');
        // 在这里设置输入框变红的样式
        return false;
      }
      return true;
    },
  },
  created() {
    this.initialInsideValue();
  },
  mixins: [EventsMixin],
};
</script>

<style lang="scss" scoped>
  .answer {
    padding: 10px;
    border: $--border-base;
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;
    .title-index {
      display: block;
      font-size: $--size-base-small;
      color: $--color-text-regular;
      margin: 5px 0;
    }
    &:hover {
      border-color: $--color-primary;
    }
    .delete {
      position: absolute;
      width: 30px;
      height: 100%;
      right: 0;
      top: 0;
      display: none;
    }
    &:hover .delete {
      display: block;
    }
  }
</style>
