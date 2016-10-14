const {ObjectID} = require('mongodb')

class MongoBaseModel {
    init(collection){
        this.collection = collection
    }

    toId(id) {
        if(id instanceof ObjectID){
            return id
        }
        return new ObjectID(id)
    }

    async create(obj){
        const insertResult = await this.collection.insertOne(obj)
        return insertResult && insertResult.insertedId
    }
//由于mongo操作时，如果参数中没有回调函数，返回的是promise，所以不需要再定义async
    get(id){
        return  this.collection.findOne({_id:this.toId(id)})
    }

    update (id, obj){
        return  this.collection.updateOne({_id:this.toId(id)},obj)
    }

    updatePart (id, part){
        return  this.collection.updateOne({_id:this.toId(id)},{$set: part})
    }

     del(id){
        return  this.collection.deleteOne({_id: this.toId(id)})
    }

    deleteMany(query={}){
        return this.collection.deleteMany(query)
    }

    find(query={},sort={},limit=100){
        return this.collection.find(query).sort(sort).limit(limit)
    }
// $lt 小于，-1降序
    findBefore (defore, limit=100){
        return this.find({_id:{$lt:this.toId(defore)}},{_id:-1})
    }
// $gt 大于，-1降序
    findSince (since, limit=100){
        return this.find({_id:{$gt:this.toId(since)}},{_id:-1})
    }
}

module.exports = MongoBaseModel