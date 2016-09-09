const assert = require('assert')
const UserModel = require('../../models/user')
const MemStore = require('../../store/memstore')

const memStore = new MemStore()
const userModel = new UserModel(memStore)
const obj = {foo:'bar'}

describe('userModel',function(){
    it('could testEmail',testEmail)
})
function testEmail(done){
    const testUser = {email:'tom@test.com', nickname:'Tom', password:'1234'}
    userModel.create(testUser,function(err){
        assert(!err)
        userModel.getByEmail('tom@test.com', function(err, user){
            assert(!err)
            assert.equal(user.email,testUser.email)
            assert.equal(user.nickname,testUser.nickname)
            assert.equal(user.password,testUser.password)
            done()
        })
    })
}

