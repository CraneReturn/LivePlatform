import { v4 as uuid4 } from 'uuid';
import type { BarrageOptions } from '../lib/baseBarrage';
import { getRandomInt } from '../lib/utils/math';
import {getAllbarrages} from '@/views/client/api/barrage/index'
export async function generateBarrageData(videoId: number, config: generateBarrageConfig) {
    const {
      isFixed, isScroll, isSenior, isSpecial,
      fixedNum, scrollNum, seniorNum, specialNum,
    } = config; 
    //先获取总页数
    let dataAll=[]
    const datanum =await getAllbarrages(1,1,10,videoId)
    const {pages,records}=datanum.data
    console.log(datanum.data);
    
    dataAll.push(...records)
    for(let index=1;index<=pages;index++){
      const data=await getAllbarrages(1,index,10,videoId)
      const {records}=data.data
      dataAll.push(...records)
    }
    console.log(dataAll);
    
    const colors = [
      '#FFFFFF',
      '#FE0302',
      '#FF7204',
      '#FFAA02',
      '#FFD302',
      '#FFFF00',
      '#A0EE00',
      '#00CD00',
      '#019899',
      '#4266BE',
      '#89D5FF',
      '#CC0273',
    ];
  
    // 弹幕数据
    const barrages: BarrageOptions[] = [];
  
    // 自动生成固定弹幕
    if (isFixed) {
      dataAll.forEach((d)=>{
        if(d.type==0||d.type==1){
          barrages.push({
            id: d.videoBarrageId,
            barrageType: d.type==0?'top' : 'bottom',
            time:d.nodeTime,
            text: `${textSections[d.text]}` , // text: textSections[Math.floor(Math.random() * textSections.length)],
            fontSize: Math.random() < 0.1 ? 24 : 34,
            lineHeight: 1.1,
            color: d.color,
            duration: 4000,
            addition: {
              grade: getRandomInt(1, 10),
            }
      })
        }  
    })
    }
  
    // 自动生成滚动弹幕
    if (isScroll) {
      dataAll.forEach((d)=>{
        if(d.type==3){
          barrages.push({
            id: d.videoBarrageId,
            barrageType: 'scroll',
            time:d.nodeTime,
            text: `${d.text}` , // text: textSections[Math.floor(Math.random() * textSections.length)],
            fontSize: Math.random() < 0.1 ? 24 : 34,
            lineHeight: 1.1,
            color: d.color,
            addition: {
              grade: getRandomInt(1, 10),
            }
      })
        }  
    })
    }
    return barrages;
  }
  export type generateBarrageConfig = {
    isFixed: boolean;
    isScroll: boolean;
    isSenior: boolean;
    isSpecial: boolean;
    fixedNum: number;
    scrollNum: number;
    seniorNum: number;
    specialNum: number;
  }