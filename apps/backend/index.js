const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Arreglo con 8 elementos sobre Música Clásica
const compositores = [
  { id: 1, nombre: "Ludwig van Beethoven", periodo: "Clasicismo", pais: "Alemania", obrasFamosas: 9 },
  { id: 2, nombre: "Wolfgang Amadeus Mozart", periodo: "Clasicismo", pais: "Austria", obrasFamosas: 41 },
  { id: 3, nombre: "Johann Sebastian Bach", periodo: "Barroco", pais: "Alemania", obrasFamosas: 20 },
  { id: 4, nombre: "Pyotr Ilyich Tchaikovsky", periodo: "Romanticismo", pais: "Rusia", obrasFamosas: 6 },
  { id: 5, nombre: "Frederic Chopin", periodo: "Romanticismo", pais: "Polonia", obrasFamosas: 27 },
  { id: 6, nombre: "Antonio Vivaldi", periodo: "Barroco", pais: "Italia", obrasFamosas: 12 },
  { id: 7, nombre: "Johannes Brahms", periodo: "Romanticismo", pais: "Alemania", obrasFamosas: 4 },
  { id: 8, nombre: "Claude Debussy", periodo: "Impresionismo", pais: "Francia", obrasFamosas: 10 }
];

// RUTA 1: Devolver la lista completa
app.get('/api/compositores', (req, res) => {
  res.json(compositores);
});

// RUTA 3: Buscar/filtrar mediante query string (ej: /api/compositores/buscar?periodo=Barroco)
// (Ubicada antes de la ruta por ID para evitar conflictos de enrutamiento)
app.get('/api/compositores/buscar', (req, res) => {
  const { periodo, pais } = req.query;
  let resultado = compositores;

  if (periodo) {
    resultado = resultado.filter(c => c.periodo.toLowerCase().includes(periodo.toLowerCase()));
  }

  if (pais) {
    resultado = resultado.filter(c => c.pais.toLowerCase() === pais.toLowerCase());
  }

  res.json(resultado);
});

// RUTA 2: Devolver un solo elemento por ID (Devuelve 404 si no existe)
app.get('/api/compositores/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const compositor = compositores.find(c => c.id === id);

  if (!compositor) {
    return res.status(404).json({ mensaje: "Compositor no encontrado" });
  }

  res.json(compositor);
});

// RETO EXTRA: Estadísticas usando el método reduce
app.get('/api/compositores/estadisticas/resumen', (req, res) => {
  const totalCompositores = compositores.length;
  const totalSinfonias = compositores.reduce((acc, c) => acc + c.obrasFamosas, 0);
  const promedioSinfonias = totalSinfonias / totalCompositores;

  res.json({
    totalCompositores,
    totalSinfoniasRegistradas: totalSinfonias,
    promedioSinfoniasPorCompositor: parseFloat(promedioSinfonias.toFixed(2))
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});