const Usuario = require('../models/Usuario');
const { generateToken } = require('../middleware/auth');

class UsuarioController {
  // Criar novo usuário
  static async create(req, res) {
    try {
      const usuarioData = req.body;
      
      // Verificar se email já existe
      const existingEmail = await Usuario.findByEmail(usuarioData.email);
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email já está em uso'
        });
      }

      // Verificar se CPF já existe
      const existingCpf = await Usuario.findByCpf(usuarioData.cpf);
      if (existingCpf) {
        return res.status(400).json({
          success: false,
          message: 'CPF já está em uso'
        });
      }

      const usuario = await Usuario.create(usuarioData);
      
      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: usuario.toPublicJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Login do usuário
  static async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Buscar usuário por email
      const usuario = await Usuario.findByEmail(email);
      if (!usuario) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      // Verificar senha
      const isPasswordValid = await usuario.checkPassword(senha);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }

      // Gerar token JWT
      const token = generateToken(usuario);

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          usuario: usuario.toPublicJSON(),
          token
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Buscar usuário por ID
  static async findById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        data: usuario.toPublicJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Listar todos os usuários
  static async findAll(req, res) {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const usuarios = await Usuario.findAll(parseInt(limit), parseInt(offset));

      res.json({
        success: true,
        data: usuarios.map(usuario => usuario.toPublicJSON()),
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          count: usuarios.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Atualizar usuário
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Verificar se email já existe (se estiver sendo alterado)
      if (updateData.email && updateData.email !== usuario.email) {
        const existingEmail = await Usuario.findByEmail(updateData.email);
        if (existingEmail) {
          return res.status(400).json({
            success: false,
            message: 'Email já está em uso'
          });
        }
      }

      // Verificar se CPF já existe (se estiver sendo alterado)
      if (updateData.cpf && updateData.cpf !== usuario.cpf) {
        const existingCpf = await Usuario.findByCpf(updateData.cpf);
        if (existingCpf) {
          return res.status(400).json({
            success: false,
            message: 'CPF já está em uso'
          });
        }
      }

      await usuario.update(updateData);

      res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: usuario.toPublicJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Deletar usuário (soft delete)
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      await usuario.delete(req.user?.id);

      res.json({
        success: true,
        message: 'Usuário deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Buscar perfil do usuário logado
  static async getProfile(req, res) {
    try {
      res.json({
        success: true,
        data: req.user.toPublicJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Atualizar perfil do usuário logado
  static async updateProfile(req, res) {
    try {
      const updateData = req.body;
      const usuario = req.user;

      // Verificar se email já existe (se estiver sendo alterado)
      if (updateData.email && updateData.email !== usuario.email) {
        const existingEmail = await Usuario.findByEmail(updateData.email);
        if (existingEmail) {
          return res.status(400).json({
            success: false,
            message: 'Email já está em uso'
          });
        }
      }

      // Verificar se CPF já existe (se estiver sendo alterado)
      if (updateData.cpf && updateData.cpf !== usuario.cpf) {
        const existingCpf = await Usuario.findByCpf(updateData.cpf);
        if (existingCpf) {
          return res.status(400).json({
            success: false,
            message: 'CPF já está em uso'
          });
        }
      }

      await usuario.update(updateData);

      res.json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        data: usuario.toPublicJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = UsuarioController;

