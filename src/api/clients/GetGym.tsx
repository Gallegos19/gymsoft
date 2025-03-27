import axios from 'axios';
import { StorageService } from '../../core/services/StorageService';


interface GetGymResponse {
  success: boolean;
  messages: string;
  data: {
    id: string;
    name: string;
    id_owner: string;
  };
}

export class GetGym {
  private storage: StorageService;
  private static instance: GetGym;
  private baseURL: string;

  private constructor() {
    this.storage = StorageService.getInstance();
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetGym {
    if (!GetGym.instance) {
      GetGym.instance = new GetGym();
    }
    return GetGym.instance;
  }

  public async getGymById(id: number, token: string): Promise<GetGymResponse | null> {
    try {
      const response = await axios.get<GetGymResponse>(
        `${this.baseURL}/gimnasio/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        this.storage.setItem('name_gimnasio', response.data.data.name);
        return response.data;
      }

      return null;
    } catch (error) {
      console.error('Error al obtener gimnasio por ID:', error);
      return null;
    }
  }
}

export default GetGym.getInstance();
