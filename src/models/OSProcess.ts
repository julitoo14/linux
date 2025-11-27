export interface IProcess {
  id: string // Identificador único del proceso
  title: string // Título visible en la barra de la ventana
  componentName: string // Nombre del componente Vue que lleva dentro
  x: number // Posición X
  y: number // Posición Y
  isMinimized: boolean // Estado de la ventana
}

export class OSProcess implements IProcess {
  id: string
  title: string
  componentName: string
  x: number
  y: number
  isMinimized: boolean = false // Valor por defecto
  isMaximized: boolean = false // Nuevo estado para maximizado

  // Constructor: Define cómo se crea un objeto de esta clase.
  constructor(id: string, title: string, component: string) {
    this.id = id
    this.title = title
    this.componentName = component

    // Asignación de una posición inicial aleatoria para que no salgan apiladas
    this.x = Math.floor(Math.random() * 100) + 50
    this.y = Math.floor(Math.random() * 100) + 50
  }

  move(newX: number, newY: number): void {
    // Si la ventana está maximizada, no permitimos moverla
    if (this.isMaximized) {
      return
    }

    this.x = newX
    this.y = newY

    // Podemos agregar lógica para evitar que la ventana se salga de la pantalla (opcional)
  }

  // Comportamiento (Método de la instancia)
  minimize(): void {
    // La lógica de minimizado se encapsula aquí.
    this.isMinimized = true
    this.isMaximized = false // Aseguramos que no esté maximizada al minimizar
  }

  maximize(): void {
    this.isMaximized = !this.isMaximized
    this.isMinimized = false // Aseguramos que no esté minimizada al maximizar
  }

  // Nuevo método para restaurar la ventana
  restore(): void {
    this.isMinimized = false
  }
}
