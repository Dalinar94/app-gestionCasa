const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({ message: 'Login exitoso', userId: user._id });
});

// Registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  const newUser = new User({ email, password });
  await newUser.save();
  res.status(201).json({ message: 'Usuario registrado' });
});

module.exports = router;
