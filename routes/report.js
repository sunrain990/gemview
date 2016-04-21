var express = require('express');
var Mysql = require('../config/db/myf');
var Redis = require('../config/db/redis');
var router = express.Router();
var async = require('async');
var _ = require('lodash');

/* GET home page. */
router.post('/askrank', function (req, res, next) {
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var total = req.body.total;
    if (!total) {
        total = 30;
    }
    var sql1 = 'SELECT authorid,faqid,count(authorid) cnt FROM post WHERE faqid>0 and time>="' + starttime + '" and time<="' + endtime + '" GROUP BY authorid ORDER BY cnt DESC limit ' + total;
    Mysql.project.query(sql1, function (err, re) {
        if (!err) {
            res.json({code: 1, msg: '列出成功！', data: re});

            //Mysql.project.query(sql1,function(err,rep){
            //  if(!err){
            //    console.log(rep);
            //  }else{
            //    res.json({code:-1,msg:'服务器列表错误！'+err});
            //  }
            //});
        } else {
            res.json({code: -1, msg: '服务器更新错误！' + err});
        }
    });
});

router.post('/askrankk', function (req, res, next) {
    console.log(req.body.starttime);
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var total = req.body.total;
    if (!total) {
        total = 30;
    }
    var sql = 'SELECT authorid,faqid,count(authorid) cnt FROM post WHERE faqid=0 and time>="' + starttime + '" and time<="' + endtime + '" GROUP BY authorid ORDER BY cnt DESC limit ' + total;
    Mysql.project.query(sql, function (err, re) {
        if (!err) {
            res.json({code: 1, msg: '列出成功！', data: re});
            //Mysql.project.query(sql1,function(err,rep){
            //  if(!err){
            //    console.log(rep);
            //  }else{
            //    res.json({code:-1,msg:'服务器列表错误！'+err});
            //  }
            //});
        } else {
            res.json({code: -1, msg: '服务器更新错误！' + err});
        }
    });
});

router.post('/getpmsg', function (req, res, next) {
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var sql = 'select count(1) count from chat_post where type=0 and time>="' + starttime + '" and time<="' + endtime + '"';
    console.log(sql);
    Mysql.project.query(sql, function (err, re) {
        if (!err) {
            console.log(re);
            res.json({code: 1, msg: '列出成功！', count: re[0]});
        } else {
            res.json({code: -1, msg: '列出失败！', data: re});
        }
    });
});

router.post('/getfaqlist', function (req, res, next) {
    var id = req.body.id;
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var sql = 'SELECT faqid from post where faqid>0 and time>="' + starttime + '" and time<="' + endtime + '" and authorid=' + id;
    console.log(sql);
    Mysql.project.query(sql, function (err, re) {
        if (!err) {
            console.log(re, 'this is re');
            res.json({code: 1, msg: '列出成功！', data: re});
        } else {
            res.json({code: -1, msg: '服务器更新错误！' + err});
        }
    });
});

router.post('/getanslist', function (req, res, next) {
    var total = req.body.total;
    var pg = req.body.pg;
    var id = req.body.id;
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    if (!pg || !id || !starttime || !endtime || !total) {
        return res.json({code: -1, msg: '参数不全'});
    }

    var page = pg.page;
    var pcount = pg.pcount;
    var pstart = (pg.page - 1) * (pg.pcount);
    var sql = 'SELECT faqid,author,authorid from post where faqid>0 and time>="' + starttime + '" and time<="' + endtime + '" and authorid=' + id + ' limit ' + pstart + ',' + pcount;
    var sql1 = 'SELECT count(*) as total from post where faqid>0 and time>="' + starttime + '" and time<="' + endtime + '" and authorid=' + id;
    console.log(sql, 'this pg sql!!!!');
    Mysql.project.query(sql1, function (err, rr) {
        if (!err) {
            console.log(rr);
            var total = rr[0].total;
            var pg = {
                page: page,
                pcount: pcount,
                total: total
            };
            Mysql.project.query('select truename,nickname,id from ecp.user inner join ecp.user_profile using (id) where id ='+id,function(err,reuser){
                if(!err){
                    var userid = reuser[0].id;
                    var nickname = reuser[0].nickname;
                    var truename = reuser[0].truename;


                    Mysql.project.query(sql, function (err, re) {
                        if (!err) {
                            console.log(re, 'this is re');
                            if(re.length){
                                var isWho = re[0].author;
                                var isWhoid = re[0].authorid;
                                var faqid = re[0].faqid;
                            }
                            var faqids = re.map(function (i) {
                                return i.faqid;
                            });

                            var faqids = _.uniq(faqids);

                            var posts = [];
                            async.each(faqids, function (item, callback) {
                                var faq = {};
                                Mysql.project.query('select * from faq where id=' + item, function (err, res2) {
                                    if (!err) {
                                        console.log(res2);
                                        var askid = res2[0].ask;
                                        if (askid) {
                                            Mysql.project.query('select * from post where id=' + askid, function (err, res3) {
                                                if (!err) {
                                                    var ask = res3[0];
                                                    faq.ask = ask;

                                                    Mysql.project.query('select * from post where faqid=' + item + ' order by time', function (err, re2) {
                                                        if (!err) {
                                                            var post = re2;
                                                            faq.post = post;
                                                            posts.push(faq);
                                                            callback(null);
                                                        } else {
                                                            callback(null);
                                                            return res.json({code: -1, text: '推送查询出错', data: {err: err}});
                                                        }
                                                    });
                                                } else {
                                                    console.log(err);
                                                    return res.json({code: -1, text: '推送查询出错', data: {err: err}});
                                                }
                                            });
                                        }
                                    } else {
                                        callback(null);
                                        return res.json({code: -1, text: '推送查询出错', data: {err: err}});
                                    }
                                });

                            }, function (err) {
                                if (!err) {
                                    console.log('> done2');
                                    posts.pg = pg;
                                    return res.json({
                                        code: 1, msg: '列出成功！', data: {
                                            posts: posts,
                                            pg: pg,
                                            //isWho:isWho,
                                            faqid:faqid,
                                            //isWhoid:isWhoid
                                            userid:userid,
                                            nickname:nickname,
                                            truename:truename
                                        }
                                    });
                                    console.log(posts, 'this is posts!!');
                                } else {
                                    console.log('> done1');
                                    return res.json({code: -1, msg: '列出失败！', data: err});
                                }
                            });
                        } else {
                            res.json({code: -1, msg: '服务器更新错误！' + err});
                        }
                    });
                }else{
                    res.json({code:-1,text:'find user err',data:{}});
                }
            });

        } else {
            return res.json({code: -1, text: '失败', data: err});
        }
    });

});


