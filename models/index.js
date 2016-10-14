// const MemStore = require('../store/memstore.js')
const {MongoClient} = require('mongodb')
// const BaseModel = require('./base')
const UserModel = require('./user')

// const memStore = new MemStore()

exports.user = new UserModel()
// exports.token = new BaseModel(memStore,'token:')

MongoClient.connect('mongodb://localhost/easysns').then(db => {
    exports.user.init(db.collection('user'))
})