<template>
  <div class="viedouploadMain">
  </div>
  <div class="uploadViedoList">
    <div class="topListViedoShowCenter">
      <div
        :class="{ onceUploadFilesflage: index == 0 }"
        class="onceUploadFiles"
        v-for="(item, index) in hasUploadedarr"
        :key="index"
      >
        <div class="onceUploadFileCenter">
          <p>{{ item.name }}</p>
          <div class="uploadwordsFiles">
            <div class="uploadFilesSucess">
              <svg
                t="1714032800800"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1676"
                width="15"
                height="15"
              >
                <path
                  d="M512 960c-247.424 0-448-200.576-448-448 0-247.424 200.576-448 448-448 247.424 0 448 200.576 448 448C960 759.424 759.424 960 512 960L512 960zM512 163.584C319.552 163.584 163.584 319.552 163.584 512c0 192.448 155.968 348.48 348.416 348.48 192.448 0 348.416-156.032 348.416-348.416C860.416 319.68 704.448 163.584 512 163.584L512 163.584zM776 400.576l-316.8 316.8c-9.728 9.728-25.472 9.728-35.2 0l-176-176c-9.728-9.728-9.728-25.472 0-35.2l35.2-35.2c9.728-9.728 25.472-9.728 35.2 0L441.6 594.176l264-264c9.728-9.728 25.472-9.728 35.2 0l35.2 35.2C785.728 375.104 785.728 390.848 776 400.576L776 400.576z"
                  p-id="1677"
                  fill="#a1d5a5"
                ></path>
              </svg>
              <span> 上传成功 </span>
            </div>
          </div>
          <div class="deleteUploadFiles">
            <svg
              t="1714033281397"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5195"
              width="15"
              height="15"
            >
              <path
                d="M565.6 516.4l180.8-180.8c12.6-12.6 12.6-33 0-45.6-12.6-12.6-33-12.6-45.6 0L520.1 470.8 339.3 290.1c-12.6-12.6-33-12.6-45.6 0s-12.6 33 0 45.6l180.8 180.8-180.7 180.7c-12.6 12.6-12.6 33 0 45.6 12.6 12.6 33 12.6 45.6 0L520.2 562 701 742.8c12.6 12.6 33 12.6 45.6 0 12.6-12.6 12.6-33 0-45.6l-181-180.8z"
                fill="#bfbfbf"
                p-id="5196"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="onceUploadFiles uploadFilesListBtn" v-loading="loading">
        <div class="uploadFilesListBtnCenter">
          <div class="uploadFilesListBtnMain">
            <svg
              t="1714034077479"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6334"
              width="15"
              height="15"
            >
              <path
                d="M930.133 465.067H554.667V89.6c0-19.115-15.019-34.133-34.134-34.133S486.4 70.485 486.4 89.6v375.467H110.933c-19.114 0-34.133 15.018-34.133 34.133s15.019 34.133 34.133 34.133H486.4V908.8c0 19.115 15.019 34.133 34.133 34.133s34.134-15.018 34.134-34.133V533.333h375.466c19.115 0 34.134-15.018 34.134-34.133s-15.019-34.133-34.134-34.133z"
                p-id="6335"
                fill="#bfbfbf"
              ></path>
            </svg>
            <input type="file" @change="uploadFileViedo" />
            <p>添加视频</p>
          </div>
        </div>
      </div>
    </div>
    <div class="progressbarViedo"></div>
    <uploadFillinVue
      :hasFilesUploaded="hasFilesUploaded"
      :nowtimeUploadFile="nowtimeUploadFile"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, toRefs } from "vue";
import { PromisePool } from "./promisePool";
import { ElMessage } from "element-plus";
import uploadFillinVue from "./uploadFillin.vue";
import { MP4Clip } from "@webav/av-cliper";
import { getHash, spliceViedo } from "./upload";
//集中处理数据
import { storeToRefs } from "pinia";
import videouploadMainStore from "@/store/video/videoUpload.ts";
const mainvideoStore = videouploadMainStore();
const { ruleForm, hasUploadedarr } = storeToRefs(mainvideoStore);
import {
  uploadFileonce,
  mergerFiles,
  getrestStarIndexArr,
} from "@/views/client/api/uploadFile/uploadFile";
const uploadcount = ref(0);
const hasUploaded = ref<boolean>(false);
const fileUpload = ref(null);
const loading = ref(false);
watch(
  () => hasUploadedarr.value,
  (newValue) => {
    if (hasUploadedarr.value.length!==0) {
    
      ruleForm.value = hasUploadedarr.value[0];
      console.log(ruleForm.value,'kkkkk');
      
    }
  },
  {
    immediate: true, // 立即执行一次监听函数,
    deep: true,
  }
);
let duration = ref();
let hasFilesUploaded = reactive<
  {
    name: any;
    [key: number]: any;
  }[]
