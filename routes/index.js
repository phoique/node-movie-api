const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.post('/register', (req,res) => {
    const {username, password} = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({username,password: hash});
        const promise = user.save();
        promise.then((users) => {
            res.json(users);
        }).catch((err) => {
            res.json('Kullanıcı kayıt olurken bir hata oluştu: '+err);
        });
    });
});

router.post('/authenticate', (req,res) => {
    const {username, password} = req.body;
    User.findOne({username}, (err,user) => {
        if (err)
            res.json('Kullanıcı girişinde hata oluştu: '+err);
        else if (!user)
            res.send('Kullanıcı yok.');
        else {
            bcrypt.compare(password, user.password).then((result) => {
                if (!result)
                    res.send('Kullanıcı adınız doğru şifreniz yanlıştır.');
                else {
                    const payload = {
                        username
                    };
                    const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                        expiresIn: 720 // 12 saat boyunca
                    });

                    res.json("Kullanıcı tokenin: "+token);
                } 
            });
        }
        
    });
});

module.exports = router;
