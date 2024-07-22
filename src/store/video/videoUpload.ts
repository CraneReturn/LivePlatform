// src/store/index.js
import type { FormRules } from 'element-plus';
import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
const videouploadMainStore = defineStore({
    id: 'videoupload',
    state: () => ({
        //储存现在的
        ruleForm:reactive<RuleForm>({
            title: "",
            coverUrl:'',
            region: "",
            count:'',
            count2: "",
            location: "",
            desc: "",
            makeUrl:'',
            listBlob:[],
            md5:'',
            name:"",
            duration:"",
            list:[],
            url:""
  
          }),
          nowindex:0,
        //储存已经上传的
        hasUploadedarr:[]
    }),
    actions: {

    },
});
const rules = reactive<FormRules<RuleForm>>({
    title: [
      { required: true, message: "请提供视频标题", trigger: "blur" },
      { min: 0, max: 30, message: "长度需要小于30并且大于0", trigger: "blur" },
    ],
    count: [
      {
        required: true,
        message: "请选择分类",
        trigger: "change",
      },
    ],
    location: [
      {
        required: true,
        message: "请选择视频来源",
        trigger: "change",
      },
    ],
    type: [
      {
        type: "array",
        required: true,
        message: "Please select at least one activity type",
        trigger: "change",
      },
    ],
    resource: [
      {
        required: true,
        message: "Please select activity resource",
        trigger: "change",
      },
    ],
    desc: [
      { required: true, message: "请提供视频介绍详细信息", trigger: "blur" },
    ],
    makeUrl: [
      { },
    ],
  });
  interface RuleForm {
    title: string;
    region: string;
    count: string;
    coverUrl:string;
    cout2:string;
    location: string;
    desc: string;
    makeUrl:string,
    md5:string,
    name:string,
    duration:string,
    list:[],
    listBlob:[]
  }
export default videouploadMainStore