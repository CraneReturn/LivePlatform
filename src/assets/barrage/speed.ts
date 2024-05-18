import { ref, type Ref } from "vue";
import type BarrageRenderer from "../lib";

export function userSpeed(barrageRenderer: Ref<BarrageRenderer | undefined>) {
    const userSpeedlist = ref([
        { label: '100', value: 100 },
        { label: '150', value: 150 },
        { label: '200', value: 250 },
        { label: '300', value: 300 }
    ])
    const currentSpeed=ref(100)
    const speendChange=(()=>{
        barrageRenderer.value?.setRenderConfig({
            speed:currentSpeed.value
        })
    })
    return{
        userSpeedlist,
        speendChange,
        currentSpeed
    }
}