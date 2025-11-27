<script setup lang="ts">
defineProps<{
  label: string
  icon?: string // Puedes pasar una ruta de imagen o usar un emoji por defecto
}>()

const emit = defineEmits(['dblclick'])
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-24 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200 group select-none"
    @dblclick="emit('dblclick')"
  >
    <div
      class="w-14 h-14 bg-linear-to-br from-indigo-500/90 to-purple-600/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:shadow-indigo-500/50 transition-all duration-300 border border-white/10"
    >
      {{ icon || 'Pw' }}
    </div>

    <span
      class="mt-2 text-sm text-white text-center font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide group-hover:text-blue-200"
    >
      {{ label }}
    </span>
  </div>
</template>
