/**
 * Created by kevin on 15/12/9.
 */
var Redis = require('../db/redis');
var Mysql = require('../db/my');
var moment = require('moment');
var Cron = function(){
    var CronJob = require('cron').CronJob;

    var job = new CronJob({
        cronTime: '0,30 * * * *',
        onTick: function() {
            /*
             * Runs every weekday (Monday through Friday)
             * at 11:30:00 AM. It does not run on Saturday
             * or Sunday.
             */
            console.log('every second!',new Date());
            Redis.store.keys("*",function(err,res){
                if(err){
                    console.log('私信错误：'+err);
                }
                else{
                    //Mysql.project.query();
                    var onlines = res.length;
                    Mysql.project.query('insert into report.chatrpt values(0,'+onlines+',null,0)',function(err,res){
                        if(!err){
                            console.log(res);
                        }else{
                            console.log(err);
                        }
                    });
                }
            });
        },
        start: false,
        timeZone: 'Asia/Shanghai'
    });
    job.start();


    var cal = function(starttime,endtime){
        //总回答数
        var anscount = 'SELECT count(1) anscount from post where faqid>0 and time>="'+starttime+'" and time<="'+endtime+'"';
        //专家回答总数
        var procount = 'select count(1) procount from project.post p join ecp.user u on (p.authorid=u.id) where isExpert=1 and faqid>0 and time>="'+starttime+'" and time<="'+endtime+'"';
        //总问题数
        var askcount = 'SELECT count(1) askcount from faq where asktime>="'+starttime+'" and asktime<="'+endtime+'"';
        //达人回答数
        var doyencount = 'select count(1) doyencount from (project.post p join ecp.user u on (p.authorid=u.id)) inner join `wx-jmn`.wx_users wx on (p.authorid=wx.jmn_id) where isExpert=0 and jmn_id is not null and time>="'+starttime+'" and time<="'+endtime+'"';
        console.log(anscount);

        //ans
        Mysql.project.query(anscount,function(err,re){
            if(!err){
                var ansval = re[0].anscount;
                console.log(re,re[0]);
                //pro
                Mysql.project.query(procount,function(err,re){
                    if(!err){
                        var proval = re[0].procount;
                        console.log(re,re[0]);
                        //askcount
                        Mysql.project.query(askcount,function(err,re){
                            if(!err){
                                var askval = re[0].askcount;
                                console.log(re,re[0]);
                                //doyencount
                                Mysql.project.query(doyencount,function(err,re){
                                    if(!err){
                                        var doyenval = re[0].doyencount;
                                        console.log(re,re[0]);
                                        //insert
                                        Mysql.project.query('insert into report.interlocution values(0,'+askval+','+ansval+','+proval+','+doyenval+',"'+starttime+'","'+endtime+'")',function(err,res){
                                            if(!err){
                                                console.log(res,'a-----');
                                            }else{
                                                console.log(err);
                                            }
                                        });
                                    }else{
                                        res.json({code:-1,msg:'服务器错误doyencount！'+err});
                                    }
                                });
                            }else{
                                res.json({code:-1,msg:'服务器错误askcount！'+err});
                            }
                        });
                    }else{
                        res.json({code:-1,msg:'服务器错误procount！'+err});
                    }
                });
            }else{
                res.json({code:-1,msg:'服务器错误anscount！'+err});
            }
        });

    };

    new CronJob({
        cronTime: '0 * * * *',
        onTick: function() {
            /*
             * Runs every weekday (Monday through Friday)
             * at 11:30:00 AM. It does not run on Saturday
             * or Sunday.
             */
            var now = moment().subtract(1,'hours').format('YYYY-MM-DD HH:mm:ss');
            var now1 = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(now,now1);
            //cal("'"+now+"'","'"+now1+"'");
            cal(now,now1);
        },
        start: true,
        timeZone: 'Asia/Shanghai'
    });
};
console.log('in cron');

module.exports=Cron;