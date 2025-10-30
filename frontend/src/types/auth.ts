export interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
  endereco?: string;
  codigo?: string;
  created_at: string;
  updated_at: string;
  active: boolean;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone?: string;
  endereco?: string;
  codigo?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    usuario: User;
    token: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}


