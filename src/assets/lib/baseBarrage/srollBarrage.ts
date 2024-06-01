import type BarrageRenderer from "..";
import BaseBarrage, { type BarrageType, type BaseBarrageOptions } from "./barrageClass";

//滚动弹幕
export default class SrollBarrage extends BaseBarrage{
    //弹幕类型
    readonly barrageType: BarrageType='scroll' ;
    originalLeft!:number
    originalRright!:number
    show=true
    grade!:number
    constructor(srolloptions:ScrollBarrageOptions,barrageRender:BarrageRenderer){
        super(srolloptions,barrageRender)
        this.cancalSrcoll()
    }
    cancalSrcoll(){
        this.originalLeft=this.br.canvaSize.width+(this.time/1000)*this.br.renderConfig.speed;
        this.originalRright = this.originalLeft + this.width;
    }
}

export type ScrollBarrageOptions = BaseBarrageOptions & {
    // 弹幕的类型
    barrageType: "scroll";
    
  }