import axios from 'axios';

interface WeekData {
  [key: string]: number; // ej: "lunes": 2, "martes": 1, ...
}

interface MonthData {
  [key: string]: number; // ej: "semana1": 3, "semana2": 0, ...
}

interface GetAssistanceStadisticResponse {
  status: boolean;
  message: string;
  data: WeekData | MonthData;
}

export class GetAssistanceStadistic {
  private static instance: GetAssistanceStadistic;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetAssistanceStadistic {
    if (!GetAssistanceStadistic.instance) {
      GetAssistanceStadistic.instance = new GetAssistanceStadistic();
    }
    return GetAssistanceStadistic.instance;
  }

  public async getById(idGym: number, option: string, token: string): Promise<GetAssistanceStadisticResponse | null> {
    try {
      const response = await axios.get<GetAssistanceStadisticResponse>(
        `${this.baseURL}/attendance/${idGym}/${option}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        return response.data;
      }

      return null;
    } catch (error) {
      console.error('Error al obtener estadísticas de asistencia:', error);
      return null;
    }
  }
}

export default GetAssistanceStadistic.getInstance();
