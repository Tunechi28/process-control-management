const chai = require('chai');

chai.use(require('chai-as-promised'));

const helper = require('../../helper');

const { AdminModel } = helper;

const { expect } =chai;


describe('the mongoose schema', async() => {
    beforeEach(async () => helper.before());
    afterEach(async () => helper.after());

    it('should let you create a new admin with a vaild data', async () => {
        const admin = new AdminModel(helper.validAdmin);
        const savedAdmin = await admin.save();
        expect(savedAdmin).to.exist
    });

    it('should store the password encrypted', async () => {
        const admin = new AdminModel(helper.validAdmin);
        await admin.save()

        const foundAdmin = await AdminModel.findOne({email : helper.validAdmin.email}).exec();
        expect(foundAdmin.password).to.exist;
        expect(foundAdmin.password).to.not.equal(helper.validAdmin.password)
    });

    it('should be correctly validate a password', async () => {
        const admin = new AdminModel(helper.validAdmin);
        await admin.save()

        const foundAdmin = await AdminModel.findOne({email : helper.validAdmin.email}).exec();
        expect(foundAdmin).to.not.be.null
        expect(foundAdmin.password).to.exist;
        const compResInvalid = await foundAdmin.comparePassword('foobar');
        expect(compResInvalid).to.be.false;
        const compResValid = await foundAdmin.comparePassword(helper.validAdmin.password);
        expect(compResValid).to.be.true
    })
})