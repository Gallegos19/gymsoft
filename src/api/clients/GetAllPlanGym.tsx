import axios from 'axios';
import { StorageService } from '../../core/services/StorageService';


export interface Plan {
    id: string;
    name: string;
    last_name: string;
    cost: number;
    date: number;
    id_gimnasio: string;
}
  
  export interface GetPlanResponse {
    success: boolean;
    messages: string;
    data: Plan[];
  }
  

export class GetPlan {
  private storage: StorageService;
  private static instance: GetPlan;
  private baseURL: string;

  private constructor() {
    this.storage = StorageService.getInstance();
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetPlan {
    if (!GetPlan.instance) {
      GetPlan.instance = new GetPlan();
    }
    return GetPlan.instance;
  }

  public async getAllPlan(idGym: number, token: string): Promise<GetPlanResponse | []> {
    try {
      const response = await axios.get<GetPlanResponse>(
        `${this.baseURL}/plan/byGimnasio/${idGym}`,
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

export default GetPlan.getInstance();
