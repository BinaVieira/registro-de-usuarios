import { users } from '../data/data.js';

// Retorna todos os usuários
export const getAllUsers = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Cria um novo usuário
export const createUser = (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Validações básicas
    if (!name || !email || !age) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos (name, email, age) são obrigatórios'
      });
    }

    // Verifica se o email já existe
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'E-mail já cadastrado'
      });
    }

    // Gera um novo ID (incrementa o último ID)
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser = {
      id: newId,
      name,
      email,
      age: parseInt(age)
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso!',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};