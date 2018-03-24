const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String, 
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [25, '`{PATH}` kısmı 25 karaterden uzun olamaz.'],
        minlength: [3, '`{PATH}` kısmı 3 karakterden kısa olamaz.']

    },
    category: {
        type: String,
        maxlength: 15,
        minlength: 3
    },
    country: {
        type: String,
        maxlength: 15,
        minlength: 3
    },
    year: {
        type: Number,
        max: 2020,
        minlength: 1800
    },
    imdb_score: {
        type: Number,
        max: 10,
        minlength: 0
    },
    date: {type:Date, default: Date.now}
});

module.exports = mongoose.model('movie', MovieSchema);