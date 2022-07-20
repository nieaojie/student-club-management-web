<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
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
          <el-button @click="addNew" type="primary" style="float: left"><i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;新增角色
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
      <el-dialog title="角色详情" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :lock-scroll="true"
                 @close="closeDetailDialog">
        <div style="overflow-y:scroll;height: 350px">
          <el-form :label-position="labelPosition" label-width="80px"
                   style="width: 100%">
            <el-form-item label="pkid">
              <el-input readonly v-model="formData.pkid"></el-input>
            </el-form-item>
            <el-form-item label="角色名称">
              <el-input readonly v-model="formData.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色编码">
              <el-input readonly v-model="formData.roleCode"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input readonly v-model="formData.roleDesc"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input readonly v-model="formData.status"></el-input>
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

      <!--编辑弹窗-->
      <div>
        <el-dialog title="编辑角色" :visible.sync="editFormDialog" :close-on-click-modal="false" :lock-scroll="true"
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
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="editRuleForm.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色编码" prop="roleCode">
                <el-input v-model="editRuleForm.roleCode"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="editRuleForm.roleDesc"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button style="margin-left: -45px" type="primary" @click="editForm('editRuleForm')">修改</el-button>
            <el-button @click="closeEditFormDialog">取消</el-button>
          </div>
        </el-dialog>
      </div>

      <!--新增表单弹窗-->
      <div>
        <el-dialog title="新增角色" :visible.sync="addFormDialog" :close-on-click-modal="false" :lock-scroll="true"
                   @close="closeAddFormDialog">
          <div style="overflow-y:scroll;height: 350px">
            <el-form :label-position="labelPosition"
                     :model="ruleForm" :rules="rules" ref="ruleForm"
                     class="demo-ruleForm"
                     label-width="80px"
                     style="width: 100%">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称"></el-input>
              </el-form-item>
              <el-form-item label="角色编码" prop="roleCode">
                <el-input v-model="ruleForm.roleCode" placeholder="请输入角色编码"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="roleDesc">
                <!--                <el-input v-model="ruleForm.roleDesc"></el-input>-->
                <el-input
                    type="textarea"
                    placeholder="社团描述内容"
                    v-model="ruleForm.roleDesc"
                    maxlength="300"
                    show-word-limit>
                </el-input>
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
              prop="roleName"
              label="角色名称"
              width="150">
          </el-table-column>
          <el-table-column
              prop="roleCode"
              label="角色编码"
              width="150">
          </el-table-column>
          <el-table-column
              prop="roleDesc"
              label="角色描述"
              width="120">
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态"
              width="120">
          </el-table-column>
          <el-table-column
              prop="creator"
              label="创建人"
              width="100">
          </el-table-column>

          <el-table-column
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
              prop="updateTime"
              label="更新时间"
              width="152">
          </el-table-column>

          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
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
import {createEntity, deleteByIds, info, listPage, searchByLike, update} from "@/api/role";
import {listAll} from "@/api/category";

export default {
  name: 'ClubClub',
  methods: {
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
      //加载按钮
      info(row.pkid).then(res => {
        // console.log(res);
        this.formInline.categoryOptions = res.data.data;
      });
      this.editFormDialog = true;
      this.editRuleForm = row;
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
     * 修改表单按钮点击事件
     */
    editForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          update(this.editRuleForm)
              .then((res) => {
                // console.log(res)
                if (res.data.code === '0') {
                  this.$message.success("修改成功");
                  this.getList(this.currentPage, this.pageSize);
                  this.editFormDialog = false;
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
     * 查看按钮点击事件
     */
    handleClick(row) {
      // console.log(row);
      info(row.pkid).then(res => {
        if (res.data.code === '0') {
          // console.log(res)
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
      listPage(this.currentPage, this.pageSize)
          .then((res) => {
              // console.log("roleEntity:", res)
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
      formInline: {
        categoryOptions: null,
        selectedOption: ''
      },
      //搜索框
      searchParam: '',
      //新增表单的属性
      ruleForm: {
        'roleName': '',
        'roleCode': '',
        'roleDesc': '',
      },
      //编辑表单的属性
      editRuleForm: {
        'pkid': '',
        'roleName': '',
        'roleCode': '',
        'roleDesc': '',
      },
      //编辑弹窗的表单校验
      rules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
        ],
        roleCode: [
          {required: true, message: '请输入角色编码', trigger: 'blur'},
          {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
        ],
        roleDesc: [
          {message: '请输入角色描述', trigger: 'blur'},
          {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
        ],
      },
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

.dialog-footer {
  margin-top: -30px;
  text-align: center;
}
</style>
