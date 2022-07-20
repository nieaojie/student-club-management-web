<template>
  <div style="height: 100%">
    <!--logo-->
    <span class="logo">
      社团管理系统：{{
        userDto.currentRole === '0' ? "系统管理员版v1.0" : userDto.currentRole === '1' ? '社团管理员版v1.0' : '学生版v1.0'
      }}
    </span>

    <span style="font-size: 14px;margin-top: 21px;padding-right: 20px;display: inline-block">
       {{ nowTime }}
      </span>
    <div style="float: right">
      <!--      <div class="demo-basic&#45;&#45;circle" style="float: left;margin: 5px 10px">-->
      <!--        <div class="cursor">-->
      <!--          <el-avatar :size="40" :src="circleUrl"></el-avatar>-->
      <!--        </div>-->
      <!--      </div>-->



      <el-popover
          placement="top-end"
          width="220"
          trigger="click">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="'通知('+notifyMessage.length+')'" name="first">
            <div class="message-item" v-for="item in notifyMessage" :key="item.pkid" @click="seeMessageDetail(item)">
              <el-tag type="success" size="mini">{{ item.title }}</el-tag>
              <el-button type="text" size="small">{{ item.content }}</el-button>
              <el-divider></el-divider>
            </div>
          </el-tab-pane>

          <el-tab-pane :label="'系统消息('+sysMessageMessage.length+')'" name="second">
            <div class="message-item" v-for="item in sysMessageMessage" :key="item.pkid"
                 @click="seeMessageDetail(item)">
              <el-tag type="success" size="mini">{{ item.title }}</el-tag>
              {{ item.content }}
              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="see-more" @click="seeMoreMessage">查看更多</div>
        <span class="message cursor" slot="reference" @click="seeMessage">
        <el-badge :value="messageCount" class="item">
          <i style="font-size: 20px" class="el-icon-bell"></i>
      </el-badge>
    </span>
      </el-popover>

      <!--退出按钮-->
      <el-dropdown trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
      <el-button type="text">{{ this.userDto.userUsername }}</el-button>
    </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="setting">个人设置</el-dropdown-item>
          <el-dropdown-item command="quit" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--     消息详情弹窗-->
    <el-dialog style="text-align: center" title="消息详情" :visible.sync="dialogTableVisible" :close-on-click-modal="false"
               :lock-scroll="true"
               @close="closeDetailDialog">
      <div style="overflow-y:scroll;height: 350px">
        <el-form :label-position="labelPosition" label-width="80px"
                 style="width: 100%">
          <el-form-item label="标题">
            <el-input readonly v-model="messageDetail.title"></el-input>
          </el-form-item>
          <el-form-item label="发送时间">
            <el-input readonly v-model="messageDetail.createTime"></el-input>
          </el-form-item>
          <el-form-item label="消息类型">
            <el-input readonly v-model="messageType"></el-input>
          </el-form-item>
          <el-form-item label="发送人">
            <el-input readonly v-model="messageDetail.creator"></el-input>
          </el-form-item>
          <el-form-item label="消息内容">
            <el-input type="textarea" readonly v-model="messageDetail.content"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" v-if="messageDetail.type===0">
        <el-button type="primary" @click="markRead(messageDetail.pkid)">标记已读</el-button>
        <el-button type="danger" @click="deleteMessage(messageDetail.pkid)">删除</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="messageDetail.type===1">
        <el-button type="primary" @click="agreeJoin(messageDetail.pkid)">同意</el-button>
        <el-button type="danger" @click="disagreeJoin(messageDetail.pkid)">拒绝</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {searchUserMessages} from "@/api/club_detail";
import {agreeJoinClub, disagreeJoinClub} from "@/api/club";
import {deleteById, markRead} from "@/api/message";

