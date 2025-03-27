import axios from 'axios';

interface Client {
  id : string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  sex: string;
  old: number;
  photo: string;
  membership_status: boolean;
  id_sucursal: string;
  id_actualPlan: string;
  entrada: string;
  salida: string;
}

interface RenovattionMemberResponse {
  status: boolean;
  data: {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    date_end: string;
    phone: string;
    sex: string;
    old: string;
    photo: string;
    membership_status: boolean;
    id_sucursal: string;
    id_actualPlan: string;
    entrada: string;
    salida: string;
  };
  messages: string;
}

export class RenovattionMember {
  private static instance: RenovattionMember;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): RenovattionMember {
    if (!RenovattionMember.instance) {
      RenovattionMember.instance = new RenovattionMember();
    }
    return RenovattionMember.instance;
  }

  // Método para iniciar sesión
  public async RenovattionMember(user: Client, token: string, status : boolean): Promise<boolean> {
    try {
      const response = await axios.put<RenovattionMemberResponse>(
        `${this.baseURL}/user`, 
        {
          id: Number(user.id), 
          status: status,
          id_plan: Number(user.id_actualPlan),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      return true;
    } catch (error) {
      console.error('Error durante la renovación del miembro:', error);
      return false;
    }
  }
 
}
export default RenovattionMember.getInstance();