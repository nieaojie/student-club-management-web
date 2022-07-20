<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="16">
        <el-card class="box-card">
          <el-tabs :tab-position="tabPosition" style="height: 480px;">
            <el-tab-pane label="基本信息">
              <el-form :model="form" label-width="80px" :rules="userFormRules" ref="userFormRules">
                <el-form-item label="用户名" prop="userUsername">
                  <el-input :disabled="true" placeholder="请输入用户名" v-model="form.userUsername"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userRealname">
                  <el-input placeholder="请输入真实姓名" v-model="form.userRealname"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="userGender">
                  <el-radio-group v-model="form.userGender" value="form.userGender">
                    <el-radio-button label="0">男</el-radio-button>
                    <el-radio-button label="1">女</el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="出生日期" prop="userBirthday">
                  <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="form.userBirthday"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="专业班级" prop="selectOptions">
                  <el-cascader
                      v-model="form.selectOptions"
                      :options="options"
                      @change="handleChange"></el-cascader>
                </el-form-item>

                <el-form-item label="年级" prop="selectOptions">
                  <el-select v-model="form.userGrade" placeholder="请选择">
                    <el-option
                        v-for="item in gradeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="学号" prop="userStudentNo">
                  <el-input placeholder="请输入学号" v-model="form.userStudentNo"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="modifyUserInfo('userFormRules')">修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!--修改密码-->
            <el-tab-pane label="修改密码">
              <el-form :model="modifyPassForm" :rules="modifyPassRules" ref="modifyPassRules" label-width="80px">
                <el-form-item label="原密码" prop="oldPass">
                  <el-input placeholder="请输入原密码" v-model="modifyPassForm.oldPass" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                  <el-input placeholder="请输入新密码" v-model="modifyPassForm.newPass" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repassword">
                  <el-input placeholder="请再次输入新密码" v-model="modifyPassForm.repassword" show-password></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="modifyPass('modifyPassForm')">修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!--安全设置-->
            <el-tab-pane label="安全设置">
              <el-form :model="modifyOtherForm" :rules="modifyOtherRules" ref="modifyOtherRules" label-width="80px">
                <el-form-item label="手机号" prop="userPhone">
                  <el-input placeholder="请输入手机号" v-model="modifyOtherForm.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                  <el-input placeholder="请输入邮箱" v-model="modifyOtherForm.userEmail"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="modifyOther('modifyOtherForm')">修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getCollegeSpecialtyClassTree, info2, update, userModifyPass} from "@/api/user";
import {MessageBox} from "element-ui";

export default {
  name: "setting",
  data() {
    return {
      modifyOtherRules: {
        // userPhone: [
        //   {required: true, message: '请输入手机号', trigger: 'blur'},
        //   {min: 11, max: 11, message: '长度为11个字符', trigger: 'blur'}
        // ],
        // userEmail: [
        //   {message: '请输入邮箱', trigger: 'blur'},
        //   {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
        // ],
      },
      userFormRules: {
        userUsername: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
        ],
      },
      modifyPassRules: {
        oldPass: [
          {required: true, message: '请输入原密码', trigger: 'blur'},
        ],
        newPass: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
        repassword: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.modifyPassForm.newPass) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
      },
      modifyOtherForm: {
        pkid: '',
        userPhone: '',
        userEmail: '',
      },
      modifyPassForm: {
        oldPass: '',
        newPass: '',
      },
      tabPosition: 'left',
      form: {
        userBirthday:'',
        userUsername: '',
        userStudentNo: '',
        userRealname: '',
        selectOptions: [],
        userGender: 0,
        userCollege: '',
        userSpecialty: '',
        userGrade: '',
        userClass: '',
      },
      //学院-专业-班级选项
      options: [],
      gradeOptions: [
        {
          value: '2020',
          label: '2020'
        },
        {
          value: '2019',
          label: '2019'
        },
        {
          value: '2018',
          label: '2018'
        },
        {
          value: '2017',
          label: '2017'
        },
      ],
    }
  },
  methods: {

    /**
     * 安全设置
     */
    modifyOther() {
      update(this.modifyOtherForm)
          .then((res) => {
            // console.log(res)
            if (res.data.code === '0') {
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.data.msg)
            }
          }, function (err) {
            console.log(err);
          });
    },

    /**
     * 修改用户信息
     */
    modifyUserInfo(formName) {
      // console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.userCollege = this.form.selectOptions[0];
          this.form.userSpecialty = this.form.selectOptions[1];
          this.form.userClass = this.form.selectOptions[2];
          update(this.form)
              .then((res) => {
                // console.log(res)
                if (res.data.code === '0') {
                  this.$message.success("修改成功");
                } else {
                  this.$message.error(res.data.msg)
                }
              }, function (err) {
                console.log(err);
              });
        } else {
          console.log('error submit!!');
        }
      });
    },

    /**
     * 级联选择器
     */
    // eslint-disable-next-line no-unused-vars
    handleChange(value) {
      // console.log(value);
    },

    modifyPass: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.modifyPassForm)
          userModifyPass(this.modifyPassForm).then(res => {
            if (res.data.code === '0') {
              this.$message.success('修改成功');
              MessageBox.alert("登录已过期，请重新登录", "提示", {
                    confirmButtonText: "确定",
                    // eslint-disable-next-line no-unused-vars
                    callback: action => {
                      window.sessionStorage.clear();
                      window.location.reload();
                    }
                  }
              );
            } else {
              this.$message.error(res.data.msg);
            }
          }, function (err) {
            console.log(err);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    /**
     * 格式化学院-专业-班级数据
     */
    formatData(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          data[i].children = undefined;
        } else {
          this.formatData(data[i].children);
        }
      }
      return data;
    },

    /**
     * 获取学院-专业-班级树形结构
     */
    getCollegeSpecialtyClassTree() {
      getCollegeSpecialtyClassTree().then(res => {
        if (res.data.code === '0') {
          this.options = this.formatData(res.data.data);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  created() {
    let item = window.sessionStorage.getItem("userInfo");
    let userDTO = JSON.parse(item);
    info2(userDTO.pkid).then(res => {
      if (res.data.code === '0') {
        // console.log(res.data.data)
        this.form = res.data.data;
        this.form.selectOptions = new Array(this.form.userCollege, this.form.userSpecialty, this.form.userClass);
        //初始化安全设置
        this.modifyOtherForm.pkid = userDTO.pkid;
        this.modifyOtherForm.userPhone = res.data.data.userPhone;
        this.modifyOtherForm.userEmail = res.data.data.userEmail;
      } else {
        this.$message.error(res.data.msg);
      }
    });
    //加载院系信息
    this.getCollegeSpecialtyClassTree();
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-form-item__content {
  text-align: left;
}

</style>
