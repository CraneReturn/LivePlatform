import BarrageRenderer from '../index'
//参数对象
export type BaseBarrageOptions = {
    //弹幕id
    id: string;
    //时间
    time: number;
    //文本内容
    text: string;
    fontSize: number;
    lineHeight: number;
    color: string;
    prior?: boolean;
    //自定义render
    customRender?: CustomRender;
    addition?: {
        [key: string]: any
    };
    barrageType:string
}
//弹幕类
export default abstract class BaseBarrage {
    id!: string;
    readonly abstract barrageType: BarrageType;
    time!: number;
    text!: string;
    fontSize!: number;
    lineHeight!: number;
    color!: string;
    prior!: boolean;
    //自定义render
    customRender?: CustomRender;
    addition?: Record<string, any>;
    //渲染器实例
    br: BarrageRenderer;
    top!: number;
    left!: number;
    width!: number;
    height!: number
    protected constructor({
        id,
        time,
        text,
        fontSize,
        lineHeight,
        color,
        prior = false,
        customRender,
        addition,
    }: BaseBarrageOptions, barrageRenderer: BarrageRenderer) {
        this.id = id;
        this.time = time;
        this.text = text;
        this.fontSize = fontSize;
        this.lineHeight = lineHeight;
        this.color = color;
        this.prior = prior;
        this.customRender = customRender;
        this.addition = addition;

        this.br = barrageRenderer;

        this.initBarrage()
    }
    initBarrage() {
        // const sectionObjects = this.analyseText(this.text);
        // const sectionObjects=this.text;
        const sectionObjects=this.text;
        //整个弹幕的宽
        let totalWidth = 0;
        let maxHeight = 0;
        this.width=this.customRender?.width??totalWidth;
        this.height=this.customRender?.height??maxHeight
    }
    //渲染指定上下文
    render(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D){
        ctx.beginPath()
        //如果是自定义渲染弹幕的话 触发自定义渲染函数
        if(this.customRender){
            this.customRender.renderFn({
                ctx,
                barrage:this,
                br:this.br,
            })
            return
        }
        if(this.br.devConfig.isRenderBarrageBorder){
            ctx.strokeStyle='#FF0000';
            ctx.strokeRect(this.left, this.top, this.width, this.height);
        }
        //是不是重要的
        if(this.prior){
            if(this.br.renderConfig.priorBorderCustomRender){
                this.br.renderConfig.priorBorderCustomRender({ctx,barrage:this,br:this.br})
            }else{
                ctx.strokeStyle='#89D5FF'
                ctx.strokeRect(this.left,this.top,this.width,this.height)
            }
        }
        this.setCtxFont(ctx)
        ctx.fillStyle=this.color
        ctx.fillText(this.text, this.left  , this.top );
        
        
    }
    setCtxFont(ctx:CanvasRenderingContext2D |OffscreenCanvasRenderingContext2D){
        ctx.font=`${this.br.renderConfig.fontWeight} ${this.fontSize} px`
    }

}

//自定义渲染
export type CustomRender = {
    // 弹幕的宽（弹幕实际的宽由具体的渲染操作决定，所以这里由用户自行传入）
    width: number;
    // 弹幕的高（弹幕实际的高由具体的渲染操作决定，所以这里由用户自行传入）
    height: number;
    // 弹幕自定义渲染函数
    renderFn: RenderFn;
}
//自定义渲染函数
export type CustomRenderOptions = {
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    barrage: BaseBarrage;
    br:BarrageRenderer;
    //在lib目录下index.ts
}
export type RenderFn = (options: CustomRenderOptions) => void;
export type BarrageType = 'scroll' | 'top' | 'bottom' | 'senior';