import axios from 'axios';
import { StorageService } from '../../core/services/StorageService';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  msg: string;
  data: {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    rol: string;
    id_gimnasio: string;
  };
  token: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
  id_gimnasio: string | null;
}

// Clase Auth que implementa el patrón Singleton
export class Auth {
  private static instance: Auth;
  private storage: StorageService;
  private authState: AuthState;
  private baseURL: string;

  private constructor() {
    this.storage = StorageService.getInstance();
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
    
    // Inicializar el estado de autenticación
    const token = this.storage.getItem('auth_token');
    const userId = this.storage.getItem('user_id');
    const userRole = this.storage.getItem('user_role');
    const id_gimnasio = this.storage.getItem('id_gimnasios');
    
    this.authState = {
      isAuthenticated: !!token,
      userId: userId,
      userRole: userRole, 
      id_gimnasio: id_gimnasio
    };
  }

  public static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  // Método para iniciar sesión
  public async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.baseURL}/owner/login`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.status === 'success') {
        // Guardar datos en el almacenamiento
        this.storage.setItem('auth_token', response.data.token);
        this.storage.setItem('user_id', response.data.data.id);
        this.storage.setItem('user_role', response.data.data.rol);
        this.storage.setItem('id_gimnasios', response.data.data.id_gimnasio);
        
        // Actualizar estado de autenticación
        this.authState = {
          isAuthenticated: true,
          userId: response.data.data.id,
          userRole: response.data.data.rol,
          id_gimnasio: response.data.data.id_gimnasio
        };
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      return false;
    }
  }

  // Método para cerrar sesión
  public logout(): void {
    // Eliminar datos del almacenamiento
    this.storage.removeItem('auth_token');
    this.storage.removeItem('user_id');
    this.storage.removeItem('user_role');
    this.storage.removeItem('id_gimnasios');
    
    // Restablecer estado de autenticación
    this.authState = {
      isAuthenticated: false,
      userId: null,
      userRole: null,
      id_gimnasio: null
    };
  }

  // Método para verificar si el usuario está autenticado
  public isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  // Método para obtener el token
  public getToken(): string | null {
    return this.storage.getItem('auth_token');
  }

  // Método para obtener el ID del usuario
  public getUserId(): string | null {
    return this.authState.userId;
  }

  // Método para obtener el rol del usuario
  public getUserRole(): string | null {
    return this.authState.userRole;
  }
  public getIdGimnasio(): string | null {
    return this.authState.id_gimnasio;
  }

  // Método para configurar el token en las cabeceras de Axios
  public getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export default Auth.getInstance();