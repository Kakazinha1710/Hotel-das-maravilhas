import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Shield } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Bem-vindo, {user.nome}!
            </h1>
            <p className="text-gray-600">
              Gerencie sua conta e informações pessoais
            </p>
          </div>
        </div>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Informações Pessoais
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Nome</p>
              <p className="font-medium text-gray-900">{user.nome}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">CPF</p>
              <p className="font-medium text-gray-900">{user.cpf}</p>
            </div>
            {user.codigo && (
              <div>
                <p className="text-sm text-gray-500">Código</p>
                <p className="font-medium text-gray-900">{user.codigo}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Contato
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
            {user.telefone && (
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-medium text-gray-900">{user.telefone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Address Info */}
        {user.endereco && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Endereço
              </h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Endereço</p>
              <p className="font-medium text-gray-900">{user.endereco}</p>
            </div>
          </div>
        )}
      </div>

      {/* Account Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-4">
          <Shield className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Status da Conta
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`h-3 w-3 rounded-full ${user.active ? 'bg-green-400' : 'bg-red-400'}`}></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-gray-900">
                {user.active ? 'Ativo' : 'Inativo'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Membro desde</p>
              <p className="font-medium text-gray-900">
                {new Date(user.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Última atualização</p>
              <p className="font-medium text-gray-900">
                {new Date(user.updated_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="btn btn-primary p-4 text-left">
            <User className="h-5 w-5 mr-2" />
            Editar Perfil
          </button>
          <button className="btn btn-secondary p-4 text-left">
            <Shield className="h-5 w-5 mr-2" />
            Alterar Senha
          </button>
          <button className="btn btn-secondary p-4 text-left">
            <Mail className="h-5 w-5 mr-2" />
            Contatar Suporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


