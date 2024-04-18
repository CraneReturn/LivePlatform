<!-- <template>
  <video ref="localhostViedo">111</video>
  <div>
    <button @click="callRemoteshow">开启直播</button>
    <button @click="turnPerson">点击我要变成观众</button>
    <button @click="enterrometeMethods">我要进入直播</button>
    <video ref="localhostViedo">111</video>
  </div>
</template>

<script lang='ts'>
export default {};
</script>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { io, Socket } from "socket.io-client";
const roomid = "1";
const upshow = ref<boolean>(true);
const updating = ref<boolean>(true);
const localhostViedo = ref<HTMLVideoElement>();
const remotehostViedo = ref<HTMLVideoElement>();
const socket = ref<Socket>();
const peer = ref<any>();
const localStream = ref<any>();
onMounted(() => {
  const sock = io("http://localhost:9000");
  sock.on("connectionsucess", () => {
    console.log("连接成功");
    sock.emit("joinroom", roomid);
  });
  //进入直播间
  sock.on("enterromete", async () => {
    peer.value = new RTCPeerConnection();
    if (localStream.value) {
      localStream.value.getTracks().forEach((track: any) => {
        peer.value.addTrack(track, localStream.value);
      });
    }
    //添加本地音视频流
    //生成offer
    const options = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1,
    };
    const offer = await peer.value.createOffer(options);
    //本地设置offer信息
    await peer.value.setLocalDescription(offer);
    //发送offer给服务端
    socket.value?.emit("sendOffer", { offer, roomid });
  });
  //收到offer
  sock.on("sendOffer", async (offer) => {
    //接收端需要处理
    if (offer) {
      //说明我不是主播
      //用户b创建rtc
      peer.value = new RTCPeerConnection();
      const steam = await getLocalSteam();
      if (steam) {
        localStream.value.getTracks().forEach((track: any) => {
          peer.value.addTrack(track, localStream.value);
        });
        //设置远端描述信息SDP
        await peer.value.setRemoteDescription(offer);
        //生成answer
        const answer = await peer.value.createAnswer();
        //本地设置anwser信息
        await peer.value.setLocalDescription(answer);
        socket.value?.emit("sendAnser", { answer, roomid });
      }
      //-----通过onicecandidate事件获取candidate信息
      peer.value.onicecandidate = (event) => {
        if (event.candidate) {
          socket.value?.emit("sendCandidate", {
            roomid,
            candidate: event.candidate,
          });
        }
      };
    }
  });
  //收到answer
  sock.on("sendAnser", async (answer) => {
    if (peer.value && !peer.value.remoteDescription) {
      console.log("您的直播间又多了一个人");
      await peer.value.setRemoteDescription(answer);
    }
  });
  //收到candidadte信息
  sock.on("sendCandidate", async (candidate) => {
    await peer.value.addCandidate(candidate);
  });
  socket.value = sock;
});
const turnPerson = () => {
  upshow.value = !upshow.value;
  enterrometeMethods();
};
const callRemoteshow = async () => {
  // console.log('发起直播');
  upshow.value = true;
  if (upshow.value == true) {
    //已经是主播了
    updating.value = true;
    socket.value?.emit("callRemoteshow", roomid);
    await getLocalSteam();
  } else {
    alert("请你先成为主播");
    return false;
  }
};
//进入直播间
const enterrometeMethods = () => {
  //进入直播
  console.log("我进入直播");
  socket.value?.emit("enterromete", roomid);
};
//获取本地音视频流
const getLocalSteam = async () => {
  const steam = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  localhostViedo.value!.srcObject = steam;
  localhostViedo.value!.play();
  //保存本地音视频流
  localStream.value = steam;
  return steam;
};
//销毁io实例
const cleanUpPeer = () => {
  if (peer.value) {
    peer.value.close();
    peer.value = null;
  }
};
//获取本地
</script>
<style>
</style> -->
<template>
  <div>
    <video ref="localhostViedo" autoplay src></video>
    <button v-if="!isStreaming" @click="starSteam">开始直播</button>
    <button v-else @click="stopStreaming">停止直播</button>
    <button @click="enterRoom">进入直播</button>
    <button @click="entersurePerson">确认我是观众</button>
    <video ref="remoteViedo" autoplay src></video>
  </div>
