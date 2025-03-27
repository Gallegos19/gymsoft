import axios from 'axios';

interface User {
  file: File;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  sex: string;
  year_old: string;
  id_sucursal: string;
  id_actualPlan: string;
}

interface CreateUserResponse {
  status: boolean;
  data: {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    input_token: string;
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
}

export class CreateUser {
  private static instance: CreateUser;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): CreateUser {
    if (!CreateUser.instance) {
      CreateUser.instance = new CreateUser();
    }
    return CreateUser.instance;
  }

  public async CreateUser(user: User, token: string): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append("file", user.file);
      formData.append("name", user.name);
      formData.append("last_name", user.last_name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("phone", user.phone);
      formData.append("sex", user.sex);
      formData.append("year_old", user.year_old);
      formData.append("id_sucursal", user.id_sucursal);
      formData.append("id_actualPlan", user.id_actualPlan);
  
      const response = await axios.post<CreateUserResponse>(
        `${this.baseURL}/user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      return response.data.status === true;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return false;
    }
  }
  

}

export default CreateUser.getInstance();