import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllUsers, createUser } from './controllers/userController.js';

// Configuração para ES modules (__dirname equivalente)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const HOST = 'localhost';
const PORT = 3000;

// Middlewares
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Parse de JSON no corpo das requisições
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos da pasta public

// Rota de teste
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Olá Mundo!' });
});

// Rotas da API
app.get('/api/users', getAllUsers);
app.post('/api/users', createUser); 

// Rota principal - serve o arquivo HTML (opcional, pois já está sendo servido como estático)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});