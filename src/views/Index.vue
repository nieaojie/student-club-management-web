<template>
  <el-container class="home-container">
    <!--头部-->
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <!--侧边-->
      <el-aside style="width: 200px">
        <SideBar></SideBar>
      </el-aside>
      <!--中间主体内容-->
      <el-main style="border: 1px solid red">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<style lang="less" scoped>
.home-container {
  height: 100%;
  border: 1px solid #eee
}

.el-header {
  background-color: #242f42;
  color: #fff;
  //line-height: 60px;
  text-align: right;
  font-size: 12px;
  border: 2px solid yellow
}

.el-aside {
  width: 100px;
  background-color: #333744;
  color: #333;
  //background-color: rgb(238, 241, 246);
  border: 2px solid blue
}

el-container {
  background-color: #EAEDF1;
  border: 5px solid red;
}

</style>

<script>


import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default {
  name: 'Index',
  components: {SideBar, Header},
  data() {
    return {}
  },
  methods: {}
};
</script>
