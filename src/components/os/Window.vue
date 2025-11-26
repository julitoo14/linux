<script setup lang="ts">
import { ref } from 'vue'; // 🟢 1. Importamos ref
import type { OSProcess } from '@/models/OSProcess';
import { useDraggable } from '@vueuse/core';
import { useWindowManager } from '@/stores/windowManager';

const props = defineProps<{
  process: OSProcess; 
}>();

const store = useWindowManager();

const handleClose = () => {
  store.closeWindow(props.process.id);
};

// 🟢 2. Creamos referencias para el elemento Ventana y para la Barra de Título
const windowRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);

// 🟢 3. Inicializamos useDraggable
const { x, y, isDragging } = useDraggable(windowRef, {
  // Le decimos: "Usa estos valores iniciales (los de tu clase)"
  initialValue: { x: props.process.x, y: props.process.y },
  
  // Le decimos: "Solo permite arrastrar si agarran desde este elemento (la barra)"
  handle: handleRef,

  // Cuando suelta el mouse, guardamos la posición final en tu objeto POO
  onEnd: () => {
    props.process.x = x.value;
    props.process.y = y.value;
  }
});
</script>

<template>
  <div 
    ref="windowRef" 
    class="absolute p-0.5 border-2 border-gray-700 bg-gray-200 shadow-xl min-w-[300px]"
    :style="{transform: `translate(${x}px, ${y}px)`, 
    opacity: isDragging ? 0.8 : (props.process.isMinimized ? 0.3 : 1),
    zIndex: isDragging ? 1000 : 10
    }"
  >
    <div 
      ref="handleRef"
      class="title-bar bg-blue-500 p-1 text-white flex justify-between cursor-move select-none"
    >
      <span>{{ props.process.title }}</span> 
      <div>
        <button @click="props.process.minimize()" class="px-2 hover:bg-blue-400">_</button>
        <button @click="handleClose" class="px-2 hover:bg-red-500">X</button>
      </div>
    </div>
    
    <div class="p-4 bg-white min-h-[150px]">
      Contenido de: {{ props.process.componentName }}
    </div>
  </div>
</template>