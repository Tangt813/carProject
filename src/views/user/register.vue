<template>
  <div class="user_forms-signup">
    <h2 class="forms_title">注 册</h2>
<!--    <el-upload-->
<!--      class="avatar-uploader"-->
<!--      action="http://150.158.47.16:521/upload/"-->
<!--      :show-file-list="false"-->
<!--      :on-preview="handlePictureCardPreview"-->
<!--      :on-success="handleSuccess"-->
<!--      :on-remove="handleRemove">-->
<!--      <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--      <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--    </el-upload>-->
<!--    <el-tag style="margin-left: -6px; margin-bottom: 10px" type="danger" effect="plain">点击"+"上传头像</el-tag>-->
    <form class="forms_form">
      <fieldset class="forms_fieldset">
        <div class="forms_field">
          <input id='signUpName' ref="signUpName" type="text" placeholder="Full Name" class="forms_field-input2" required />
        </div>
<!--        <div class="forms_field">-->
<!--          <input id='signUpeMail' ref="signUpeMail" type="email" placeholder="Email" class="forms_field-input2" required />-->
<!--        </div>-->
<!--        <div class="forms_field">-->
<!--          <input id='signUpVertification' ref="signUpVertification" type="code" placeholder="Verification Code" class="forms_field-input2" required />-->
<!--        </div>-->
        <div class="forms_field">
          <input id='sinUpPassword' ref="signUpPassword" type="password" placeholder="Password" class="forms_field-input2" required />
        </div>
      </fieldset>
      <div class="forms_buttons">
<!--        <el-button style="margin-right:20px;width:180px;height:40px;font-size:14px" class="forms_buttons-action" @click="getCountdown" :disabled="totalTime <60">{{content}}</el-button>-->
        <el-button v-if="ifSignUp" type='button' style="width:140px;height:40px" class="forms_buttons-action" @click="trySignUp()">注 册</el-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "register",
  data () {
    return {
      ifSignUp: true
    }
  },
  methods:
    {
      trySignUp () {
        // eslint-disable-next-line eqeqeq
        console.log(AES.encrypt(this.signupverification))
        console.log(this.verifycode)
        // eslint-disable-next-line eqeqeq
        if (this.$refs.signupemail.value != this.signupemail) {
          this.ifsignup = false
          this.$message.error('邮箱地址变更，请重新发送验证码！')
        } else {
          this.signupname = this.$refs.signupname.value
          this.signupemail = this.$refs.signupemail.value
          this.signupverification = this.$refs.signupvertification.value
          this.signuppassword = this.$refs.signuppassword.value
          // eslint-disable-next-line eqeqeq
          if (this.signupname == '') {
            this.$message.error('请输入姓名！')
            // eslint-disable-next-line eqeqeq
          } else if (this.signupemail == '') {
            this.$message.error('请输入邮箱！')
            // eslint-disable-next-line eqeqeq
          } else if (this.signupverification == '') {
            this.$message.error('请输入验证码！')
            // eslint-disable-next-line eqeqeq
          } else if (this.signuppassword == '') {
            this.$message.error('请输入密码！')
          } else {
            // eslint-disable-next-line eqeqeq
            if (AES.encrypt(this.signupverification) == this.verifycode) {
              axios({
                method: 'post',
                url: 'http://150.158.47.16:521/user/signup',
                params: {
                  headFile: this.returnimageUrl,
                  name: this.signupname,
                  password: AES.encrypt(this.signuppassword),
                  e_mail: this.signupemail
                }
              }).then((response) => {
                console.log(response.data)
              }).catch(Error)
              this.$message({
                message: '注册成功',
                type: 'success'
              })
            } else {
              this.$message.error('验证码错误！')
            }
          }
        }
      }
    }
}
</script>

<style scoped>
.user_options-forms .user_forms-signup {
  transform: translate3d(120px, 0, 0);
}
.user_options-forms .user_forms-signup .forms_buttons {
  justify-content: flex-end;
}
</style>
