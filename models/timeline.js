const KEY_TIMELINE = 'timeline:'

class TimelineModel {
    constructor(redis) {
        this.redis = redis
    }
// 利用redis进行存储
    push(userId, activityId){
        return this.redis.zadd(KEY_TIMELINE + userId, Date.now(), activityId)
    }

    range(userId, page, pageSize){
        return this.redis.zrevrange(KEY_TIMELINE + userId, (page - 1)*pageSize, page*pageSize)
    }
}

module.exports = TimelineModel