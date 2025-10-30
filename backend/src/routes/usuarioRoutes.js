const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const { authenticateToken } = require('../middleware/auth');
const { 
  validateCreateUsuario, 
  validateUpdateUsuario, 
  validateLogin 
} = require('../middleware/validation');

const router = express.Router();

// Rotas públicas
router.post('/register', validateCreateUsuario, UsuarioController.create);
router.post('/login', validateLogin, UsuarioController.login);

// Rotas protegidas (requerem autenticação)
router.get('/profile', authenticateToken, UsuarioController.getProfile);
router.put('/profile', authenticateToken, validateUpdateUsuario, UsuarioController.updateProfile);

// Rotas administrativas (requerem autenticação)
router.get('/', authenticateToken, UsuarioController.findAll);
router.get('/:id', authenticateToken, UsuarioController.findById);
router.put('/:id', authenticateToken, validateUpdateUsuario, UsuarioController.update);
router.delete('/:id', authenticateToken, UsuarioController.delete);

module.exports = router;