</template>

<script lang='ts'>
export default {};
</script>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { io, Socket } from "socket.io-client";
import { error } from 'console';
const localVideo = ref<HTMLVideoElement>();
const socket = ref<Socket>();
const isStreaming = ref(false);
const stateJoined = ref("");
const roomid = "1";
const isUp = ref<Boolean>(true);
const peer = ref<any>();
const remoteurl = ref("");
const localStream = ref<any>();
const constraints = ref<Object>({});
const localhostViedo = ref<HTMLVideoElement>();
const remoteViedo = ref<HTMLVideoElement>();
const peerConnection = ref<any>();
const upSDP = ref();
onMounted(() => {
  const sock = io("http://localhost:9000");
  sock.on("connectionsucess", () => {
    console.log("连接成功");
  });
  sock.on("joined", () => {
    stateJoined.value = "hasJoined";
    getAnswerOther();
  });
  sock.on("sdp", (sdp) => {
    upSDP.value = sdp;
    console.log(upSDP);
  });
  socket.value = sock;
});
//创建一个连接
const createPeerConnect = async (s) => {
  if (peer.value) {
    return;
  }
  peer.value = new RTCPeerConnection();
  s.getTracks().forEach((track) => peer.value.addTrack(track, s));
  const offer = await peer.value.createOffer();
  await peer.value.setLocalDescription(offer);
  // 通过 Socket.IO 发送提议
  return offer;
};
//开始直播
const starSteam = async () => {
  if (isStreaming.value == true) {
    return;
  }
  const stream = await getLocalSteam();
  const offer = await createPeerConnect(stream);
  // 通过Socket.IO发送流到服务器
  if (socket.value && socket.value.connected) {
    console.log("48888");

    socket.value.emit("webrtc-offer", { roomid, sdp: offer });
  } else {
    console.error("没连接上");
  }
};
//获取本地音视频流
const getLocalSteam = async () => {
  const steam = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  console.log(steam, "hhahaha");

  localhostViedo.value!.srcObject = steam;
  localhostViedo.value!.play();
  //保存本地音视频流
  localStream.value = steam;
  return steam;
};
//进入直播
const entersurePerson = () => {
  isUp.value = false;
};
const enterRoom = () => {
  if (isUp.value == false) {
    socket.value?.emit("joinroom", roomid);
  } else {
    return;
  }
};
//进入直播后
const getAnswerOther = () => {
  console.log(upSDP);
  peerConnection.value = new RTCPeerConnection();
  console.log(peerConnection.value);

  peerConnection.value
    .setRemoteDescription({ type: "offer", sdp: upSDP.value.sdp })
    .then(() => {
      return peerConnection.value.createAnswer();
    })
    .then((answer) => {
      console.log(answer, "188888");

      return peerConnection.value.setLocalDescription(answer);
    })
    .then(() => {
      // 发送应答给发送方
      // socket.emit("webrtc-answer", { sdp: peerConnection.localDescription });
    })
    .catch((err) => {
      console.error("Error setting remote description:", err);
    });
    peerConnection.value.addEventListener("track", (event) => {
    const stream = event.streams[0];
    if (remoteViedo.value.srcObject !== stream) {
      remoteViedo.value.srcObject = stream;
      remoteViedo.value.pause(); // 暂停播放
      remoteViedo.value.load(); // 重新加载视频
      setTimeout(()=>{
        remoteViedo.value.play()
        .then(()=>{
          console.log('22222');
        }).catch((error)=>{
          console.log(error);
        })
      },2000)
      
    }
  });
};
</script>
<style>
/* 添加样式 */
</style>
