// const assert = require('assert')
// const runner = require('../runner')
const expect = require('chai').expect
const BaseModel = require('../../models/base')
const MemStore = require('../../store/memstore')

const memStore = new MemStore()
const model = new BaseModel(memStore, 'base:')

describe('BaseModel',() => {
    it('shold create without error', async ()=> {
        const id = await model.create({foo:'bar'})
        expect(id).to.be.ok
    })
    it('shold get by id', async ()=> {
        const id = await model.create({foo:'bar'})
        const result = await model.get(id)
        expect(result).to.be.ok        
        expect(result.foo).to.equal('bar')
    })
    it('shold get nothing after delete', async ()=> {
        const id = await model.create({foo:'bar'})
        await model.del(id)
        const result = await model.get(id)
        expect(result).not.to.be.ok      
    })
})
