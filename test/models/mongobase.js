const {expect} = require('chai')
const {MongoClient} = require('mongodb')
const MongoBaseModel = require('../../models/mongobase.js')

const model = new MongoBaseModel()

describe('MongoBaseModel',()=>{
    before(async()=>{
        const db = await MongoClient.connect('mongodb://127.0.0.1/testdb')
        model.init(db.collection('baseModel'))
    })

    it('should create without error', async () => {
        const id = await model.create({foo:'bat'})
        expect(id).to.be.ok
    })

    it('should get by id',async () => {
        const id = await model.create({foo:'bar'})        
        const result = await model.get(id)
        expect(id).to.be.ok        
        expect(result.foo).to.be.equal('bar')
    })

    it('should get nothing after delete',async () => {
        const id = await model.create({foo:'bar'})        
        await model.del(id)
        const result = await model.get(id)        
        expect(result).not.to.be.ok
    })
})