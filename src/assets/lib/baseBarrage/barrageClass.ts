import BarrageRenderer from '../index'
import Utils from '../utils';
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
    barrageType: string
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
    sections: Section[]=[];
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
    // //渲染指定上下文
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
                
                this.br.renderConfig.priorBorderCustomRender({
                    ctx,barrage:this,br:this.br})
            }else{
                ctx.strokeStyle='red'
                ctx.strokeRect(this.left,this.top,this.width,this.height)
            }
        }
        this.setCtxFont(ctx)
        ctx.fillStyle=this.color
        
        this.sections.forEach( section => {
              ctx.fillText(section.text, this.left + section.leftOffset, this.top + section.topOffset);
          })

    }
    initBarrage() {
        const sectionObjects = this.analyseText(this.text);
        // 整个弹幕的宽
        let totalWidth = 0;
        // 整个弹幕的高
        let maxHeight = 0;

        // 计算转换成 sections
        const sections: Section[] = [];
        console.log(sectionObjects);
        
        sectionObjects.forEach(sectionObject => {
            // 设置好文本状态后，进行文本的测量
            this.setCtxFont(this.br.ctx);
            const textWidth = this.br.ctx?.measureText(sectionObject.value).width || 0;
            const textHeight = this.fontSize * this.lineHeight;
            // console.log(this.lineHeight,'1111111');
            
            totalWidth += textWidth;
            maxHeight = maxHeight < textHeight ? textHeight : maxHeight;
            
            // 构建文本片段
            sections.push(new TextSection({
                text: sectionObject.value,
                width: textWidth,
                height: textHeight,
                leftOffset: Utils.Math.sum(sections.map(section => section.width)),
            }));

        })
        console.log(totalWidth);
        this.sections = sections;

        // 设置当前弹幕的宽高，如果自定义中定义了的话，则取自定义中的 width 和 height，因为弹幕实际呈现出来的 width 和 height 是由渲染方式决定的
        this.width = this.customRender?.width ?? totalWidth;
        this.height = this.customRender?.height ?? maxHeight;

        // 遍历计算各个 section 的 topOffset
        this.sections.forEach(item => {
            if (item.sectionType === 'text') {
                item.topOffset = (this.height - this.fontSize) / 2;
            } else {
                item.topOffset = (this.height - item.height) / 2;
            }
        });
    }

    analyseText(barrageText: string): Segment[] {
        const segments: Segment[] = [];

        // 字符串解析器
        while (barrageText) {
            // 尝试获取 ]
            const rightIndex = barrageText.indexOf(']');
            if (rightIndex !== -1) {
                // 能找到 ]，尝试获取 rightIndex 前面的 [
                const leftIndex = barrageText.lastIndexOf('[', rightIndex);
                if (leftIndex !== -1) {
                    // [ 能找到
                    if (leftIndex !== 0) {
                        // 如果不等于 0 的话，说明前面是 text
                        segments.push({
                            type: 'text',
                            value: barrageText.slice(0, leftIndex),
                        })
                    }
                    segments.push({
                        type: rightIndex - leftIndex > 1 ? 'image' : 'text',
                        value: barrageText.slice(leftIndex, rightIndex + 1),
                    });
                    barrageText = barrageText.slice(rightIndex + 1);
                } else {
                    // [ 找不到
                    segments.push({
                        type: 'text',
                        value: barrageText.slice(0, rightIndex + 1),
                    })
                    barrageText = barrageText.slice(rightIndex + 1);
                }
            } else {
                // 不能找到 ]
                segments.push({
                    type: 'text',
                    value: barrageText,
                });
                barrageText = '';
            }
        }

        // 相邻为 text 类型的需要进行合并
        const finalSegments: Segment[] = [];
        let currentText = '';
        for (let i = 0; i < segments.length; i++) {
            if (segments[i].type === 'text') {
                currentText += segments[i].value;
            } else {
                if (currentText !== '') {
                    finalSegments.push({ type: 'text', value: currentText });
                    currentText = '';
                }
                finalSegments.push(segments[i]);
            }
        }
        if (currentText !== '') {
            finalSegments.push({ type: 'text', value: currentText });
        }

        return finalSegments;
    }
    setCtxFont(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) {
       ctx.font = `${this.br.renderConfig.fontWeight} ${this.fontSize}px`;       
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
    br: BarrageRenderer;
    //在lib目录下index.ts
}
export type TextSectionOptions = {
    // 文本片段的内容
    text: string;
    // 这段文本的宽高
    width: number;
    height: number;
    // 当前片段相较于整体弹幕 top 和 left 的偏移量
    topOffset?: number;
    leftOffset: number;
}

export class TextSection {
    readonly sectionType = 'text';
    text: string;
    width: number;
    height: number;
    topOffset!: number;
    leftOffset: number;

    constructor({
        text,
        width,
        height,
        leftOffset,
    }: TextSectionOptions) {
        this.text = text;
        this.width = width;
        this.height = height;
        this.leftOffset = leftOffset;
    }
}
export type Segment = {
    type: 'text' | 'image',
    value: string
}


export type Section = TextSection;
export type RenderFn = (options: CustomRenderOptions) => void;
export type BarrageType = 'scroll' | 'top' | 'bottom' | 'senior';