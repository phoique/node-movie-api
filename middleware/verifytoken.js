const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token
    if(token){
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if (err)
                res.send('Tokenle ilgili bir hata oluştu: '+err);
            else {
                req.decode = decoded;
                next();
            }
        });
    }else {
        res.send('Kullanıcı girişi yapıp tokenini aldın mı?');
    }
}