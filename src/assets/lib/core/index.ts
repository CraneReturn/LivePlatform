import type BarrageRenderer from "..";
import type { BarrageOptions } from "../baseBarrage";
import type BaseBarrage from "../baseBarrage/barrageClass";
import type { BaseBarrageOptions } from "../baseBarrage/barrageClass";
import FixedBarrage from "../baseBarrage/fixedBarrage";
import SrollBarrage from "../baseBarrage/srollBarrage";
import FixedBarrageLayout from "./fixed-barrage-layout";
import Utils from '../utils';
export default class BarrageLayoutCalculate {
    br!: BarrageRenderer
    allBarrage: BaseBarrage[] = []
    fixedBarrage: FixedBarrage[] = []
    scrollBarrage: SrollBarrage[] = []
    senioBarrage!: []
    fixedLayout!: FixedBarrageLayout
    constructor({ barrageRenderer }: BarrageLayoutCalculateOptions) {
        this.br = barrageRenderer
        this.fixedLayout = new FixedBarrageLayout(this.br)
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
    }

    send(barrage: BarrageOptions) {
        // 根据弹幕类型进行不同的处理
        // if (barrage.barrageType === 'scroll') {
        //     // 滚动弹幕
        //     const scrollBarrage = new ScrollBarrage(barrage, this.br);
        //     Utils.Algorithm.insertBarrageByTime(this.scrollBarrageInstances, scrollBarrage);
        //     this.virtualTrackAlgorithm.send(scrollBarrage);
        // } else if (barrage.barrageType === 'top' || barrage.barrageType === 'bottom') {
        //     // 固定弹幕
        //     const fixedBarrage = new FixedBarrage(barrage, this.br);
        //     Utils.Algorithm.insertBarrageByTime(this.fixedBarrageInstances, fixedBarrage);
        //     this.fixedBarrageLayout.send(fixedBarrage);
        // } else if (barrage.barrageType === 'senior') {
        //     // 高级弹幕
        //     const seniorBarrage = new SeniorBarrage(barrage, this.br);
        //     Utils.Algorithm.insertBarrageByTime(this.seniorBarrageInstances, seniorBarrage);
        // }
    }


}
export type BarrageLayoutCalculateOptions = {
    barrageRenderer: BarrageRenderer
}