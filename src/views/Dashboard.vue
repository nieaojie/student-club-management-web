<template>
  <div>
    <!--走马灯标题-->
    <el-row>
      <el-col :span="24">
        <div style="font-size: 30px;font-weight: bolder" class="grid-content bg-purple-dark">热门社团</div>
      </el-col>
    </el-row>
    <!--走马灯-->
    <el-card shadow="always">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in carousel" :key="item.clubId">
          <el-image
              style="height: 100%;width: 100%"
              @click="handleScrollImg(item)"
              :src="item.img">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </el-card>

    <el-row>
      <el-col :span="24">
        <div style="font-size: 30px;font-weight: bolder" class="grid-content bg-purple-dark">所有社团</div>
      </el-col>
    </el-row>

    <template v-for="i in clubData.length">
      <template v-if="i%3===1">
        <el-row :key="i">
          <el-col :span="8" v-for="j in 3" :key="j">
            <el-card @click.native="test(clubData[(i+j)-2].pkid)" class="box-card" shadow="hover" :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>{{ clubData[(i+j)-2].clubName }}</span>
              </div>
              <el-image
                  style="width: 420px;height: 630px"
                  :src="clubData[(i+j)-2].poster"
                  :fit="'cover'">
              </el-image>
              <div style="padding: 14px;">
                <span>{{ clubData[(i+j)-2].clubDesc.substr(0,47) }}...</span>
<!--                <div class="bottom clearfix">-->
<!--                  123-->
<!--                </div>-->
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
    </template>
  </div>
</template>

<script>
import {listPage} from "@/api/club";

export default {
  name: "Dashboard",
  data() {
    return {
      carousel: [
        {
          img: 'https://z3.ax1x.com/2021/04/14/cc82tK.jpg',
          clubId: '1369645549495316482',
        },
        {
          img: 'https://z3.ax1x.com/2021/04/14/ccG04f.jpg',
          clubId: '1369646914732879873',
        },
        {
          img: 'https://z3.ax1x.com/2021/04/17/c4zLvV.jpg',
          clubId: '1369645733486850049',
        },
      ],
      clubData: [],
    }
  },
  created() {
    listPage(1,9).then(res => {
      if (res.data.code === '0') {
        // console.log(res.data.data.records)
        this.clubData = res.data.data.records;
      }
    });
  },
  methods: {
    load() {
      alert('加载新的内容');
    },

    test(pkid) {
      // this.$message.success("点击了卡片:" + pkid);
      this.$router.push({path: '/clubDetail', query: {clubId: pkid}});
    },

    handleScrollImg: function (item) {
      // this.$message.info('点击了：' + item.clubId);
      this.$router.push({path: '/clubDetail', query: {clubId: item.clubId}});
    }
  },
}
</script>

<style lang="less" scoped>

.el-card:hover {
  background-color: #6161c9;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 420px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

</style>
