<script setup lang="ts">
import { useWindowManager } from '@/stores/windowManager'
import Window from '@/components/os/Window.vue' //

const store = useWindowManager()

const launchTerminal = () => {
  // Llamada a la acción para crear la primera ventana/proceso
  store.openApp('terminal', 'Terminal v1.0', 'TerminalApp')
}
</script>

<template>
  <div class="w-screen h-screen bg-gray-800 relative overflow-hidden">
    <button
      @click="launchTerminal"
      class="absolute bottom-5 left-5 p-3 bg-green-500 text-white rounded shadow-lg"
    >
      Lanzar Terminal
    </button>

    <Window v-for="win in store.openWindows" :key="win.id" :process="win" />
  </div>
</template>
