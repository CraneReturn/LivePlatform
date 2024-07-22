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
            url:"",
            dynamicTags:[]
          }),
          nowindex:0,
        //储存已经上传的
        hasUploadedarr:[]
    }),
    actions: {

    },
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