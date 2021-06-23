let db = null;
let AdminModel = null;

try{
    db =require('../../server/lib/db')
}catch(err) {
    console.log('database ignored')
}

try{
    AdminModel = require('../../server/models/AdminModel')
}catch(err){
    console.log('AdminModel ignored');
}

const config = require('../../server/config').test;

module.exports.AdminModel = AdminModel;
module.exports.config = config;

module.exports.validAdmin = {
    firstName :'henry',
    lastName : 'agbasi',
    address : 'surulere, Lagos',
    email : 'tochihenry28@gmai.com',
    password : 'iloveyou',
    phoneNo : 2348154198374,
    role : 'storekeeper'
}
module.exports.validManager = {
    firstName : 'john',
    lastName : 'agbasi',
    address : 'surulere,lagos',
    email : 'john@email.com',
    password : 'iloveyou',
    phoneNo : 2349070641283,
    adminRole : 'manager'
}

module.exports.beforeLogin = async () => {
    if(db){
        await db.connect(config.database.dsn)
    }
    if(AdminModel){
        return await AdminModel.insertMany([
            {
                firstName : 'john',
                lastName : 'agbasi',
                address : 'surulere,lagos',
                email : 'john@email.com',
                password : 'iloveyou',
                phoneNo : 2349070641283,
                adminRole : 'manager'
            },
            this.validAdmin
        ])
    }

    return true;
}

module.exports.before = async () => {
    if(db){
        await db.connect(config.database.dsn);
    }
    if(AdminModel){
        return AdminModel.deleteMany({});
    }
    return true;
}

module.exports.after =  async () => {
    if(AdminModel){
        return AdminModel.deleteMany({});
    }
    return true;
}

// Local helper function that creates a user
module.exports.createAdmin = async (agent, admin) => agent
  .post('/admins/create')
  .set('content-type', 'application/json')
  .send(admin);

// Local helper function that logs a user in
module.exports.loginAdmin = async (agent, email, password) => agent
  .post('/admins/login')
  .set('content-type', 'application/json')
  .send({ email, password });