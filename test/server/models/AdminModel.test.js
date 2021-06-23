const chai = require('chai');
chai.use(require('chai-as-promised'));

const helper = require('../../helper');

const { AdminModel } = helper;

const { expect } =chai;

describe('The Admin Schema', () => {
    beforeEach(async () => helper.before());
    afterEach(async () => helper.after());

    it('should create a new admin with a vaild data', async () => {
        const admin = new AdminModel(helper.validAdmin);
        const savedAdmin = await admin.save();
        expect(savedAdmin.id).to.exist;
    })
    it('should reject a too short firstName', async () => {
        const admin = new AdminModel({
            firstName :'he',
            lastName : 'agbasi',
            Address : 'surulere, Lagos',
            email : 'tochihenry28@gmai.com',
            password : 'iloveyou',
            phoneNo : 2348154198374,
            role : 'storekeeper'
        })
        await expect(admin.save()).to.be.rejectedWith(Error);
    })
    it('should reject a too short lastName', async () => {
        const admin = new AdminModel({
            firstName :'henry',
            lastName : 'ag',
            Address : 'surulere, Lagos',
            email : 'tochihenry28@gmai.com',
            password : 'iloveyou',
            phoneNo : 2348154198374,
            role : 'storekeeper'
        })
        await expect(admin.save()).to.be.rejectedWith(Error);
    })
    it('should reject email with an invalid format', async() => {
        const admin = new AdminModel({
            firstName :'henry',
            lastName : 'agbasi',
            Address : 'surulere, Lagos',
            email : 'tochihenry28',
            password : 'iloveyou',
            phoneNo : 2348154198374,
            role : 'storekeeper'
        })
        await expect(admin.save()).to.be.rejectedWith(Error);
    })
    it('should return an admin', async() => {
        const admin = new AdminModel(helper.validAdmin);
        await admin.save();
       
        const foundAdmin = await AdminModel.findOne({email : helper.validAdmin.email}).exec()
        expect(foundAdmin.firstName).to.equal('henry');
    })
})


// firstName = 'henry',
// lastName = 'agbasi',
// Address = 'surulere, Lagos',
// email = 'tochihenry28@gmai.com',
// password = 'iloveyou',
// phoneNo = 2348154198374,
// role = 'storekeeper'