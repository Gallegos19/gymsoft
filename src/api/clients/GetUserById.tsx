import axios from 'axios';
import { StorageService } from '../../core/services/StorageService';

export interface User {
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

export interface GetUserResponse {
  success: boolean;
  messages: string;
  data: User;
}

export class GetUserById {
  private static instance: GetUserById;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetUserById {
    if (!GetUserById.instance) {
      GetUserById.instance = new GetUserById();
    }
    return GetUserById.instance;
  }

  public async getUser(id: number, token: string): Promise<User | null> {
    try {
      const response = await axios.get<GetUserResponse>(
        `${this.baseURL}/user/byid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        return {
          ...response.data.data,
          photo: `${this.baseURL}/${response.data.data.photo}`
        };
      }

      return null;
    } catch (error) {
      console.error(`Error al obtener el usuario con id ${id}:`, error);
      return null;
    }
  }
}

export default GetUserById.getInstance();
