<script setup lang="ts">
import { useWindowManager } from '@/stores/windowManager'

const store = useWindowManager()

const handleTaskbarClick = (processId: string) => {
  const win = store.openWindows.find((w) => w.id === processId)
  if (win) {
    if (win.isMinimized) win.restore()
    else win.minimize() // O win.maximize() si prefieres traer al frente
  }
}
</script>

<template>
  <div class="absolute bottom-2 w-full flex justify-center z-9000">
    <div
      class="flex items-center gap-4 px-4 py-2 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transition-all hover:bg-slate-900/70"
    >
      <button
        class="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>

      <div class="w-px h-8 bg-white/10 mx-1"></div>

      <div class="flex gap-2">
        <button
          v-for="win in store.openWindows"
          :key="win.id"
          @click="handleTaskbarClick(win.id)"
          class="relative group w-10 h-10 flex items-center justify-center rounded-xl transition-all"
          :class="
            win.isMinimized
              ? 'bg-white/5 hover:bg-white/10'
              : 'bg-white/20 shadow-inner ring-1 ring-white/20'
          "
        >
          <span
            class="absolute -top-10 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          >
            {{ win.title }}
          </span>

          <span class="font-bold text-white">{{ win.title.charAt(0).toUpperCase() }}</span>

          <span
            v-if="!win.isMinimized"
            class="absolute -bottom-1 w-1 h-1 bg-blue-400 rounded-full"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>
