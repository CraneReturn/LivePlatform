import { v4 as uuid4 } from 'uuid';
import type { BarrageOptions } from '../lib/baseBarrage';
import { getRandomInt } from '../lib/utils/math';
export function generateBarrageData(videoId: number, config: generateBarrageConfig) {
    const {
      isFixed, isScroll, isSenior, isSpecial,
      fixedNum, scrollNum, seniorNum, specialNum,
    } = config;
    //在这里接收到viedoid发送请求做预处理
    const textSections = [
      `读书不觉已春深`,
      `一寸光阴一寸金`,
      `不是道人来引笑`,
      `周情孔思正追寻`,
      `浮云一百八盘萦，落日四十八渡明。`,
      `得即高歌失即休，多愁多恨亦悠悠。`,
      `今朝有酒今朝醉，明日愁来明日愁。`,
      `生民何计乐樵苏。`,
      `待到秋来九月八，我花开后百花杀。`,
      `侯门一入深似海，从此萧郎是路人。`,
      `崆峒访道至湘湖，万卷诗书看转愚。`,
      `手帕蘑菇及线香，本资民用反为殃。`,
      `清风两袖朝天去，免得闾阎话短长。`,
      `春风得意马蹄疾，一日看尽长安花。`,
      `残灯无焰影幢幢，此夕闻君谪九江。`,
      `垂死病中惊坐起，暗风吹雨入寒窗。`,
      `新年快乐`,
      `更好的一年`,
      `继续努力`,
      `这泰裤辣`,
      `恭喜发财`,
    ];  
    const colors = [
      '#FFFFFF',
      '#FE0302',
      '#FF7204',
      '#FFAA02',
      '#FFD302',
      '#FFFF00',
      '#A0EE00',
      '#00CD00',
      '#019899',
      '#4266BE',
      '#89D5FF',
      '#CC0273',
    ];
  
    // 弹幕数据
    const barrages: BarrageOptions[] = [];
  
    // 自动生成固定弹幕
    if (isFixed) {
      for(let i = 0; i < fixedNum;i++) {
        const time = Math.random() * 211 * 1000;
        barrages.push({
          id: uuid4(),
          barrageType: (i % 2) === 1 ? 'top' : 'bottom',
          time,
          text: `${textSections[Math.floor(Math.random() * textSections.length)]}` , // text: textSections[Math.floor(Math.random() * textSections.length)],
          fontSize: Math.random() < 0.1 ? 24 : 34,
          lineHeight: 1.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: 4000,
          addition: {
            grade: getRandomInt(1, 10),
          }
        })
      }
    }
  
    // 自动生成滚动弹幕
    if (isScroll) {
      for(let i = 1; i < scrollNum;i++) {
        const time = Math.random() * 211 * 1000;
        barrages.push({
          id: uuid4(),
          barrageType: 'scroll',
          time,
          text: `${textSections[Math.floor(Math.random() * textSections.length)]}` ,
          fontSize: Math.random() < 0.1 ? 24 : 34,
          lineHeight: 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          addition: {
            grade: getRandomInt(1, 10),
          }
        })
      }
    }
  
    return barrages;
  }
  export type generateBarrageConfig = {
    isFixed: boolean;
    isScroll: boolean;
    isSenior: boolean;
    isSpecial: boolean;
    fixedNum: number;
    scrollNum: number;
    seniorNum: number;
    specialNum: number;
  }