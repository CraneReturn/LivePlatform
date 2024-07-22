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
      <el-form-item label="视频类型" prop="desc">
        <el-tag
        v-for="tag in ruleForm.dynamicTags"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
        +视频标签
      </el-button>
      </el-form-item>
      <el-form-item label="视频介绍" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
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
import { reactive, ref, defineProps, watch, onMounted,onBeforeUnmount, nextTick } from "vue";
import ffmpegVue from "./ffmpegVue.vue";
import {
  getOneSort,
  getTwoType,
  uploadVideo
} from "@/views/client/api/uploadFile/uploadFile";
import { ElMessage, type ComponentSize, type FormInstance, type FormRules, ElInput } from "element-plus";
//集中处理
import { storeToRefs } from "pinia";
import videouploadMainStore from '@/store/video/videoUpload.ts'
const mainvideoStore=videouploadMainStore()
const {ruleForm,hasUploadedarr}=storeToRefs(mainvideoStore)
const spliceImgList = ref();
const changefaceImgshowphoto=ref()
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
  const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    console.log(ruleForm.value.dynamicTags);
    
    ruleForm.value.dynamicTags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
const handleClose = (tag: string) => {
  ruleForm.value.dynamicTags.splice(ruleForm.value.dynamicTags.indexOf(tag), 1)
}
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
  const {title,coverUrl,region,count,count2,location,desc,makeUrl,md5,duration,url,dynamicTags}=ruleForm.value
  if(md5==''){
    ElMessage.error("请您上传完整视频");
  }else if(!title || !count2 ||!count || !location || !desc ){
    ElMessage.error("请您上传完整视频信息");
  }else if(location=='转载' && makeUrl==''){
    ElMessage.error("请您填写视频转载地址");
  }else if(dynamicTags.length==0){
    ElMessage.error("请你输入标签类型");
  }
  else{
   const senddata=await uploadVideo(count2[0],coverUrl,desc,makeUrl,duration,title,location,url,dynamicTags)
   
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