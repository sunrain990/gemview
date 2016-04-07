/**
 * Created by kevin on 15/12/9.
 */
var redis = require('redis');
var pub;
var sub;
var store;
var redisInfo = {
    port:6380,
    url:'10.168.247.105',
};
var Redis;

function handleEror(){
    function handleRedis(port,url){
        pub = redis.createClient(port,url);
        sub = redis.createClient(port,url);
        store = redis.createClient(port,url);
        pub.select(12);
        store.select(13);
        sub.select(14);
    }
    handleRedis(redisInfo.port,redisInfo.url);

    pub.on("error", function(error) {
        handleEror();
    });

    sub.on("error", function(error) {
        handleEror();
    });

    store.on("error", function(error) {
        handleEror();
    });

    Redis = {
        pub:pub,
        sub:sub,
        store:store
    };
};

handleEror();

module.exports = Redis;