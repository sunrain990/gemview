/**
 * Created by kevin on 16/3/22.
 */
var Redis = require('./redis');
Redis.store.keys('*',function(err,res){
    if(!err){
        console.log(res);
    }else{
        console.log(err);
    }
})