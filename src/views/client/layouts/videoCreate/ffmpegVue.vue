<template>
  <input type="file" name="" id="" @change="uploadFile" />
  <button @click="getPicture">获取数据</button>
  <div>
    <h2>Video Frames:</h2>
    <div v-for="frame in videoFrames" :key="frame.id">
      {{ frame }}
      <img :src="frame.url" alt="Video Frame" />
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { ref, onMounted } from "vue";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
const ffmpegRef = ref(new FFmpeg());
const file = ref();
const videoFrames: any = ref();

onMounted(() => {
  ffmpegRef.value.load();
//   ffmpegRef.value.on("log", ({ message }) => {
//     console.log(message);
//   })
});
const getPicture = async () => {
    console.log('1111')
   ffmpegRef.value.writeFile(file.value.name,await fetchFile(file.value)).then((res)=>{
    console.log(res);
    
   }).catch((err)=>{
    console.log(err);
    
   })
  debugger
  await ffmpegRef.value.exec(["-i", file.value.name, "output%d.png"]);
  const data = await ffmpegRef.value.readFile("output.png");
//   videoRef.current.src = URL.createObjectURL(
//     new Blob([data.buffer], { type: "video/mp4" })
//   );
console.log(data);

};
const uploadFile = async (event: any) => {
  file.value = event.target.files[0];

//   const frames = [];

//   for (let i = 1; i <= 10; i++) {
//     // 读取前10帧
//     const frameData: any = ffmpegRef.value.readFile(`output${i}.png`);
//     const blob = new Blob([frameData.buffer], { type: "image/png" });
//     const url = URL.createObjectURL(blob);
//     frames.push({ id: i, url });
//   }

//   videoFrames.value = frames;
//   console.log(videoFrames.value);
};
</script>
  
  <style>
</style>
  