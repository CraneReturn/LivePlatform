   <template>
  <el-dialog
    v-model="props.dialogVisible"
    title="封面设定"
    width="50%"
  >
    <!-- <div>
      <div>
        {{
          imgList.length === 0
            ? "loading..."
            : `耗时：${cost}s，关键帧数：${imgList.length}`
        }}
      </div>
      <br />
      <input type="file" name="" id="file-input" @change="start" />
      <div class="flex flex-wrap">
        <div v-for="item in imgList" :key="item.ts">
          <div class="text-center">{{ (item.ts / 1e6).toFixed(2) }}s</div>
          <img :src="item.img" alt="video-frame" />
        </div>
      </div>
    </div> -->
    <div class="changecoverMain">
      <p class="titleAnalysis">
        拖拽选框裁剪
      </p>
      <div class="photoCoverSelect">
        <div class="photoCoverSelected">
          <img src='@/assets/images/userPhoto/userphotojpg.jpg' alt="">

        </div>
        <div class="userPhotoListSelect">
          <div class="leftBackInner">
        </div>
          <div class="photoList">
            <img src='@/assets/images/userPhoto/userphotojpg.jpg' alt="">
            <span>
            1.00s
          </span>
          </div>
          <div class="photoList">
            <img src='@/assets/images/userPhoto/userphotojpg.jpg' alt="">
            <span>
            1.00s
          </span>
          </div>
       
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="toggleDialog">取消</el-button>
        <el-button type="primary" @click="toggleDialog"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
  
  <script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { ref, defineProps, defineEmits } from "vue";
import { MP4Clip } from "@webav/av-cliper";
const props = defineProps({
  dialogVisible: Boolean,
});
const emits = defineEmits(["update:dialogVisible"]);

const imgList: any = ref([]);
const cost: any = ref(0);
const start = async (event: any) => {
  const file = event.target.files[0];
  const blob = new Blob([file], { type: file.type }); // 创建 Blob 对象
  const url = URL.createObjectURL(blob); // 创建本地文件的 URL
  const response: any = await fetch(url); // 使用 fetch 获取本地文件内容
  const clip = new MP4Clip(response.body);
  console.log(clip);

  await clip.ready;

  let t = performance.now();
  console.log(file);

  const imgListData = await clip.thumbnails(200, {
    start: 0,
    end: file.lastModified,
    step: 1e6,
  });
  const costValue = ((performance.now() - t) / 1000).toFixed(2);

  imgList.value = imgListData.map(
    (it: { ts: any; img: Blob | MediaSource }) => ({
      ts: it.ts,
      img: URL.createObjectURL(it.img),
    })
  );
  cost.value = costValue;
};
const toggleDialog = () => {

  const newValue =false;
  emits("update:dialogVisible", newValue);
};
</script>
  
  <style>
.flex {
  display: flex;
}

.flex-wrap {
  flex-wrap: wrap;
}

.text-center {
  text-align: center;
}
</style>
  