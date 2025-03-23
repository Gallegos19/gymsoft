// Clase StorageService que implementa el patrón Singleton
export class StorageService {
    private static instance: StorageService;
    private storage: Storage;
    private prefix = 'app_';
  
    private constructor() {
      // Usar sessionStorage para mayor seguridad - datos eliminados al cerrar el navegador
      this.storage = window.sessionStorage;
    }
  
    public static getInstance(): StorageService {
      if (!StorageService.instance) {
        StorageService.instance = new StorageService();
      }
      return StorageService.instance;
    }
  
    // Método para guardar un elemento en el almacenamiento
    public setItem(key: string, value: string): void {
      try {
        // Agregar un prefijo al almacenar para evitar colisiones con otras aplicaciones
        const prefixedKey = `${this.prefix}${key}`;
        this.storage.setItem(prefixedKey, value);
      } catch (error) {
        console.error('Error al guardar en el almacenamiento:', error);
      }
    }
  
    // Método para obtener un elemento del almacenamiento
    public getItem(key: string): string | null {
      try {
        const prefixedKey = `${this.prefix}${key}`;
        return this.storage.getItem(prefixedKey);
      } catch (error) {
        console.error('Error al recuperar del almacenamiento:', error);
        return null;
      }
    }
  
    // Método para eliminar un elemento del almacenamiento
    public removeItem(key: string): void {
      try {
        const prefixedKey = `${this.prefix}${key}`;
        this.storage.removeItem(prefixedKey);
      } catch (error) {
        console.error('Error al eliminar del almacenamiento:', error);
      }
    }
  
    // Método para limpiar todo el almacenamiento (solo los elementos con nuestro prefijo)
    public clear(): void {
      try {
        // Solo eliminar elementos con nuestro prefijo
        Object.keys(this.storage).forEach(key => {
          if (key.startsWith(this.prefix)) {
            this.storage.removeItem(key);
          }
        });
      } catch (error) {
        console.error('Error al limpiar el almacenamiento:', error);
      }
    }
  }
  
  export default StorageService.getInstance();