import { ref, type Ref } from "vue";
import type BarrageRenderer from "../lib";

export function useRenderRegion(barrageRenderer: Ref<BarrageRenderer | undefined>) {
    const regionsShow = ref([
        { label: '1/4', value: 0.25 },
        { label: '半屏', value: 0.5 },
        { label: '3/4', value: 0.75 },
        { label: '全屏', value: 1 }
    ])
    const currentRenderRegions=ref(1)
    const isRenderRegionChange=(()=>{
        barrageRenderer.value?.setRenderConfig({
            renderRegion:currentRenderRegions.value
        })
    })
    return{
        regionsShow,
        currentRenderRegions,
        isRenderRegionChange
    }
}