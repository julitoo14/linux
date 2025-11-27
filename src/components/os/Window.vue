<script setup lang="ts">
import { ref, computed } from 'vue'; // 🟢 Importamos computed
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

// Configuración del arrastre
const { x, y, isDragging } = useDraggable(windowRef, {
  initialValue: { x: props.process.x, y: props.process.y },
  handle: handleRef,
  onEnd: () => {
    // 🟢 Solo guardamos la posición si NO está maximizada
    if (!props.process.isMaximized) {
      props.process.x = x.value;
      props.process.y = y.value;
    }
  }
});

// 🟢 Computed para el estilo dinámico
const windowStyle = computed(() => {
  // Si está maximizada, forzamos posición fija y tamaño completo
  if (props.process.isMaximized) {
    return {
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      transform: 'none', // Anulamos el movimiento
      zIndex: 50 // Aseguramos que tape todo
    };
  }
  
  // Si NO está maximizada, usamos la lógica de ventana flotante
  return {
    width: '300px', // O el tamaño que quieras por defecto
    height: 'auto',
    transform: `translate(${x.value}px, ${y.value}px)`,
    zIndex: isDragging.value ? 1000 : 10
  };
});
</script>

<template>
  <div 
    ref="windowRef" 
    class="absolute border-2 border-gray-700 bg-gray-200 shadow-xl flex flex-col transition-all duration-200"
    :style="windowStyle"
  >
    <div 
      ref="handleRef"
      class="p-1 text-white flex justify-between select-none items-center"
      :class="[
        process.isMaximized ? 'cursor-default' : 'cursor-move',
        isDragging ? 'bg-blue-600' : 'bg-blue-500' 
      ]"
      @dblclick="process.toggleMaximize()" 
    >
      <span class="font-bold px-2">{{ props.process.title }}</span> 
      
      <div class="flex gap-1">
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