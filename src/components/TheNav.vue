<template>
  <header>
    <div class="header">
      <div class="logo"></div>
      <div class="title">问卷调查</div>
      <ul class="link-a">
        <router-link tag="li" to="/home" active-class="active">
          <a>我的问卷</a>
        </router-link>
        <router-link tag="li" to="/new" active-class="active">
          <a>创建问卷</a>
        </router-link>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheNav',
};
</script>

<style scoped lang="scss">
  header{
    height: 50px;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    background: #103457;
    box-shadow: 0 1px 4px 0 rgba(165,165,165,0.50);
    .header {
      width: 1366px;
      margin: 0 auto;
      overflow: hidden;
      .title {
        float: left;
        height: 50px;
        line-height: 50px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0;
      }
      .link-a {
        height: 100%;
        margin-left: 200px;
        float: left;
        li {
          line-height: 50px;
          position: relative;
          display: inline-block;
          height: 100%;
          margin-right: 50px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
          &:before {
            content: '';
            position: absolute;
            left: 50%;
            right: 50%;
            bottom: 2px;
            background-color: #5484FF;
            height: 3px;
            -webkit-transition-duration: .2s;
            transition-duration: .2s;
            -webkit-transition-timing-function: ease-out;
            transition-timing-function: ease-out;
          }
          &.active:before {
            left: 0;
            right: 0;
          }
          &.active a{
            color: #5484FF;
          }
          a{
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }
  }
</style>
