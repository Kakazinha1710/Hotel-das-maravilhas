import axios from 'axios';
import { LoginData, RegisterData, AuthResponse, ApiResponse, User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Login
  async login(credentials: LoginData): Promise<AuthResponse> {
    const response = await api.post('/usuarios/login', credentials);
    return response.data;
  },

  // Cadastro
  async register(userData: RegisterData): Promise<ApiResponse<User>> {
    const response = await api.post('/usuarios/register', userData);
    return response.data;
  },

  // Buscar perfil
  async getProfile(): Promise<ApiResponse<User>> {
    const response = await api.get('/usuarios/profile');
    return response.data;
  },

  // Atualizar perfil
  async updateProfile(userData: Partial<RegisterData>): Promise<ApiResponse<User>> {
    const response = await api.put('/usuarios/profile', userData);
    return response.data;
  },

  // Listar usuários
  async getUsers(limit = 50, offset = 0): Promise<ApiResponse<User[]>> {
    const response = await api.get(`/usuarios?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  // Buscar usuário por ID
  async getUserById(id: number): Promise<ApiResponse<User>> {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Atualizar usuário
  async updateUser(id: number, userData: Partial<RegisterData>): Promise<ApiResponse<User>> {
    const response = await api.put(`/usuarios/${id}`, userData);
    return response.data;
  },

  // Deletar usuário
  async deleteUser(id: number): Promise<ApiResponse<void>> {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  }
};

export default api;


