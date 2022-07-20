<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社团管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    <el-row>-->
    <!--      <el-col class="border-card">-->
    <!--        <el-card>-->
    <!--          <el-tabs :tab-position="tabPosition" style="height: 562px;overflow-y: scroll">-->

    <!--            <el-tab-pane v-for="(item,index) in allClubInfo.length" :key="allClubInfo[index].clubDetailDTO.pkid"-->
    <!--                         :label="allClubInfo[index].clubDetailDTO.clubName">-->
    <!--              <div style="text-align: left;font-size: 22px;margin-bottom: 5px">【社团成员】</div>-->
    <!--              <el-table-->
    <!--                  :data="allClubInfo[index].userDTOS"-->
    <!--                  max-height="200"-->
    <!--                  border-->
    <!--                  style="width: 85%">-->
    <!--                <el-table-column-->
    <!--                    fixed-->
    <!--                    prop="userStudentNo"-->
    <!--                    label="学号"-->
    <!--                    width="110">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    fixed-->
    <!--                    prop="userRealname"-->
    <!--                    label="姓名"-->
    <!--                    width="70">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    prop="userCollege.name"-->
    <!--                    label="学院"-->
    <!--                    width="110">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    prop="userSpecialty.name"-->
    <!--                    label="专业"-->
    <!--                    width="140">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    prop="userGrade"-->
    <!--                    label="年级"-->
    <!--                    width="60">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    prop="userClass.name"-->
    <!--                    label="班级"-->
    <!--                    width="80">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    prop="userClubRoleRelationDTOs[0].roleEntity.roleName"-->
    <!--                    label="社团角色"-->
    <!--                    width="80">-->
    <!--                </el-table-column>-->

    <!--                <el-table-column-->
    <!--                    prop="userClubRoleRelationDTOs[0].createTime"-->
    <!--                    label="入会时间"-->
    <!--                    width="160">-->
    <!--                </el-table-column>-->

    <!--                <el-table-column-->
    <!--                    fixed="right"-->
    <!--                    label="操作"-->
    <!--                    width="100">-->
    <!--                  <template slot-scope="scope">-->
    <!--                    <el-button @click="removeUserFromClub(scope.row)" type="text" size="small">移除</el-button>-->
    <!--                  </template>-->
    <!--                </el-table-column>-->
    <!--              </el-table>-->
    <!--              <div style="width: 85%;text-align: right;margin-top: 10px;">-->
    <!--                共 {{ allClubInfo[index].userDTOS.length }} 条-->
    <!--              </div>-->

    <!--              &lt;!&ndash;社团公告&ndash;&gt;-->
    <!--              <div style="text-align: left;font-size: 22px;margin-top: 5px">【社团公告】</div>-->
    <!--              <div style="width: 85%;text-align: right;margin-top: 10px;">-->
    <!--                <el-button @click="addNewNotice(allClubInfo[index].clubDetailDTO.pkid)" type="primary" size="mini"-->
    <!--                           icon="el-icon-circle-plus-outline">新增公告-->
    <!--                </el-button>-->
    <!--              </div>-->
    <!--              <el-table-->
    <!--                  :data="allClubInfo[index].clubDetailDTO.notices"-->
    <!--                  max-height="200"-->
    <!--                  border-->
    <!--                  style="width: 85%">-->
    <!--                <el-table-column-->
    <!--                    v-if="false"-->
    <!--                    fixed-->
    <!--                    prop="pkid"-->
    <!--                    label="pkid"-->
    <!--                    width="110">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    fixed-->
    <!--                    prop="userEntity.userUsername"-->
    <!--                    label="发布人"-->
    <!--                    width="110">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    fixed-->
    <!--                    prop="updateTime"-->
    <!--                    label="发布时间"-->
    <!--                    width="160">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    :show-overflow-tooltip="true"-->
    <!--                    prop="content"-->
    <!--                    label="公告内容"-->
    <!--                    width="520">-->
    <!--                </el-table-column>-->
    <!--                <el-table-column-->
    <!--                    fixed="right"-->
    <!--                    label="操作"-->
    <!--                    width="120">-->
    <!--                  <template slot-scope="scope">-->
    <!--                    <template v-if="scope.row.status===0">-->
    <!--                      <el-button @click="release(scope.row.pkid)" type="text" size="small">发布</el-button>-->
    <!--                    </template>-->
    <!--                    <template v-if="scope.row.status===1">-->
    <!--                      <el-button @click="cancelRelease(scope.row.pkid)" type="text" size="small">取消发布</el-button>-->
    <!--                    </template>-->

    <!--                    <el-button @click="removeNoticeFromClub(scope.row.pkid)" type="text" size="small">删除</el-button>-->
    <!--                  </template>-->
    <!--                </el-table-column>-->
    <!--              </el-table>-->
    <!--              <div style="width: 85%;text-align: right;margin-top: 10px;">-->
    <!--                共 {{ allClubInfo[index].clubDetailDTO.notices.length }} 条-->
    <!--              </div>-->
    <!--            </el-tab-pane>-->
    <!--          </el-tabs>-->
    <!--        </el-card>-->
    <!--      </el-col>-->
    <!--    </el-row>-->

    <el-row>
      <el-col class="border-card">
        <el-card>
          <el-tabs @tab-click="tabChange" :tab-position="tabPosition" style="height: 562px;overflow-y: scroll">

            <el-tab-pane v-for="item in allClubs" :key="item.pkid"
                         :label="item.clubName" :name="item.pkid">
              <div style="text-align: left;font-size: 22px;margin-bottom: 5px">【社团成员】</div>
              <template v-if="clubInfo!=null">
                <el-table
                    :data="clubInfo.userDTOS"
                    max-height="200"
                    border
                    style="width: 85%">
                  <el-table-column
                      fixed
                      prop="userStudentNo"
                      label="学号"
                      width="110">
                  </el-table-column>
                  <el-table-column
                      fixed
                      prop="userRealname"
                      label="姓名"
                      width="70">
                  </el-table-column>
                  <el-table-column
                      prop="userCollege.name"
                      label="学院"
                      width="110">
                  </el-table-column>
                  <el-table-column
                      prop="userSpecialty.name"
                      label="专业"
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="userGrade"
                      label="年级"
                      width="60">
                  </el-table-column>
                  <el-table-column
                      prop="userClass.name"
                      label="班级"
                      width="80">
                  </el-table-column>
                  <el-table-column
                      prop="userClubRoleRelationDTOs[0].roleEntity.roleName"
                      label="社团角色"
                      width="80">
                  </el-table-column>

                  <el-table-column
                      prop="userClubRoleRelationDTOs[0].createTime"
                      label="入会时间"
                      width="160">
                  </el-table-column>

                  <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                    <template slot-scope="scope">
                      <el-button @click="removeUserFromClub(scope.row)" type="text" size="small">移除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="width: 85%;text-align: right;margin-top: 10px;">
                  共 {{ clubInfo.userDTOS.length }} 条
                </div>

                <!--社团公告-->
                <div style="text-align: left;font-size: 22px;margin-top: 5px">【社团活动】</div>
                <div style="width: 85%;text-align: right;margin-top: 10px;">
                  <el-button @click="addNewNotice(clubInfo.clubDetailDTO.pkid)" type="primary" size="mini"
                             icon="el-icon-circle-plus-outline">新增活动
                  </el-button>
                </div>
                <el-table
                    :data="clubInfo.clubDetailDTO.notices"
                    max-height="200"
                    border
                    style="width: 85%">
                  <el-table-column
                      v-if="false"
                      fixed
                      prop="pkid"
                      label="pkid"
                      width="110">
                  </el-table-column>
                  <el-table-column
                      fixed
                      prop="userEntity.userUsername"
                      label="发布人"
                      width="110">
                  </el-table-column>
                  <el-table-column
                      fixed
                      prop="updateTime"
                      label="发布时间"
                      width="160">
                  </el-table-column>
                  <el-table-column
                      :show-overflow-tooltip="true"
                      prop="content"
                      label="活动内容"
                      width="520">
                  </el-table-column>
                  <el-table-column
                      fixed="right"
                      label="操作"
                      width="120">
                    <template slot-scope="scope">
                      <template v-if="scope.row.status===0">
                        <el-button @click="release(scope.row.pkid,item.pkid)" type="text" size="small">发布</el-button>
                      </template>
                      <template v-if="scope.row.status===1">
                        <el-button @click="cancelRelease(scope.row.pkid,item.pkid)" type="text" size="small">取消发布
                        </el-button>
                      </template>

                      <el-button @click="removeNoticeFromClub(scope.row.pkid,item.pkid)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="width: 85%;text-align: right;margin-top: 10px;">
                  共 {{ clubInfo.clubDetailDTO.notices.length }} 条
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="新增活动" :visible.sync="addNewNoticeDialog" :close-on-click-modal="false" :lock-scroll="true"
               @close="closeAddNewNoticeDialog">
      <div style="overflow-y:scroll;height: 350px">
        <el-form :label-position="labelPosition"
                 :model="addNewNoticeForm" :rules="addNewNoticeRules" ref="addNewNoticeForm"
                 class="demo-ruleForm"
                 label-width="80px"
                 style="width: 100%">
          <el-form-item label="活动内容" prop="content">
            <el-input type="textarea" maxlength="500" autosize placeholder="请输入活动内容"
                      v-model="addNewNoticeForm.content"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-left: -45px" type="primary" @click="submitForm('addNewNoticeForm')">创建</el-button>
        <el-button @click="resetForm('addNewNoticeForm')">重置</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  getAllClubByManagePkid,
  getClubDetailByClubManagePkid, getClubDetailByClubPkid,
  removeUserFromClub
} from "@/api/club";
import {createEntity, removeById, update} from "@/api/notice";

