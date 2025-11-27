<script setup lang="ts">
import { useWindowManager } from '@/stores/windowManager';

const store = useWindowManager();

const handleTaskbarClick = (processId: string) => {
  const win = store.openWindows.find(w => w.id === processId);
  if (win) {
    if (win.isMinimized) {
      win.restore(); // Si está oculta, la muestra
    } else {
      win.minimize(); // Si está visible, la oculta (comportamiento clásico de Windows)
    }
  }
};
</script>

<template>
  <div class="absolute bottom-0 left-0 w-full h-12 bg-gray-900 border-t-2 border-gray-600 flex items-center px-2 z-9999">
    <button class="bg-green-600 text-white font-bold px-4 py-1 mr-4 rounded hover:bg-green-500">
      Inicio
    </button>

    <div class="flex gap-2">
      <button 
        v-for="win in store.openWindows" 
        :key="win.id"
        @click="handleTaskbarClick(win.id)"
        class="px-4 py-1 min-w-[120px] text-sm text-left rounded border transition-colors flex items-center gap-2"
        :class="[
          win.isMinimized 
            ? 'bg-gray-700 text-gray-400 border-gray-600 hover:bg-gray-600' 
            : 'bg-gray-200 text-black border-white shadow-inner font-bold'
        ]"
      >
        <span class="w-2 h-2 rounded-full" :class="win.isMinimized ? 'bg-gray-500' : 'bg-green-500'"></span>
        <span class="truncate">{{ win.title }}</span>
      </button>
    </div>
  </div>
</template>
        