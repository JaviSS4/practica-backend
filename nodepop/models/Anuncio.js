'use strict';

const mongoose = require('mongoose');

// El esquema del objeto de la BDD
var anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
});


anuncioSchema.statics.lista = function (filtro, skip, limit, select, sort) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);
  return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
