
import { storeToRefs } from "pinia"
import {getCheckState} from "@/views/streamer/api/checkedMessage/index";
import useMainStore from "@/store/chat/chat"
import { ElMessage } from "element-plus";
import { ref } from "vue";
import groupChat from "@/views/client/api/chatgroup/groupChatBasic";
const mainstoreChat=useMainStore()
const {chatObj} =storeToRefs(mainstoreChat)
const usecreateFlag=ref(false)
const createnew=async()=>{
    //创建群聊 先判断符合要求不
    const data=await getCheckState();
    if(data.code==20000){
      if(data.data=='未认证'){
        usecreateFlag.value=false
      }else if(data.data.status==0){
        usecreateFlag.value=false
      }
      else if(data.data.status==1){
        usecreateFlag.value=false
      }else{
        usecreateFlag.value=true
      }
 }
}
const createGroup=()=>{
    chatObj.value=new groupChat()
    console.log(chatObj.value);
    chatObj.value.createGroupChatMethods()
    
}
export default {
    createnew,
    usecreateFlag,
    createGroup
}
