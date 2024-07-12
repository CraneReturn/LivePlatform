<template>
    <div class="chat">
        <div class="chatPage">
          <div class="chatBody inderbox">
           <div v-for="message in basicmessage.myMessage">
            <div :class="{other:message.userid!=userId,self:message.userid==userId }">
              <div  :class="{otherHead:message.userid!=userId,selfHead:message.userid==userId }">
                <img
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F2bf1b169-d217-44c3-a5b3-dd00813bc20d%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1697337260&t=49f63bdb7285609a732c11ad2d1acc62"
                  alt="">
                <p class="name" :class="{colorText:message.userid==userId}">{{ message.nickName }}</p>
              </div>
              <div class="dialogue" :class="{colour:message.userid==userId}">
              {{ message.text }}
              </div>
           </div>
            </div>


          </div>

        </div>
     

      </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
import CreatMessage from '../../api/chatgroup/data.ts'
  import MessageBasic from '../../api/chatgroup/messageBasic'
  //获取到排序好的message
  const {myMessage}=CreatMessage();
  const userId=ref(1)
  const messageAllShow=reactive([
        {id:'111',userid:1,aver:'11',nickName:'1111',text:'hahahah',time:111},
        {id:'222',userid:1,aver:'11',nickName:'1111',text:'hahahah',time:111},
        {id:'222',userid:3,aver:'11',nickName:'1111',text:'hahahah',time:222}
    ])
  const basicmessage=new MessageBasic(messageAllShow)
  let messageAll=reactive([])
  onMounted(()=>{
    //给基本类
    basicmessage.getMessage(myMessage)
    console.log(basicmessage,'4444444');
    
    //返回基本类的数据
    getBasicMessage()
  })
  const getBasicMessage=(()=>{
    const {message}=basicmessage.getBasicMessage()
   messageAll=message
  })
  </script>
  
  <style lang="scss" scoped>
  @import "@/views/client/styles/groupChat/chatMessage.scss";
  </style>