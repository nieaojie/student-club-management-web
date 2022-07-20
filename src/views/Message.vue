<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的消息</el-breadcrumb-item>
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
            <!--            <el-form-item  label="pkid">-->
            <!--              <el-input readonly v-model="formData.pkid"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item label="消息标题">
              <el-input readonly v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="消息类型">
              <el-input readonly :value="messageType(formData.type)"></el-input>
            </el-form-item>
            <el-form-item label="消息内容">
              <el-input readonly v-model="formData.content"></el-input>
            </el-form-item>
            <el-form-item label="发送人">
              <el-input readonly v-model="formData.sender"></el-input>
            </el-form-item>
            <el-form-item label="发送时间">
              <el-input readonly v-model="formData.sendTime"></el-input>
            </el-form-item>
            <el-form-item label="接收人">
              <el-input readonly v-model="formData.receiver"></el-input>
            </el-form-item>
            <el-form-item label="接收时间">
              <el-input readonly v-model="formData.receiveTime"></el-input>
            </el-form-item>
            <el-form-item label="消息状态">
              <el-input readonly :value="messageStatus(formData.status)"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogTableVisible = false">关 闭</el-button>
        </div>
      </el-dialog>
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
              :v-if="true"
              fixed
              prop="title"
              label="消息标题"
              width="100">
          </el-table-column>
          <el-table-column
              prop="content"
              label="消息内容"
              width="300">
          </el-table-column>
          <el-table-column
              prop="sender"
              label="发送人"
              width="100">
          </el-table-column>
          <el-table-column
              prop="sendTime"
              label="发送时间"
              width="152">
          </el-table-column>
          <el-table-column
              prop="status"
              label="消息状态"
              width="80">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status===0">{{ messageStatus(scope.row.status) }}</el-tag>
              <el-tag type="info" v-if="scope.row.status===1">{{ messageStatus(scope.row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="type"
              label="消息类型"
              width="100">
            <template slot-scope="scope">
              <el-tag>{{ messageType(scope.row.type) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="receiver"
              label="接收人"
              width="100">
            <!--            <template slot-scope="scope">-->
            <!--              &lt;!&ndash;              {{ getReceiverName(scope.row.receiver) }}&ndash;&gt;-->
            <!--              {{ getReceiverName(scope.row.receiver) }}-->
            <!--            </template>-->
          </el-table-column>

          <el-table-column
              prop="receiveTime"
              label="接收时间"
              width="152">
          </el-table-column>

          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="deleteMessage(scope.row.pkid)" type="text" size="small">删除</el-button>
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

import {deleteById, deleteByIds, listPage} from "@/api/message";
import {searchUserMessages} from "@/api/club_detail";
import {listAllUsers} from "@/api/user";

export default {
  name: "Message",
  data() {
    return {
      //用户列表
      userMap: null,
      //表格数据
      tableData: null,
      //详情弹窗的数据
      formData: {},
      //弹窗表单每一行的元素的显示方式
      labelPosition: 'right',
      //搜索框
      searchParam: '',
      //查看弹窗是否显示
      dialogTableVisible: false,
      //分页相关变量
      pageSize: 5,//@1->此处为数据单向绑定
      pageSizes: [2, 5, 10, 20, 30, 40, 50],
      currentPage: 1,
      pagerCount: 9,
      total: 0,
      //选中删除的选项的pkid
      selectPkid: []
    }
  },
  methods: {
    /**
     * 获取用户列表
     */
    listAllUser() {
      let map = new Map();
      listAllUsers().then(res => {
        if (res.data.code === '0') {
          res.data.data.forEach(i => {
            map.set(i.pkid, i.userRealname);
          })
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.userMap = map;
    },

    /**
     * 删除消息
     */
    deleteMessage(messagePkid) {
      this.$confirm('此操作将永久删除该条消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(messagePkid).then(res => {
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
    },

    /**
     * 系统消息
     */
    messageType: function (type) {
      if (type === 0) {
        return "通知";
      }
      if (type === 1) {
        return "系统消息";
      }
      return "未知";
    },

    /**
     *  计算消息的状态
     */
    messageStatus: function (status) {
      if (status === 0) {
        return "未读";
      }
      if (status === 1) {
        return "已读";
      }
      return "未知";
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
     * 查看按钮点击事件
     */
    handleClick(row) {
      // console.log(row)
      this.formData = row;
      this.dialogTableVisible = true;
    },

    /**
     * 选中表格前的多选按钮
     * @param selection
     * @param row
     */
    // eslint-disable-next-line no-unused-vars
    handleSelect(selection, row) {
      // console.log(selection);
      // console.log(row);
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
      // console.log(selection)
      let data = [];
      selection.forEach(item => {
        data.push(item.pkid)
      })
      this.selectPkid = data;
    },

    /**
     * 详情弹窗被关闭时的触发事件
     */
    closeDetailDialog() {
      this.formData = {};
      this.dialogTableVisible = false;
    },

    /**
     * 清空多选框
     */
    handleClear() {
      this.selectPkid = [];
      this.$refs.multipleTable.clearSelection();
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
     * 搜索框点击事件
     */
    searchByLike: function () {
      // searchByLike(this.searchParam, this.currentPage, this.pageSize).then(res => {
      //   console.log(res)
      //   if (res.data.code === '0') {
      //     this.tableData = res.data.data.records;
      //     this.total = res.data.data.total;
      //   }
      // });
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
      this.pageSize = 5;
      this.getList();
    },

    /**
     * 请求后台分类数据的方法
     */
    getList() {
      let item = window.sessionStorage.getItem("userInfo");
      let userUsername = JSON.parse(item).userUsername;
      if (userUsername === 'admin') {
        listPage(this.currentPage, this.pageSize)
            .then((res) => {
              this.tableData = res.data.data.records;
              this.tableData.forEach(i => {
                i.receiver = this.userMap.get(i.receiver);
              })
              // console.log(this.tableData);
              this.total = res.data.data.total;
            }, function (err) {
              console.log(err);
            });
      } else {
        searchUserMessages(2).then(res => {
          if (res.data.code === '0') {
            this.tableData = res.data.data;
            // console.log(this.tableData);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
  },
  /**
   * 声明周期方法,页面创建时触发
   */
  created() {
    this.listAllUser(); //初始化用户数据
    this.getList();
  },
  computed: {}
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 10px 20px 30px;
}

/deep/ .el-dialog__header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #dcdfe6;
}

/deep/ .el-form-item__content {
  text-align: left;
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

.dialog-footer {
  margin-top: -10px;
  text-align: center;
}
</style>
