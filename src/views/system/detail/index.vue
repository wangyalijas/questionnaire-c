<template>
  <div class="detail" v-loading="isLoading" v-if="data">
    <div class="title">
      {{data.name}}
    </div>
    <div class="author">{{data.author}}</div>
    <template v-for="(item,index) in data.selections">
      <div :key="index" class="selection">
        <div class="selection-title">{{item.sort + 1}}, {{item.name}}</div>
        <template v-for="(option,index) in item.options">
          <div :key="index" class="selection-option">
           <span>{{option.name}}</span>  <span>{{option.count}}</span>
          </div>
        </template>
      </div>
    </template>
    <template v-for="(item,index) in data.answers">
      <div :key="index" class="answer">
        <div class="answer-title">{{item.sort + 1}}, {{item.name}}</div>
        <template v-for="(answerContent,index) in item.answerContents">
          <div :key="index" class="answerContent">
            {{answerContent}}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      data: null,
    };
  },
  methods: {
    fetchQuestionnaireStatic(payload) {
      this.isLoading = true;
      this.$http(this.$api.getQuestionnaireStatic, {
        questionnaireId: payload,
      })
        .then(
          ({ data }) => {
            this.isLoading = false;
            this.data = data;
          },
          (error) => {
            console.error(error);
          },
        );
    },
  },
  created() {
    this.fetchQuestionnaireStatic(this.$route.query.GUID);
  },
};
</script>

<style scoped lang="scss">
  .detail {
    width: 1024px;
    min-height: 900px;
    margin: 50px auto 0;
    background: $--background-color-base;
    padding: 20px 20px;
    font-size: $--size-base;
    color: $--color-text-primary;
    .title {
      text-align: center;
      font-size: $--size-base;
      color: $--color-text-primary;
      margin-bottom: 10px;
    }
    .author {
      text-align: center;
      font-size: $--size-base-small;
      color: $--color-text-regular;
    }
    .selection, .answer {
      margin-bottom: 20px;
      padding: 0 20px;
      overflow: hidden;
    }
    .selection-title,.answer-title {
      margin-bottom: 10px;
    }
    .selection-option {
      float: left;
      margin-right: 30px;
      span {
        margin-right: 10px;
      }
    }
    .answerContent {
      margin-bottom: 10px;
      border: $--border-base;
      border-radius: $--border-radius-base;
      padding: 5px;
    }
  }
</style>
