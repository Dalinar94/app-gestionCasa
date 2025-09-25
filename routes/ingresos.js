const express = require('express');
const router = express.Router();
const Ingreso = require('../models/Ingreso');

router.get('/', async (req, res) => {
  const ingresos = await Ingreso.find();
  res.json(ingresos);
});

router.post('/', async (req, res) => {
  const nuevo = new Ingreso(req.body);
  await nuevo.save();
  res.json(nuevo);
});

router.delete('/:id', async (req, res) => {
  await Ingreso.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