export default {
  name: "clubManage",
  data() {
    return {
      //新增公告表单公告
      addNewNoticeRules: {
        content: [
          {required: true, message: '请输入活动内容', trigger: 'blur'},
          {min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur'}
        ],
      },
      //新增公告表单
      addNewNoticeForm: {
        clubPkid: '',
        content: ''
      },
      labelPosition: 'right',
      addNewNoticeDialog: false,
      tabPosition: 'left',
      tableData: [],
      allClubInfo: [],
      allClubs: [],
      clubInfo: null,
    }
  },


  created() {
    // this.getClubDetailByClubManagePkid();

    getAllClubByManagePkid().then(res => {
      if (res.data.code === '0') {
        // console.log(res.data.data);
        this.allClubs = res.data.data;
      }
    });

  },
  methods: {

    // eslint-disable-next-line no-unused-vars
    tabChange(tab, event) {
      // console.log(tab.name);
      //请求每个社团的数据
      // getClubDetailByClubPkid(tab.name).then(res => {
      //   if (res.data.code === '0') {
      //     this.clubInfo = res.data.data;
      //     console.log(res.data.data);
      //   }
      // });
      this.getClubDetailByClubPkid(tab.name);
    },

    /**
     * 请求每个社团的数据
     */
    getClubDetailByClubPkid(clubPkid) {
      getClubDetailByClubPkid(clubPkid).then(res => {
        if (res.data.code === '0') {
          this.clubInfo = res.data.data;
          // console.log(res.data.data);
        }
      });
    },


    /**
     * 删除社团公告
     */
    removeNoticeFromClub(noticePkid,clubPkid) {
      removeById(noticePkid).then(res => {
        if (res.data.code === '0') {
          this.getClubDetailByClubPkid(clubPkid);
          this.$message.success("删除成功");
        } else {
          this.$message.error("删除失败");
        }
      });
    },

    /**
     * 发布公告
     */
    release(noticePkid, clubPkid) {
      update({pkid: noticePkid, status: 1}).then(res => {
        if (res.data.code === '0') {
          this.getClubDetailByClubPkid(clubPkid);
          this.$message.success("发布成功");
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    /**
     * 取消发布
     */
    cancelRelease(noticePkid, clubPkid) {
      update({pkid: noticePkid, status: 0}).then(res => {
        if (res.data.code === '0') {
          this.getClubDetailByClubPkid(clubPkid);
          this.$message.info("已取消发布");
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },

    /**
     * 重置按钮点击事件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.addNewNoticeForm);
          createEntity(this.addNewNoticeForm).then(res => {
            if (res.data.code === '0') {
              this.$message.success("添加成功");
              //关闭添加弹窗
              this.addNewNoticeDialog = false;
              //重新社团数据
              this.getClubDetailByClubPkid(this.addNewNoticeForm.clubPkid);
              //重置表单验证
              this.resetForm(formName);
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

    /**
     * 关闭新增弹窗
     */
    closeAddNewNoticeDialog() {
      this.addNewNoticeDialog = false;
    },

    /**
     * 新增公告
     */
    addNewNotice(clubPkid) {
      // console.log(clubPkid)
      this.addNewNoticeForm.clubPkid = clubPkid;
      this.addNewNoticeDialog = true;
    },

    getClubDetailByClubManagePkid() {
      getClubDetailByClubManagePkid().then(res => {
        if (res.data.code === '0') {
          // console.log("社团管理员管理的所有用户：", res.data.data);
          this.allClubInfo = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /**
     * 从社团移除用户
     */
    removeUserFromClub: function (row) {
      const userPkid = row.pkid;
      const clubPkid = row.userClubRoleRelationDTOs[0].clubEntity.pkid;
      // console.log(row);
      this.$confirm('此操作将从该社团移除该用户, 是否继续?', '提示', {
        confirmButtonText: '移除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUserFromClub(clubPkid, userPkid).then(res => {
          if (res.data.code === '0') {
            this.$message({
              type: 'success',
              message: '移除成功!'
            });
            //移除成功之后，重新请求该社团的成员信息
            this.getClubDetailByClubPkid(clubPkid);
          } else {
            this.$message.error(res.data.msg);
          }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  }
}
</script>

<style lang="less" scoped>

/deep/ .el-dialog {
  //position: absolute;
  //top: 0;
  //left: 50%;
  //overflow: auto;
  //transform: translate(-50%, 0%);
  height: 500px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
}


/deep/ .el-dialog__body {
  padding: 10px 20px 30px;
}

/deep/ .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #dcdfe6;
}

.dialog-footer {
  margin-top: -30px;
  text-align: center;
}
</style>
