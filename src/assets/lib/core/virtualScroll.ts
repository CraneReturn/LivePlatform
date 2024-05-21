
import type BarrageRenderer from "..";
import type SrollBarrage from "../baseBarrage/srollBarrage";
import Utils from '../utils';
export default class VirtualBarrage {
    br!: BarrageRenderer
    realTacks: RealTrack[] = []
    virtualTacks: VirtualTacks[] = []
    realHeight!: number
    realTackNumber!: number
    maxGrade!: number
    vtToVtsmap = new Map<VirtualTacks, VirtualTacks[]>()
    gradeToVtMap = new Map<number, VirtualTacks[]>()
    constructor(barrageRender: BarrageRenderer) {
        this.br = barrageRender
    }
    //初始化实际轨道和虚拟轨道
    initTasks(realHeight: number) {
        this.resetTasks();
        const realTackNumber = Math.floor(this.br.canvaSize.height * this.br.renderConfig.renderRegion / realHeight)
        this.realHeight = realHeight
        for (let i = 1; i <= realTackNumber; i++) {
            this.realTacks.push(new RealTrack(i, realHeight))
        }
        const realTacksIds = this.realTacks.map(realTack => realTack.id)
        let virtualId = 1;
        for (let grade = 1; grade <= realTackNumber; grade++) {
            const isVirtualTackNumber = realTackNumber - (grade - 1)
            for (let i = 1; i <= isVirtualTackNumber; i++) {
                this.virtualTacks.push(new VirtualTacks(
                    virtualId++,
                    realTacksIds.slice(i - 1, (i - 1) + grade),
                    this.realTacks.slice(i - 1, (i - 1) + grade)
                ))
            }
            this.virtualTacks.forEach(virtualTacks => {
                this.vtToVtsmap.set(virtualTacks, this.virtualTacks.filter(item => item.grade <= this.maxGrade))
            })
            for (let grade = 1; grade <= realTackNumber; grade++) {
                this.gradeToVtMap.set(grade, this.virtualTacks.filter(item => item.grade == grade))
            }
        }
    }
    layoutScrollBarrages(scrollBarrage: SrollBarrage[]) {
        if (scrollBarrage.length == 0) return
        const realtackHeight = Utils.Math.findMode(scrollBarrage.map(barrage => Math.ceil(barrage.height)))
        this.maxGrade = Math.ceil(Math.max(...scrollBarrage.map(barrage => barrage.height)) / realtackHeight!)
        if (!this.realTacks.length || this.virtualTacks.length) {
            this.initTasks(realtackHeight!)
        }
        scrollBarrage.forEach(barrage => {
            barrage.grade = Math.ceil(barrage.height / realtackHeight!)
        })
        if (this.avoidOverlap) { this.avoidOverlapLayout(scrollBarrage) }
    }
    avoidOverlapLayout(scrollBarrages: SrollBarrage[]) {
        // 将所有虚拟轨道中的存储弹幕清空
        this.virtualTacks.forEach(vt => vt.clearAllBarrage());
        // 遍历进行布局计算
        scrollBarrages.forEach(barrage => {
            // 遍历 grade 属性为 grade 的虚拟轨道，判断能不能放进去
            const fittedVirtualTracks = this.gradeToVtMap.get(barrage.grade) || [];
            for (let i = 0; i < fittedVirtualTracks.length; i++) {
                // 当前遍历的 virtualTrack
                const virtualTrack = fittedVirtualTracks[i];
                // 判断当前遍历的 virtualTrack 能不能放进去；
                // 能放进去的条件是：包含 virtualTrack 内部任一实际轨道的虚拟轨道（grade <= maxGrade）的最后一个弹幕和当前新增弹幕都不重叠
                const canPush = (this.vtToVtsmap.get(virtualTrack) || []).every(item => {
                    // 获取最后一个滚动弹幕
                    const lastScrollBarrage = item.getLastBarrage();
                    // 如果当前轨道没有滚动弹幕的话，说明和最后一个弹幕不可能重叠，直接 return true 即可
                    if (!lastScrollBarrage) return true;
                    // 有的话，判断是否会重叠
                    return lastScrollBarrage.originalRright + this.minSpace <= barrage.originalLeft;
                });
                if (canPush) {
                    barrage.show = true;
                    virtualTrack.pushnewBarrage(barrage)
                    // 计算该滚动弹幕的 top
                    barrage.top = virtualTrack.top;
                    break;
                } else {
                    barrage.show = false;
                }
            }
            // 重要的弹幕，如果没有虚拟轨道能插进去的话，则随机一个实际轨道
            if (barrage.prior && !barrage.show) {
                this.randomTrackBarrage(barrage);
            }
        });

    }
    avoidOverlapInsert(scrollBarrage: SrollBarrage) {
        let inserted = false;
        // 获取所有符合当前弹幕高度的虚拟轨道
        const fittedVirtualTracks = this.gradeToVtMap.get(scrollBarrage.grade) || [];
        // 进行遍历，看有没有能插入的
        for (let i = 0; i < fittedVirtualTracks.length; i++) {
            // 判断当前遍历的 virtualTrack 能不能放进去
            const virtualTrack = fittedVirtualTracks[i];
            // 如果当前的虚拟轨道为空的话，直接放进去即可
            if (virtualTrack.isEmpty) {
                scrollBarrage.show = true;
                virtualTrack.pushnewBarrage(scrollBarrage);
                scrollBarrage.top = virtualTrack.top;
                inserted = true;
                break;
            } else {
                // 虚拟轨道中已经有弹幕，判断当前弹幕是不是在第一个弹幕的前面
                if (scrollBarrage.originalLeft < virtualTrack.getByIndexReturnBarrage(0).originalLeft) {
                    if (scrollBarrage.originalRright + this.minSpace < virtualTrack.getByIndexReturnBarrage(0).originalLeft) {
                        // 放到当前虚拟轨道的最前面
                        scrollBarrage.show = true;
                        virtualTrack.barrage.unshift(scrollBarrage);
                        scrollBarrage.top = virtualTrack.top;
                        inserted = true;
                        break;
                    }
                } else {
                    const insertBeforeIndex = virtualTrack.barrage.findIndex((
                        barrage,
                        index,
                        arr
                    ) => {
                        // barrage  scrollBarrage  nextBarrage
                        const nextBarrage = arr[index + 1];
                        return barrage.originalLeft < scrollBarrage.originalLeft && (!nextBarrage || scrollBarrage.originalLeft < nextBarrage.originalLeft);
                    });
                    if (insertBeforeIndex !== -1) {
                        const insertBeforeBarrage = virtualTrack.barrage[insertBeforeIndex];
                        const insertAfterBarrage = virtualTrack.barrage[insertBeforeIndex + 1];
                        if (
                            insertBeforeBarrage.originalRright + this.minSpace < scrollBarrage.originalLeft &&
                            (!insertAfterBarrage || scrollBarrage.originalRright + this.minSpace < insertAfterBarrage.originalLeft)
                        ) {
                            scrollBarrage.show = true;
                            virtualTrack.barrage.splice(insertBeforeIndex + 1, 0, scrollBarrage);
                            scrollBarrage.top = virtualTrack.top;
                            inserted = true;
                            break;
                        }
                    }
                }
            }
        }
        // 如果没有插入成功的话，随机一个实际轨道的 top
        if (!inserted) {
            this.randomTrackBarrage(scrollBarrage);
        }
    }
    send(srollBarrage:SrollBarrage){
        srollBarrage.grade=Math.ceil(srollBarrage.height/this.realHeight)
        if(this.br.renderConfig.avoidOverlap){
            this.avoidOverlapInsert(srollBarrage)
        }else {
            this.randomTrackBarrage(srollBarrage)
        }
    }
    randomTrackBarrage(barrage: SrollBarrage) {
        const randomRealTrack = this.getRandomRealTrack();
        barrage.top = randomRealTrack.top;
        barrage.show = true;
    }
    getRandomRealTrack() {
        return this.realTacks[Utils.Math.getRandomInt(0, this.realTacks.length - 1)];
    }
    heightChangeReLayoutCalc(scrollBarrages: SrollBarrage[]) {
        // 重置轨道数据
        this.resetTasks();
    
        // 重新进行计算
        this.layoutScrollBarrages(scrollBarrages);
      }
    
