import axios from 'axios';
import { StorageService } from '../../core/services/StorageService';


export interface Sucursal {
    id: string;
    name: string;
    address: string;
    id_owner: string;
    id_gimnasio: string;
}
  
export interface GetOutletResponse {
    success: boolean;
    messages: string;
    data: Sucursal[];
}
  

export class GetOutlet {
  private storage: StorageService;
  private static instance: GetOutlet;
  private baseURL: string;

  private constructor() {
    this.storage = StorageService.getInstance();
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetOutlet {
    if (!GetOutlet.instance) {
      GetOutlet.instance = new GetOutlet();
    }
    return GetOutlet.instance;
  }

  public async getAllOutlet(token: string): Promise<GetOutletResponse | []> {
    try {
      const response = await axios.get<GetOutletResponse>(
        `${this.baseURL}/outlet`,
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
      console.error('Error al obtener Franquicia :', error);
      return [];
    }
  }
}

export default GetOutlet.getInstance();
