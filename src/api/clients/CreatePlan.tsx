import axios from 'axios';

interface Plan {
  name: string;
  cost: number;
  date: number;
  id_gimnasio: number;
}

interface CreatePlanResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    cost: number;
    date: number;
    id_gimnasio: number;
  };
  messages: string;
  newToken?: string;
}

export class CreatePlan {
  private static instance: CreatePlan;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): CreatePlan {
    if (!CreatePlan.instance) {
      CreatePlan.instance = new CreatePlan();
    }
    return CreatePlan.instance;
  }

  public async create(Plan: Plan, token: string): Promise<boolean> {
    try {
      const response = await axios.post<CreatePlanResponse>(
        `${this.baseURL}/plan`,
        Plan,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Plan creada:', response.data.data);
      return response.data.success === true;
    } catch (error) {
      console.error('Error al crear el plan:', error);
      return false;
    }
  }
}

export default CreatePlan.getInstance();
