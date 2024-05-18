import {ref} from 'vue'

export function useDisable(){
    const barrageRenderList = ref([
        {key: 'scroll', label: '滚动', value: true, judge: (barrage: BaseBarrage) => barrage.barrageType === 'scroll'},
        {key: 'top', label: '顶部', value: true, judge: (barrage: BaseBarrage) => barrage.barrageType === 'top'},
        {key: 'bottom', label: '底部', value: true, judge: (barrage: BaseBarrage) => barrage.barrageType === 'bottom'},
        {
          key: 'color',
          label: '彩色',
          value: true,
        //   judge: (barrage: BaseBarrage) => !(typeof barrage.color === 'string' && ['#FFFFFF', '#000000'].includes(barrage.color))
        },
        {key: 'senior', label: '高级', value: true, judge: (barrage: BaseBarrage) => barrage.barrageType === 'senior'}
    ]);
    const shieldGrade=ref(1)
    const isOpenDrawer=ref(false)
    const disableShowtext=ref<string[]>([])

    return{
        barrageRenderList,
        shieldGrade,
        isOpenDrawer,
        disableShowtext
    }
}