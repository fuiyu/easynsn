const MongoBaseModel = require('./mongobase')
const PREFIX_EMAIL_TO_ID = 'email-id:'

class UserModel extends MongoBaseModel{
    init(collection){
        this.collection = collection
        this.collection.createIndex({email:1},{unique:true}).then()
    }
    // create(obj){
    //     return await super.store.create({PREFIX_EMAIL_TO_ID + obj.email, obj.id})
    // }
    async getByEmail(email){
        return await this.collection.findOne({email:email})
    }
}

module.exports = UserModel


// Object.assign
// 函数参数为一个目标对象（该对象作为最终的返回值）,源对象(此处可以为任意多个)。通过调用该函数可以拷贝所有可被枚举的自有属性值到目标对象中。此处的assign相当于merge
// Object.assign(OldUserModel.prototype, BaseModel.prototype,{
//     create:function(obj, callback){
//         const self = this
//         BaseModel.prototype.create.call(this, obj, function(err, result){
//             if(err){
//                 return callback(err)
//             }
//             if(obj.email){
//                 self.store.set(PREFIX_EMAIL_TO_ID + obj.email, obj.id, callback)
//                 return
//             }
//             callback(err, result)
//         })
//     },
//     getByEmail: function(email, callback){
//         const self = this
//         this.store.get(PREFIX_EMAIL_TO_ID + email, function(err, id){
//             if(err){
//                 return callback(err)
//             }
//             self.get(id, callback)
//         })
//     }
// })