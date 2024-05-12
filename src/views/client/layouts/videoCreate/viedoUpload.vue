<template>
  <div class="viedouploadMain">
    <div class="viedoUploadMaincenter" v-show="!hasUploaded">
      <div class="viedoUploadIcon">
        <svg
          t="1713964310959"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1701"
          width="100"
          height="100"
        >
          <path
            d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z"
            p-id="1702"
            fill="#bfbfbf"
          ></path>
        </svg>
        <p>
          <button>点击我上传视频</button>
        </p>
      </div>
      <input type="file" class="fileUpload" @change="uploadFileViedo" />
    </div>
  </div>
  <div class="uploadViedoList"  v-show="hasUploaded">
    <div class="topListViedoShowCenter">
      <div :class="{onceUploadFilesflage:index==0}" class="onceUploadFiles" v-for="(ietm,index) in hasFilesUploaded" :key="index">
        <div class="onceUploadFileCenter">
          <p>test</p>
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
      <div class="onceUploadFiles uploadFilesListBtn">
        <div class="uploadFilesListBtnCenter">
            <div class="uploadFilesListBtnMain">
                <svg t="1714034077479" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6334" width="15" height="15"><path d="M930.133 465.067H554.667V89.6c0-19.115-15.019-34.133-34.134-34.133S486.4 70.485 486.4 89.6v375.467H110.933c-19.114 0-34.133 15.018-34.133 34.133s15.019 34.133 34.133 34.133H486.4V908.8c0 19.115 15.019 34.133 34.133 34.133s34.134-15.018 34.134-34.133V533.333h375.466c19.115 0 34.134-15.018 34.134-34.133s-15.019-34.133-34.134-34.133z" p-id="6335" fill="#bfbfbf"></path></svg>
                <input type="file">
                <p>
                    添加视频
                </p>
            </div>
        </div>
      </div>
    </div>
    <div class="progressbarViedo">
        <p class="titleAnalysis">
            test
        </p>
        <div class="uploadFilesIcon">
            <svg t="1714035012435" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4350" data-spm-anchor-id="a313x.search_index.0.i1.22ad3a81xtdQTU" width="30" height="30"><path d="M630.272 701.952c0 20.992-16.896 37.888-37.888 37.888h-497.152c-20.992 0-37.888-16.896-37.888-37.888v-442.368l193.024-178.688h342.528c20.992 0 37.888 16.896 37.888 37.888V701.952z" fill="#bfbfbf" p-id="4351" data-spm-anchor-id="a313x.search_index.0.i5.22ad3a81xtdQTU" class="selected"></path><path d="M245.76 75.776v178.176h-192.512z" fill="#55C1CB" p-id="4352"></path><path d="M539.136 660.992H194.56c-4.608 0-8.192-3.584-8.192-8.192V358.4c0-4.608 3.584-8.192 8.192-8.192h344.576c4.608 0 8.192 3.584 8.192 8.192v294.4c0 4.608-3.584 8.192-8.192 8.192z m-336.384-16.384h328.192v-278.016h-328.192v278.016z" fill="#bfbfbf" p-id="4353" data-spm-anchor-id="a313x.search_index.0.i0.22ad3a81xtdQTU" class="selected"></path><path d="M277.504 660.992c-4.608 0-8.192-3.584-8.192-8.192V358.4c0-4.608 3.584-8.192 8.192-8.192 4.608 0 8.192 3.584 8.192 8.192v294.4c0 4.608-3.584 8.192-8.192 8.192z" fill="#15595F" p-id="4354"></path><path d="M539.136 441.344H194.56c-4.608 0-8.192-3.584-8.192-8.192 0-4.608 3.584-8.192 8.192-8.192h344.576c4.608 0 8.192 3.584 8.192 8.192 0 4.608-3.584 8.192-8.192 8.192zM539.136 513.536H194.56c-4.608 0-8.192-3.584-8.192-8.192 0-4.608 3.584-8.192 8.192-8.192h344.576c4.608 0 8.192 3.584 8.192 8.192 0 4.608-3.584 8.192-8.192 8.192zM539.136 583.68H194.56c-4.608 0-8.192-3.584-8.192-8.192 0-4.608 3.584-8.192 8.192-8.192h344.576c4.608 0 8.192 3.584 8.192 8.192 0 4.608-3.584 8.192-8.192 8.192z" fill="#15595F" p-id="4355"></path><path d="M970.752 908.288c0 22.016-17.92 39.936-39.936 39.936H413.184c-22.016 0-39.936-17.92-39.936-39.936v-460.8L574.464 261.12h356.864c22.016 0 39.936 17.92 39.936 39.936V908.288z" fill="#F2F2F2" p-id="4356"></path><path d="M573.952 261.12v185.856h-200.704z" fill="#CCCCCC" p-id="4357"></path><path d="M842.752 647.68h-303.104c-5.12 0-9.216-5.12-9.216-11.264 0-6.144 4.096-11.264 9.216-11.264h303.104c5.12 0 9.216 5.12 9.216 11.264 0 6.144-4.096 11.264-9.216 11.264zM842.752 737.28h-303.104c-5.12 0-9.216-5.12-9.216-11.264s4.096-11.264 9.216-11.264h303.104c5.12 0 9.216 5.12 9.216 11.264s-4.096 11.264-9.216 11.264zM691.2 826.88h-151.552c-5.12 0-9.216-5.12-9.216-11.264s4.096-11.264 9.216-11.264H691.2c5.12 0 9.216 5.12 9.216 11.264s-4.096 11.264-9.216 11.264z" fill="#B3B3B3" p-id="4358"></path><path d="M845.312 554.496h-303.104c-5.12 0-9.216-5.12-9.216-11.264 0-6.144 4.096-11.264 9.216-11.264h303.104c5.12 0 9.216 5.12 9.216 11.264 0 6.144-4.096 11.264-9.216 11.264z" fill="#B3B3B3" p-id="4359"></path></svg>
           <div class="uploadBarprogress">
            <el-progress :percentage="100" status="success" />
           </div>
           <div class="changeViedoprogress">
            <div class="changeViedoprogressposition">
                <div class="changeViedoprogressBorder">
                <svg t="1714035481002" class="icon" viewBox="0 0 1118 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1791" width="25" height="25"><path d="M165.238899 508.178506C164.450369 456.442676 171.767779 404.485842 187.244542 353.863631 266.138632 95.812692 533.436225-51.353028 784.380224 25.368251 1035.324219 102.08953 1174.62994 373.566359 1095.735851 631.617298 1016.84176 889.66824 749.544168 1036.833959 498.600172 960.11268 424.134741 937.346313 357.837833 896.870788 303.973868 842.276436 291.310328 829.441176 291.396506 808.495802 304.166356 795.493625 316.936205 782.491452 337.554042 782.356136 350.217582 795.191397 396.640587 842.243889 453.73137 877.098901 517.975091 896.740177 734.436966 962.919213 965.320335 835.802028 1033.557737 612.607541 1101.795139 389.413057 981.467179 154.919792 765.005305 88.740755 548.543428 22.561718 317.660056 149.678904 249.422655 372.873388 235.597198 418.094418 229.294871 464.461039 230.4403 510.559881L311.240978 429.759202C323.584094 417.416085 343.892513 417.712357 356.601099 430.420946 369.309686 443.129535 369.605959 463.437952 357.262842 475.781068L230.778782 602.265128C229.273826 605.769679 227.098877 609.041396 224.251145 611.889128 211.908029 624.232245 191.59961 623.935974 178.891024 611.227385L40.825428 473.16179C28.11684 460.453206 27.820569 440.144784 40.163685 427.801668 52.506801 415.458551 72.815218 415.754827 85.523806 428.463411L165.238899 508.178506Z" fill="#ffffff" p-id="1792"></path></svg>
            </div>
            <span>
                更换视频
            </span>
            </div>
           </div>
        </div>
    </div>
    <uploadFillinVue/>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { ElMessage } from 'element-plus'
