   <template>
  <el-dialog v-model="propsList.dialogVisible" title="封面设定" width="50%">
    <div class="changeCoverTitleNail">
      <span :class="{spliceFlagShow:spliceFlag}" @click="spliceFlag=true">
        从视频中截取
      </span>
      <span  :class="{spliceFlagShow:!spliceFlag}" @click="spliceFlag=false">
        自定义上传封面
      </span>
    </div>
    <div class="changecoverMain" v-show="spliceFlag">
      <p class="titleAnalysis">拖拽选框裁剪</p>
      <div class="photoCoverSelect">
        <div class="photoCoverSelected">
          <img :src="propsList.spliceImgList[0].img" alt="" ref="faceImg" />
        </div>
        <div class="userPhotoListSelect">
          <div class="leftBackInner"></div>
          <div v-if="propsList.spliceImgList">
            <div
              class="photoList"
              v-for="(item, index) in propsList.spliceImgList"
              :key="item.url"
            >
              <img :src="item.img" alt="" @click="changeFaceImg(index)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="customChangPhoto">
      <div class="customChangPhotocenter">
        <div class="customChangPhotocentericon">
          <svg t="1715605866029" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2008" width="50" height="50"><path d="M565.333333 779.914667l51.445334-54.912a31.733333 31.733333 0 0 1 45.226666-1.226667 32.64 32.64 0 0 1 1.216 45.770667l-97.418666 104a37.034667 37.034667 0 0 1-52.821334 1.397333l-108.362666-104.202667a32.64 32.64 0 0 1-1.152-45.770666 31.733333 31.733333 0 0 1 45.248-1.173334L501.333333 774.421333V512.074667c0-17.877333 14.325333-32.373333 32-32.373334s32 14.506667 32 32.373334v267.84zM512 138.666667c123.018667 0 228.213333 86.709333 259.424 206.88C864.298667 347.146667 938.666667 426.090667 938.666667 522.688c0 97.6-75.914667 177.173333-170.133334 177.173333-17.674667 0-32-14.496-32-32.373333 0-17.877333 14.325333-32.373333 32-32.373333 58.357333 0 106.133333-50.08 106.133334-112.426667 0-62.336-47.776-112.416-106.133334-112.416-5.856 0-11.626667 0.501333-17.301333 1.482667-17.621333 3.050667-34.304-9.098667-37.024-26.986667C698.346667 280.693333 612.714667 203.424 512 203.424c-73.834667 0-140.928 41.536-177.376 107.861333a31.914667 31.914667 0 0 1-30.122667 16.576 140.373333 140.373333 0 0 0-9.568-0.32c-80.149333 0-145.6 68.586667-145.6 153.781334 0 85.184 65.450667 153.792 145.6 153.792 17.674667 0 32 14.496 32 32.373333 0 17.877333-14.325333 32.373333-32 32.373333C178.912 699.861333 85.333333 601.770667 85.333333 481.322667c0-118.314667 90.293333-215.061333 203.456-218.453334C338.090667 186.24 421.013333 138.666667 512 138.666667z" fill="#bfbfbf" p-id="2009"></path></svg>
          <p>
            请选择上传的封面
          </p>
          <input type="file" name="" id="" class="customChangPhotocenterInput" @change="customChangcover">
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="toggleDialog">取消</el-button>
        <el-button type="primary" @click="sureChangeFaceImg">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
  
  <script lang="ts" setup>
import { ElMessageBox,ElMessage } from "element-plus";
import { ref, defineProps, defineEmits } from "vue";
import { MP4Clip } from "@webav/av-cliper";
const propsList = defineProps({
  dialogVisible: Boolean,
  spliceImgList: Array as () => any[],
});
const spliceFlag=ref<boolean>(true)
const emits = defineEmits(
  ["update:dialogVisible","update:changeFaceImgshow"]
  );
const faceImg = ref();
const coverImg=ref()
const imgList: any = ref([]);
const cost: any = ref(0);
const toggleDialog = () => {
  const newValue = false;
  emits("update:dialogVisible", newValue);
};
//换封面
const changeFaceImg = (index: number) => {
  if (propsList.spliceImgList) {
    faceImg.value.src = propsList.spliceImgList[index].img;
    coverImg.value=propsList.spliceImgList[index].img;
  }
};
const customChangcover=((event: { target: { files: { type: string; }[]; }; })=>{
  const file=event.target.files[0]
  console.log(file);
  
  if (event.target.files[0].type != "image/png") {
      ElMessage.error('请您上传图片文件')
      return;
  }
  coverImg.value=file
  
})
const sureChangeFaceImg = () => {
  ElMessageBox.confirm("是否确定将该图片设为封面", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "success",
  })
    .then(() => {
      const newValueshow = false;
      emits("update:dialogVisible", newValueshow);
      emits("update:changeFaceImgshow", coverImg.value);
    })
    .catch(() => {});
};
</script>
  
  <style lang="scss">
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.text-center {
  text-align: center;
}
.changeCoverTitleNail{
  span{
    margin-left: 10px;
    cursor: pointer;
  }

}
.spliceFlagShow{
  border-bottom: 1px solid var( --el-color-primary);
  padding-bottom:5px ;
  color: var(--el-color-primary);
}
.changecoverMain{
  margin-top: 20px;
}
</style>
  