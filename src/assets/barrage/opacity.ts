import  BarrageRenderer from "../lib";
import {type Ref,ref} from 'vue'
export function useOpacity(barrageRenderer:Ref<BarrageRenderer |undefined>){
    const opacity=ref(100)
    const opacityChange=()=>{
        barrageRenderer.value?.setRenderConfig({
            opacity:opacity.value/100
        })
    }
    return {
        opacity,
        opacityChange
    }
}