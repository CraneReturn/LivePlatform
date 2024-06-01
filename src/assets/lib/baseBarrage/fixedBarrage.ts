import type BarrageRenderer from "..";
import BaseBarrage, { type BarrageType, type BaseBarrageOptions } from "./barrageClass";

//顶部弹幕 底部弹幕
export default class FixedBarrage extends BaseBarrage{
    //弹幕类型
    readonly barrageType: BarrageType ;
    duration: number;
    endTime!:number
    constructor (fixedBarrageOptions:FixedBarrageOptions,barrageRender:BarrageRenderer){
        super(fixedBarrageOptions,barrageRender)
        const {barrageType,duration}=fixedBarrageOptions
        this.barrageType=barrageType
        this.duration=duration
        this.endTime=duration+this.time
        this.calFixedBarrageLeft()
    }
    calFixedBarrageLeft(){
        this.left=(this.br.canvaSize.width-this.width)/2
    }
}

export type FixedBarrageOptions = BaseBarrageOptions & {
    // 弹幕的类型
    barrageType: 'top' | 'bottom';
    // 固定弹幕能够存在的时间
    duration: number;
    
  }