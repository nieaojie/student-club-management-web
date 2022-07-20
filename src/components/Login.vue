<template>
  <div class="login_container">
    <div class="login_box" v-if="show">
      <div class="avatar_box">
        <img src="../assets/login.png">
      </div>
      <div class="login-style">用户登录</div>
      <!--登录表单区域-->
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-LC_icon_user_fill_1"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-password"
                    @keyup.enter.native="login"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" :loading="loadingState">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
        <el-link @click="toRegister" type="primary">没有账号？去注册</el-link>
      </el-form>
    </div>

    <div class="login_box" v-if="!show">
      <div style="font-size: larger;margin-top: 15px">用户注册</div>
      <el-form :label-position="labelPosition"
               label-width="80px"
               :model="registerForm"
               :rules="registerRules"
               ref="registerFormRef"
               class="class_register">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" show-password></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="registerUser('registerFormRef')">注册</el-button>
          <el-button @click="resetForm('registerFormRef')">重置</el-button>
        </div>
        <el-link @click="toRegister" style="margin-top: 10px" type="primary">已有账号？去登录</el-link>
      </el-form>
    </div>

  </div>
</template>

<script>
import {login, register} from "@/api/user";

export default {
  name: "Login",
  data() {
    return {
      registerForm: {
        username: '',
        password: ''
      },
      registerRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 255, message: '长度在 3 到 32 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
      },
      labelPosition: 'right',
      show: true,
      loadingState: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 18, message: '长度在 4 到 18 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {

    registerUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          register({userUsername: this.registerForm.username, userPassword: this.registerForm.password})
              .then(res => {
                if (res.data.code === '0') {
                  this.$message.success("注册成功");
                  //去登陆
                  this.loginForm.username = this.registerForm.username;
                  this.loginForm.password = this.registerForm.password;
                  this.show = !this.show;
                } else {
                  this.$message.error(res.data.msg);
                }
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * 去注册
     */
    toRegister() {
      this.show = !this.show;
    },

    /**
     * 表单验证
     */
    resetLoginForm: function () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields();
    },

    /**
     * 登录操作
     */
    login: function () {
      const this_ = this;
      this.$refs.loginFormRef.validate(function (validate) {
        // console.log(validate);
        if (validate) {
          this_.loadingState = true;
          login(this_.loginForm.username, this_.loginForm.password).then((res) => {
            console.log(res);
            if (res.data.code === '0') {
              this_.$notify.success({
                title: "登录成功",
                message: "欢迎您，" + res.data.data.userDTO.userUsername
              });
              //保存登陆成功之后的token,保存在sessionStorage中
              //token只在当前网站打开期间有效
              window.sessionStorage.setItem("token", res.data.data.token);
              let userInfo = JSON.stringify(res.data.data.userDTO);
              window.sessionStorage.setItem("userInfo", userInfo);
              // console.log(window.sessionStorage.getItem("userInfo"));
              //通过编程方式导航到首页
              this_.loadingState = false;
              this_.$router.push("/dashboard");
            } else {
              this_.loadingState = false;
              this_.$message.error(res.data.msg);
            }
          }, function (err) {
            console.log(err);
          });
        } else {
          return;
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>

.class_register {
  margin-top: 20px;
}

.class_register .el-input {
  width: 90%;
  float: left;
}

.login-style {
  padding-top: 80px;
  font-size: 20px;
}

.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 320px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  //less语法的嵌套形式
  .avatar_box {
    width: 135px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .login_form {
    //position: absolute;
    margin-top: 10px;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    //.el-input {
    //  width: 90%;
    //}
  }

  .btns {
    height: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>
