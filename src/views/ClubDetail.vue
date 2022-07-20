<template>
  <div style="height: 100%">
    <!--返回顶部的按钮-->
    <el-backtop :bottom="40">
      <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        UP
      </div>
    </el-backtop>

    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>社团详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row style="text-align: center;font-size: 30px">
      {{clubDetail.clubName}}
    </el-row>

    <el-row style="text-align: right">
      <el-button type="primary" @click="joinClub" v-if="currentClubAndUserRelation===3||currentClubAndUserRelation===4">
        <i style="margin-left: -10px" class="el-icon-plus"></i>&nbsp;&nbsp;加入社团
      </el-button>
      <el-button type="danger" @click="exitClub" v-if="currentClubAndUserRelation===1">
        <i style="margin-left: -10px" class="el-icon-circle-close"></i>&nbsp;退出社团
      </el-button>
      <el-button type="info" v-if="currentClubAndUserRelation===0">
        <i style="margin-left: -10px" class="el-icon-loading"></i>&nbsp;审核中
      </el-button>
      <el-button type="danger" @click="joinClub" v-if="currentClubAndUserRelation===2">
        <i style="margin-left: -10px" class="el-icon-warning-outline"></i>&nbsp;重新申请
      </el-button>
    </el-row>

    <!--卡片视图-->
    <el-row>
      <el-col :span="24">
        <div style="text-align: left" class="grid-content bg-purple-dark">
            <span class="title">
              社团简介
            </span>
        </div>
      </el-col>
      <el-card shadow="always">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="text-align: left">
            <span>
              &nbsp;&nbsp;&nbsp;{{ clubDetail.clubDesc === '' ? '暂无简介' : clubDetail.clubDesc }}
            </span>
          </div>
        </el-col>
      </el-card>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div style="text-align: left" class="grid-content bg-purple-dark">
            <span class="title">
              社团章程
            </span>
        </div>
      </el-col>
      <el-card shadow="always">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="text-align: left">
            <span>
              &nbsp;&nbsp;&nbsp;{{ clubDetail.clubRules === '' ? '暂无章程' : clubDetail.clubRules }}
            </span>
          </div>
        </el-col>
      </el-card>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <div style="text-align: left" class="grid-content bg-purple-dark">
            <span class="title">
              社团负责人
            </span>
        </div>
      </el-col>
      <el-card shadow="always">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
              <el-table-column
                  prop="name"
                  label="成员"
                  min-width="50%"
              >
              </el-table-column>
              <el-table-column
                  prop="role"
                  label="描述"
                  min-width="50%">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-card>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <div style="text-align: left" class="grid-content bg-purple-dark">
            <span class="title">
              社团信息
            </span>
        </div>
      </el-col>
      <el-card shadow="always">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              会员数
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              活动数
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              新闻数
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              成立天数
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px;color: rgb(0,151,137);font-weight: bolder;font-size: large">
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              {{ clubDetail.clubPersonCount }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              5
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              12
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              {{ clubDetail.createDays }}
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {exitClub, getClubDetail, joinClub, judgeClubAndUserRelation} from "@/api/club_detail";

export default {
  name: "ClubDetail",
  data() {
    return {
      clubDetail: {},
      //当前社团的pkid
      currentClubPkid: '',
      currentClubAndUserRelation: null,
      userInfo: null,
      tableData: [{
        name: '王小虎',
        role: '会长',
      }, {
        name: '王大虎',
        role: '副会长',
      }]
    }
  },
  methods: {
    /**
     * 加入社团
     */
    joinClub: function () {
      //申请加入社团
      joinClub(this.$route.query.clubId).then(res => {
        // console.log(res)
        if (res.data.code === '0') {
          this.$message.success("已提交申请，请等待管理员审核");
          this.currentClubAndUserRelation = 0;  //改变为待审核状态
        } else {
          this.$message.error(res.data.msg);
        }
        // console.log(res);
      });

    },

    /**
     * 退出社团
     */
    exitClub: function () {
      this.$confirm("次操作将退出该社团，是否继续？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        exitClub(this.$route.query.clubId).then(res => {
          if (res.data.code === '0') {
            // console.log(res);
            this.$message.success("退出成功")
            this.currentClubAndUserRelation = 3;
          }
        });
      }).catch(() => {
        this.$message.info("已取消操作")
      });
    },
    /**
     * 获取当前页面的详细信息
     */
    getClubDetail() {
      getClubDetail(this.currentClubPkid).then(res => {
        if (res.data.code === '0') {
          // console.log(res.data.data);
          this.clubDetail = res.data.data;
          //给tableDate赋值
          this.tableData[0].name = this.clubDetail.chairman.userRealname;
          this.tableData[0].role = '会长';
          let viceChairman = '';
          // console.log(viceChairman);
          if (this.clubDetail.viceChairman.length > 1) {
            let arr = new Array();
            for (let i = 0; i < this.clubDetail.viceChairman.length; i++) {
              arr.push(this.clubDetail.viceChairman[i].userRealname);
            }
            viceChairman = arr.join('，');
          } else {
            viceChairman = this.clubDetail.viceChairman[0].userRealname;
          }
          // console.log(viceChairman);
          this.tableData[1].name = viceChairman;
          this.tableData[1].role = '副会长';
          // console.log(this.clubDetail)
        } else {
          this.$message.error(res.data.msg);
        }
      })
    }
  },

  created() {
    judgeClubAndUserRelation(this.$route.query.clubId).then(res => {
      // console.log("judgeClubAndUserRelation:", res);
      this.currentClubAndUserRelation = res.data.data;
      //保存当前社团的pkid
      this.currentClubPkid = this.$route.query.clubId;
      //请求当前页面的数据
      this.getClubDetail();
    });
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-card__body {
  padding: 0;
}

.title {
  //background-color: #99a9bf;
  color: rgb(49, 183, 241);
  font-size: 30px;
}

</style>
