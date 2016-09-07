const assert = require('assert')
const runner = require('../runner')
const BaseModel = require('../../models/base')
const MemStore = require('../../store/memstore')

const memStore = new MemStore()
const model = new BaseModel(memStore, 'base:')
const obj = {foo:'bar'}

runner([testCreate,testGet,testDel],function(err){
    if(!err){
       console.log('All done')
    }
})
describe('model',function(){
    it('could create',testCreate)
    it('could get',testGet)
    it('could del',testDel)
})
function testCreate(done){
    model.create(obj,function(err, result){
        assert(!err)
        assert(obj.id)
        done()
    })
}

function testGet(done){
    model.get(obj.id, function(err, result){
        assert(!err)
        assert.equal(result.foo, 'bar')
        done()
    })
}

function testDel(done){
    model.del(obj.id, function(err, result){
        assert(!err)
        memStore.get(obj.id, function(err, result){
            assert(!err)
            assert(!result)
            done()
        })
    })
}