import { storeToRefs } from "pinia";
import useMainStore from "@/store/chat/chat.ts";
const mainStore = useMainStore();
const { showCheckedflag } = storeToRefs(mainStore);
export default class MessageBasic{
    myMessage!:[]
    picture!:[]
    checkedPut!:[]
    constructor(message:any){
        this.myMessage=message
    }
    getMessage(my:any){
        this.myMessage= my
    }
    updateCheckedPut(checkfalg){
     showCheckedflag.value=checkfalg
    }
}