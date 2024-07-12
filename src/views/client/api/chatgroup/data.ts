import { reactive } from "vue";

export default function CreatMessageDate(){
    const myMessage = reactive([
        {id:'111',userid:1,aver:'11',nickName:'1111',text:'hahahah',time:111},
        {id:'222',userid:1,aver:'11',nickName:'1111',text:'hahahah',time:111},
        {id:'222',userid:3,aver:'11',nickName:'1111',text:'hahahah',time:222}
    ])
    return {
        myMessage,
    }
}