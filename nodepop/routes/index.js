var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');


// Me gustaría haber reutilizado lo que ya estaba en anuncios.js
// pero no sabía como importar el siguiente bloque de código de una buena forma

router.get('/', async (req, res, next) => {
  try {
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const foto = req.query.foto;
    const tags = req.query.tags;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const select = req.query.select;
    const sort = req.query.sort;

    const filtro = {};

    if (nombre) {
      filtro.nombre = nombre;
    }

    if (venta) {
      filtro.venta = venta;
    }

    if (precio) {
      filtro.precio = precio;
    }

    if (foto) {
      filtro.foto = foto;
    }

    if (tags) {
      filtro.tags = tags;
    }

    const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort);
    res.locals.anuncioHTML = anuncios;
  } catch (err) {
    next(err);
  }


  res.render('index');
});



module.exports = router;
