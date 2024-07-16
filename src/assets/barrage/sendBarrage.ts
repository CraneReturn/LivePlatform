import { type Ref, ref, reactive } from "vue";
import BarrageRenderer from "../lib";
import { ElMessage } from "element-plus";
import type FixedBarrage from "../lib/baseBarrage/fixedBarrage";
import type { FixedBarrageOptions } from "../lib/baseBarrage/fixedBarrage";
import type { ScrollBarrageOptions } from "../lib/baseBarrage/srollBarrage";
import { v4 as uuid4 } from 'uuid';

export function useSendBarrage(BarrageRenderer:Ref<BarrageRenderer|undefined>,video:Ref<HTMLVideoElement>){
    const barrageText=ref("");
    const fontSizes = ref([
        { label: '小', value: 24 },
        { label: '标准', value: 34 },
      ]);
      const currentFontsize = ref(34);
      // 弹幕模式
      const barrageModes = ref<{label: string; value: 'scroll' | 'top' | 'bottom'}[]>([
        { label: '滚动', value: 'scroll' },
        { label: '顶部', value: 'top' },
        { label: '底部', value: 'bottom' },
      ]);
      const currentBarrageMode = ref<'scroll' | 'top' | 'bottom'>('scroll');
      // 弹幕颜色
      const currentBarrageColor = ref('#FE0302');
      const barrageColors = reactive([
        '#FE0302', '#FF7204', '#FFAA02',
        '#FFD302', '#FFFF00', '#A0EE00',
        '#00CD00', '#019899', '#4266BE',
        '#89D5FF', '#CC0273', '#222222',
        '#9B9B9B', '#FFFFFF',
      ]);
      //发送弹幕
      const sendbarrageMethods=((socket)=>{
        if(barrageText.value.trim()==''){
          ElMessage({
            message:'请您输入弹幕内容',
            type:"warning"
          })
          return
        }
        console.log(socket,'8888');
        
        //构造弹幕对象
        let barrage:FixedBarrageOptions|ScrollBarrageOptions
        if (currentBarrageMode.value === 'scroll') {
          // 构建滚动弹幕
          barrage = {
            id: uuid4(),
            barrageType: currentBarrageMode.value,
            time: video.value.currentTime * 1000,
            text: barrageText.value,
            fontSize: currentFontsize.value,
            lineHeight: 1.2,
            color: currentBarrageColor.value,
          };
        } else {
          // 构建顶部弹幕和底部弹幕
          barrage = {
            id: uuid4(),
            barrageType: currentBarrageMode.value,
            time: video.value.currentTime * 1000,
            text: barrageText.value,
            fontSize: currentFontsize.value,
            lineHeight: 1.2,
            color: currentBarrageColor.value,
            duration: 6000,
          };
        }
        barrage.prior = true;
        BarrageRenderer.value?.send(barrage);
        barrageText.value = '';
      })
      const randomSendBarrage = () => {
        // 构建滚动弹幕
        const barrage: ScrollBarrageOptions = {
          id: uuid4(),
          barrageType: 'scroll',
          time: video.value.currentTime * 1000,
          text: '[0025][0024]测试[0022][0023]',
          fontSize: currentFontsize.value,
          lineHeight: 1.2,
          color: currentBarrageColor.value,
        };
        barrage.prior = true;
        BarrageRenderer.value?.send(barrage);
      }
      return {
        barrageText,
        fontSizes,
        currentFontsize,
        barrageModes,
        currentBarrageMode,
        barrageColors,
        currentBarrageColor,
        sendbarrageMethods,
        randomSendBarrage
      }
}