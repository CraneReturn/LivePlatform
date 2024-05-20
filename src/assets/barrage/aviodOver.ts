import { ref, type Ref } from "vue";
import type BarrageRenderer from "../lib";

export function avoidOverlap(barrageRenderer: Ref<BarrageRenderer | undefined>) {
    const avoidFlag=ref(true)
    const changeAvoidOver=(()=>{
        barrageRenderer.value?.setRenderConfig({
            avoidOverlap:avoidFlag.value
        })
    })
    return{
        avoidFlag,
        changeAvoidOver
    }
}