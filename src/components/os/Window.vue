<script setup lang="ts">
import type { OSProcess } from '@/models/OSProcess';
import { useWindowManager } from '@/stores/windowManager';

// 🅰️ DefineProps: Le decimos a Vue que 'process' tiene el tipo de nuestra clase.
const props = defineProps<{
  process: OSProcess; 
}>();

const store = useWindowManager();

const handleClose = () => {
  store.closeWindow(props.process.id);
};
</script>

<template>
  <div 
    class="absolute p-0.5 border-2 border-gray-700 bg-gray-200 shadow-xl min-w-[300px]"
    :style="{ 
      // Usamos las propiedades 'x' e 'y' de la clase para el CSS
      top: props.process.y + 'px', 
      left: props.process.x + 'px',
      // Estilo condicional basado en el estado 'isMinimized'
      opacity: props.process.isMinimized ? 0.3 : 1 
    }"
  >
    <div class="title-bar bg-blue-500 p-1 text-white flex justify-between cursor-move">
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