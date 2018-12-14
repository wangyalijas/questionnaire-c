<template>
  <div class="login">
    <div class="wrap-login">
      <div class="wrap-login-box">
        <!--左边背景图片-->
        <div class="wrap-login-image"></div>
        <!--右边输入框-->
        <div class="wrap-login-main">
          <div class="login-inner">
            <div class="login-inner--logo">
              <img src="../../assets/images/logo.png"/>
              <span class="login-inner--logo-title">W.UED</span>
            </div>
            <div class="login-inner--input">
              <div class="login-inner--input-default">
                <div :class="{hideTopLabel: !accountFocusFlag}">账号</div>
                <span v-if="!accountFocusFlag">账号</span>
                <input
                type="text"
                v-model="userAccount"
                @focus="accountInputFocus"
                @blur="accountInputFocus"/>
              </div>
              <div class="login-inner--input-default">
                <div :class="{hideTopLabel: !passwordFocusFlag}">密码</div>
                <span v-if="!passwordFocusFlag">密码</span>
                <input
                class="password-input"
                type="password"
                v-model="userPassword"
                v-if="!psdVisibleFlag"
                @focus="passwordInputFocus"
                @blur="passwordInputFocus"
                @keyup.enter="loginEntry"/>
                <input
                class="replace-input"
                type="text"
                v-model="userPassword"
                v-if="psdVisibleFlag"
                @focus="passwordInputFocus"
                @blur="passwordInputFocus"
                @keyup.enter="loginEntry">
                <i
                lass="login-inner--input-default-btn"
                :class="{eyeOpen: psdVisibleFlag}"
                @click="lookPassword"></i>
              </div>
            </div>
            <div class="login-inner--memory">
              <div class="login-inner--memory-forget" @click="forgetPassword">忘记密码？</div>
            </div>
            <div class="login-inner--msg">{{mistakeTip}}</div>
            <div class="login-inner--button" :class="{active : userPassword.length <= 3}"
                 @click="loginEntry">登录</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="wrap-footer">
      <span class="wrap-footer--sign">{{copyrightSign}}</span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('login');
// @ is an alias to /src
export default {
  name: 'login',
  data() {
    return {
      copyrightSign: '共享平台 © 2018 Winning Health 版权所有',
      userAccount: '5229', // 账户名
      userPassword: '', // 密码
      mistakeTip: '', // 错误提示
      accountFocusFlag: false, // 账户
      passwordFocusFlag: false, // 密码
      psdVisibleFlag: false, // 密码是否可见
    };
  },
  components: {
  },
  computed: {
    ...mapGetters([
    ]),
  },
  watch: {
  },
  created() {
    this.$nextTick(() => {
      this.initAccountInput();
    });
  },
  methods: {
    initAccountInput() {
      // 初始化账户输入框
      if (this.userAccount) {
        this.accountFocusFlag = !this.accountFocusFlag;
      }
    },
    accountInputFocus() {
      // 账户输入事件
      if (!this.userAccount) {
        this.accountFocusFlag = !this.accountFocusFlag;
      }
    },
    passwordInputFocus() {
      // 密码输入事件
      if (!this.userPassword) {
        this.passwordFocusFlag = !this.passwordFocusFlag;
      }
    },
    lookPassword() {
      // 密码是否可见
      this.psdVisibleFlag = !this.psdVisibleFlag;
    },
    forgetPassword() {
      // 忘记密码
      this.$message(utils.configurationConstant.forgetPassword);
    },
    checkIsEmpty() {
      let isEmpty = true;
      this.mistakeTip = '';
      if (this.userAccount.replace(/\s+/g, '').length <= 0) {
        this.mistakeTip = utils.configurationConstant.userNameEmpty;
        isEmpty = false;
      } else if (this.userPassword.replace(/\s+/g, '').length <= 0) {
        this.mistakeTip = utils.configurationConstant.userCodeEmpty;
        isEmpty = false;
      }
      return isEmpty;
    },
    async loginEntry() {
      const isEmpty = this.checkIsEmpty();
      if (isEmpty) {
        const params = {
          userNo: this.userAccount.replace(/\s+/g, ''),
          password: md5(this.userPassword.replace(/\s+/g, '')),
        };
        const result = await this.$store.dispatch('login/postLogin', params);
        if (Object.prototype.hasOwnProperty.call(result, 'isAdmin')) {
          this.$store.commit('login/updateUserInfo', result);
          this.$router.push({
            name: this.$store.state.login.userInfo.isAdmin ? 'userManagement' : 'articleManagement',
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .login {
    height: 100%;
    position: relative;
    background-color: #F3F5F7;
    .wrap-login {
      position: relative;
      height: calc(100% - 60px);
      .wrap-login-box {
        @include position-center(804px,433px);
        overflow: hidden;
        background: #fff;
        box-shadow: 0 0 10px 0 #f4533121;
        .wrap-login-image {
          float: left;
          width: 300px;
          height: 433px;
          background-image: url("../../assets/images/background.png");
          background-repeat: no-repeat;
          background-position: center center;
        }
        .wrap-login-main {
          width: 503px;
          height: 433px;
          float: right;
          position: relative;
          @include b(login-inner) {
            @include position-center(260px,280px);
            @include m(logo){
              text-align: center;
              margin-bottom: 10px;
              @include s(title){
                display: block;
                color: #F45331;
                font-size: 12px;
                transform: scale(0.7);
              }
            }
            /*输入框部分*/
            @include m(input) {
              width: 260px;
              &-default {
                margin-top: 5px;
                position: relative;
                span {
                  top: 22px;
                  left: 0;
                  color: #666;
                  cursor: text;
                  z-index: 1000;
                  font-size: 16px;
                  position: absolute;
                }
                div {
                  font-size: 12px;
                  color: #F45331;
                }
                .hideTopLabel {
                  visibility: hidden;
                }
                input {
                  width: 100%;
                  height: 34px;
                  color: #333333;
                  font-size: 14px;
                  border-top: 0;
                  border-left: 0;
                  border-right: 0;
                  position: relative;
                  border-bottom: 1px solid #FAC2B6;
                }
                &-btn {
                  top: 28px;
                  right: 3px;
                  width: 24px;
                  height: 20px;
                  z-index: 1000;
                  cursor: pointer;
                  position: absolute;
                  background-color: #fff;
                  background-image: url("../../assets/images/eyeClosed.png");
                  background-repeat: no-repeat;
                  background-position: center center;
                  &.eyeOpen {
                    background-image: url("../../assets/images/eyeOpen.png");
                  }
                }
              }
            }
            /*记住我，忘记密码等*/
            @include m(memory) {
              width: 260px;
              height: 32px;
              margin-top: 12px;
              line-height: 32px;
              position: relative;
              &-forget {
                float: right;
                color: #F45331;
                cursor: pointer;
                font-size: 12px;
              }
            }
            /*信息有误提示信息*/
            @include m(msg) {
              width: 260px;
              color: #D0021B;
              font-size: 12px;
              margin-top: 5px;
              text-align: center;
            }
            /*登录按钮*/
            @include m(button) {
              width: 260px;
              height: 40px;
              color: #FFFFFF;
              font-size: 16px;
              cursor: pointer;
              line-height: 40px;
              margin-top: 17px;
              text-align: center;
              background: #F45331;
              border-radius: 2px;
              &.active {
                background: #F45331;
              }
            }
          }
        }
      }
    }
    @include b(wrap-footer) {
      height: 60px;
      opacity: 0.3;
      font-size: 14px;
      color: #333;
      letter-spacing: 0;
      text-align: center;
      @include m(sign){
        line-height: 60px;
      }
    }
  }
</style>
