import axios from 'axios';

export interface Routines { 
  data: Routine[];
  total: number;
}
export interface Routine {
    id: number;
    tipo: string;
    descripcion: string;
    url_rutina: string;
    id_gimnacio: string;
}

export interface GetURoutinesResponse {
  status: boolean;
  data: Routines;
}

export class GetRoutineById {
  private static instance: GetRoutineById;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): GetRoutineById {
    if (!GetRoutineById.instance) {
      GetRoutineById.instance = new GetRoutineById();
    }
    return GetRoutineById.instance;
  }

  public async getAllRoutinesByIdGym(id: number, token: string): Promise<Routine[] | null> {
    try {
      const response = await axios.get<GetURoutinesResponse>(
        `${this.baseURL}/routines/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
        if (response.data.status) {
            const routines = response.data.data.data.map(routine => ({
            ...routine,
            url_rutina: `${this.baseURL}/${routine.url_rutina}`
            }));
            console.log(routines);
            return routines;
        }

      return null;
    } catch (error) {
      console.error(`Error al obtener las routinas con idGym ${id}:`, error);
      return null;
    }
  }
}

export default GetRoutineById.getInstance();
