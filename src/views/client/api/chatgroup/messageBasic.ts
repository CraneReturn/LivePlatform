import { storeToRefs } from "pinia";
import useMainStore from "@/store/chat/chat.ts";
const mainStore = useMainStore();
const { checkedmessage } = storeToRefs(mainStore);
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
    getBasicMessage(){
       const message=this.myMessage
       return {
        message
       }
    }
    updateChekedMessage(e){
        checkedmessage.push(e)
    }
}