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
  
  export interface GetClientsResponse {
    success: boolean;
    messages: string;
    data: Client[];
  }
  

export class GetClients {
  private storage: StorageService;
  private static instance: GetClients;
  private baseURL: string;

  private constructor() {
    this.storage = StorageService.getInstance();
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetClients {
    if (!GetClients.instance) {
      GetClients.instance = new GetClients();
    }
    return GetClients.instance;
  }

  public async getAllClients(idGym: number, token: string): Promise<GetClientsResponse | []> {
    try {
      const response = await axios.get<GetClientsResponse>(
        `${this.baseURL}/user/${idGym}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return response.data;
      }

      return [];
    } catch (error) {
      console.error('Error al obtener gimnasio por ID:', error);
      return [];
    }
  }
}

export default GetClients.getInstance();
