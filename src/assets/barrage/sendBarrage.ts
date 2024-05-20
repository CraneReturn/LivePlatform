import { type Ref, ref, reactive } from "vue";
import BarrageRenderer from "../lib";

export function useSendBarrage(BarrageRenderer:Ref<BarrageRenderer|undefined>,video:Ref<HTMLVideoElement>){
    const barrageText=ref('');
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
      return {
        barrageText,
        fontSizes,
        currentFontsize,
        barrageModes,
        currentBarrageMode,
        barrageColors,
        currentBarrageColor
      }
}