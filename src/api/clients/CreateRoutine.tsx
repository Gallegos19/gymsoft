import axios from 'axios';

interface Routine {
  file: File;
  description: string;
  tipo: string;
  id_gimnacio: string;
}

interface CreateRoutineResponse {
  status: boolean;
  data: {
    id: string;
    tipo: string;
    dscription: string;
    url_rutina: string;
    id_gimnacio: string;
  };
}

export class CreateRoutine {
  private static instance: CreateRoutine;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): CreateRoutine {
    if (!CreateRoutine.instance) {
      CreateRoutine.instance = new CreateRoutine();
    }
    return CreateRoutine.instance;
  }

  public async CreateRoutine(routine: Routine, token: string): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append("file", routine.file);
      formData.append("tipo", routine.tipo);
      formData.append("description", routine.description);
      formData.append("url_rutina", routine.id_gimnacio);
  
      const response = await axios.post<CreateRoutineResponse>(
        `${this.baseURL}/routines/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      return response.data.status === true;
    } catch (error) {
      console.error('Error al crear una Rutina:', error);
      return false;
    }
  }
  

}

export default CreateRoutine.getInstance();