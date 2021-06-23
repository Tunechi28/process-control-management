const mongoose = require('mongoose');
const dotenv = require('dotenv');
const admins = require('./server/data/admins');
const products = require('./server/data/products');
const colors = require('colors');

const config = require('./server/config/index').development;

const db = require('./server/lib/db');
const AdminModel = require('./server/models/AdminModel');
const ProductModel = require('./server/models/ProductModel');

dotenv.config();

db.connect(config.database.dsn);


// db.connect(process.env.DEVELOPMENT_DB_DSN);

const importData = async () => {
    try{
        await AdminModel.deleteMany();
        await ProductModel.deleteMany();
        const createdAdmins = await AdminModel.insertMany(admins);
        const storekeeper = createdAdmins[1]._id
        const sampleProducts = products.map((product) => {
            return { ...product, admin: storekeeper }
        })
        await ProductModel.insertMany(sampleProducts)
        
        console.log('data imported'.green.inverse);
        process.exit();
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);

    }
}

const destroyData = async () => {
    try{
        await AdminModel.deleteMany();
        console.log('data destroyed'.red.inverse);
        process.exit(0);
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}


if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}
