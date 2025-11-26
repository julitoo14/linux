export interface IProcess {
  id: string; // Identificador único del proceso
  title: string; // Título visible en la barra de la ventana
  componentName: string; // Nombre del componente Vue que lleva dentro
  x: number; // Posición X
  y: number; // Posición Y
  isMinimized: boolean; // Estado de la ventana
}

export class OSProcess implements IProcess {
  id: string;
  title: string;
  componentName: string;
  x: number;
  y: number;
  isMinimized: boolean = false; // Valor por defecto

  // Constructor: Define cómo se crea un objeto de esta clase.
  constructor(id: string, title: string, component: string) {
    this.id = id;
    this.title = title;
    this.componentName = component;
    
    // Asignación de una posición inicial aleatoria para que no salgan apiladas
    this.x = Math.floor(Math.random() * 100) + 50; 
    this.y = Math.floor(Math.random() * 100) + 50;
  }

  // Comportamiento (Método de la instancia)
  minimize(): void {
    // La lógica de minimizado se encapsula aquí.
    this.isMinimized = true; 
  }
  
  // Nuevo método para restaurar la ventana
  restore(): void {
    this.isMinimized = false;
  }
}