// const assert = require('assert')
const {expect} = require('chai')
const {MongoClient} = require('mongodb')
const UserModel = require('../../models/user')

const userModel = new UserModel()


describe('UserModel',()=>{
    before(async()=>{
       const db = await MongoClient.connect('mongodb://127.0.0.1/testdb')
       userModel.init(db.collection('baseModel'))
    })
    it('could getByEmail',async ()=>{
        const testUser = {email:'tom@test.com', nickname:'Tom', password:'1234'}
        const id = await userModel.create(testUser)
        const user = await userModel.getByEmail('tom@test.com')
        expect(user.email).to.be.equal(testUser.email)
        expect(user.nickname).to.be.equal(testUser.nickname)
        expect(user.password).to.be.equal(testUser.password)
    })
    it('could not save duplicate email', async()=>{
        try{
            const testUser = {email:'tom@test.com', nickname:'Tom', password:'1234'}
            await userModel.create(testUser)
            await userModel.create(testUser)
        }catch(e){
            return
        }
        expect.fail()
    })    
})
// function testEmail(done){
//     const testUser = {email:'tom@test.com', nickname:'Tom', password:'1234'}
//     userModel.create(testUser,function(err){
//         assert(!err)
//         userModel.getByEmail('tom@test.com', function(err, user){
//             assert(!err)
//             assert.equal(user.email,testUser.email)
//             assert.equal(user.nickname,testUser.nickname)
//             assert.equal(user.password,testUser.password)
//             done()
//         })
//     })
// }

