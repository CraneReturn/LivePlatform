<template>
    <div id="app">
        <div style="width: 98%;height: 98%;margin-top: 20px;">
               <el-row :gutter="20">
                   <el-col :span="24">
                       <el-form :inline="true" :model="formInline" class="demo-form-inline">
                         <el-form-item label="选择摄像头">
                           <el-select v-model="formInline.videoId" placeholder="摄像头">
                             <el-option v-for="(item,index) in localDevice.videoIn " :key="index" :label="item.label" :value="item.id"></el-option>
                           </el-select>
                         </el-form-item>
                         <el-form-item label="选择麦克风">
                           <el-select v-model="formInline.audioInId" placeholder="麦克风">
                             <el-option v-for="(item,index) in localDevice.audioIn " :key="index" :label="item.label" :value="item.id"></el-option>
                           </el-select>
                         </el-form-item>
                         <el-form-item label="选择听筒">
                           <el-select v-model="formInline.audioOutId" placeholder="听筒">
                             <el-option v-for="(item,index) in localDevice.audioOut " :key="index" :label="item.label" :value="item.id"></el-option>
                           </el-select>
                         </el-form-item>
                         <el-form-item label="分辨率:Width">
                           <el-input v-model="formInline.width"></el-input>
                         </el-form-item>
                         <el-form-item label="分辨率:Height">
                           <el-input v-model="formInline.height"></el-input>
                         </el-form-item>
                         <el-form-item label="FPS">
                           <el-input v-model="formInline.frameRate"></el-input>
                         </el-form-item>
                         <el-form-item>
                           <el-button type="primary" @click="onSubmit">确定</el-button>
                         </el-form-item>
                       </el-form>
                   </el-col>
               </el-row>
               <el-row>
                   <video id="localdemo01" autoplay controls muted ref="videoPut"></video>
               </el-row>
           </div>
       </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import VideoStream from './api/putStream';
import formInline from './api/putStream/data'
const videoPut=ref<HTMLVideoElement>();
const videoStream =new VideoStream()
let localDevice=ref()
onBeforeMount(()=>{
    videoStream.getVideo() 
    videoStream.getFormLine(formInline)
    console.log(videoStream.localDevice);
    localDevice.value=videoStream.localDevice
})
const onSubmit=(async ()=>{
    videoStream.getVideoNow(videoPut.value)
   const streamnew=await videoStream.onSubmit()
   videoPut.value.srcObject=streamnew
})
</script>

<style>

</style>