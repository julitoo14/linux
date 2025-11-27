<script setup lang="ts">
import { useWindowManager } from '@/stores/windowManager'
import Window from '@/components/os/Window.vue'
import Taskbar from '@/components/os/Taskbar.vue' // 🟢 Importamos

const store = useWindowManager()

const launchTerminal = () => {
  store.openApp('terminal', 'Terminal v1.0', 'TerminalApp')
}
</script>

<template>
  <div class="w-screen h-screen bg-gray-800 relative overflow-hidden flex flex-col">
    <div class="flex-1 relative">
        <button
          @click="launchTerminal"
          class="absolute bottom-25 left-5 p-5 bg-red-500 text-white rounded shadow-lg"
        >
          Terminal
        </button>

        <Window v-for="win in store.openWindows" :key="win.id" :process="win" />
    </div>

    <Taskbar />
  </div>
</template>