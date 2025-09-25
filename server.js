require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // 👈 asegúrate de tener esto

const authRoutes = require('./routes/auth');
const ingresosRoutes = require('./routes/ingresos');
const gastosRoutes = require('./routes/gastos');

const app = express(); // 👈 esta línea debe ir antes de usar `app`

app.use(cors());
app.use(bodyParser.json());

// Servir frontend Angular desde /public
app.use(express.static(path.join(__dirname, 'public')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/ingresos', ingresosRoutes);
app.use('/api/gastos', gastosRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Arranque del servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT || 3000}`);
});
