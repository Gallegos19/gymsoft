import axios from 'axios';


interface DeletePlanResponse {
  success: boolean;
  messages: string;
}

export class DeletePlan {
  private static instance: DeletePlan;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): DeletePlan {
    if (!DeletePlan.instance) {
      DeletePlan.instance = new DeletePlan();
    }
    return DeletePlan.instance;
  }

  public async DeletePlanById(id: number, token: string): Promise<DeletePlanResponse | null> {
    try {
      const response = await axios.delete<DeletePlanResponse>(
        `${this.baseURL}/plan/${id}`,
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

      return null;
    } catch (error) {
      console.error('Error al obtener gimnasio por ID:', error);
      return null;
    }
  }
}

export default DeletePlan.getInstance();
