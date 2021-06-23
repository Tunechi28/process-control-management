const chai = require('chai');
const chaiHttp = require('chai-http');
const helper = require('../../helper');

const { expect } = chai;
chai.use(chaiHttp);

const { config } =helper

const app = require('../../../server/app')(config);

describe('the /admins/login route', () => {
    beforeEach(async () => helper.before());
    afterEach(async () => helper.after());

    it('should show an error with an empty request', async () => {
        const res = await chai.request(app)
        .post('/api/admins/login')
        expect(res.text).to.contain('email or password incorrect')

    })
    it('should show an error with an invalid email or password', async () => {
        const res = await chai.request(app)
        .post('/api/admins/login')
        .send({
            email : "tochi@email.com",
            password : "secret"
        })
        expect(res.text).to.contain('email or password incorrect');
    })
    it('should show a success message after logout',async () => {
        const agent = chai.request.agent(app);
        await helper.createAdmin(agent, helper.validAdmin);
        const res = await helper.loginAdmin(agent,helper.validAdmin.email, helper.validAdmin.password)
        expect(res.text).to.not.contain('email or password incorrect');

    })
})


