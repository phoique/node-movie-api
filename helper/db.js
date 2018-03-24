const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://admin:admin@ds223009.mlab.com:23009/movie-api');
    mongoose.connection.on('open', () => {
        console.log('Mongodb bağlandı.');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongodb bağlanırken bir hata oluştu: '+err);
    });

    mongoose.Promise = global.Promise;
}