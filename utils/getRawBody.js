module.exports = function (stream,callback) {  
    var buffers = []
    // 接受数据
    stream.on('data',function(data){
        buffers.push(data)
    })
    // 接受完毕end
    stream.on('end',function(){
        callback(null,Buffer.concat(buffers).toString('utf8'))
      
    })
    stream.on('error',function(err){
        callback(err)
    })
}