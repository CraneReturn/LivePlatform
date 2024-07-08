import { ref, type Ref } from "vue";
import type BarrageRenderer from "../lib";

export function useBarrageOpen(barrageRenderer: Ref<BarrageRenderer | undefined>) {
    const barrageOpen = ref(true);
  
    const barrageOpenChange = (isOpen: boolean) => {
      barrageRenderer.value?.switch(isOpen);
    };
  
    return {
      barrageOpen,
      barrageOpenChange,
    }
  }
  