<template>
    <div class="checkedMessage">
        <div class="checkMessageimg">
            <div class="checkedstate">
                <img  class='checkedstateImg' :src="noCheck" alt="" srcset="">
                <p class="checkedstateTips">您没有认证资格 点此认证</p>
            </div>
            <div class="checkedstate">
                <el-form
                label-width="auto"
                style="max-width: 600px"
              >
                <el-form-item label="姓名">
                  <el-input v-model="formLabelAlign.name" />
                </el-form-item>
                <el-form-item label="身份证号码">
                    <el-input v-model="formLabelAlign.carnum" />
                  </el-form-item>
                  <el-form-item label="身份证正反面">
                    <el-upload
                    v-model:file-list="fileList"
                    :on-change="uploadFiles"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    auto-upload='false'
                    action="#"
                    limit="2"
                  >
                    <el-icon><Plus /></el-icon>
                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                      </el-dialog>
                  </el-upload>
                  </el-form-item>
                  <div class="uploadChecked"> 
                    <el-button type="success" @click="sendQuestChecked">提交</el-button>
                    <el-button>重置</el-button>
                  </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {sendCoverimg} from "@/views/client/api/uploadFile/uploadFile";
import {uploadCheckmessage} from "@/views/streamer/api/checkedMessage/index";
import noCheck from "@/assets/images/component/noChecked.png"
import { reactive, ref } from 'vue'
const input = ref('')
const formLabelAlign=reactive({
    name:'',
    carnum:""
})
import { Plus } from '@element-plus/icons-vue'

import { ElMessage, type UploadProps, type UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const uploadFiles=async(files)=>{
    const file=files.raw
    const formdata=new FormData()
    formdata.append('file',file)
    const filedata=await sendCoverimg(formdata)
    if(filedata.code==20000){
      ElMessage.success("上传成功");
      fileList.value.push({
        name:filedata.name,
        url:filedata.data
      })
    }    
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const uploadFilesSend=async(name:any,carnum:any,fileList:[])=>{
  const uploadCheckmessagedata=await uploadCheckmessage(name,carnum,fileList)
}
const  isValidCarNum=(carnum:any)=> {

  const carnumRegex =/^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/ ;
  return carnumRegex.test(carnum);
}
const sendQuestChecked=()=>{
  if(fileList.value.length!=2){
    ElMessage.error("请您上传完整的身份证照片");
  } else if(formLabelAlign.name==''|| formLabelAlign.carnum==''){
    ElMessage.error("请您上传完整信息");
  }else if(!isValidCarNum(formLabelAlign.carnum)){
    ElMessage.error("请您上传正常身份证号码");
  }
  if(true){
    return uploadFilesSend(formLabelAlign.name,formLabelAlign.carnum,fileList.value)
  }else{
    return changeFiles(formLabelAlign.name,formLabelAlign.carnum,fileList.value)
  }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
@import "@/views/client/styles/stream/checkedMessage.scss"
</style>