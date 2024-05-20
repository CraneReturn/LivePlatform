import type { RenderFn } from "./baseBarrage/barrageClass"
import type BaseBarrage from "./baseBarrage/barrageClass"

//弹幕渲染器
export default class BarrageRenderer{
    //容器dom
    container!:HTMLElement|null
    video!:HTMLVideoElement
    canvas!:HTMLCanvasElement
    ctx!:CanvasRenderingContext2D
    //默认渲染配置
    defalutRenderConfig:RenderConfig={
        heightReduce: 0,
        speed: 200,
        opacity: 1,
        renderRegion: 1,
        avoidOverlap: true,
        minSpace: 10,
        barrageFilter: function (barrage: BaseBarrage): boolean {
            throw new Error("Function not implemented.")
        }
    }
    constructor({
		container,
		video,
		// barrages,
		// barrageImages,
		renderCofig,
		// devConfig,
	}: RendererOptions) {
		this.video = video;

		// 先设置好渲染配置
		this.setRenderConfigInternal(renderCofig || {}, true);
		// 先设置好开发配置
		// this.setDevConfig(devConfig || {});
		// 创建、处理相关 DOM
		this.container =
			typeof container === 'string'
			? document.getElementById(container)
			: container;
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
	}

    renderCofig=this.defalutRenderConfig;
    //弹幕是否被打开
    isOpen=true
    animationHandle?: number;

    private setRenderConfigInternal(renderCofig: any,init=false){

        //获取弹幕渲染配置属性
        const renderCofigKeys=Object.keys(renderCofig)
        const isSpeedChange = renderCofigKeys.includes('speed') && renderCofig.speed !== this.renderCofig.speed;
        const isHeightReduceChange = renderCofigKeys.includes('heightReduce') && renderCofig.heightReduce !== this.renderCofig.heightReduce;
		const isRenderRegionChange = renderCofigKeys.includes('renderRegion') && renderCofig.renderRegion !== this.renderCofig.renderRegion;
		const isAvoidOverlapChange = renderCofigKeys.includes('avoidOverlap') && renderCofig.avoidOverlap !== this.renderCofig.avoidOverlap;
		const isMinSpaceChange = renderCofigKeys.includes('minSpace') && renderCofig.minSpace !== this.renderCofig.minSpace;
        Object.assign(this.renderCofig,renderCofig)
        
    }
    setRenderConfig(renderCofig: any){
        this.setRenderConfigInternal(renderCofig)
    }

}
export type RenderConfig={
    barrageFilter:(barrage:BaseBarrage)=>boolean
    priorBorderCustomRender?: RenderFn;
    heightReduce: number;
    speed: number;
    renderRegion: number;
    minSpace: number;
    avoidOverlap: boolean;
    opacity: number;
}
export type RendererOptions = {
	// 容器 DOM
	container: string | HTMLElement;
	// video 元素（获取 video 元素，只是为了获取播放状态，不会对 video 执行其他操作）
	video: HTMLVideoElement;
	// 弹幕数据
	// barrages?: BarrageOptions[];
	// // 渲染相关配置
	// renderCofig?: Partial<RenderConfig>;
	// // 开发相关配置
	// devConfig?: Partial<DevConfig>,
}
export {
	BarrageRenderer,
};