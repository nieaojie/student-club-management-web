<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的社团</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col class="border-card">
        <el-card>
          <div v-if="joinedClubs.length===0">暂无加入的社团</div>
          <el-tabs @tab-click="tabChange" :tab-position="tabPosition" style="height: 562px;overflow-y: scroll">
            <el-tab-pane v-for="(item,index) in joinedClubs.length" :key="joinedClubs[index].pkid"
                         :name="joinedClubs[index].pkid"
                         :label="joinedClubs[index].clubName">
              <div style="text-align: left;font-size: 22px;">【社团活动】</div>
              <div style="text-align: right;margin-right: 10px">
                <el-button type="danger" @click="exitClub(joinedClubs[index].pkid)">
                  <i style="margin-left: -10px" class="el-icon-circle-close"></i>&nbsp;退出该社团
                </el-button>
              </div>
              <el-divider></el-divider>
              <div v-if="notices.length===0">该社团暂无活动</div>
              <template v-for="(item,index) in notices">
                <div :key="notices[index].pkid">
                  <span class="word" style="text-align: left">{{ item.content }}</span>

                  <div style="text-align: right;padding-right: 10px">
                    <el-divider direction="vertical"></el-divider>
                    <span style="color: #909399;font-size: smaller">发布于 {{ item.updateTime }}</span>
                    <el-divider></el-divider>
                  </div>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import {getJoinClubByUserId} from "@/api/club";
import {getClubAllNotice} from "@/api/notice";
import {exitClub} from "@/api/club_detail";

export default {
  name: "MyClub",
  data() {
    return {
      tabPosition: 'left',
      //当前用户加入的社团信息
      joinedClubs: [],
      notices: []
    }
  },
  methods: {

    /**
     * 退出社团
     */
    exitClub: function (clubId) {
      console.log(clubId)
      this.$confirm("次操作将退出该社团，是否继续？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        exitClub(clubId).then(res => {
          if (res.data.code === '0') {
            // console.log(res);
            this.$message.success("退出成功");
            //刷新当前页面
            window.location.reload();
          }
        });
      }).catch(() => {
        this.$message.info("已取消操作")
      });
    },

    // eslint-disable-next-line no-unused-vars
    tabChange(tab, event) {
      // console.log(tab.name, event);
      //请求该社团的公告内容
      getClubAllNotice(tab.name, 1).then(res => {
        if (res.data.code === '0') {
          this.notices = res.data.data;
          // console.log(res.data.data);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }

  },
  created() {
    getJoinClubByUserId().then(res => {
      if (res.data.code === '0') {
        this.joinedClubs = res.data.data;
        // console.log(res.data.data);
      } else {
        this.$message.error(res.data.msg);
      }
    });
  }
}
</script>

<style lang="less" scoped>
.word {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
}
</style>