    resetTasks() {
        this.realTacks = []
        this.virtualTacks = []
        this.vtToVtsmap.clear()
        this.gradeToVtMap.clear()
    }
    get avoidOverlap() {
        return this.br.renderConfig.avoidOverlap;
    }
    get minSpace() {
        return this.br.renderConfig.minSpace;
    }
}
//实际轨道类
class RealTrack {
    id!: number
    height: number
    constructor(id: number, height: number) {
        this.id = id
        this.height = height
    }
    get top() {
        return (this.id - 1) * this.height
    }
}
//合并实际轨道 得到可以存放的弹幕轨道
class VirtualTacks {
    id!: number
    virtualArr!: number[]
    virtualSet!: Set<number>
    realInstance!: RealTrack[]
    barrage: SrollBarrage[] = []
    constructor(id: number, virtualArr: number[], realInstance: RealTrack[]) {
        this.id = id
        this.virtualArr = virtualArr
        this.realInstance = realInstance
    }
    //获得最后一个滚动弹幕
    getLastBarrage(): SrollBarrage | undefined {
        return this.barrage[this.barrage.length - 1]
    }
    //添加
    pushnewBarrage(barrage: SrollBarrage) {
        this.barrage.push(barrage)
    }
    //清空
    clearAllBarrage() {
        this.barrage = []
    }
    //获取指定下标的滚动弹幕
    getByIndexReturnBarrage(index: number) {
        return this.barrage[index]
    }
    get isEmpty() {
        return this.barrage.length == 0
    }
    get top() {
        return this.realInstance[0].top
    }
    get grade() {
        return this.virtualArr.length
    }
}