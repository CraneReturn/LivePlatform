<template>
  <div class="changeMessgaeConten">
    <div class="messageTitilePerson">
      <p>个人资料</p>
    </div>
    <div class="messageBasic">
      <p>基本信息</p>
      <div class="formPersonMessage">
        <div class="messageChangeform">
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="昵称" prop="name">
              <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="性别" prop="region">
              <el-radio-group v-model="ruleForm.region" class="ml-4">
                <el-radio label="男" size="large">男</el-radio>
                <el-radio label="女" size="large">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker v-model="ruleForm.date1" type="date" placeholder="选择生日" :size="size" />
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item label="介绍" prop="desc">
              <el-input v-model="ruleForm.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
              <el-button @click="resetForm(ruleFormRef)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="photoChange" style="list-style: unset">
          <div class="photoShowChange">
            <div class="radiusPhotoConten">
              <img :src="avatar" alt="" srcset="">
              <div class="inputChangePhoto">
                <input type="file" name="" id="" @change="changePersonimg">
              </div>
              <div class="changeIcon">
                <div class="changeIconCover">
                  <div class="changeIconTakePhoto">
                    <svg t="1720597750459" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="4258" width="50" height="50">
                      <path
                        d="M512 341.333333c-117.845333 0-213.333333 95.488-213.333333 213.333334s95.488 213.333333 213.333333 213.333333 213.333333-95.488 213.333333-213.333333-95.488-213.333333-213.333333-213.333334z m0-42.666666c141.397333 0 256 114.581333 256 256s-114.602667 256-256 256c-141.418667 0-256-114.581333-256-256s114.581333-256 256-256z m279.616-42.325334h104.448a85.674667 85.674667 0 0 1 85.568 85.269334l1.706667 469.12a84.650667 84.650667 0 0 1-85.077334 85.056l-767.936-1.813334a85.973333 85.973333 0 0 1-85.674666-85.504l-1.685334-466.816a84.928 84.928 0 0 1 84.992-85.312h130.410667c11.861333 0 25.792-8.618667 31.125333-19.221333l34.858667-69.376c10.496-20.906667 38.144-38.08 61.674667-38.186667l276.928-1.344c23.637333-0.128 51.2 16.853333 61.824 37.952l35.904 71.253334c5.290667 10.496 19.114667 18.922667 30.933333 18.922666z m0 42.666667c-27.882667 0-56.469333-17.472-69.034667-42.410667l-35.904-71.253333c-3.349333-6.656-16.128-14.506667-23.509333-14.464l-276.906667 1.344c-7.466667 0.021333-20.48 8.106667-23.786666 14.677333l-34.858667 69.376c-12.586667 25.024-41.237333 42.730667-69.248 42.730667H127.957333c-23.466667 0-42.410667 18.986667-42.325333 42.474667l1.706667 466.837333a43.306667 43.306667 0 0 0 43.093333 42.986667l767.914667 1.813333a41.984 41.984 0 0 0 42.304-42.24l-1.685334-469.12a43.008 43.008 0 0 0-42.88-42.752h-104.469333zM506.666667 714.666667a21.333333 21.333333 0 1 1 0-42.666667c61.866667 0 112-50.133333 112-112a21.333333 21.333333 0 0 1 42.666666 0 154.666667 154.666667 0 0 1-154.666666 154.666667z"
                        fill="#707070" p-id="4259"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="changePhotoTitle">
              <p>
                上传头像照片
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { userStore } from "@/store/user";
import { storeToRefs } from "pinia";
const store = userStore();
const { avatar,userId} = storeToRefs(store);
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
import {
  sendCoverimg
} from "@/views/client/api/uploadFile/uploadFile";
import { getUsermessages,changeUsermessages } from '@/views/client/api/user/changeMessage.ts'
import { ElMessage } from "element-plus";
//先获取用户信息
onMounted(async () => {  
  const userdata = await getUsermessages()
  if (userdata.code != 20000) {
    ElMessage.error("请您先登陆");
    return
  }
  const { birthday, nickname, sex, intr } = userdata.data
  ruleForm.name = nickname
  const newaver = userdata.data.avatar
  avatar.value = newaver ? newaver :  avatar.value  
  ruleForm.region = sex
  
  ruleForm.date1 = birthday
  ruleForm.desc = intr
  
})
const ruleForm = reactive({
  name: "Hello",
  region: "",
  date1: "",
  resource: "",
  desc: "",
});
const changePersonimg = async (event: any) => {
  const file = event.target.files[0];
  if (event.target.files[0].type != "image/png") {
    ElMessage.error("请您上传图片文件");
    return;
  }
  const formdata = new FormData()
  formdata.append('file', file)
  const filedata = await sendCoverimg(formdata)
  console.log(filedata);

  if (filedata.code == 20000) {
    ElMessage.success("上传头像图片成功");
    avatar.value = filedata.data
  }

};
const rules = reactive({
  name: [
    {
      required: true,
      trigger: "blur",
      message: "昵称不能为空",
    },
    {
      min: 1,
      message: "昵称不能为空",
      trigger: "blur",
      informType: "warning",
    },
  ],
  region: [
    {
      required: true,
      message: "请选择性别",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "请选择生日时间",
      trigger: "change",
    },
  ],
  desc: [{ required: false, message: "请填写个人介绍", trigger: "blur" }],
});

const submitForm = async () => {
  const {name,region,date1,desc}=ruleForm
  if(name==''||region==''||date1==''||desc==''){
    ElMessage.error("请上传完整信息");
  }
  const changedata=await changeUsermessages(userId.value,name,region,date1,desc,avatar.value)
  if(changedata.code==20000){
    ElMessage.success("更改个人信息成功");
  }
  
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style>
.photoShowChange .radiusPhotoConten img {
  height: 100%;
}
</style>