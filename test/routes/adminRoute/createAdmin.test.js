const chai = require('chai');
const chaiHttp =require('chai-http');
const helper = require('../../helper');

const should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

const { config, AdminModel, validAdmin, validManager} = helper;

const app = require('../../../server/app')(config)

const createAdminRoute = '/api/admins/login';

let adminResponse, managerResponse, adminToken, managerToken;
describe('the /api/admins/create route', () => {
    beforeEach(async () => helper.beforeLogin())
    // beforeEach( adminResponse = await request(app).post(createAdminRoute).send(validAdmin).set('Content-Type', 'application/json'))
    // beforeEach(adminToken = adminResponse.body.token)
    // beforeEach( managerResponse = await chai.request(app).post(createAdminRoute).send(validManager).set('Content-Type', 'application/json'))


    beforeEach(async (done) => {
        try{
            managerResponse = await chai.request(app).post(createAdminRoute).send({
                email: 'john@email.com',
                password: 'iloveyou'
            }).set('Content-Type', 'application/json')
            .end(done)
            managerToken = managerResponse.body.token
        }catch(error){
            done(error)
        }
        
    })
    // beforeEach(managerToken = managerResponse.body.token)
    afterEach(async () => helper.after());
    it('should give 401 unauthorised if the user is not a manager', async() => {
        const res = await chai.request(app)
        .post('/api/admins/create')
        .send({
            firstName : 'agatha',
            lastName : 'john',
            email : 'agatha@email.com',
            email : 'john@email.com',
            password : 'iloveyou',
            phoneNo : 234907068841283,
            adminRole : 'storekeeper'
         })
        .set('Authorization', 'Bearer ' + managerToken)
        .set('Content-Type', 'application/json')
        res.should.have.status(401)
        expect(res.text).to.contain('You are not authorized for this operation')
    })
})




