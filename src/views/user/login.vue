<template >
  <div>
    <div class="header-content" >
      <div class="logo-part" >
        <!--        <img src="../assets/logo.png" width="30" height="30">-->
        <span>面向网格化及群体智能聚合的城市电网电动汽车协同调度软件</span>
      </div>
    </div>

    <el-form  ref="AccountForm" :model="account" :rules="rules" class="demo-ruleForm login-container" label-position="left"
             label-width="0px">

      <h3 class="title">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input v-model="account.username" auto-complete="off" placeholder="手机号或公司企业码" type="text"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input v-model="account.pwd" :autofocus="pwdFocus" auto-complete="off" placeholder="请输入登录密码"
                  type="password"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
<!--      <el-form-item class="extra-text">-->
<!--        <button class="forget-pwd" title="找回密码" @click="func">忘记密码</button>-->
<!--        <button class="reg-text" title="立即注册" @click="func">立即注册</button>-->
<!--&lt;!&ndash;        <router-link  class="reg-text" title="立即注册">立即注册</router-link>&ndash;&gt;-->
<!--      </el-form-item>-->
      <el-form-item style="width:100%;">
        <el-button :disabled="allowLogin" :loading="loading" style="width:100%;" type="primary"
                   @click.native.prevent="handleLogin">登录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="footer">
      <footer-copyright></footer-copyright>
    </div>
  </div>
</template>
<script>
import API from '../../api/api_user'
import router from "../../router";

export default {
  name: 'login',
  data() {
    var validateAccount = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.account.username !== '') {
          this.account.username = value;
          this.validateCorrect();
        }
        callback();
      }
    };
    var validatePwd = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.account.pwd !== '') {
          this.account.pwd = value;
          this.validateCorrect();
        }
        callback();
      }
    };
    return {
      loading: false,
      account: {
        username: '',
        pwd: ''
      },
      rules: {
        username: [
          {required: true, validator: validateAccount, trigger: 'change'}

        ],
        pwd: [
          {required: true, validator: validatePwd, trigger: 'change'}
        ]
      },
      pwdFocus: false,
      allowLogin: true,
      checked: true
    };
  },
  created() {
    let reg_user = JSON.parse(localStorage.getItem('register-user'));
    if (reg_user) {
      this.account.username = reg_user.username;
      this.account.pwd = '';
      this.pwdFocus = true;
    }
    document.onkeydown = (e) => {
      e = window.event || e
      if (this.$route.path === '/login' && e.keyCode === 13) this.handleLogin()  // submitLoginForm() 为登录函数
    }
  },
  methods: {
    handleLogin() {
      let that = this;
      let result = {
        id: '1',
        username: 'admin',
        nickname: this.account.username,
        password: this.account.pwd,
        name: 'administrator',
        email: '888888@163.com'
      };
      this.loading = true;
      let status = API.login(result);
      if (status == 'success') {
        localStorage.setItem('access-user', JSON.stringify(result));
        window.localStorage.removeItem('register-user');
        that.$router.push({path: '/dashboard'});
      } else {
        this.loading = false;
        this.$message.error("登录失败，账号或密码错误");
      }
    },
    validateCorrect() {
      if (this.account.pwd.trim().length > 0 && this.account.username.trim().length > 0) {
        this.allowLogin = false;
      } else {
        this.allowLogin = true;
      }
    },
    func()
    {
      this.$router.push( {
        path:'/register'
      });
    }
  }
}
</script>
<style scoped>
body {
  background: #DFE9FB;
}

.header-content {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  padding: 6px 0;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 2px black;
}

.header-content .logo-part {
  margin-left: 10px;
  font-size: 34px;
  color: black;
  text-align: center;
}

.header-content .logo-part img {
  vertical-align: middle;
}

.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 160px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
  background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
  background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
  background: -o-linear-gradient(top, #ace, #00C1DE); /*Opera 11.10+*/

}

.login-container .title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login-container .remember {
  margin: 0px 0px 35px 0px;
}

.extra-text {
  position: relative;
  margin-bottom: 0;
  padding-left: 2px;
}

.extra-text a {
  font-size: 12px;
  color: #aaa;
}

.extra-text a:hover {
  color: #29e;
}

.extra-text .reg-text {
  position: center;

  margin-left: 155px;
  top: 4px;
  right: 2px;
}
.extra-text .forget-pwd {

  margin-left: 1px;
  position: center;
  top: 4px;
  left: 2px;
}
</style>
