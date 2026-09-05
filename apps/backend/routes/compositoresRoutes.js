const express = require('express');
const router = express.Router();

// Importamos todas las funciones del controlador
const {
  obtenerCompositores,
  buscarCompositores,
  obtenerCompositorPorId,
  crearCompositor,
  actualizarCompositor,
  eliminarCompositor,
  obtenerEstadisticas
} = require('../controllers/compositoresController');

// Ruta para ver estadísticas resumidas
router.get('/estadisticas/resumen', obtenerEstadisticas);

// Ruta para buscar por filtros (?periodo=...&pais=...)
router.get('/buscar', buscarCompositores);

// Rutas base: GET (todos) y POST (crear)
router.route('/')
  .get(obtenerCompositores)
  .post(crearCompositor);

// Rutas por ID: GET (uno), PUT (actualizar), DELETE (eliminar)
router.route('/:id')
  .get(obtenerCompositorPorId)
  .put(actualizarCompositor)
  .delete(eliminarCompositor);

module.exports = router;