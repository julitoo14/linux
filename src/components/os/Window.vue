<script setup lang="ts">
import { ref, computed } from 'vue';
import type { OSProcess } from '@/models/OSProcess';
import { useDraggable } from '@vueuse/core';
import { useWindowManager } from '@/stores/windowManager';

const props = defineProps<{
  process: OSProcess; 
}>();

const store = useWindowManager();
const windowRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);

const handleClose = () => {
  store.closeWindow(props.process.id);
};

const { x, y, isDragging } = useDraggable(windowRef, {
  initialValue: { x: props.process.x, y: props.process.y },
  handle: handleRef,
  onEnd: () => {
    if (!props.process.isMaximized) {
      props.process.x = x.value;
      props.process.y = y.value;
    }
  }
});

const windowStyle = computed(() => {
  if (props.process.isMaximized) {
    return {
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      transform: 'none',
      zIndex: 50
    };
  }
  
  return {
    width: '300px',
    height: 'auto',
    transform: `translate(${x.value}px, ${y.value}px)`,
    zIndex: isDragging.value ? 1000 : 10
  };
});
</script>

<template>
  <div 
    ref="windowRef" 
    v-show="!process.isMinimized"
    class="absolute border border-gray-600/50 bg-slate-800/95 text-white shadow-2xl flex flex-col backdrop-blur-sm rounded-lg overflow-hidden"
    :class="{ 
      'transition-all duration-300 ease-in-out': !isDragging,  /* 🟢 Solo anima si NO arrastras */
      'cursor-grabbing': isDragging
    }"
    :style="windowStyle"
  >
    <div 
      ref="handleRef"
      class="p-1 text-white flex justify-between select-none items-center"
      :class="[
        process.isMaximized ? 'cursor-default' : 'cursor-move',
        isDragging ? 'bg-blue-600' : 'bg-blue-500' 
      ]"
      @dblclick="process.maximize()" 
    >
      <span class="font-bold px-2">{{ props.process.title }}</span> 
      
      <div class="flex gap-1">
        <button 
          @click="process.minimize()" 
          class="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded"
          title="Minimizar"
        >
          _
        </button>

        <button 
          @click="process.maximize()" 
          class="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded"
          title="Maximizar"
        >
          <span v-if="process.isMaximized">❐</span>
          <span v-else>□</span>
        </button>

        <button 
          @click="handleClose" 
          class="w-6 h-6 flex items-center justify-center hover:bg-red-500 rounded"
          title="Cerrar"
        >
          ✕
        </button>
      </div>
    </div>
    
    <div class="flex-1 bg-white p-4 overflow-auto">
      Contenido de: {{ props.process.componentName }}
      <p class="mt-4 text-gray-500 text-sm">
        Estado: {{ process.isMaximized ? 'Pantalla Completa' : 'Ventana' }}
      </p>
    </div>
  </div>
</template>