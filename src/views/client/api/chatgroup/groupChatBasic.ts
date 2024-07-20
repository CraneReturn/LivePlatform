import MessageBasic from './messageBasic';
export default class groupChat extends MessageBasic {
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
  constructor(params: {
    message: any;
    groupId: string;
    groupName: string;
    userID: any[];
    banID: any[];
    adminId: any[];
    headImg: string;
    notice: string;
    createId: string;
    createTime: string;
    banAll: boolean;
  }) {
    super(params.message); 
    this.groupId = params.groupId;
    this.groupName = params.groupName;
    this.userID = params.userID;
    this.banID = params.banID;
    this.adminId = params.adminId;
    this.headImg = params.headImg;
    this.notice = params.notice;
    this.createId = params.createId;
    this.createTime = params.createTime;
    this.banAll = params.banAll;
  }

}