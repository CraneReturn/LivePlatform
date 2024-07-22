<template>
  <div class="fillInMessage">
    <el-form
      ref="ruleFormRef"
      style="max-width: 800px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="封面" prop="coverUrl">
        
        <div class="fillInPhotoShow" v-if="ruleForm.list.length!=0">
          <img :src="ruleForm.coverUrl" alt="" ref="changefaceImgshowphoto"/>
          <div class="changePhoto">
            <ffmpegVue 
            :spliceImgList="spliceImgList"
            @update:sureChangeFaceImg="changeFaceImgshowupdate" />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
    <el-form-item label="分类" prop="count">
        <div class="block">
          <el-cascader
            v-model="ruleForm.count"
            :options="optionstype" @change="getDetailMore(ruleForm.count)"
            ></el-cascader>
            <el-cascader
            v-model="ruleForm.count2"
            :options="optionTypetype"
            v-show="ruleForm.count==''"
            ></el-cascader>
        </div>
      </el-form-item> 
      <el-form-item label="来源" prop="location">
        <el-segmented v-model="ruleForm.location" :options="typeViedo" />
      </el-form-item>
      <el-form-item label="转载地址" prop="makeUrl" v-if="ruleForm.location=='转载'">
        <el-input v-model="ruleForm.makeUrl" />
      </el-form-item>
      <el-form-item label="视频介绍" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <!-- <el-form-item label="是否定时" prop="delivery">
        <el-switch v-model="ruleForm.delivery" />
      </el-form-item>
      <el-form-item label="选择日期(15天内)" v-show="ruleForm.delivery">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="datetime"
            placeholder="请选择日期"
            format="YYYY/MM/DD hh:mm:ss"
            value-format="x"
          />
        </el-form-item>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="submitForm()">
          上传
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, watch, onMounted,onBeforeUnmount } from "vue";
import ffmpegVue from "./ffmpegVue.vue";
import {
  getOneSort,
  getTwoType,
  uploadVideo
} from "@/views/client/api/uploadFile/uploadFile";
import { ElMessage, type ComponentSize, type FormInstance, type FormRules } from "element-plus";
//集中处理
import { storeToRefs } from "pinia";
import videouploadMainStore from '@/store/video/videoUpload.ts'
const mainvideoStore=videouploadMainStore()
const {ruleForm,hasUploadedarr}=storeToRefs(mainvideoStore)
const spliceImgList = ref();
const changefaceImgshowphoto=ref()
const props = defineProps({
  hasFilesUploaded: {
    type: Array as () => any[],
    required: true,
  },
  nowtimeUploadFile: {
    type: Number,
  },
});
//监听
watch(
  () => props.hasFilesUploaded,
  (newValue) => {
    if (newValue.length != 0 && props.nowtimeUploadFile != undefined) {
      spliceImgList.value = newValue[props.nowtimeUploadFile].list;
    }
  },
  {
    immediate: true, // 立即执行一次监听函数,
    deep: true,
  }
);

// const dialogVisible = ref<boolean>(false);
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
//存储所有数据
const sendRuleForm=reactive([
])

let optionstype=ref([])
let optionTypetype=ref([])
onMounted(async()=>{
  const sort = await getOneSort()
  if (sort.data) {
    sort.data.forEach(async (e: { value: any; sortId: any; label: any; sortName: any; }) => {
      e.value = e.sortId
      e.label = e.sortName
    })
    optionstype.value=[...sort.data]
  }
  
})
//更新分类第二个数据
const getDetailMore=async(num: any[])=>{
  const sendnum=num[0]
  const data=await getTwoType(sendnum)
  if (data.data) {
    data.data.forEach((m) => {
      m.value = m.sortId
      m.label = m.sortName
    })
    optionTypetype.value=[...data.data]
  }
  
}
const typeViedo = ["自制", "转载",];

const submitForm = async () => {
  if(!ruleForm.value){
    ElMessage.error("请您上传完整信息");
    return
  }
  const {title,coverUrl,region,count,count2,location,desc,makeUrl,md5,duration,url}=ruleForm.value
  if(md5==''){
    ElMessage.error("请您上传完整视频");
  }else if(!title || !count2 ||!count || !location || !desc ){
    ElMessage.error("请您上传完整视频信息");
  }else if(location=='转载' && makeUrl==''){
    ElMessage.error("请您填写视频转载地址");
  }else{
   const senddata=uploadVideo(count2[0],coverUrl,desc,makeUrl,duration,title,location,url)
   console.log(senddata,'1111');
   
  }

};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const changeFaceImgshowupdate= (value:any) => {
  changefaceImgshowphoto.value.src=value
};
//存储所有上传的数组

//获取set
</script>

<style>
</style>