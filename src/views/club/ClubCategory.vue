<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px"
             style="width: 100%">
      <el-form-item label="pkid">
        <el-input readonly v-model="formData.pkid"></el-input>
      </el-form-item>
      <el-form-item label="编码">
        <el-input readonly v-model="formData.categoryCode"></el-input>
      </el-form-item>
      <el-form-item label="类别名称">
        <el-input readonly v-model="formData.categoryName"></el-input>
      </el-form-item>
      <el-form-item label="类别描述">
        <el-input readonly v-model="formData.categoryDesc"></el-input>
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
</template>

<script>
export default {
  name: 'ClubCategory',
  props: {
    formData1: {
      type: Object
    },
    labelPosition1: {
      type: String
    }
  },
  data() {
    return {
      // labelPosition: 'right',
      labelPosition: this.labelPosition1,
      // formData: {
      //   pkid: '张三',
      //   categoryCode: '',
      //   categoryName: '',
      //   categoryDesc: '',
      //   creator: '',
      //   createTime: '',
      //   updator: '',
      //   updateTime: '',
      // }
      formData: this.formData1
      // formData1: null
    };


  }
}
</script>
