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
               <div>
                <button @click="starLiver">
                  开始直播
                </button>
               </div>
               <el-row>
                   <video id="localdemo01" autoplay controls muted ref="videoPut"></video>
               </el-row>
           </div>
           <div style="width: 98%;height: 98vh;margin-top: 30px;">
            <el-row :gutter="20">
              <el-col :span="6">
                <div style="width: 100%;height: 800px;"  >
                  <ul v-for="(item,index) in roomUserList" :key="index">
                    <el-tag size="mini" @click="getStats"  type="success">{{'用户'+item.nickname}}</el-tag>
                    <el-tag v-if="userInfo.userId === item.userId" type="danger" size="mini" @click="changeBitRate()"  >增加比特率</el-tag>
                    <el-button size="mini" type="primary" v-if="userInfo.userId !== item.userId" @click="call(item)">通话</el-button>
                    <el-button v-if="userInfo.userId === item.userId" size="mini" type="danger"@click="openVideoOrNot">切换</el-button>
                  </ul>
                </div>
              </el-col>
              <el-col :span="18">
          
                <el-row>
                  <div style="width: 800px;height: 200px;display: flex;flex-direction: row;align-items: center;">
                    <el-form  :model="formInline" label-width="250px" class="demo-form-inline">
                      <el-form-item label="发送消息">
                        <el-input v-model="formInline.rtcmessage"  placeholder="消息"></el-input>
                      </el-form-item>
                      <el-form-item label="远端消息">
                        <div>{{formInline.rtcmessageRes}}</div>
                      </el-form-item>
                                  
                      <el-form-item>
                        <el-button type="primary" @click="sendMessageUserRtcChannel">点击发送</el-button>
                      </el-form-item>
                    </el-form>
        
                  </div>
                </el-row>
                <el-row>
                  <div style="display: flex;flex-direction: row;justify-content: flex-start;">
                    <video @click="streamInfo('localdemo01')" id="localdemo01" autoplay controls muted></video>
                    <video @click="streamInfo('remoteVideo01')" id="remoteVideo01" autoplay controls muted></video>
                  </div>
                </el-row>
              </el-col>
            </el-row>
          </div>
       </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import VideoStream from './api/putStream';
import formInline from './api/putStream/data'
import { url } from 'inspector';
const videoPut=ref<HTMLVideoElement>();
let localDevice=ref()
const configuration = {
  iceServers: [{ urls: 'stun:stun.example.org' }]
};
const pc=new RTCPeerConnection(configuration)

const videoStream =new VideoStream()
const url="https://cloud.tencent.com/document/product/267/97826"
import {io} from 'socket.io-client'
onBeforeMount(()=>{
  const linekedSocket=io(url,{
    reconnectionDelayMax: 10000,
					transports: ["websocket"],
					query: {
					  "userId": '1',
					  "roomId": "1",
					  "nickname":"craneReturn"
					}
  })
  videoStream.setConnect(linekedSocket)
  videoStream.connection()
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
const starLiver=()=>{
  videoStream.getLocalMediaOffer(pc)
}
</script>

<style>

</style>