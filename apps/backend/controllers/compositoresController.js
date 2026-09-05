// Arreglo en memoria con los datos iniciales
let compositores = [
  { id: 1, name: "Ludwig van Beethoven", periodo: "Clásico", pais: "Alemania", obrasFamosas: 9, email: "beethoven@musica.com" },
  { id: 2, name: "Wolfgang Amadeus Mozart", periodo: "Clásico", pais: "Austria", obrasFamosas: 41, email: "mozart@musica.com" },
  { id: 3, name: "Johann Sebastian Bach", periodo: "Barroco", pais: "Alemania", obrasFamosas: 20, email: "bach@musica.com" }
];

// GET: Obtener todos los compositores
const obtenerCompositores = (req, res) => {
  res.json(compositores);
};

// GET: Buscar compositores por filtro o parámetro
const buscarCompositores = (req, res) => {
  const { periodo, pais } = req.query;
  let resultado = compositores;

  if (periodo) {
    resultado = resultado.filter(c => c.periodo.toLowerCase().includes(periodo.toLowerCase()));
  }
  if (pais) {
    resultado = resultado.filter(c => c.pais.toLowerCase() === pais.toLowerCase());
  }

  res.json(resultado);
};

// GET: Obtener compositor por ID
const obtenerCompositorPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const compositor = compositores.find(c => c.id === id);

  if (!compositor) {
    return res.status(404).json({ mensaje: "Compositor no encontrado" });
  }

  res.json(compositor);
};

// POST: Crear un nuevo compositor
const crearCompositor = (req, res) => {
  const { name, periodo, pais, obrasFamosas, email } = req.body;

  const nuevoCompositor = {
    id: compositores.length > 0 ? compositores[compositores.length - 1].id + 1 : 1,
    name,
    periodo,
    pais,
    obrasFamosas: parseInt(obrasFamosas) || 0,
    email
  };

  compositores.push(nuevoCompositor);
  res.status(201).json(nuevoCompositor);
};

// PUT: Actualizar un compositor existente
const actualizarCompositor = (req, res) => {
  const id = parseInt(req.params.id);
  const index = compositores.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Compositor no encontrado" });
  }

  compositores[index] = { ...compositores[index], ...req.body };
  res.json(compositores[index]);
};

// DELETE: Eliminar un compositor
const eliminarCompositor = (req, res) => {
  const id = parseInt(req.params.id);
  const index = compositores.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Compositor no encontrado" });
  }

  const compositorEliminado = compositores.splice(index, 1);
  res.json({ mensaje: "Compositor eliminado", compositor: compositorEliminado[0] });
};

// GET: Estadísticas resumidas (Uso de reduce)
const obtenerEstadisticas = (req, res) => {
  const totalCompositores = compositores.length;
  const totalSinfonias = compositores.reduce((acc, c) => acc + (c.obrasFamosas || 0), 0);
  const promedioSinfonias = totalCompositores > 0 ? totalSinfonias / totalCompositores : 0;

  res.json({
    totalCompositores,
    totalSinfoniasRegistradas: totalSinfonias,
    promedioSinfoniasPorCompositor: parseFloat(promedioSinfonias.toFixed(2))
  });
};

module.exports = {
  obtenerCompositores,
  buscarCompositores,
  obtenerCompositorPorId,
  crearCompositor,
  actualizarCompositor,
  eliminarCompositor,
  obtenerEstadisticas
};