router.post('/listaskfaqs', function (req, res, next) {
    var authorid = req.body.authorid;
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    console.log(authorid);
    var sql = 'SELECT id faqid from faq where asktime>="' + starttime + '" and asktime<="' + endtime + '" and authorid=' + authorid;
    Mysql.project.query(sql, function (err, re) {
        if (!err) {
            console.log(re);
            res.json({code: 1, msg: '列出成功！', data: re});
        } else {
            res.json({code: -1, msg: '服务器错误！' + err});
        }
    });
});


router.post('/countposts', function (req, res, next) {
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    //回答总数
    var sql = 'SELECT count(1) cnt from post where faqid>0 and time>="' + starttime + '" and time<="' + endtime + '"';
    //专家回答总数
    var sql2 = 'select count(1) cnt from project.post p join ecp.user u on (p.authorid=u.id) where isExpert=1 and faqid>0 and time>="' + starttime + '" and time<="' + endtime + '"';
    Mysql.project.query(sql, function (err, re) {
        if (!err) {
            console.log(re);
            Mysql.project.query(sql2, function (err, r) {
                if (!err) {
                    console.log(r);
                    return res.json({
                        code: 1, msg: '列出成功！', data: {
                            allposts: re,
                            proposts: r
                        }
                    });
                } else {
                    res.json({code: -1, msg: '服务器错误！' + err});
                }
            });
        } else {
            res.json({code: -1, msg: '服务器错误！' + err});
        }
    });
});

router.post('/countasks', function (req, res, next) {
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var sql = 'SELECT count(1) cnt from faq where asktime>="' + starttime + '" and asktime<="' + endtime + '"';
    Mysql.project.query(sql, function (err, re) {
        if (!err) {
            console.log(re);
            res.json({code: 1, msg: '列出成功！', data: re});
        } else {
            res.json({code: -1, msg: '服务器错误！' + err});
        }
    });
});

router.post('/chat', function (req, res, next) {
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var total = req.body.total;
    var sql = 'SELECT onlines, UNIX_TIMESTAMP(time) time,roomid from report.chatrpt where time>="' + starttime + '" and time<="' + endtime + '" limit ' + total;
    Mysql.project.query(sql, function (err, re) {
        if (!err) {
            console.log(re);
            res.json({code: 1, msg: '列出成功！', data: re});
        } else {
            res.json({code: -1, msg: '服务器错误！' + err});
        }
    });
});

router.post('/interlocution', function (req, res, next) {
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var total = req.body.total;
    var sql = 'SELECT askcount,anscount,procount,doyencount,UNIX_TIMESTAMP(starttime) starttime,UNIX_TIMESTAMP(endtime) endtime from report.interlocution where starttime>="' + starttime + '" and endtime<="' + endtime + '" limit ' + total;
    Mysql.project.query(sql, function (err, re) {
        if (!err) {
            console.log(re);
            res.json({code: 1, msg: '列出成功！', data: re});
        } else {
            res.json({code: -1, msg: '服务器错误！' + err});
        }
    });
});

module.exports = router;
