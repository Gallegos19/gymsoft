import axios from 'axios';
import { StorageService } from '../../core/services/StorageService';

export interface Client {
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  date_end: string;
  phone: string;
  sex: string;
  old: number;
  photo: string;
  membership_status: boolean;
  id_sucursal: string;
  id_actualPlan: string;
  entrada: string;
  salida: string;
}

export interface GetUserByPaginationResponse {
  success: boolean;
  message: string;
  data: {
    data: Client[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export class GetUserByPagination {
  private storage: StorageService;
  private static instance: GetUserByPagination;
  private baseURL: string;

  private constructor() {
    this.storage = StorageService.getInstance();
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetUserByPagination {
    if (!GetUserByPagination.instance) {
      GetUserByPagination.instance = new GetUserByPagination();
    }
    return GetUserByPagination.instance;
  }

  public async getAllUsersByPagination(idGym: number, token: string, page : number): Promise<GetUserByPaginationResponse | []> {
    try {
      const response = await axios.get<GetUserByPaginationResponse>(
        `${this.baseURL}/user/users/paginacion`, // Endpoint corregido
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            limit: 5,
            orderBy: 'id',
            orderDir: 'asc'
          }
        }
      );

      if (response.data.success) {
        // Corregimos la URL de la imagen
        const users = response.data.data.data.map(user => ({
          ...user,
          photo: user.photo
            ? `${this.baseURL}/${user.photo}`
            : `${this.baseURL}/uploads/default_user.png`
        }));

        // Retornamos con las fotos corregidas
        return {
          ...response.data,
          data: {
            ...response.data.data,
            data: users
          }
        };
      }

      return [];
    } catch (error) {
      console.error('Error al obtener usuarios por paginación:', error);
      return [];
    }
  }
}

export default GetUserByPagination.getInstance();
