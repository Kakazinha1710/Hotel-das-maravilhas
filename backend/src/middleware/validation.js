const { body, validationResult } = require('express-validator');

// Middleware para verificar erros de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }
  next();
};

// Validações para criação de usuário
const validateCreateUsuario = [
  body('nome')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Nome deve ter entre 2 e 255 caracteres'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email deve ter um formato válido'),
  
  body('senha')
    .isLength({ min: 6, max: 255 })
    .withMessage('Senha deve ter pelo menos 6 caracteres'),
  
  body('cpf')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .withMessage('CPF deve estar no formato 000.000.000-00'),
  
  body('telefone')
    .optional()
    .isLength({ min: 10, max: 20 })
    .withMessage('Telefone deve ter entre 10 e 20 caracteres'),
  
  body('endereco')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Endereço deve ter no máximo 500 caracteres'),
  
  body('codigo')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Código deve ter no máximo 50 caracteres'),
  
  handleValidationErrors
];

// Validações para atualização de usuário
const validateUpdateUsuario = [
  body('nome')
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Nome deve ter entre 2 e 255 caracteres'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email deve ter um formato válido'),
  
  body('senha')
    .optional()
    .isLength({ min: 6, max: 255 })
    .withMessage('Senha deve ter pelo menos 6 caracteres'),
  
  body('cpf')
    .optional()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .withMessage('CPF deve estar no formato 000.000.000-00'),
  
  body('telefone')
    .optional()
    .isLength({ min: 10, max: 20 })
    .withMessage('Telefone deve ter entre 10 e 20 caracteres'),
  
  body('endereco')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Endereço deve ter no máximo 500 caracteres'),
  
  body('codigo')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Código deve ter no máximo 50 caracteres'),
  
  handleValidationErrors
];

// Validações para login
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email deve ter um formato válido'),
  
  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
  
  handleValidationErrors
];

module.exports = {
  validateCreateUsuario,
  validateUpdateUsuario,
  validateLogin,
  handleValidationErrors
};

