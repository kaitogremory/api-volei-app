const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const SECRET = process.env.JWT_SECRET || 'segredo-dev';

exports.registrar = async (req, res) => {
  const { nome, email, senha, role = 'jogador' } = req.body;

  try {
    const existente = await Usuario.findOne({ email });
    if (existente) return res.status(400).json({ erro: 'Email já registrado' });

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash, role });

    res.status(201).json({ msg: 'Usuário criado', id: novoUsuario._id, role: novoUsuario.role });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ erro: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Senha inválida' });

    const token = jwt.sign(
    { id: usuario._id, email: usuario.email, role: usuario.role },
    SECRET,
    { expiresIn: '1d' }
    );


    res.json({ token });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
