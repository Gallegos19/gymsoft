import axios from 'axios';

interface Routine {
  name: string;
  cost: number;
}

interface UpdatePlanResponse {
  status: boolean;
  data: {
    id: string;
    tipo: string;
    dscription: string;
    url_rutina: string;
    id_gimnacio: string;
  };
}

export class UpdatePlan {
  private static instance: UpdatePlan;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): UpdatePlan {
    if (!UpdatePlan.instance) {
      UpdatePlan.instance = new UpdatePlan();
    }
    return UpdatePlan.instance;
  }

  public async UpdatePlan(idgym: string,routine: Routine, token: string): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append("name", routine.name);
      formData.append("cost", routine.cost.toString());
  
      const response = await axios.put<UpdatePlanResponse>(
        `${this.baseURL}/plan/`,
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

export default UpdatePlan.getInstance();