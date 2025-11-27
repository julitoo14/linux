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
      // 🟢 TOP: 32px para dejar espacio a la barra superior
      top: '40px', 
      
      left: '0px',
      
      // 🟢 WIDTH: 100% del ancho
      width: '100vw',
      
      // 🟢 HEIGHT: Restamos 32px (TopBar) + 48px (Taskbar) = 80px
      height: 'calc(100vh - 97px)', 
      
      transform: 'none',
      zIndex: 50,
      borderRadius: '10px' // Sin bordes redondeados al maximizar
    };
  }
  
  // Estilo para ventana normal (flotante)
  return {
    width: '600px',
    height: '400px',
    transform: `translate(${x.value}px, ${y.value}px)`,
    zIndex: isDragging.value ? 1000 : 10
  };
});
</script>

<template>
  <div 
    ref="windowRef" 
    v-show="!process.isMinimized"
    class="absolute flex flex-col shadow-2xl overflow-hidden border border-white/10 bg-slate-900/90 backdrop-blur-md text-white pointer-events-auto"
    :class="{ 
      'rounded-lg': !process.isMaximized,
      /* 🟢 FIX LAG: Desactivamos animación al arrastrar para que sea instantáneo */
      'transition-all duration-200 ease-out': !isDragging && !process.isMaximized, 
      'cursor-grabbing': isDragging
    }"
    :style="windowStyle"
  >
    <div 
      ref="handleRef"
      class="h-10 px-3 flex justify-between items-center select-none border-b border-white/5 bg-white/5"
      :class="process.isMaximized ? 'cursor-default' : 'cursor-grab'"
      @dblclick="process.maximize()" 
    >
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium tracking-wide opacity-90">{{ props.process.title }}</span>
      </div>
      
      <div class="flex gap-2">
        <button @click.stop="process.minimize()" class="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors">_</button>
        <button @click.stop="process.maximize()" class="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
           <span v-if="process.isMaximized" class="text-xs">❐</span>
           <span v-else class="text-xs">□</span>
        </button>
        <button @click.stop="handleClose" class="w-6 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white rounded transition-colors">✕</button>
      </div>
    </div>
    
    <div class="flex-1 p-4 overflow-auto bg-slate-900/50 select-text cursor-auto">
      <h2 class="text-xl font-light mb-2 text-blue-400">Aplicación: {{ props.process.componentName }}</h2>
      <p class="text-gray-300 text-sm leading-relaxed">
        ¡Hola! Ahora esta ventana sí responde.
        <br><br>
        ✅ <b>Arrastrar:</b> Desde la barra superior.<br>
        ✅ <b>Maximizar:</b> Doble clic o botón cuadrado.<br>
        ✅ <b>Interactuar:</b> Puedes seleccionar este texto.
      </p>
    </div>
  </div>
</template>