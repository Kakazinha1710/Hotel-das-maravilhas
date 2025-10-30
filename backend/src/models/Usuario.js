const supabase = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
  constructor(data) {
    this.id = data.id;
    this.nome = data.nome;
    this.endereco = data.endereco;
    this.email = data.email;
    this.senha = data.senha;
    this.cpf = data.cpf;
    this.codigo = data.codigo;
    this.telefone = data.telefone;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.deleted_by = data.deleted_by;
    this.deleted_at = data.deleted_at;
    this.active = data.active;
  }

  // Criar novo usuário
  static async create(usuarioData) {
    try {
      // Hash da senha
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(usuarioData.senha, saltRounds);
      
      const { data, error } = await supabase
        .from('usuarios')
        .insert([
          {
            nome: usuarioData.nome,
            endereco: usuarioData.endereco,
            email: usuarioData.email,
            senha: hashedPassword,
            cpf: usuarioData.cpf,
            codigo: usuarioData.codigo,
            telefone: usuarioData.telefone,
            active: true
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return new Usuario(data);
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  // Buscar usuário por ID
  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', id)
        .eq('active', true)
        .single();

      if (error) throw error;
      return data ? new Usuario(data) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  // Buscar usuário por email
  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .eq('active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data ? new Usuario(data) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  }

  // Buscar usuário por CPF
  static async findByCpf(cpf) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('cpf', cpf)
        .eq('active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data ? new Usuario(data) : null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por CPF: ${error.message}`);
    }
  }

  // Listar todos os usuários
  static async findAll(limit = 50, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data.map(usuario => new Usuario(usuario));
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  // Atualizar usuário
  async update(updateData) {
    try {
      const updateFields = { ...updateData, updated_at: new Date().toISOString() };
      
      // Se estiver atualizando a senha, fazer hash
      if (updateData.senha) {
        const saltRounds = 12;
        updateFields.senha = await bcrypt.hash(updateData.senha, saltRounds);
      }

      const { data, error } = await supabase
        .from('usuarios')
        .update(updateFields)
        .eq('id', this.id)
        .select()
        .single();

      if (error) throw error;
      
      // Atualizar propriedades da instância
      Object.assign(this, data);
      return this;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  // Soft delete do usuário
  async delete(deletedBy = null) {
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({
          active: false,
          deleted_by: deletedBy,
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', this.id);

      if (error) throw error;
      
      this.active = false;
      this.deleted_by = deletedBy;
      this.deleted_at = new Date().toISOString();
      return this;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }

  // Verificar senha
  async checkPassword(password) {
    return await bcrypt.compare(password, this.senha);
  }

  // Retornar dados públicos (sem senha)
  toPublicJSON() {
    const { senha, ...publicData } = this;
    return publicData;
  }

  // Validar dados do usuário
  static validate(usuarioData) {
    const errors = [];

    if (!usuarioData.nome || usuarioData.nome.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    }

    if (!usuarioData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuarioData.email)) {
      errors.push('Email deve ter um formato válido');
    }

    if (!usuarioData.senha || usuarioData.senha.length < 6) {
      errors.push('Senha deve ter pelo menos 6 caracteres');
    }

    if (!usuarioData.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(usuarioData.cpf)) {
      errors.push('CPF deve estar no formato 000.000.000-00');
    }

    return errors;
  }
}

module.exports = Usuario;