export default {
  name: "Header",
  methods: {

    /**
     * 查看更多消息
     */
    seeMoreMessage() {
      this.$router.push('/message');
    },

    /**
     * 拒绝加入社团
     */
    disagreeJoin(messagePkid) {
      // console.log(messagePkid);
      disagreeJoinClub(messagePkid).then(res => {
        if (res.data.code === '0') {
          this.$message.success("已拒绝加入");
          //关闭消息弹窗
          this.dialogTableVisible = false;
          //重新获取当前用户的消息
          this.searchUserMessages();
          //判断当前是不是消息页面，是-刷新页面
          if (this.$route.path === '/message') {
            window.location.reload();
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /**
     * 删除消息
     */
    deleteMessage(messagePkid) {
      deleteById(messagePkid).then(res => {
        if (res.data.code === '0') {
          this.$message.success("删除成功");
          //关闭消息弹窗
          this.dialogTableVisible = false;
          //重新获取当前用户的消息
          this.searchUserMessages();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /**
     *  消息-标记已读
     */
    markRead(messagePkid) {
      markRead(messagePkid).then(res => {
        if (res.data.code === '0') {
          this.$message.success("标记已读");
          //关闭消息弹窗
          this.dialogTableVisible = false;
          //重新获取当前用户的消息
          this.searchUserMessages();
          //判断当前是不是消息页面，是-刷新页面
          if (this.$route.path === '/message') {
            window.location.reload();
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /**
     * 同意加入社团
     */
    agreeJoin(messagePkid) {
      agreeJoinClub(messagePkid).then(res => {
        if (res.data.code === '0') {
          this.$message.success("已同意该申请");
          //关闭消息弹窗
          this.dialogTableVisible = false;
          //重新获取当前用户的消息
          this.searchUserMessages();
          //判断当前是不是消息页面，是-刷新页面
          if (this.$route.path === '/message') {
            window.location.reload();
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /**
     * 消息详情页被关闭时的点击事件
     */
    closeDetailDialog() {
      this.dialogTableVisible = false;
    },

    /**
     * 查看消息详情
     */
    seeMessageDetail(item) {
      this.messageDetail = item;
      this.dialogTableVisible = true;
    },

    /**
     * 查看消息
     */
    seeMessage() {
      if (this.activeName === 'first') {
        //通知

      }
      if (this.activeName === 'second') {
        //系统消息
      }
    },

    /**
     * 标签页的点击事件
     */
    handleClick(tab, event) {
      this.searchUserMessages();
      if (tab.name == 'first') {
        // this.$message.success("first");
      } else if (tab.name == 'second') {
        // this.$message.success("second");
      }
      console.log(event);
    },

    /**
     * 右上角的按钮操作
     */
    handleCommand(command) {
      if (command === 'quit') {
        window.sessionStorage.clear();
        //清除token
        this.$router.push('/login');
        //跳转到登录页
        this.$notify.success({
          "title": '退出成功',
        });
      }
      if (command === 'setting') {
        // this.$message.info('点击了个人设置')
        this.$router.push('/setting');
      }
    },
    /**
     * 查询用户消息
     */
    searchUserMessages() {
      searchUserMessages(0).then(res => {
        if (res.data.code === '0') {
          this.messageCount = res.data.data.length;
          let notifyMessage = [];
          let sysMessageMessage = [];
          for (const item of res.data.data) {
            if (item.type === 0) {
              notifyMessage.push(item);
            }
            if (item.type === 1) {
              sysMessageMessage.push(item);
            }
          }
          this.notifyMessage = notifyMessage;
          this.sysMessageMessage = sysMessageMessage;
        } else {
          console.log(res);
        }
      });
    },

    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
          new Date(timeStamp).getMonth() + 1 < 10
              ? "0" + (new Date(timeStamp).getMonth() + 1)
              : new Date(timeStamp).getMonth() + 1;
      let date =
          new Date(timeStamp).getDate() < 10
              ? "0" + new Date(timeStamp).getDate()
              : new Date(timeStamp).getDate();
      let hh =
          new Date(timeStamp).getHours() < 10
              ? "0" + new Date(timeStamp).getHours()
              : new Date(timeStamp).getHours();
      let mm =
          new Date(timeStamp).getMinutes() < 10
              ? "0" + new Date(timeStamp).getMinutes()
              : new Date(timeStamp).getMinutes();
      let ss =
          new Date(timeStamp).getSeconds() < 10
              ? "0" + new Date(timeStamp).getSeconds()
              : new Date(timeStamp).getSeconds();
      let week = new Date(timeStamp).getDay();
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      let getWeek = " 星期" + weeks[week];
      this.nowTime =
          year +
          "年" +
          month +
          "月" +
          date +
          "日" +
          " " +
          hh +
          ":" +
          mm +
          ":" +
          ss +
          getWeek;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear()
    },
    clear() {
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    }
  },
  created() {
    this.nowTimes();
    let item = window.sessionStorage.getItem("userInfo");
    let userDTO = JSON.parse(item);
    this.userDto = userDTO;
    // console.log(this.userDto)
    this.searchUserMessages();
    setInterval(() => {
      this.searchUserMessages();
    }, 60000 * 5);
  },
  data() {
    return {
      nowTime: "",
      messageDetail: {},  //消息详情数据【单条】
      labelPosition: 'right', //弹窗表单每一行的元素的显示方式
      dialogTableVisible: false, //消息详情弹窗
      messageCount: 0,//未读消息数量
      notifyMessage: [],//通知消息
      sysMessageMessage: [], //系统消息
      activeName: 'first',
      userDto: null,
      fit: 'cover',
      circleUrl: "https://qiniu.cdn.duohui.co/brand/youke-icon.svg",
      size: "50"
    }
  },
  computed: {
    messageType: function () {
      if (this.messageDetail.type === 0) {
        return "通知";
      } else if (this.messageDetail.type === 1) {
        return "系统消息";
      }
      return null;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
  height: 500px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
}

.dialog-footer {
  text-align: center;
  margin-top: -30px;
}

.el-divider {
  margin: 5px 0;
}

.el-tabs {
  font-size: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.message-item {
  cursor: pointer;
  width: 210px;
}

.message-item:hover {
  background-color: #d3dce6;
}


/deep/ .el-popover el-popper {
  margin: 0;
  padding-top: 10px;
}

.see-more {
  cursor: pointer;
  border-radius: 5px;
  width: 220px;
  text-align: center;
  margin-top: 10px;
  border: 1px grey dashed;
}

.see-more:hover {
  color: #409EFF;
  border-color: #409EFF;
}

.item {
  margin-top: 20px;
  margin-right: 30px;
}

.message {
  text-align: center;
  display: inline-block;
  width: 30px;
  height: 50px;
  margin-right: 10px;

}

.cursor {
  cursor: pointer;

  :hover {
    border: white;
  }
}

.block {

}

header .logo {
  float: left;
  display: block;
  padding-top: 12px;
  font-size: 22px;
}

.el-dropdown {
  float: right;
}

.el-dropdown-link {
  display: inline-block;
  height: 50px;
  padding-top: 10px;
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
