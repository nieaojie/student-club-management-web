<template>
  <el-menu router
           :unique-opened="true"
           :default-active="this.$route.path"
           background-color="#333744"
           text-color="#fff"
           style="margin-left: -50px"
           active-text-color="#ffd04b">

    <template v-for="(item,index) in items">
      <template v-if="item.subs">
        <!--一级菜单-->
        <el-submenu :index="item.path" :key="index+''">
          <!--图标-->
          <template slot="title">
            <i :class="item.icon"></i>
            {{ item.name }}
          </template>
          <template v-for="(subItem,index2) in item.subs">
            <el-submenu v-if="subItem.subs" :index="subItem.path" :key="index2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                {{ subItem.name }}
              </template>
              <el-menu-item v-for="(item3,index3) in subItem.subs" :index="item3.path" :key="index3+''">
                {{ item3.name }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="subItem.path" :key="index2">
              <i class="el-icon-menu"></i>
              {{ subItem.name }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.path" :key="index">
          <i :class="item.icon"></i>
          {{ item.name }}
        </el-menu-item>
      </template>
    </template>

    <!--一级菜单-->
    <!--    <el-submenu v-for="(item,index) in items" :index="item.path" :key="index+''">-->
    <!--      <template slot="title">-->
    <!--        <i class="el-icon-location"></i>-->
    <!--        <span>{{ item.name }}</span>-->
    <!--      </template>-->
    <!--      &lt;!&ndash;二级菜单&ndash;&gt;-->
    <!--      <el-menu-item :index="item2.path" v-for="(item2,index2) in item.subs" :key="index2+''">-->
    <!--        <i class="el-icon-menu"></i>-->
    <!--        <span slot="title">{{item2.name}}</span>-->
    <!--      </el-menu-item>-->
    <!--    </el-submenu>-->
  </el-menu>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      items: [
        {
          icon: 'el-icon-s-home',
          path: '/dashboard',
          name: '系统首页',
        },
        {
          icon: 'el-icon-chat-dot-square',
          path: '/message',
          name: '我的消息',
        },
        {
          icon: 'el-icon-setting',
          path: '/setting',
          name: '个人设置',
        },
        {
          path: '1',
          icon: 'el-icon-s-management',
          name: '系统管理',
          subs: [
            {
              path: '/clubCategory',
              name: '分类管理',
            },
            {
              path: '/clubClub',
              name: '社团管理',
            },
            {
              path: '/clubRole',
              name: '角色管理',
            },
            {
              path: '/clubUser',
              name: '用户管理',
            },
          ]
        },
        {
          path: '2',
          icon: "el-icon-s-cooperation",
          name: '学院管理',
          subs: [
            {
              path: '/college',
              name: '院系管理',
            },
            {
              path: '/specialty',
              name: '专业管理',
            },
            {
              path: '/class',
              name: '班级管理',
            }
          ]
        },
        {
          path: '3',
          icon: "el-icon-s-cooperation",
          name: '权限管理',
          subs: [
            {
              path: '/rights',
              name: '权限列表',
            },
            {
              path: '/roles',
              name: '角色列表',
            }
          ]
        },
      ]
    }
  },
  created() {
    let item = window.sessionStorage.getItem("userInfo");
    let userDTO = JSON.parse(item);
    if (userDTO.currentRole === '0') {
      //系统管理员
      this.items = [
        {
          icon: 'el-icon-s-home',
          path: '/dashboard',
          name: '系统首页',
        },
        {
          icon: 'el-icon-chat-dot-square',
          path: '/message',
          name: '消息管理',
        },
        {
          icon: 'el-icon-setting',
          path: '/setting',
          name: '账号设置',
        },
        {
          path: '1',
          icon: 'el-icon-s-management',
          name: '系统管理',
          subs: [
            {
              path: '/clubCategory',
              name: '分类管理',
            },
            {
              path: '/clubClub',
              name: '社团管理',
            },
            {
              path: '/clubRole',
              name: '角色管理',
            },
            {
              path: '/clubUser',
              name: '用户管理',
            },
          ]
        },
        {
          path: '2',
          icon: "el-icon-s-cooperation",
          name: '学院管理',
          subs: [
            {
              path: '/college',
              name: '院系管理',
            },
            {
              path: '/specialty',
              name: '专业管理',
            },
            {
              path: '/class',
              name: '班级管理',
            }
          ]
        },
        // {
        //   path: '3',
        //   icon: "el-icon-s-cooperation",
        //   name: '权限管理',
        //   subs: [
        //     {
        //       path: '/rights',
        //       name: '权限列表',
        //     },
        //     {
        //       path: '/roles',
        //       name: '角色列表',
        //     }
        //   ]
        // },
      ]
    } else if (userDTO.currentRole === '1') {
      //社团管理员
      this.items = [
        {
          icon: 'el-icon-s-home',
          path: '/dashboard',
          name: '系统首页',
        },
        {
          icon: 'el-icon-chat-dot-square',
          path: '/message',
          name: '我的消息',
        },
        {
          icon: 'el-icon-setting',
          path: '/setting',
          name: '个人设置',
        },
        {
          icon: 'el-icon-help',
          path: '/clubManage',
          name: '社团管理',
        },
      ]

    } else if (userDTO.currentRole === '2') {
      //学生
      this.items = [
        {
          icon: 'el-icon-s-home',
          path: '/dashboard',
          name: '系统首页',
        },
        {
          icon: 'el-icon-chat-dot-square',
          path: '/message',
          name: '我的消息',
        },
        {
          icon: 'el-icon-s-order',
          path: '/myClub',
          name: '我的社团',
        },
        {
          icon: 'el-icon-setting',
          path: '/setting',
          name: '个人设置',
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
}

.el-submenu {
  margin-left: 0;
}

.el-submenu .el-menu-item {
  padding: 0 0;
}
</style>
