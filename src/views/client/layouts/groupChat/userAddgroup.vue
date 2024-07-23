<template lang="">
    <div class='lookMyFans' v-if='!usecreateFlag'>
        <el-button text @click="dialogVisible = true" class='lookMyFansBtn'
        >查看我的粉丝团
        </el-button
      >
    
      <el-dialog
        v-model="dialogVisible"
        title="粉丝团"
        width="30%"
        :before-close="handleClose"
        max-height="600px"
      >
       <div class='groupCreate'>
        <div class='groupCreateList'>
            <div class='groupcreateListImg'>
                <img src="@/assets/images/pay.jpg" alt="" srcset="">
            </div>
            <div class='groupcreateListName'>
                22222
            </div>
            <div class='groupcreateListbtn'>
                <el-button type="primary">进入</el-button>
            </div>
        </div>
       </div>
        <template #footer>
            <span class='createnewfans' @click='createnewFansMethods'>
                创建新的粉丝团
            </span>
        </template>
      </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import creater from './groupts/create'
const {createnew,usecreateFlag,createGroup} =creater
onMounted(() => {
    createnew()
})
const dialogVisible = ref(false)
const createnewFansMethods=()=>{
    ElMessageBox.confirm('确定创建新的粉丝团么')
    .then(() => {
        createGroup()
    })
    .catch(() => {
      // catch error
    })
}
</script>
<style lang="scss">
@import '@/views/client/styles/groupChat/chatFile.scss';
</style>