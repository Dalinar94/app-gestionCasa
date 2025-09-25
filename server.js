require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const ingresosRoutes = require('./routes/ingresos');
const gastosRoutes = require('./routes/gastos');

const path = require('path');

// Servir archivos estáticos del frontend Angular
app.use(express.static(path.join(__dirname, 'public')));

// Redirigir cualquier ruta que no sea API al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

app.use('/api/auth', authRoutes);
app.use('/api/ingresos', ingresosRoutes);
app.use('/api/gastos', gastosRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`);
});
