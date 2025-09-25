const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  type: { type: String, required: true },         // 'income' o 'expense'
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  fecha: { type: Date, default: Date.now }        // MongoDB guarda como 'fecha'
});

module.exports = mongoose.model('Ingreso', schema); // o 'Gasto' según el archivo

