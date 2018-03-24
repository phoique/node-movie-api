const express = require('express');
const router = express.Router();
// Models
const Movie = require('../models/Movie');

router.get('/', (req, res) => {
    const promise = Movie.find({});
    promise.then((data) =>{
        res.json(data);
    });
    promise.catch((err) => {
        res.json('Listelerken bir hata oluştu: '+err);
    });
});

router.get('/top10', (req, res) => {
    const promise = Movie.find({}).limit(5).sort({imdb_score: -1});
    promise.then((data) =>{
        res.json(data);
    });
    promise.catch((err) => {
        res.json('Listelerken bir hata oluştu: '+err);
    });
});

router.get('/:movie_id', (req,res, next) => {
    const promise = Movie.findById(req.params.movie_id);
    promise.then((data) => {
        res.json(data);
    });
    promise.catch((err) => {
        res.json('Filmi ararken bir hata oluştu: '+err);
    });
});

router.post('/', (req, res) => {
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

router.put('/:movie_id', (req,res) => {
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true});
    promise.then((data) => {
        res.json(data);
    });
    promise.catch((err) => {
        res.json('Filmi güncellerken bir hata oluştu: '+err);
    });
});

router.delete('/:movie_id', (req,res) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);
    promise.then((data) => {
        res.json(data);
    });
    promise.catch((err) => {
        res.json('Filmi silerken bir hata oluştu: '+err);
    });
});

router.get('/between/:start_year/:end_year', (req, res) => {
    const {start_year, end_year} = req.params;
    const promise = Movie.find({
        year: {'$gte': parseInt(start_year), '$lte': parseInt(end_year)}
    });
    promise.then((data) =>{
        res.json(data);
    });
    promise.catch((err) => {
        res.json('Listelerken bir hata oluştu: '+err);
    });
});
module.exports = router;
