import axios from 'axios';

interface Attendance {
  id_user: number;
}

interface CreateAttendanceResponse {
  status: boolean;
  data: {
    id: string;
    id_user: string;
    entrada: string;
    salida: string | null;
    fecha: string;
  };
  newToken?: string;
}

export class CreateAttendance {
  private static instance: CreateAttendance;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'https://api.example.com';
  }

  public static getInstance(): CreateAttendance {
    if (!CreateAttendance.instance) {
      CreateAttendance.instance = new CreateAttendance();
    }
    return CreateAttendance.instance;
  }

  public async create(attendance: Attendance, token: string): Promise<boolean> {
    try {
      const response = await axios.post<CreateAttendanceResponse>(
        `${this.baseURL}/attendance`,
        attendance,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Asistencia creada:', response.data.data);
      return response.data.status === true;
    } catch (error) {
      console.error('Error al crear la asistencia:', error);
      return false;
    }
  }
}

export default CreateAttendance.getInstance();
