const express = require('express');
const router = express.Router();
// Models
const Movie = require('../models/Movie');

router.post('/', (req, res, next) => {
    //const {title, imdb_score, category, country, year} = req.body;
    const movie = new Movie(req.body);
    const promise = movie.save();
    promise.then((data) => {
        res.json(data);
    });
    promise.catch((err) => {
        res.json("Veriler kayıt edilemedi: "+err);
    });
});

module.exports = router;
