<template>
    <el-button text @click="dialogVisible = true"
    >修改直播设置</el-button>
    <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
  <div style="width: 98%;height: 98%;margin-top: 20px;">
    <el-row :gutter="20">
        <el-col :span="24">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="选择摄像头">
                <el-select v-model="formInline.videoId" placeholder="摄像头">
                  <el-option v-for="(item,index) in formInline.videoIn " :key="index" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择麦克风">
                <el-select v-model="formInline.audioInId" placeholder="麦克风">
                  <el-option v-for="(item,index) in formInline.audioIn " :key="index" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择听筒">
                <el-select v-model="formInline.audioOutId" placeholder="听筒">
                  <el-option v-for="(item,index) in formInline.audioOut " :key="index" :label="item.label" :value="item.id"></el-option>
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
              </el-form-item>
            </el-form>
            <div>
              <div class="slider-demo-block">
                <span class="demonstration">美白</span>
                <el-slider v-model="value1" />
              </div>
              <div class="slider-demo-block">
                <span class="demonstration">磨皮</span>
                <el-slider v-model="value2" />
              </div>
              <div class="slider-demo-block">
                <span class="demonstration">瘦脸</span>
                <el-slider v-model="value3"/>
              </div>
              <div class="slider-demo-block">
                <span class="demonstration">削脸</span>
                <el-slider v-model="value4" :format-tooltip="formatTooltip" />
              </div>
              <div class="slider-demo-block">
                <span class="demonstration">大眼</span>
                <el-slider v-model="value5" />
              </div>
              <div class="slider-demo-block">
                <span class="demonstration">下巴</span>
                <el-slider v-model="value6" />
              </div>
            </div>
        </el-col>
    </el-row>
    <div>
    </div>

</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue'
const formInline=reactive({
        audioId:'',
        videoId:'',
        audioInId:['111','222'],
        videoIn:['1111'],
        audioIn:"",
        audioOut: ['3'],
        width:100,
        height:100,
        frameRate:100
    })
    const localDevice=reactive({
        audioIn: ['2'],
        videoIn: ['1'],
        audioOut: ['3']
    })
    
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("你确定要关闭么")
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
const value5 = ref(0)
const value6=ref(0)
const formatTooltip = (val: number) => {
  return val / 100
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import '@/views/client/styles/clientPull/preview/index.scss'
</style>