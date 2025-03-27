import axios from 'axios';


interface DeleteRoutineResponse {
  status: boolean;
  messages: string;
  data: {
    id: string;
    tipo: string;
    description: string;
    url_rutina: string;
  };
}

export class DeleteRoutine {
  private static instance: DeleteRoutine;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): DeleteRoutine {
    if (!DeleteRoutine.instance) {
      DeleteRoutine.instance = new DeleteRoutine();
    }
    return DeleteRoutine.instance;
  }

  public async DeleteRoutineById(id: number, token: string): Promise<DeleteRoutineResponse | null> {
    try {
      const response = await axios.delete<DeleteRoutineResponse>(
        `${this.baseURL}/routines/${id}`,
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
      console.error('Error al obtener gimnasio por ID:', error);
      return null;
    }
  }
}

export default DeleteRoutine.getInstance();
