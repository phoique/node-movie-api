const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director');

/* GET home page. */
router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data) => {
        res.json(data);
    });
    promise.catch((err) => {
        res.json('Yönetmen kayıt olurken bir hata oluştu: '+err);
    });
});

router.get('/', (req, res, next) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        }, 
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$movies'
                }
            }
        }, 
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'

            }
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json('Yönetmen listelerken bir hata oluştu: '+err);
    })
});

router.get('/:director_id', (req, res, next) => {
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        }, 
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$movies'
                }
            }
        }, 
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'

            }
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json('Yönetmen listelerken bir hata oluştu: '+err);
    })
});
module.exports = router;