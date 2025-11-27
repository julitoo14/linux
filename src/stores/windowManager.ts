import { defineStore } from 'pinia'
import { OSProcess } from '@/models/OSProcess'

interface WindowState {
  openWindows: OSProcess[]
  activeWindowId: string | null
}

export const useWindowManager = defineStore('windowManager', {
  state: (): WindowState => ({
    openWindows: [],
    activeWindowId: null,
  }),

  actions: {
    openApp(id: string, title: string, componentName: string) {
      // 1. Evitar abrir la misma app dos veces (UX simple)
      const existing = this.openWindows.find((w) => w.id === id)
      if (existing) {
        // Lógica de darle foco si ya está abierta...
        return
      }

      // 2. CREACIÓN de un nuevo objeto POO
      const newWindow = new OSProcess(id, title, componentName)

      // 3. Pinia la añade a su estado. ¡Vue la hace reactiva automáticamente!
      this.openWindows.push(newWindow)
      this.activeWindowId = id
    },

    closeWindow(id: string) {
      this.openWindows = this.openWindows.filter((win) => win.id !== id)
    },
  },
})
