const express = require('express');
const cors = require('cors');
const compositoresRoutes = require('./routes/compositoresRoutes');

const app = express();

// Middlewares obligatorios
app.use(cors());
app.use(express.json());

// Ruta principal de prueba
app.get('/', (req, res) => {
  res.send('API de Compositores funcionando correctamente');
});

// Registrar las rutas bajo el prefijo /api/compositores
app.use('/api/compositores', compositoresRoutes);

module.exports = app;