<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>社团管理</el-breadcrumb-item>
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
        <el-button @click="addNew" type="primary" style="float: left"><i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;新增社团
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
      <el-dialog title="社团详情" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :lock-scroll="true"
                 @close="closeDetailDialog">
        <div style="overflow-y:scroll;height: 350px">
          <el-form :label-position="labelPosition" label-width="80px"
                   style="width: 100%">
            <el-form-item label="pkid">
              <el-input readonly v-model="formData.pkid"></el-input>
            </el-form-item>
            <el-form-item label="社团名称">
              <el-input readonly v-model="formData.clubName"></el-input>
            </el-form-item>
            <el-form-item label="社团编码">
              <el-input readonly v-model="formData.clubCode"></el-input>
            </el-form-item>
            <el-form-item label="社团描述">
              <el-input readonly v-model="formData.clubDesc"></el-input>
            </el-form-item>
            <el-form-item label="社团类别">
              <el-input readonly v-model="formData.categoryName"></el-input>
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

      <!-- 查看社团成员-->
      <el-dialog title="查看社团成员" :visible.sync="clubMemberDialogTableVisible" :close-on-click-modal="false"
                 :lock-scroll="true"
                 @close="closeShowMemberDialog">
        <div style="overflow-y:scroll;height: 350px">
          <el-table
              :data="clubMemberData"
              border
              style="width: 100%">
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
                fixed="right"
                label="操作"
                width="100">
              <template slot-scope="scope">
                <el-button @click="removeUserFromClub(scope.row)" type="text" size="small">移除</el-button>
                <el-button @click="handleEdit(scope.row)" type="text" size="small">发消息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="clubMemberDialogTableVisible = false">关 闭</el-button>
        </div>
      </el-dialog>

      <!--编辑弹窗-->
      <div>
        <el-dialog title="编辑社团" :visible.sync="editFormDialog" :close-on-click-modal="false" :lock-scroll="true"
                   @close="closeEditFormDialog">
          <div style="overflow-y:scroll;height: 350px">
            <el-form :label-position="labelPosition"
                     :model="editRuleForm" :rules="rules" ref="editRuleForm"
                     class="demo-editRuleForm"
                     label-width="80px"
                     style="width: 100%">
              <el-form-item hidden label="pkid" prop="pkid">
                <el-input v-model="editRuleForm.pkid"></el-input>
              </el-form-item>
              <el-form-item label="社团名称" prop="clubName">
                <el-input v-model="editRuleForm.clubName"></el-input>
              </el-form-item>
              <el-form-item label="社团编码" prop="clubCode">
                <el-input v-model="editRuleForm.clubCode"></el-input>
              </el-form-item>
              <el-form-item label="社团类别" prop="clubCategoryId">
                <el-select v-model="editRuleForm.clubCategoryId" placeholder="请选择社团类别">
                  <el-option v-for="category in formInline.categoryOptions" :label="category.categoryName"
                             :value="category.pkid" :key="category.pkid"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="社团描述" prop="clubDesc">
                <el-input :autosize="{ minRows: 4}" :placeholder="'请输入社团描述'" type="textarea" v-model="editRuleForm.clubDesc"></el-input>
              </el-form-item>
              <el-form-item label="社团章程" prop="clubRules">
                <el-input :autosize="{ minRows: 4}" :placeholder="'请输入社团章程'" type="textarea" v-model="editRuleForm.clubRules"></el-input>
              </el-form-item>
              <el-form-item label="社团海报" prop="poster">
                <el-input :placeholder="'请输入社团海报地址'" v-model="editRuleForm.poster"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button style="margin-left: -45px" type="primary" @click="editForm('editRuleForm')">修改</el-button>
            <el-button @click="closeEditFormDialog">取消</el-button>
          </div>
        </el-dialog>
      </div>

      <!--编辑会长弹窗-->
      <div>
        <el-dialog title="更改会长" :visible.sync="editChairmanDialog" :close-on-click-modal="false" :lock-scroll="true"
                   @close="closeEditChairmanDialog">
          <div style="overflow-y:scroll;height: 350px">
            <el-form :label-position="labelPosition"
                     :model="editChairmanRuleForm" :rules="rules" ref="editChairmanRuleForm"
                     class="demo-editRuleForm"
                     label-width="80px"
                     style="width: 100%">
              <el-form-item label="会长" prop="chairmanValue">
                <el-select
                    v-model="editChairmanRuleForm.chairmanValue"
                    :filterable="true"
                    :clearable="true"
                    placeholder="请输入关键词"
                    :loading="loading">
                  <el-option
                      v-for="item in clubUserOptions"
                      :key="item.pkid"
                      :label="item.userRealname"
                      :value="item.pkid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button style="margin-left: -45px" type="primary" @click="editChairmanForm('editChairmanRuleForm')">修改
            </el-button>
            <el-button @click="closeEditChairmanDialog">取消</el-button>
          </div>
        </el-dialog>
      </div>

      <!--编辑副会长弹窗-->
      <div>
        <el-dialog title="更改副会长" :visible.sync="editViceChairmanDialog" :close-on-click-modal="false"
                   :lock-scroll="true"
                   @close="closeEditViceChairmanDialog">
          <div style="overflow-y:scroll;height: 350px">
            <el-form :label-position="labelPosition"
                     :model="editViceChairmanRuleForm" :rules="rules" ref="editViceChairmanRuleForm"
                     class="demo-editRuleForm"
                     label-width="80px"
                     style="width: 100%">
              <el-form-item label="会长" prop="viceChairmanValue">
                <el-select
                    v-model="editViceChairmanRuleForm.viceChairmanValue"
                    multiple
                    :filterable="true"
                    :clearable="true"
                    placeholder="请输入关键词"
                    :loading="loading">
                  <el-option
                      v-for="item in clubUserOptions"
                      :key="item.pkid"
                      :label="item.userRealname"
                      :value="item.pkid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button style="margin-left: -45px" type="primary"
                       @click="editViceChairmanForm('editViceChairmanRuleForm')">修改
            </el-button>
            <el-button @click="closeEditViceChairmanDialog">取消</el-button>
          </div>
        </el-dialog>
      </div>

      <!--新增表单弹窗-->
      <div>
        <el-dialog title="新增社团" :visible.sync="addFormDialog" :close-on-click-modal="false" :lock-scroll="true"
                   @close="closeAddFormDialog">
          <div style="overflow-y:scroll;height: 350px">
            <el-form :label-position="labelPosition"
                     :model="ruleForm" :rules="rules" ref="ruleForm"
                     class="demo-ruleForm"
                     label-width="80px"
                     style="width: 100%">
              <el-form-item label="社团名称" prop="clubName">
                <el-input v-model="ruleForm.clubName"></el-input>
              </el-form-item>
              <el-form-item label="社团编码" prop="clubCode">
                <el-input v-model="ruleForm.clubCode"></el-input>
              </el-form-item>
              <el-form-item label="社团描述" prop="clubDesc">
                <el-input
                    maxlength="500"
                    show-word-limit
                    type="textarea"
                    v-model="ruleForm.clubDesc">
                </el-input>
              </el-form-item>
              <el-form-item label="社团类别" prop="clubCategoryId">
                <el-select v-model="ruleForm.clubCategoryId" placeholder="请选择社团类别">
                  <el-option v-for="category in formInline.categoryOptions" :label="category.categoryName"
                             :value="category.pkid" :key="category.pkid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button style="margin-left: -45px" type="primary" @click="submitForm('ruleForm')">创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-dialog>
      </div>

      <!--表格数据-->
      <div style="margin-top: 20px">
        <el-table
            :default-sort="{prop: 'update_time', order: 'descending'}"
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
              prop="clubName"
              label="社团名称"
              width="150">
          </el-table-column>
          <el-table-column
              prop="clubCode"
              label="社团编码"
              width="150">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="clubDesc"
              label="社团描述"
              width="120">
          </el-table-column>
          <el-table-column
              :show-overflow-tooltip="true"
              prop="clubRules"
              label="社团章程"
              width="120">
          </el-table-column>
          <el-table-column
              prop="clubCategoryEntity.categoryName"
              label="社团类别"
              width="120">
          </el-table-column>

          <el-table-column
              prop="chairman.userRealname"
              label="会长"
              width="130">
          </el-table-column>

          <el-table-column
              prop="clubCategoryEntity.categoryName"
              label="副会长"
              width="120">
            <template slot-scope="scope">
              <span :v-if="scope.row.viceChairman.length===0" v-for="(item,index) in scope.row.viceChairman"
                    :key="index">
                {{ item.userRealname }}
              </span>
            </template>
          </el-table-column>

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
              width="220">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleEditChairman(scope.row)" type="text" size="small">更改会长</el-button>
              <el-button @click="handleEditViceChairman(scope.row)" type="text" size="small">更改副会长</el-button>
              <el-button @click="handleShowClubMember(scope.row)" type="text" size="small">查看社团成员</el-button>
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
  createEntity,
  deleteByIds,
  info, listClubMembers,
  listPage, removeUserFromClub,
  searchByLike,
  setClubChairman,
  setClubViceChairman,
  update
} from "@/api/club";
import {listAll} from "@/api/category";
import {listAllUsers} from "@/api/user";

