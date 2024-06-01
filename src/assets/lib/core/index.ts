import type BarrageRenderer from "..";
import type { BarrageOptions } from "../baseBarrage";
import type BaseBarrage from "../baseBarrage/barrageClass";
import type { BaseBarrageOptions } from "../baseBarrage/barrageClass";
import FixedBarrage from "../baseBarrage/fixedBarrage";
import SrollBarrage from "../baseBarrage/srollBarrage";
import FixedBarrageLayout from "./fixed-barrage-layout";
import Utils from '../utils';
import VirtualBarrage from "./virtualScroll";
export default class BarrageLayoutCalculate {
    br!: BarrageRenderer
    allBarrage: BaseBarrage[] = []
    fixedBarrage: FixedBarrage[] = []
    scrollBarrage: SrollBarrage[] = []
    senioBarrage!: []
    fixedLayout!: FixedBarrageLayout
    virtualTrackAlgorithm: VirtualBarrage;
    constructor({ barrageRenderer }: BarrageLayoutCalculateOptions) {
        this.br = barrageRenderer
        this.fixedLayout = new FixedBarrageLayout(this.br)
        this.virtualTrackAlgorithm = new VirtualBarrage(this.br);
    }
    
    setBarrages(barrageOptions: BarrageOptions[]) {
        let barrageInstance = barrageOptions.map((barrageOption) => {
            switch (barrageOption.barrageType) {
                case 'top':
                case 'bottom':
                    return new FixedBarrage(barrageOption, this.br);
                case 'scroll':
                    return new SrollBarrage(barrageOption, this.br);
                // case 'senior':
                //高级弹幕 还没写
            }
        })
        barrageInstance = barrageInstance.sort((a, b) => a!.time - b!.time)
        this.allBarrage = barrageInstance
        this.fixedBarrage = barrageInstance.filter(instance =>
            ['top', 'bottom'].includes(instance.barrageType)) as FixedBarrage[];
        this.scrollBarrage = barrageInstance.filter(instance => instance.barrageType === 'scroll') as SrollBarrage[];
        this.virtualTrackAlgorithm.layoutScrollBarrages(this.scrollBarrage);
        
        
    }
    resize(type: 'width' | 'height' | 'both') {
        // 高级弹幕的 start 和 end 定位全部重新计算
        if (type === 'width') {
          this.handleWidthChange();
        } else if (type === 'height') {
          this.handleHeightChange();
        } else {
          this.handleWidthChange();
          this.handleHeightChange();
        }
      }
      private handleWidthChange() {
        // 固定弹幕 -- 重新计算 left
        this.fixedBarrage.forEach(barrage => barrage.calFixedBarrageLeft());
        // 滚动弹幕 -- 重新计算 originalLeft
        this.scrollBarrage.forEach(barrage => barrage.cancalSrcoll());
      }
      private handleHeightChange () {
        // 固定弹幕 -- 清空现有的即可
        this.fixedLayout.clearStoredBarrage();
        // 滚动弹幕 -- 布局完全重新计算
        this.virtualTrackAlgorithm.heightChangeReLayoutCalc(this.scrollBarrage);
      }
    send(barrage: BarrageOptions) {
        // 根据弹幕类型进行不同的处理
        if (barrage.barrageType === 'scroll') {
            // 滚动弹幕
            const scrollBarrage = new SrollBarrage(barrage, this.br);
            Utils.Algorithm.insertBarrageByTime(this.scrollBarrage, scrollBarrage);
            this.virtualTrackAlgorithm.send(scrollBarrage);
        } else if (barrage.barrageType === 'top' || barrage.barrageType === 'bottom') {
            // 固定弹幕
            const fixedBarrage = new FixedBarrage(barrage, this.br);
            Utils.Algorithm.insertBarrageByTime(this.fixedBarrage, fixedBarrage);
            this.fixedLayout.send(fixedBarrage);
        // } else if (barrage.barrageType === 'senior') {
        //     // 高级弹幕
        //     const seniorBarrage = new SeniorBarrage(barrage, this.br);
        //     Utils.Algorithm.insertBarrageByTime(this.seniorBarrageInstances, seniorBarrage);
        // }
    }
}
    getRenderBarrages(time: number): BaseBarrage[] {
        // 获取需要渲染的滚动弹幕
        const renderScrollBarrages = this.getRenderScrollBarrages(time);
        
        // 获取需要渲染的固定弹幕
        const renderFixedBarrages = this.getRenderFixedBarrages(time);
        // 获取需要渲染的高级弹幕

       
        // 整合排序
        return [
          ...renderScrollBarrages,
          ...renderFixedBarrages,
         
        ].sort((a, b) => {
          if (a.prior !== b.prior) {
            // 如果 a 的 prior 为 true，则返回 1，否则返回 -1
            // 这意味着 true 的值会在最后面
            return a.prior ? 1 : -1;
          } else {
            // 如果 prior 属性相同，则按照 time 属性排序
            return a.time - b.time;
          }
        });
      }
      renderConfigChange(
        isSpeedChange: boolean,
        isHeightReduceChange: boolean,
        isRenderRegionChange: boolean,
        isAvoidOverlapChange: boolean,
        isMinSpaceChange: boolean,
      ) {
        // 重新计算 originalLeft 事项
        if (isSpeedChange) {
          this.scrollBarrage.forEach(barrage => barrage.cancalSrcoll());
        }
        // 清空固定弹幕的 store 事项
        if (isHeightReduceChange) {
          this.fixedLayout.clearStoredBarrage();
        }
        // 重置轨道数据 事项
        if (isHeightReduceChange || isRenderRegionChange) {
          this.virtualTrackAlgorithm.resetTracks();
        }
        // 根据 avoidOverlap 进行重新布局 事项
        if (
          (isSpeedChange && this.br.renderConfig.avoidOverlap) ||
          isHeightReduceChange ||
          isRenderRegionChange ||
          isAvoidOverlapChange ||
          (isMinSpaceChange && this.br.renderConfig.avoidOverlap)
        ) {
          this.virtualTrackAlgorithm.layoutScrollBarrages(this.scrollBarrage);
        }
      }
      
      getRenderScrollBarrages(time: number): SrollBarrage[] {
        // 弹幕整体向左移动的总距离，时间 * 速度
        const translateX = (time / 1000) * this.br.renderConfig.speed;    
        const renderScrollBarrages = this.scrollBarrage.filter(barrage => barrage.show && barrage.top !== undefined).filter(barrage =>
          barrage.originalRright - translateX >= 0 &&
          barrage.originalLeft - translateX < this.br.canvaSize.width
        );
    
        renderScrollBarrages.forEach(barrage => {
          barrage.left = barrage.originalLeft - translateX;
        })
        return renderScrollBarrages;
      }
      getRenderFixedBarrages(time: number): FixedBarrage[] {
        return this.fixedLayout.getRenderFixedBarrages(this.fixedBarrage, time);
      }
}
export type BarrageLayoutCalculateOptions = {
    barrageRenderer: BarrageRenderer
}