   <template>
  <div>
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
  </div>
</template>
  
  <script lang="ts" setup>
import { ref, onMounted } from "vue";
import { MP4Clip } from "@webav/av-cliper";
const imgList: any = ref([]);
const cost: any = ref(0);
const start = async (event: any) => {
  const file = event.target.files[0];
  const blob = new Blob([file], { type: file.type }); // 创建 Blob 对象
  const url = URL.createObjectURL(blob); // 创建本地文件的 URL
  const response = await fetch(url); // 使用 fetch 获取本地文件内容
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
  