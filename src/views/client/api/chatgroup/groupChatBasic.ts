
// import MessageBasic from './messageBasic';
import {createNewfanscom} from '@/views/client/api/chatgroup/group/index'
import { ElMessage } from 'element-plus';
export default class groupChat {
  groupId!: string;
  groupName!: string;
  userID!: any[];
  banID!: any[];
  adminId!: any[];
  headImg!: string;
  notice!: string;
  createId!: string
  createTime!: string;
  banAll!: boolean;
  // constructor(params: {
  //   message: any;
  //   groupId: string;
  //   groupName: string;
  //   userID: any[];
  //   banID: any[];
  //   adminId: any[];
  //   headImg: string;
  //   notice: string;
  //   createId: string;
  //   createTime: string;
  //   banAll: boolean;
  // }) {
  // this.groupId = params.groupId;
  // this.groupName = params.groupName;
  // this.userID = params.userID;
  // this.banID = params.banID;
  // this.adminId = params.adminId;
  // this.headImg = params.headImg;
  // this.notice = params.notice;
  // this.createId = params.createId;
  // this.createTime = params.createTime;
  // this.banAll = params.banAll;
 async createGroupChatMethods(){
   const createdata=await createNewfanscom()
   if(createdata.code==20000){
    ElMessage.success('创建成功，快去你的新粉丝团看看吧')
   }else{
    ElMessage.error('创建失败，你的粉丝数还不够')
   }
  }
  visitfans(id:string){
    this.groupId = id
  }
}