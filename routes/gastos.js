const express = require('express');
const router = express.Router();
const Gasto = require('../models/Gasto');

router.get('/', async (req, res) => {
  const gastos = await Gasto.find();
  res.json(gastos);
});

router.post('/', async (req, res) => {
  const nuevo = new Gasto(req.body);
  await nuevo.save();
  res.json(nuevo);
});

router.delete('/:id', async (req, res) => {
  await Gasto.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