import uploadFillinVue from './uploadFillin.vue';
import {getHash,spliceViedo} from './upload'
import {uploadFileonce} from '@/views/client/api/uploadFile/uploadFile'
const uploadcount=ref(0)
const hasUploaded = ref<boolean>(false);
const fileUpload = ref(null);
const hasFilesUploaded=reactive([{},{},{}])

watch(fileUpload, (newvalue, oldvalue) => {
  if (newvalue) {
    hasUploaded.value = true;
  } else {
    hasUploaded.value = false;
  }
});

const uploadFileViedo =async (event:any) => {
  if (event.target.files[0]) {
    if (event.target.files[0].type != "video/mp4") {
      ElMessage.error('请您上传视频文件')
      return;
    } else {
      const files=event.target.files[0]
      let maxSize=1024*1024*1
      const{hashArr,suffix}=await getHash(files)
      let count=Math.ceil(files.size/maxSize)
      //有多少需要上传的文件
      if(count>100){
        count=100
        maxSize=files.size/count
      }
     const chunk= await spliceViedo(count,files,maxSize,hashArr,suffix)
     console.log(hashArr,suffix);
     
     for(let i=0;i<chunk.length;i++){
      const fm = new FormData()
      fm.append('file',chunk[i].file)
      uploadFileonce(fm,i,hashArr,count).then((data:any)=>{
        if(data.code==20000){
          uploadFlagMethods(chunk.length);
        }else{
          ElMessage.error('上传失败清重试')
          fileUpload.value=null
        }
      })
     }

      fileUpload.value = event.target.files[0];
    }
  }
};
 //判断上传是否完成
const uploadFlagMethods=((count: number)=>{
  uploadcount.value++;
  if (uploadcount.value >= count) {
			// 完成 合并
      
      ElMessage.success('文件上传成功')

    }
})
</script>

<style>
@import "@/views/client/styles/viedoUpload/viedoCreate.scss";
@import "@/views/client/styles/viedoUpload/viedoUpload.scss";
@import "@/styles/component/component.scss";
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
</style>