<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px"
    style="width: 500px">
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
  data() {
    return {
      labelPosition: 'right',
      formData: {
        pkid: '张三',
        categoryCode: '',
        categoryName: '',
        categoryDesc: '',
        creator: '',
        createTime: '',
        updator: '',
        updateTime: '',
      }
    };
  }
}
</script>
