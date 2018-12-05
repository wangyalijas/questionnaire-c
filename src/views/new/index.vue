<template>
  <div class="new">
    <div class="left-side">
      <div class="title">
        题目控件
      </div>
      <ul>
        <li class="type" @click="handleSelectButton('selection')">
          <i class="icon duoxuan"></i>
          <span class="name">单选题</span>
        </li>
        <li class="type" @click="handleSelectButton('checkBox')">
          <i class="icon duoxuan"></i>
          <span class="name">多选题</span>
        </li>
        <li class="type" @click="handleSelectButton('answer')">
          <i class="icon duoxuan"></i>
          <span class="name">主观题</span>
        </li>
      </ul>
    </div>
    <div class="right-side">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="培训人">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>
          <el-form-item label="是否是兴趣">
            <el-checkbox v-model="form.isHobby"></el-checkbox>
          </el-form-item>
          <!--<el-form-item label="开始日期">-->
          <!--<el-date-picker-->
          <!--v-model="time"-->
          <!--type="datetimerange"-->
          <!--range-separator="至"-->
          <!--start-placeholder="开始日期"-->
          <!--value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--end-placeholder="结束日期">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->
        </el-form>
        <el-upload
          name="courseware"
          :action="`${baseUrl}/api/postCourseware`"
          :on-success="handleCoursewareSuccess"
          :before-upload="beforeCoursewareUpload"
          multiple>
          <el-button size="small" type="primary">上传课件</el-button>
        </el-upload>
      </div>
      <div class="type-content">
          <template v-for="(item, index) in data">
            <component
              :key="index"
              :is="getModelName(item)"
              :fatherIndex="index+1"
              v-model="data[index]"
              ref="models"
              @removeButtonClicked="removeButtonClickedHandler(data, index)"
            ></component>
          </template>
      </div>
      <el-button type="primary" class="build" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
import generate from './generate';
import serialize from './serialize';
import deserialize from './deserialize';
import Models from './models/index';

export default {
  data() {
    return {
      form: {
        name: '',
        author: '',
        describe: '',
        isHobby: false,
      },
      time: [],
      data: [],
    };
  },
  computed: {
    baseUrl() {
      return window.config.baseUrl;
    },
  },
  methods: {
    beforeCoursewareUpload() {
    },
    handleCoursewareSuccess(res) {
      console.log(res);
      this.$set(this.form, 'courseware', res);
    },
    handleSelectButton(type) {
      const item = generate(type);
      item.sort = this.getCurrentNextSort();
      this.data.push(item);
    },
    getCurrentNextSort() {
      return this.data.length;
    },
    getModelName(item) {
      return `${item.type}Model`;
    },
    serialize(data = this.data) {
      return serialize(data);
    },
    deserialize(data) {
      console.log(deserialize(data));
    },
    formatData() {
      this.$set(this.form, 'startTime', this.time[0]);
      this.$set(this.form, 'endTime', this.time[1]);
    },
    submit() {
      if (!this.$refs.models || !this.$refs.models.every(item => item.validate())) {
        return; // Cancel submit.
      }
      const serializeData = this.serialize();
      // this.formatData();
      this.$http(this.$api.buildQuestionnaireList, Object.assign(this.form, serializeData))
        .then(
          ({ data }) => {
            if (data.state) {
              this.$message.success('创建成功！');
              this.$router.push({
                name: 'home',
              });
              return true;
            }
            this.$message.error('创建失败！');
            return false;
          },
        );
    },
    removeButtonClickedHandler(data, index) {
      console.log(index, 1);
      data.splice(index, 1);
    },
  },
  components: { ...Models },
};
</script>
<style lang="scss">
  .new {
  }
</style>
<style lang="scss" scoped>
  .new {
    position: relative;
    .left-side {
      position: fixed;
      top: 50px;
      bottom: 0;
      left: 0;
      width: 306px;
      padding: 30px 20px;
      background: $--background-color-hover;
      border: $--border-base;
      box-shadow: $--box-shadow-base;
      .title {
        font-size: $--size-base-small;
        color: $--color-text-regular;
        margin-bottom: 5px;
      }
      .type {
        cursor: pointer;
        height: 38px;
        line-height: 38px;
        border: $--border-base;
        background: $--background-color-base;
        margin-bottom: 3px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .icon {
          width: 16px;
          height: 16px;
        }
        .name {
          font-size: $--size-base;
          color: $--color-text-primary;
        }
        .danxuan {
          background: url("../../assets/images/danxuan.svg") no-repeat center center;
        }
        .duoxuan {
          background: url("../../assets/images/duoxuan.svg") no-repeat center center;
        }
      }
    }
    .right-side {
      position: relative;
      margin-top: 50px;
      margin-left: 370px;
      padding: 30px 20px 70px;
      min-height: 500px;
      background: $--background-color-hover;
      border: $--border-base;
      box-shadow: $--box-shadow-base;
      .type-content {
        .type {
          border: $--border-base;
          padding: 10px 10px;
        }
        height: calc(100% - 170px);
      }
    }
    .build {
      position: absolute;
      bottom: 30px;
      right: 20px;
    }
  }
</style>
