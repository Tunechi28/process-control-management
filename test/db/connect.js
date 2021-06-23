const chai = require('chai');
const { expect } = chai;
const MongoClient = require('mongodb');

configDev = require('../../server/config').development;
configProd = require('../../server/config').production;
configTest = require('../../server/config').test

describe('The DSN', () => {
    it('should be configured for production', async() => {
        expect(configProd.database.dsn).to.be.a('string');
    })
    it('should be configured for development', async() => {
        expect(configDev.database.dsn).to.be.a('string');
    })
    it('should be configured for test', async () => {
        expect(configTest.database.dsn).to.be.a('string')
    })
})


describe('The Database', () => {
    it('production database should be reachable', async () => {
        const db = await MongoClient.connect(configProd.database.dsn, {useNewUrlParser : true})
        expect(db).to.not.be.null
        await db.close()
    })
    it('development database should be reachable', async () => {
        const db = await MongoClient.connect(configDev.database.dsn, {useNewUrlParser : true});
        expect(db).to.not.be.null
        await db.close()
    })
    it('Test database should be reachable', async () => {
        const db = await MongoClient.connect(configTest.database.dsn, {useNewUrlParser : true});
        expect(db).to.not.be.null
        await db.close()
    })
})