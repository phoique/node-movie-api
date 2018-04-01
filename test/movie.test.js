const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token;

describe('/api/movies test', () => {
    before((done) => {
		chai.request(server)
			.post('/authenticate')
			.send({ username: 'admin', password: 'admin' })
			.end((err,res) => {
                token = res.body.token;
                console.log("Tokenimiz: "+token);
				done();
		});
    });
    describe('/GET movies', () => {
        it('Tüm filmleri listeler.', (done) => {
            done();
        });
    });
});