export default {
  name: 'ClubClub',
  methods: {
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
            listClubMembers(clubPkid).then(res => {
              if (res.data.code === '0') {
                this.clubMemberData = res.data.data;
              } else {
                this.$message.error("刷新失败");
              }
            });
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

    /**
     * 获取副会长的pkid
     */
    getViceChairmanPkid: function (viceChairman) {
      let viceChairmanValue = [];
      for (const argument of viceChairman) {
        viceChairmanValue.push(argument.pkid);
      }
      return viceChairmanValue;
    },

    /**
     * 远程方法-获取用户列表
     */
    remoteMethod: function (query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          listAllUsers(this.currentClubPkid).then(res => {
            this.list = res.data.data;
            this.clubUserOptions = this.list.filter(item => {
              return item.userUsername.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
            });
          });
        }, 200);
      } else {
        this.clubUserOptions = [];
      }
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
      // console.log("clubRow:", row)
      //加载按钮
      listAll().then(res => {
        // console.log(res);
        this.formInline.categoryOptions = res.data.data;
      });
      this.editFormDialog = true;
      this.editRuleForm = row;
      this.editRuleForm.clubCategoryId = row.clubCategoryEntity.pkid;
      this.editRuleForm.chairmanValue = row.chairman.pkid
      this.editRuleForm.viceChairmanValue = this.getViceChairmanPkid(row.viceChairman);
      this.currentClubPkid = row.pkid;
    },

    /**
     * 修改会长按钮点击事件
     */
    handleEditChairman(row) {
      //加载社团用户数据
      listAllUsers(row.pkid).then(res => {
        this.clubUserOptions = res.data.data;
      });
      // console.log("clubRow:", row)
      this.editChairmanDialog = true;
      // this.editChairmanRuleForm = row;
      if (row.chairman !== null) {
        this.editChairmanRuleForm.chairmanValue = row.chairman.pkid;
      } else {
        this.editChairmanRuleForm.chairmanValue = '';
      }
      console.log(this.editChairmanRuleForm);
      this.editChairmanRuleForm.viceChairmanValue = this.getViceChairmanPkid(row.viceChairman);
      this.currentClubPkid = row.pkid;
      this.editChairmanRuleForm.clubPkid = row.pkid;
    },

    /**
     * 修改副会长按钮点击事件
     */
    handleEditViceChairman(row) {
      //加载社团用户数据
      listAllUsers(row.pkid).then(res => {
        this.clubUserOptions = res.data.data;
      });
      // console.log("clubRow:", row)
      this.editViceChairmanDialog = true;
      // this.editChairmanRuleForm = row;

      console.log(this.editChairmanRuleForm);
      this.editViceChairmanRuleForm.viceChairmanValue = this.getViceChairmanPkid(row.viceChairman);
      this.currentClubPkid = row.pkid;
      this.editViceChairmanRuleForm.clubPkid = row.pkid;
    },

    /**
     * 查看社团成员按钮点击事件
     */
    handleShowClubMember(row) {
      //加载社团成员数据
      listClubMembers(row.pkid).then(res => {
        if (res.data.code === '0') {
          console.log(res.data.data);
          this.clubMemberData = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
      // console.log("clubRow:", row)
      this.clubMemberDialogTableVisible = true;
      // this.editChairmanRuleForm = row;

      // console.log(this.editChairmanRuleForm);
      // this.editViceChairmanRuleForm.viceChairmanValue = this.getViceChairmanPkid(row.viceChairman);
      // this.currentClubPkid = row.pkid;
      // this.editViceChairmanRuleForm.clubPkid = row.pkid;
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
          console.log("this.editRuleForm:", this.editRuleForm);
          update(this.editRuleForm)
              .then((res) => {
                console.log(res)
                if (res.data.code === '0') {
                  this.$message.success("修改成功");
                  this.getList(this.currentPage, this.pageSize);
                  this.editFormDialog = false;
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
     * 修改会长按钮点击事件
     */
    editChairmanForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("this.editChairmanRuleForm.chairmanValue:", this.editChairmanRuleForm);
          setClubChairman(this.editChairmanRuleForm.clubPkid, this.editChairmanRuleForm.chairmanValue)
              .then(res => {
                if (res.data.code === '0') {
                  this.$message.success("修改成功");
                  this.editChairmanDialog = false;
                  this.getList();
                } else {
                  this.$message.error(res.data.msg);
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
     * 修改副会长按钮点击事件
     */
    editViceChairmanForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setClubViceChairman(this.editViceChairmanRuleForm.clubPkid, this.editViceChairmanRuleForm.viceChairmanValue)
              .then(res => {
                if (res.data.code === '0') {
                  this.$message.success("修改成功");
                  this.editViceChairmanDialog = false;
                  this.getList();
                } else {
                  this.$message.error(res.data.msg);
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
     * 查看按钮点击事件
     */
    handleClick(row) {
      // console.log(row);
      info(row.pkid).then(res => {
        if (res.data.code === '0') {
          console.log(res)
          this.formData = res.data.data;
        }
      }, function (err) {
        console.log(err);
      });
      this.dialogTableVisible = true;
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
     * 查看社团成员弹窗被关闭时的触发事件
     */
    closeShowMemberDialog() {
      // alert("close")
      // this.formData = {};
      this.clubMemberDialogTableVisible = false
      this.getList();
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
      this.editFormDialog = false;
      this.editRuleForm = {};
      // this.editRuleForm.chairmanValue = '';  //关闭编辑弹窗时将"会长"置为空
      // this.viceChairmanValue = [];  //关闭编辑弹窗时将"副会长"置为空
      this.currentClubPkid = '';  //关闭编辑弹窗时将当前社团id置为''
      this.resetForm('editRuleForm');
    },

    /**
     * 修改会长弹窗被关闭时的触发事件
     */
    closeEditChairmanDialog() {
      this.editChairmanDialog = false;
      this.resetForm('editChairmanRuleForm');
    },

    /**
     * 修改副会长弹窗被关闭时的触发事件
     */
    closeEditViceChairmanDialog() {
      this.editViceChairmanDialog = false;
      this.resetForm('editViceChairmanRuleForm');
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
      listPage(this.currentPage, this.pageSize)
          .then((res) => {
            console.log(res.data.data.records)
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
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
      console.log(selection);
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
      listAll().then(res => {
        console.log(res);
        this.formInline.categoryOptions = res.data.data;
      });
      this.addFormDialog = true;
    }
  }
  ,
  data() {
    return {
      currentEnablePkid: '',  //点击enableEdit的按钮的club pkid
      currentClubPkid: '', //当前编辑的clubPkid
      clubUserOptions: [],  //社团成员
      list: [],
      chairmanValue: '',
      viceChairmanValue: [],
      loading: false, //远程获取列表时是否显示加载中
      formInline: {
        categoryOptions: null,
        selectedOption: ''
      },
      //搜索框
      searchParam: '',
      //新增表单的属性
      ruleForm: {
        'clubName': '',
        'clubCode': '',
        'clubDesc': '',
        'clubCategoryId': '',
      },
      //编辑会长表单的属性
      editChairmanRuleForm: {
        clubPkid: '',
        chairmanValue: '',
      },

      //编辑副会长表单的属性
      editViceChairmanRuleForm: {
        clubPkid: '',
        viceChairmanValue: []
      },

      //编辑表单的属性
      editRuleForm: {
        pkid: '',
        clubName: '',
        clubCode: '',
        clubDesc: '',
        clubCategoryId: '',
        clubRules:'',
        poster:''
      },
      //编辑弹窗的表单校验
      rules: {
        clubName: [
          {required: true, message: '请输入社团名称', trigger: 'blur'},
          {min: 3, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur'}
        ],
        clubCode: [
          {required: true, message: '请输入社团编码', trigger: 'blur'},
          {min: 3, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur'}
        ],
        clubDesc: [
          {message: '请输入社团描述', trigger: 'blur'},
          {min: 0, max: 500, message: '长度在 0 到 500 个字符', trigger: 'blur'}
        ],
        clubCategoryId: [
          {required: true, message: '请选择社团分类', trigger: 'change'}
        ],
        chairmanValue: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '' || value === undefined) {
                callback(new Error('请选择会长'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        viceChairmanValue: [
          {
            validator: (rule, value, callback) => {
              // console.log(value)
              if (value === [] || value === undefined || value.length === 0) {
                callback(new Error('请选择副会长'))
              } else {
                callback()
              }
            }, trigger: 'change'
          }
        ],
      },
      //添加弹窗是否显示
      addFormDialog: false,
      //编辑弹窗是否显示
      editFormDialog: false,
      //修改会长弹窗是否显示
      editChairmanDialog: false,
      //修改副会长弹窗是否显示
      editViceChairmanDialog: false,
      //表格数据
      tableData: null,
      //社团成员数据
      clubMemberData: null,
      //分页相关变量
      pageSize: 5,//@1->此处为数据单向绑定
      pageSizes: [2, 5, 10, 20, 30, 40, 50],
      currentPage: 1,
      pagerCount: 9,
      total: 0,
      //查看弹窗是否显示
      dialogTableVisible: false,
      //查看社团成员弹窗是否显示
      clubMemberDialogTableVisible: false,
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
.el-tooltip__popper {
  max-width: 400px
}

.el-autocomplete-01 {
  width: 80px;

  /deep/ .el-input__inner {
    height: 20px;
    width: 100%;
    border-radius: 0;
    padding: 0;
  }
}

.pagination {
  padding-top: 20px;
}

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

///deep/.el-dialog::-webkit-scrollbar {
//  display: none;
//}
.el-select {
  display: table;
  position: relative;
}

.dialog-footer {
  margin-top: -30px;
  text-align: center;
}
</style>
