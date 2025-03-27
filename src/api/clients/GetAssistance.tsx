import axios from 'axios';
import { StorageService } from '../../core/services/StorageService';

export interface Assistance {
  id: string;
  id_user: string;
  entrada: string;
  salida: string;
  fecha: string;
}

export interface GetAssistanceResponse {
  status: boolean;
  message: string;
  data: Assistance[];
}


export class GetAssistance {
  private storage: StorageService;
  private static instance: GetAssistance;
  private baseURL: string;

  private constructor() {
    this.storage = StorageService.getInstance();
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetAssistance {
    if (!GetAssistance.instance) {
      GetAssistance.instance = new GetAssistance();
    }
    return GetAssistance.instance;
  }

  public async getAllAssistance(idGym: number, date: string, token: string): Promise<GetAssistanceResponse> {
    try {
      const response = await axios.get<GetAssistanceResponse>(
        `${this.baseURL}/attendance`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          params: {
            id_gimnasio: idGym,
            date: date,
          },
        }
      );
  
      if (response.data.status) {
        return response.data;
      }
  
      return {
        status: false,
        message: "No se pudo obtener la asistencia",
        data: [],
      };
    } catch (error) {
      console.error('Error al obtener asistencias:', error);
  
      return {
        status: false,
        message: "Error en la petición",
        data: [],
      };
    }
  }
  
}

export default GetAssistance.getInstance();
