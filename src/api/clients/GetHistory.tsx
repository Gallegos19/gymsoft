import axios from 'axios';
import { StorageService } from '../../core/services/StorageService';


export interface Estadistica {
    clientes_activos: number;
    clientes_inactivos: number;
    edad_promedio: number;
    nuevos_clientes: number;
    renovaciones: number;
    ingresos_totales: number;
  }

  export interface Historial {
    id: string;
    tipo: string;
    fecha_renovacion: string;
    id_user: string;
    id_plan: string;
  }
  export interface Datos {
    [key: string]: number;
  }
  
  export interface Data {
    historial: Historial[];
    estadisticas: Estadistica;
    datos: Datos
  }
  
  export interface GetHistoryResponse {
    success: boolean;
    message: string;
    data: Data;
  }
  

export class GetHistory {
  private storage: StorageService;
  private static instance: GetHistory;
  private baseURL: string;

  private constructor() {
    this.storage = StorageService.getInstance();
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetHistory {
    if (!GetHistory.instance) {
      GetHistory.instance = new GetHistory();
    }
    return GetHistory.instance;
  }

  public async getHistory(idGym: number, token: string, time: string): Promise<GetHistoryResponse | []> {
    try {
      const response = await axios.get<GetHistoryResponse>(
        `${this.baseURL}/history/estadisticas/${idGym}/${time}`,
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

export default GetHistory.getInstance();
