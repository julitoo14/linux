<script setup lang="ts">
import { useWindowManager } from '@/stores/windowManager'
import Window from '@/components/os/Window.vue'
import Taskbar from '@/components/os/Taskbar.vue'
import DesktopIcon from '@/components/os/DesktopIcon.vue'
import TopBar from '@/components/os/TopBar.vue'

const store = useWindowManager()

const launchTerminal = () => {
  store.openApp('terminal', 'Terminal', 'TerminalApp')
}
</script>

<template>
  <div class="w-screen h-screen relative overflow-hidden font-sans select-none text-white bg-gray-900">
    
    <div class="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop" 
        class="w-full h-full object-cover opacity-80"
        alt="Wallpaper"
      />
    </div>

    <div class="relative z-50">
      <TopBar />
    </div>

    <div class="absolute inset-0 z-10 top-12 pl-6 p-4 w-fit h-full">
      <div class="flex flex-col flex-wrap content-start gap-6">
        <DesktopIcon label="Terminal" icon=">_" @dblclick="launchTerminal" />
        
        <DesktopIcon label="Sobre Mí" icon="Me" @dblclick="store.openApp('about', 'Sobre Mí', 'AboutApp')" />
        
        <DesktopIcon label="Proyectos" icon="Pr" @dblclick="store.openApp('projects', 'Mis Proyectos', 'ProjectsApp')" />
      </div>
    </div>

    <div class="absolute inset-0 z-20 pointer-events-none">
      <Window v-for="win in store.openWindows" :key="win.id" :process="win" />
    </div>

    <Taskbar />
    
  </div>
</template>