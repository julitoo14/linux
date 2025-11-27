<script setup lang="ts">
import { useWindowManager } from '@/stores/windowManager'
import Window from '@/components/os/Window.vue'
import Taskbar from '@/components/os/Taskbar.vue'
import DesktopIcon from '@/components/os/DesktopIcon.vue'
import TopBar from '@/components/os/TopBar.vue' // 🟢 1. Importamos

const store = useWindowManager()

const launchTerminal = () => {
  store.openApp('terminal', 'Terminal', 'TerminalApp')
}
</script>

<template>
  <div class="w-screen h-screen relative overflow-hidden select-none font-sans bg-gray-900 text-white">
    
    <TopBar />

    <div 
      class="absolute inset-0 z-0 bg-cover bg-center"
      style="background-image: url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop');"
    >
      <div class="absolute inset-0 bg-black/30"></div>
    </div>

    <div class="absolute inset-0 z-10 top-16 pl-6 p-4 flex flex-col flex-wrap content-start gap-6 w-fit h-[calc(100vh-4rem)]">
  
  <DesktopIcon 
    label="Terminal" 
    icon=">_" 
    @dblclick="launchTerminal" 
  />
  
  <DesktopIcon 
    label="Sobre Mí" 
    icon="Me" 
    @dblclick="store.openApp('about', 'Sobre Mí', 'AboutApp')" 
  />

  <DesktopIcon 
    label="Proyectos" 
    icon="Pr" 
    @dblclick="store.openApp('projects', 'Mis Proyectos', 'ProjectsApp')" 
  />

</div>

    <div class="relative z-20">
      <Window v-for="win in store.openWindows" :key="win.id" :process="win" />
    </div>

    <Taskbar />
    
  </div>
</template>