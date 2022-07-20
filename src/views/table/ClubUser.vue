<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <!--搜索框-->
          <el-input placeholder="请输入内容" v-model="searchParam" clearable
                    @clear="clearSearch" @change="searchChange()">
            <el-button slot="append" icon="el-icon-search" @click="searchByLike"></el-button>
          </el-input>
        </el-col>

        <!--新增和批量删除-->
        <el-button @click="addNew" type="primary" style="float: left"><i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;新增用户
        </el-button>
        <el-button @click="deleteCategory" type="danger" plain style="float: left"><i class="el-icon-delete"></i>&nbsp;&nbsp;批量删除
        </el-button>
      </el-row>

      <!--显示选择几项和批量删除-->
      <el-row
          style="display: flex;width: 100%;float: left;margin: 20px 0;background-color: rgb(230,247,255);border: 1px solid rgb(145,213,255);height: 40px">
        <span style="margin: 8px 25px">已选择 <span style="font-weight: bold;color: #409EFF">{{ selectPkid.length }}</span> 项</span>
        <span style="margin: 8px;color: #409EFF;cursor: pointer" @click="handleClear">清空</span>
      </el-row>
      <!-- 详情弹窗-->
      <el-dialog title="用户详情" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :lock-scroll="true"
                 @close="closeDetailDialog">
        <div style="overflow-y:scroll;height: 350px">
          <el-form :label-position="labelPosition" label-width="80px"
                   style="width: 100%">
            <el-form-item label="pkid">
              <el-input readonly v-model="formData.pkid"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input readonly v-model="formData.userUsername"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input readonly v-model="formData.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input readonly v-model="formData.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input readonly v-model="formData.userRealname"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <template v-if="formData.userGender===0">
                <el-input readonly value="男"></el-input>
              </template>
              <template v-if="formData.userGender===1">
                <el-input readonly value="女"></el-input>
              </template>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-input readonly v-model="formData.userBirthday"></el-input>
            </el-form-item>
            <el-form-item label="学院">
              <el-input readonly v-if="formData.userCollege!=null" v-model="formData.userCollege.name"></el-input>
            </el-form-item>
            <el-form-item label="专业">
              <el-input readonly v-if="formData.userSpecialty!=null" v-model="formData.userSpecialty.name"></el-input>
            </el-form-item>
            <el-form-item label="年级">
              <el-input readonly v-model="formData.userGrade"></el-input>
            </el-form-item>
            <el-form-item label="班级">
              <el-input readonly v-if="formData.userClass!=null" v-model="formData.userClass.name"></el-input>
            </el-form-item>
            <el-form-item label="加入社团">
              <template slot-scope="scope">
                {{ scope.row }}
                <el-tag size="medium" v-for="(item,index) in formData.userClubRoleRelationDTOs" :key="index">
                  {{ item.clubEntity.clubName }}-{{ item.roleEntity.roleName }}
                </el-tag>
              </template>

            </el-form-item>

            <el-form-item label="创建者">
              <el-input readonly v-model="formData.creator"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input readonly v-model="formData.createTime"></el-input>
            </el-form-item>
            <el-form-item label="更新者">
              <el-input readonly v-model="formData.updator"></el-input>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-input readonly v-model="formData.updateTime"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogTableVisible = false">关 闭</el-button>
        </div>
      </el-dialog>

      <!--编辑抽屉-->
      <el-drawer
          title="编辑用户"
          :visible.sync="drawer"
          :direction="direction"
          :size="'40%'"
          :before-close="handleClose">
        <div>
          <el-form :label-position="labelPosition"
                   :model="editRuleForm" :rules="rules" ref="editRuleForm"
                   class="demo-editRuleForm"
                   label-width="80px"
                   style="width: 90%;margin-left: 10px;">
            <el-form-item label="用户名" prop="userUsername">
              <el-input v-model="editRuleForm.userUsername"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="userPhone">
              <el-input v-model="editRuleForm.userPhone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="userEmail">
              <el-input v-model="editRuleForm.userEmail"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="userRealname">
              <el-input v-model="editRuleForm.userRealname"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="userGender">
              <el-select v-model="editRuleForm.userGender" placeholder="请选择性别">
                <el-option v-for="category in formInline.categoryOptions" :label="category.categoryName"
                           :value="category.id" :key="category.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="userBirthday">
              <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="editRuleForm.userBirthday"
                  type="date"
                  placeholder="选择日期">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="专业班级" prop="selectOptions">
              <el-cascader
                  v-model="editRuleForm.selectOptions"
                  :options="options"
                  @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="年级" prop="userGrade">
              <el-input v-model="editRuleForm.userGrade"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="userStudentNo">
              <el-input v-model="editRuleForm.userStudentNo"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="">
          <el-button style="" type="primary" @click="editForm('editRuleForm')">修改</el-button>
          <el-button @click="closeEditFormDialog">取消</el-button>
        </div>
      </el-drawer>


      <!--新增表单弹窗-->
      <div>
        <el-dialog title="新增用户" :visible.sync="addFormDialog" :close-on-click-modal="false" :lock-scroll="true"
                   @close="closeAddFormDialog">
          <div style="overflow-y:scroll;height: 350px">
            <el-form :label-position="labelPosition"
                     :model="ruleForm" :rules="rules" ref="ruleForm"
                     class="demo-ruleForm"
                     label-width="80px"
                     style="width: 100%">
              <el-form-item label="用户名" prop="userUsername">
                <el-input v-model="ruleForm.userUsername"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="userPassword">
                <el-input placeholder="请输入密码" v-model="ruleForm.userPassword" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="repassword">
                <el-input placeholder="请再次输入密码" v-model="ruleForm.repassword" show-password></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="userPhone">
                <el-input v-model="ruleForm.userPhone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model="ruleForm.userEmail"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="userRealname">
                <el-input v-model="ruleForm.userRealname"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="userGender">
                <el-select v-model="ruleForm.userGender" placeholder="请选择性别">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期" prop="userBirthday">
                <el-date-picker
                    v-model="ruleForm.userBirthday"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="专业班级" prop="selectOptions">
                <el-cascader
                    v-model="ruleForm.selectOptions"
                    :options="options"
                    @change="handleChange"></el-cascader>
              </el-form-item>
              <el-form-item label="年级" prop="userGrade">
                <el-input v-model="ruleForm.userGrade"></el-input>
              </el-form-item>
              <el-form-item label="学号" prop="userStudentNo">
                <el-input v-model="ruleForm.userStudentNo"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="position: relative">
            <el-button style="margin-left: -45px" type="primary" @click="submitForm('ruleForm')">创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-dialog>
      </div>

      <!--修改密码弹窗-->
      <div>
        <el-dialog title="重新设定密码" :visible.sync="modifyPassDialog" :close-on-click-modal="false" :lock-scroll="true"
                   @close="closeModifyPassDialog">
          <div style="overflow-y:scroll;height: 350px">
            <el-form :label-position="labelPosition"
                     :model="modifyPassForm" :rules="modifyPassRules" ref="modifyPassForm"
                     class="demo-ruleForm"
                     label-width="80px"
                     style="width: 100%">
              <el-form-item label="新密码" prop="userPassword">
                <el-input placeholder="请输入新密码" v-model="modifyPassForm.userPassword" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="repassword">
                <el-input placeholder="请再次输入新密码" v-model="modifyPassForm.repassword" show-password></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="position: relative">
            <el-button style="margin-left: -45px" type="primary" @click="modifyPassHandler('modifyPassForm')">修改
            </el-button>
            <el-button @click="resetForm('modifyPassForm')">重置</el-button>
          </div>
        </el-dialog>
      </div>


      <!--表格数据-->
      <div style="margin-top: 20px">
        <el-table
            ref="multipleTable"
            @select="handleSelect"
            @select-all="handleSelectAll"
            :data="tableData"
            border
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              v-if="false"
              fixed
              prop="pkid"
              label="pkid"
              width="180">
          </el-table-column>
          <el-table-column
              fixed
              prop="userUsername"
              label="用户名"
              width="100">
          </el-table-column>
          <el-table-column
              prop="userPhone"
              label="手机号"
              width="110">
          </el-table-column>
          <el-table-column
              prop="userEmail"
              label="邮箱"
              width="160">
          </el-table-column>
          <el-table-column
              prop="userRealname"
              label="真实姓名"
              width="80">
          </el-table-column>
          <el-table-column
              prop="userGender"
              label="性别"
              width="50">
            <template v-slot="scope">
              {{ scope.row.userGender === 0 ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="userBirthday"
              label="出生日期"
              :formatter="formatDate"
              width="105">
          </el-table-column>
          <el-table-column
              prop="userCollege.name"
              label="学院"
              width="120">
          </el-table-column>
          <el-table-column
              prop="userSpecialty.name"
              label="专业"
              width="140">
          </el-table-column>
          <el-table-column
              sortable
              prop="userGrade"
              label="年级"
              width="80">
          </el-table-column>
          <el-table-column
              sortable
              prop="userClass.name"
              label="班级"
              width="80">
          </el-table-column>
          <el-table-column
              prop="userStudentNo"
              label="学号"
              width="120">
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态"
              width="60">
            <template v-slot="scope">
              <template v-if="scope.row.status===0">
                <el-tag size="mini" type="danger">冻结</el-tag>
              </template>
              <template v-else>
                <el-tag size="mini">正常</el-tag>
              </template>
            </template>
          </el-table-column>

          <!--          <el-table-column-->
          <!--              label="加入社团-角色"-->
          <!--              width="150">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-tag size="mini" v-for="(item,index) in scope.row.userClubRoleRelationDTOs" :key="index">-->
          <!--                {{ item.clubEntity.clubName }}-{{ item.roleEntity.roleName }}-->
          <!--              </el-tag>-->
          <!--            </template>-->
          <!--          </el-table-column>-->

          <el-table-column
              prop="creator"
              label="创建人"
              width="100">
          </el-table-column>

          <el-table-column
              sortable
              prop="createTime"
              label="创建时间"
              width="152">
          </el-table-column>

          <el-table-column
              prop="updator"
              label="更新人"
              width="100">
          </el-table-column>

          <el-table-column
              sortable
              prop="updateTime"
              label="更新时间"
              width="152">
          </el-table-column>

          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-dropdown @command="moreCommand" style="margin-left: 10px">
                <span class="el-dropdown-link">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="'info:'+scope.row.pkid">详情</el-dropdown-item>
                  <el-dropdown-item :command="'password:'+scope.row.pkid">密码</el-dropdown-item>
                  <el-dropdown-item :command="'delete:'+scope.row.pkid">删除</el-dropdown-item>
                  <template v-if="scope.row.status===0">
                    <el-dropdown-item :command="'active:'+scope.row.pkid">激活
                    </el-dropdown-item>
                  </template>
                  <template v-if="scope.row.status===1">
                    <el-dropdown-item :command="'freeze:'+scope.row.pkid"> 冻结
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class="pagination">
        <el-pagination
            :page-size.sync="pageSize"
            :page-sizes="pageSizes"
            :current-page.sync="currentPage"
            :pager-count="pagerCount"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="sizes,prev,pager,next,jumper,->,total"
            :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>

</template>

<script>
import {
  adminModifyPass,
  createEntity, deleteById,
  deleteByIds, getCollegeSpecialtyClassTree,
  info,
  listUserWithOtherInfo,
  searchByLike,
  update
} from "@/api/user";

export default {
  name: 'ClubUser',
  methods: {

    /**
     * 格式化时间
     */
    // eslint-disable-next-line no-unused-vars
    formatDate(row, column) {
      // console.log("row:",row);
      return row.userBirthday.substr(0, 10);
    },

    /**
     * 级联选择器
     */
    handleChange(value) {
      console.log(value);
    },

    /**
     * 修改密码点击事件
     */
    modifyPassHandler(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.modifyPassForm)
          adminModifyPass(this.modifyPassForm).then(res => {
            this.$message.success(res.data.msg)
            this.modifyPassDialog = false;
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
     * 更多操作
     */
    moreCommand(command) {
      let split = command.split(':');
      let type = split[0];
      let pkid = split[1];
      if (type === 'info') {
        //详情按钮事件
        info(pkid).then(res => {
          if (res.data.code === '0') {
            console.log(res.data.data)
            this.formData = res.data.data;
          }
        }, function (err) {
          console.log(err);
        });
        this.dialogTableVisible = true;
      } else if (type === 'password') {
        //密码按钮事件
        this.modifyPassDialog = true;
        this.modifyPassForm.userPkid = pkid;
      } else if (type === 'delete') {
        //删除按钮事件
        //删除确认框
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById(pkid).then(res => {
            if (res.data.code === '0') {
              this.$message.success("删除成功");
              this.getList();
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
      } else if (type === 'active') {
        //激活按钮事件
        update({pkid: pkid, status: 1}).then(res => {
          if (res.data.code === '0') {
            this.$message.success("已激活");
            this.getList();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else if (type === 'freeze') {
        //冻结按钮事件
        update({pkid: pkid, status: 0}).then(res => {
          if (res.data.code === '0') {
            this.$message.success("已冻结");
            this.getList();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },

    /**
     *编辑抽屉关闭时
     */
    handleClose(done) {
      this.$confirm('确认关闭？你修改的内容可能会丢失')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {
          });
    },

    /**
     * 搜索框内容变化时
     */
    searchChange() {
      if (this.searchParam != null) {
        this.currentPage = 1;
      }
    },

    /**
     * 清空搜索框
     */
    clearSearch() {
      // this.currentPage = 1;
      this.pageSize = 5;
      this.getList();
    },

    /**
     * 搜索框点击事件
     */
    searchByLike: function () {
      searchByLike(this.searchParam, this.currentPage, this.pageSize).then(res => {
        console.log(res)
        if (res.data.code === '0') {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        }
      });
    },

    /**
     * 编辑按钮点击事件
     */
    handleEdit(row) {
      // console.log(row)
      this.formInline.categoryOptions = [
        {id: 0, categoryName: '男'},
        {id: 1, categoryName: '女'}
      ];
      this.getCollegeSpecialtyClassTree();
      this.editRuleForm = row;
      if (row.userCollege != null && row.userSpecialty != null && row.userClass != null) {
        this.editRuleForm.userCollege = row.userCollege.pkid;
        this.editRuleForm.userSpecialty = row.userSpecialty.pkid;
        this.editRuleForm.userClass = row.userClass.pkid;
        this.editRuleForm.selectOptions = new Array(this.editRuleForm.userCollege,
            this.editRuleForm.userSpecialty, this.editRuleForm.userClass);
      }
      // console.log(this.editRuleForm.selectOptions);
      this.drawer = true;
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
     * 批量删除点击事件
     */
    deleteCategory() {
      // console.log(this.selectPkid.toString())
      if (this.selectPkid.length == 0) {
        this.$message.warning('请勾选要删除的项！');
      } else {
        //删除确认框
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteByIds(this.selectPkid)
              .then((res) => {
                // console.log(res)
                if (res.data.code === '0') {
                  this.$message.success("删除成功");
                  this.selectPkid = [];
                  this.getList();
                } else {
                  this.$message.error(res.data.message)
                }
              }, function (err) {
                console.log(err);
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },

    /**
     * 新增按钮点击事件
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.userCollege = this.ruleForm.selectOptions[0];
          this.ruleForm.userSpecialty = this.ruleForm.selectOptions[1];
          this.ruleForm.userClass = this.ruleForm.selectOptions[2];
          createEntity(this.ruleForm)
              .then((res) => {
                console.log(res)
                if (res.data.code === '0') {
                  this.$message.success("添加成功")
                  this.getList(this.currentPage, this.pageSize)
                  this.addFormDialog = false;
                } else {
                  this.$message.error(res.data.msg)
                }
              }, function (err) {
                console.log(err);
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    /**
     * 修改表单按钮点击事件
     */
    editForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editRuleForm.userCollege = this.editRuleForm.selectOptions[0];
          this.editRuleForm.userSpecialty = this.editRuleForm.selectOptions[1];
          this.editRuleForm.userClass = this.editRuleForm.selectOptions[2];
          update(this.editRuleForm)
              .then((res) => {
                // console.log(res)
                if (res.data.code === '0') {
                  this.$message.success("修改成功");
                  this.getList(this.currentPage, this.pageSize);
                  this.drawer = false;
                } else if (res.data.code === 'WEB-400-DUPLICATE') {
                  this.$message.error(res.data.msg)
                }
              }, function (err) {
                console.log(err);
              });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    /**
     * 重置按钮点击事件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * 分类详情弹窗被关闭时的触发事件
     */
    closeDetailDialog() {
      // alert("close")
      this.formData = {};
      this.dialogTableVisible = false
    },

    /**
     * 修改密码弹窗被关闭时的触发事件
     */
    closeModifyPassDialog() {
      this.modifyPassForm = {};
      this.resetForm('modifyPassForm')
    },

    /**
     * 新增分类弹窗被关闭时的触发事件
     */
    closeAddFormDialog() {
      this.ruleForm = {};
      this.resetForm('ruleForm')
    },

    /**
     * 编辑分类弹窗被关闭时的触发事件
     */
    closeEditFormDialog() {
      this.drawer = false;
      this.editRuleForm = {};
      this.resetForm('editRuleForm')
    },

    /**
     * 每页条数改变时的触发事件
     */
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      if (this.searchParam != '') {
        this.searchByLike();
        return;
      }
      this.getList();
    },

    /**
     * 当前页改变时的触发事件
     */
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.searchParam != '') {
        this.searchByLike();
        return;
      }
      this.getList();
    },

    /**
     * 请求后台分类数据的方法
     */
    getList() {
      listUserWithOtherInfo(this.currentPage, this.pageSize)
          .then((res) => {
            // setTimeout(() => {
            // console.log("userEntity:", res)
            console.log("userEntity:", res.data.data.records)
            // console.log("userEntity:", res.data.data.records[0].clubAndRoleDTOs[0].clubEntity.clubName)
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
            // }, 300);
          }, function (err) {
            console.log(err);
          });
    },
    /**
     * 选中表格前的多选按钮
     * @param selection
     * @param row
     */
    handleSelect(selection, row) {
      // console.log(selection);
      console.log(row);
      let data = [];
      selection.forEach(item => {
        data.push(item.pkid)
      })
      this.selectPkid = data;
    },
    /**
     * 全选框事件
     * @param selection
     */
    handleSelectAll(selection) {
      console.log(selection)
      let data = [];
      selection.forEach(item => {
        data.push(item.pkid)
      })
      this.selectPkid = data;
    },
    /**
     * 清空多选框
     */
    handleClear() {
      this.selectPkid = [];
      this.$refs.multipleTable.clearSelection();
    },

    /**
     * 新增按钮的点击事件
     */
    addNew() {
      //查询所有分类，用于页面选择分类
      this.formInline.categoryOptions = [
        {id: 0, categoryName: '男'},
        {id: 1, categoryName: '女'}
      ]
      this.getCollegeSpecialtyClassTree();
      this.addFormDialog = true;
    },
  }
  ,
  data() {
    return {
      //抽屉
      drawer: false,
      //抽屉方向
      direction: 'rtl',
      formInline: {
        categoryOptions: null,
        selectedOption: ''
      },
      //搜索框
      searchParam: '',
      //修改密码的表单
      modifyPassForm: {
        userPkid: '',
        userPassword: '',
        repassword: '',
      },
      //新增表单的属性
      ruleForm: {
        userUsername: '',
        userPassword: '',
        repassword: '',
        userPhone: '',
        userEmail: '',
        userRealname: '',
        userGender: null,
        userBirthday: '',
        userCollege: '',
        userSpecialty: '',
        userGrade: '',
        userClass: '',
        userStudentNo: '',
        selectOptions: []
      },
      //编辑表单的属性
      editRuleForm: {
        pkid: '',
        userUsername: '',
        userRealname: '',
        userPhone: '',
        userEmail: '',
        roleName: '',
        userGender: '',
        userCollege: '',
        userSpecialty: '',
        userGrade: '',
        userClass: '',
        selectOptions: []
      },
      //学院-专业-班级选项
      options: [],
      modifyPassRules: {
        userPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
        repassword: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.modifyPassForm.userPassword) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
      },
      //编辑弹窗的表单校验
      rules: {
        selectOptions: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '' || value === undefined) {
                callback(new Error('请选择学院专业班级'));
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        userUsername: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
        ],
        userPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
        repassword: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.userPassword) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        userPhone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 11, max: 11, message: '长度为11个字符', trigger: 'blur'}
        ],
        userEmail: [
          {message: '请输入邮箱', trigger: 'blur'},
          {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
        ],
        userRealname: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
        ],
        userGender: [
          {required: true, message: '请选择性别', trigger: 'change'},
        ],
      },
      //修改密码弹窗是否显示
      modifyPassDialog: false,
      //添加弹窗是否显示
      addFormDialog: false,
      //编辑弹窗是否显示
      editFormDialog: false,
      //表格数据
      tableData: null,
      //分页相关变量
      pageSize: 5,//@1->此处为数据单向绑定
      pageSizes: [2, 5, 10, 20, 30, 40, 50],
      currentPage: 1,
      pagerCount: 9,
      total: 0,
      //查看弹窗是否显示
      dialogTableVisible: false,
      //弹窗表单每一行的元素的显示方式
      labelPosition: 'right',
      //详情弹窗的数据
      formData: {},
      //选中删除的选项的pkid
      selectPkid: []
    }
  },

  /**
   * 声明周期方法,页面创建时触发
   */
  created() {
    this.getList();
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-form-item__content {
  text-align: left;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  font-size: 12px;
}

.el-icon-arrow-down {
  font-size: 12px;
}

/deep/ .el-dialog__body {
  padding: 10px 20px 30px;
}

/deep/ .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #dcdfe6;
}

/deep/ .el-drawer__header {
  text-align: left;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #dcdfe6;
}

/deep/ .el-drawer__body {
  overflow-y: auto;
}

.pagination {
  padding-top: 20px;
}

/deep/ .el-dialog {
  height: 500px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
}

.el-select {
  display: table;
  position: relative;
}

.el-input {
  display: table;
  position: relative;
}

.dialog-footer {
  text-align: center;
}

.el-cascader {
  width: 100%;
}
</style>