>([]);
const nowtimeUploadFile = ref(0);
let restFilesIndexarr = reactive([]);
watch(fileUpload, (newvalue, oldvalue) => {
  if (newvalue) {
    hasUploaded.value = true;
  } else {
    hasUploaded.value = false;
  }
});
const uploadFileViedo = async (event: any) => {
  loading.value = true;
  if (event.target.files[0]) {
    if (event.target.files[0].type != "video/mp4") {
      ElMessage.error("请您上传视频文件");
      return;
    } else {
      const files = event.target.files[0];
      let maxSize = 1024 * 1024 * 1;
      duration.value = Math.round(files.size / (1024 * 1024));
      console.log(duration.value, "99999");

      const { hashArr, suffix } = await getHash(files);
      let count = Math.ceil(files.size / maxSize);
      //有多少需要上传的文件
      if (count > 100) {
        count = 100;
        maxSize = files.size / count;
      }
      const chunk = await spliceViedo(count, files, maxSize, hashArr, suffix);
      console.log(chunk);

      // const restArr = await getrestStarIndexArr(hashArr);
      const restFilesIndexarr: number[] | null = [];
      console.log(restFilesIndexarr);

      const asyncFunctions = chunk.map((file, index) => {
        return async () => {
          const fm = new FormData();
          fm.append("file", chunk[index].file);
          if (
            restFilesIndexarr &&
            restFilesIndexarr.length != 0 &&
            restFilesIndexarr !== null
          ) {
            if (restFilesIndexarr.includes(index)) {
              return uploadFileonce(fm, index, hashArr, count);
            }
          } else {
            return uploadFileonce(fm, index, hashArr, count);
          }
        };
      });

      // // 创建PromisePool实例
      const pool = new PromisePool(asyncFunctions, 5);

      // // 执行上传任务
      try {
        const results = await pool.exec();
        results.forEach((result: any) => {
          if (result.code == !20000) {
            ElMessage.error("您上传的文件没有成功,请重试");
            return;
          }
        });
        uploadFlagMethods(files.name, hashArr, files);
        console.log("1111");

        // 处理上传结果
      } catch (error) {
        // 处理执行过程中的错误
        loading.value = false;
      }
      loading.value = true;
      fileUpload.value = event.target.files[0];
    }
  }
};
//判断上传是否完成
const uploadFlagMethods = (name: any, md5: any, files: any) => {
  // 完成 合并
  mergerFiles(name, md5)
    .then(async (data: any) => {
      console.log(data, "99999");
      if (data.code === 20000) {
        ElMessage.success("文件上传成功");
        loading.value = false;
        //截取视频帧数
        const { duration, imgaeListReturn,listBlob} = await splicePhotoList(files);
        const obj = {
          md5: md5,
          url: data.data,
          name: name,
          list: imgaeListReturn,
          duration: duration,
          title: "",
          count1: "",
          count2: "",
          location: "",
          desc: "",
          makeUrl: "",
          listBlob:listBlob,
          dynamicTags:[]
        };
        hasUploadedarr.value.push(obj);
      } else {
        ElMessage.error("文件上传失败");
        loading.value = false;
      }
      uploadcount.value = 0;
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
    });
};
const splicePhotoList = async (file: any) => {
  const blob = new Blob([file], { type: file.type }); // 创建 Blob 对象
  const url = URL.createObjectURL(blob); // 创建本地文件的 URL
  const response: any = await fetch(url); // 使用 fetch 获取本地文件内容
  const clip = new MP4Clip(response.body);
  await clip.ready;
  console.log(clip, "8889999");
  const duration = clip.meta.duration;
  const imgListData = await clip.thumbnails();
  const imgaeListReturn = imgListData.map(
    (it: { ts: any; img: Blob | MediaSource }) =>({
      ts: it.ts,
      img: URL.createObjectURL(it.img),
    })
  );
  const listBlob= imgListData.map(
    (it) =>({
      img: it.img,
    })
  );
  return {
    duration,
    imgaeListReturn,
    listBlob
  };
};
</script>

<style>
@import "@/views/client/styles/viedoUpload/viedoCreate.scss";
@import "@/views/client/styles/viedoUpload/viedoUpload.scss";
@import "@/styles/component/component.scss";
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
.changePhoto:hover {
  cursor: pointer;
}
.fillInPhotoShow {
  border: 1px dashed var(--el-color-primary);
}
</style>