<template>
  <div class="select">
    <div>
      <span class="title-index">{{fatherIndex}}:单选题</span>
      <el-input
        v-model="insideValue.name"
        placeholder="请输入题目名称"
      ></el-input>
    </div>
    <div>
      <div class="title">答案</div>
      <div class="items">
        <div class="item">
          <template v-for="(item,index) in value.options">
            <el-input
              :key="index"
              v-model="item.name"
              placeholder="请输入答案"
            ></el-input>
          </template>
        </div>
      </div>
      <el-button @click="appendNewOption" plain>增加</el-button>
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
    appendNewOption() {
      this.insideValue.options.push({
        name: '',
        sort: this.getNextSort(),
      });
    },
    getNextSort() {
      return this.insideValue.options.length;
    },
    validate() {
      if (!this.insideValue.name) {
        this.$message('未填写名称');
        // 在这里设置输入框变红的样式

        return false;
      }

      const { options } = this.insideValue;
      if (options.length === 0) {
        this.$message('必须增加一个多选答案');
        // 在这里设置输入框变红的样式

        return false;
      }

      for (let i = 0; i < options.length; i += 1) {
        if (!options[i].name) {
          this.$message('多选答案不能为空');
          // 在这里设置输入框变红的样式

          return false;
        }
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

<style lang="scss">
  .select {
    .el-input {
      display: block;
      margin-bottom: 20px;
    }
  }
</style>
<style lang="scss" scoped>
  .select {
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
    .delete {
      position: absolute;
      width: 30px;
      height: 100%;
      right: 0;
      top: 0;
      display: none;
    }
    &:hover {
      border-color: $--color-primary;
    }
    &:hover .delete {
      display: block;
    }
    .title {
      font-size: $--size-base-small;
      color: $--color-text-regular;
      margin: 5px 0;
    }
  }
</style>
