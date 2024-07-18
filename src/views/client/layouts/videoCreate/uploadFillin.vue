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
      <el-form-item label="封面" prop="name">
        <div class="fillInPhotoShow">
          <img :src="spliceImgList[0].img" alt="" v-if="spliceImgList" ref="changefaceImgshowphoto"/>
          <div class="changePhoto" @click="dialogVisible = true">
            <p>更改封面</p>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="标题" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
    <el-form-item label="分类" prop="count">
        <div class="block">
          <el-cascader
            v-model="ruleForm.count"
            :options="optionstype"
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
      <el-form-item label="是否定时" prop="delivery">
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
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          上传
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <ffmpegVue
      :dialogVisible="dialogVisible"
      @update:dialogVisible="handleDialogVisibleUpdate"
      :spliceImgList="spliceImgList"
      @update:changeFaceImgshow="changeFaceImgshowupdate"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, watch, onMounted,onBeforeUnmount } from "vue";
import ffmpegVue from "./ffmpegVue.vue";
import {
  getOneSort,
  getTwoType
} from "@/views/client/api/uploadFile/uploadFile";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
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
interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  location: string;
  type: string[];
  resource: string;
  desc: string;
  makeUrl:string
}
const dialogVisible = ref<boolean>(false);
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  location: "",
  type: [],
  resource: "",
  desc: "",
  makeUrl:''
});
let optionstype=reactive([])
onMounted(async()=>{
  const sort=await getOneSort()
  if(sort.data){
    sort.data.forEach(async(e:any)=>{
      e.value=e.sortId
      e.label=e.sortName
      const data=await getTwoType(e.value)
     data.data.forEach((c:any)=>{
      c.value=c.sortId
      c.label=c.sortName
     })
     e.children=data.data
      
    })
    optionstype=sort.data
    console.log(optionstype);
    
  }
  
})
const value = ref("");

const typeViedo = ["自制", "转载",];

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "请提供视频标题", trigger: "blur" },
    { min: 0, max: 30, message: "长度需要小于30并且大于0", trigger: "blur" },
  ],
  count: [
    {
      required: true,
      message: "请选择分类",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "请选择正确日期",
      trigger: "change",
    },
  ],
  location: [
    {
      required: true,
      message: "请选择视频来源",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change",
    },
  ],
  desc: [
    { required: true, message: "请提供视频介绍详细信息", trigger: "blur" },
  ],
  makeUrl: [
    { },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const handleDialogVisibleUpdate = (value: boolean) => {
  dialogVisible.value = value;
};
const changeFaceImgshowupdate= (value:any) => {
  changefaceImgshowphoto.value.src=value
};
//获取set
</script>

<style>
</style>