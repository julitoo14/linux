<script setup lang="ts">
import { ref } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
import { useWindowManager } from '@/stores/windowManager'

const store = useWindowManager()
const isMenuOpen = ref(false)

const time = useDateFormat(useNow(), 'HH:mm')
const date = useDateFormat(useNow(), 'ddd D MMM')

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Acciones del menú
const handleMenuAction = (action: string) => {
  isMenuOpen.value = false
  if (action === 'about') store.openApp('about', 'Sobre Mí', 'AboutApp')
  if (action === 'github') window.open('https://github.com/julitoo14/linux', '_blank')
  // Aquí podrías agregar lógica real de "Reiniciar" o "Apagar"
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-8 bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-between px-4 z-9999 border-b border-white/5 text-sm select-none shadow-sm"
  >
    <div class="relative">
      <button
        @click="toggleMenu"
        class="flex items-center gap-2 font-bold hover:bg-white/10 px-2 py-1 rounded transition-colors"
        :class="{ 'bg-white/10': isMenuOpen }"
      >
        <span class="">Sistema</span>
      </button>

      <div
        v-if="isMenuOpen"
        class="absolute top-full left-0 mt-1 w-48 bg-slate-800 border border-gray-700 rounded shadow-xl py-1 flex flex-col"
      >
        <button
          @click="handleMenuAction('about')"
          class="text-left px-4 py-2 hover:bg-blue-600 hover:text-white transition-colors"
        >
          Sobre este OS
        </button>
        <button
          @click="handleMenuAction('github')"
          class="text-left px-4 py-2 hover:bg-blue-600 hover:text-white transition-colors"
        >
          Ver Código Fuente
        </button>
        <div class="h-px bg-gray-700 my-1"></div>
        <button class="text-left px-4 py-2 hover:bg-red-600 hover:text-white transition-colors">
          Apagar Sistema
        </button>
      </div>
    </div>

    <div
      class="absolute left-1/2 -translate-x-1/2 font-medium opacity-90 hover:opacity-100 cursor-default"
    >
      {{ date }} &nbsp; {{ time }}
    </div>

    <div class="flex items-center gap-3">
      <div
        class="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors"
      >
        <span class="font-semibold hidden sm:block">Julián García</span>
        <div
          class="w-5 h-5 bg-linear-to-tr from-green-400 to-blue-500 rounded-full border border-white/20"
        ></div>
      </div>
    </div>
  </div>

  <div v-if="isMenuOpen" @click="isMenuOpen = false" class="fixed inset-0 z-9998"></div>
</template>
