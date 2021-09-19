'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio.js');


// Devolver una lista completa de los anuncios
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
        res.json({ results: anuncios });
    } catch (err) {
        next(err);
    }
});


// GET /api/anuncios/buscar/:búsqueda
// Buscar un anuncio, sin importar mayúsculas y sin necesitar el nombre exacto del mismo
router.get('/buscar/:nombreBus', async (req, res, next) => {
    try {
        const name = req.params.nombreBus;

        const anuncio = await Anuncio.find({ nombre: { $regex: name, $options: 'i' } });
        res.json({ result: anuncio });
    } catch (err) {
        next(err);
    }
});

// GET /api/anuncios/precio/num-otronum (cualquiera de los dos num opcionales)
// Buscar anuncios dependiendo del rango de precios en el que se encuentren
router.get('/precio/:preciominmax', async (req, res, next) => {
    try {
        const qty = req.params.preciominmax;
        const qtySplitted = qty.split("-");
        // Si el número es único mostrará los articulos con el precio exacto
        if (qtySplitted.length === 1) {

            const qty1 = parseInt(qtySplitted[0]);
            const anuncio = await Anuncio.find({ precio: qty1 });
            res.json({ result: anuncio });
        }
        // Si el número tiene un guión a la izquierda mostrará los artículos con menor precio que la cifra indicada
        else if (qtySplitted[0] === "") {
            const qty1 = parseInt(qtySplitted[1]);
            const anuncio = await Anuncio.find({ precio: { $lte: qty1 } });
            res.json({ result: anuncio });
        }
        // Si el número tiene un guión a la derecha mostrará los artículos con mayor precio que la cifra indicada
        else if (qtySplitted[1] === "") {
            const qty1 = parseInt(qtySplitted[0]);
            const anuncio = await Anuncio.find({ precio: { $gte: qty1 } });
            res.json({ result: anuncio });
        }
        // Si se intruducen 2 número separados por un guión se mostrarán los artículos cuyo precio se halle en ese rango
        else if (qtySplitted[0] != "" & qtySplitted[1] != "") {
            const qty1 = parseInt(qtySplitted[0]);
            const qty2 = parseInt(qtySplitted[1]);
            const anuncio = await Anuncio.find({ precio: { $gte: qty1, $lte: qty2 } });
            res.json({ result: anuncio });
        }
    } catch (err) {
        next(err);
    }
});

// POST /api/anuncios 
// Crear un anuncio
router.post('/', async (req, res, next) => {
    try {
        const anuncioData = req.body;

        const anuncio = new Anuncio(anuncioData);

        const anuncioCreado = await anuncio.save();

        res.status(201).json({ result: anuncioCreado });

    } catch (err) {
        next(err);
    }
});

// DELETE /api/anuncios:id
// Eliminar un anuncio
router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        await Anuncio.deleteOne({ _id: _id });
        res.json();
    } catch (err) {
        next(err);
    }
});

// PUT /api/anuncios:id 
// Actualizar un anuncio
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const anuncioData = req.body;

        const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: _id }, anuncioData, {
            new: true
        });

        if (!anuncioActualizado) {
            res.status(404).json({ error: 'not found' });
            return;
        }

        res.json({ result: anuncioActualizado });
    } catch (err) {
        next(err);
    }
});

module.exports = router;