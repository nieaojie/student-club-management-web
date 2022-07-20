<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="name"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="图标" prop="icon"></el-table-column>
      </el-table>

      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        点我打开
      </el-button>
      <el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
        <div v-for="(item,index) in 100" :key="index+''"> <span >我来啦!</span></div>
      </el-drawer>

    </el-card>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Rights",
  data() {
    return {
      //权限列表
      rightsList: [],
      drawer: false,
      direction: 'rtl',
    }
  },
  //获取所有权限
  created() {
    this.getRightsList();
  },
  methods: {

    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
    },

    /**
     * 获取权限列表
     */
    getRightsList: function () {
      axios.get('/permission/listAll').then(res => {
        // console.log(res)
        this.rightsList = res.data.data;
      });
    },
  }
}
</script>

<style scoped>

</style>
