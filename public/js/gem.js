/*初始化所有全局设置变量和angular设置函数
为全部页面提供config各种变量
*/

var gem = {};

//所有API的前缀修饰，自动匹配测试服务器和正式服务器
gem.apiprefix = undefined;
gem.host = undefined;
gem.rooturl = undefined;

//从地址栏判断获得相对路径
gem.getRootUrl = function() {
    var url = window.location.href;
    var p = url.indexOf('_pages');
    var res;
    if (p != -1) {
        res = url.substr(0, p);
    } else {
        p = url.indexOf('index');
        if (p != -1) {
            res = url.substr(0, p);
        } else {
            res = url + '/';
        }
    };
    return res;
};
gem.rooturl = gem.getRootUrl();

var host = window.location.host;
console.log(host,'this is host');
if (host.indexOf('test')>-1) {
    gem.host = '/';
    gem.apiprefix = "/project/index.php/api/";
} else {
    gem.host = '/';
    gem.apiprefix = "/project/index.php/api/";
    //baidu统计
    //var _hmt = _hmt || [];
    //(function() {
    //    var hm = document.createElement("script");
    //    hm.src = "//hm.baidu.com/hm.js?8ee36023607c8d49f11be6261bac25e1";
    //    var s = document.getElementsByTagName("script")[0];
    //    s.parentNode.insertBefore(hm, s);
    //    console.log('baidu analysis done!');
    //})();
};


//所有页面的链接列表
gem._PAGES = {
    //登陆注册
    //http://112.124.2.180/jieminuo/web
    index: '/index.html',
    register: '/old/app.php/register',
    login: '/old/app.php/login',

    //管理页面
    admin: gem.rooturl + '_pages/admin/admin.html',

    //学校页面
    school: gem.rooturl + '_pages/school/school.html',
    schoolAll: gem.rooturl + '_pages/school/schoolAll.html',
    schoolManage: gem.rooturl + '_pages/school/schoolManage.html',

    //班级页面
    class: gem.rooturl + '_pages/class/class.html',
    classOld: 'http://www.geminno.cn/mis/class.html',
    classManage: gem.rooturl + '_pages/class/classManage.html',

    //用户页面
    userHome: gem.rooturl + '_pages/user/userHome.html',
    userCard: gem.rooturl + '_pages/user/ucard.html',
    userContact: gem.rooturl + '_pages/contact/contact.html',
    userNotice: gem.rooturl + '_pages/contact/notice.html',
    userProfile: 'http://www.geminno.cn/old/settings/',
    userHome: gem.rooturl + '_pages/userhome/userhome.html',

    //项目页面
    project: gem.rooturl + '_pages/projectbrief/projectbrief.html',
    projectBrief: gem.rooturl + '_pages/projectbrief/projectbrief.html',
    projectAll: gem.rooturl + '_pages/allprojects/allprojects.html',
    projectEdit: gem.rooturl + '_pages/misold/projectedit.html',
    projectEditM: gem.rooturl + '_pages/project/projecteditm.html',
    generateTest:gem.rooturl + '_pages/misold/projecttestpaper.html',
    generateReport:gem.rooturl + '_pages/misold/projectreportpaper.html',
//    projectEdit: 'http://www.geminno.cn/mis/projectedit.html',

    //进度页面
    schedule: gem.rooturl + '_pages/schedule/schedule.html',

    //讲师页面
    teacher: gem.rooturl + '_pages/teacher/teacher.html',

    //召集令页面
    scollection: gem.rooturl + '_pages/scollection/scollection.html',

    //课程页面
    course: gem.rooturl + '_pages/course/course.html',
    courseAll: gem.rooturl + '_pages/courseroom/courseroom.html',
    courseLesson: gem.rooturl + '_pages/course/courseAll.html',

    //论坛页面
    forum: gem.rooturl + '_pages/forum/forum.html',

    //问题库页面
    faqList: gem.rooturl + '_pages/faq/faqDetails.html',
    faqL:gem.rooturl+'_pages/faq/faqList.html',

    //商品页面
    goods: gem.rooturl + '_pages/goods/goods.html',
    goodsAdmin: 'http://www.geminno.cn/_pages/misold/goodsadmin.html',

    //金币相关
    goldReport: 'http://www.geminno.cn/_pages/misold/goldreport.html',


    //综合其他
    help: gem.rooturl + '_pages/static/help.html',
    aboutUs: gem.rooturl + '_pages/static/aboutUs.html',
    guideTeacher: gem.rooturl + '_pages/static/guideTeacher.html',
    guideUser: gem.rooturl + '_pages/static/guideUser.html',

};


//获取页面设置的模版属性值，ele应使用$element
//这些值都设定在模版父层<div ng-include='aa' name='jack'>，得到{ng-include:'aa',name:'jack'}
gem.getParentAttrs = function(ele) {
    var res = {};
    if (ele && ele[0] && ele.parent()[0]) {
        var attrs = ele.parent()[0].attributes;
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            res[attr.name] = attr.value;
        };
    };
    return res;
};
gem.getSelfAttrs = function(ele) {
    var res = {};
    if (ele[0]) {
        var attrs = ele.attributes;
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            res[attr.name] = attr.value;
        };
    };
    return res;
};


//地址栏解析,获取地址栏传进来的数据
gem.getUrlVals = function(url) {
    if (!url) url = window.location.href;
    var paras = {};
    var strarr = url.split("?");
    var parr = [];
    if (strarr.length > 1) {
        parr = strarr[1].split("&");
    }
    parr.forEach(function(v, i) {
        var ar = v.split("=");
        if (ar.length > 1) {
            paras[ar[0]] = ar[1];
        }
    });
    return paras;
}
gem.urlVals = gem.getUrlVals();


//根据属性获得指定父层
gem.tar = function(e, attr, val) {
    if (attr == undefined) attr = "id";
    if (val) {
        var tar = $(e.target);
        if (tar.attr(attr) != val) {
            tar = $(tar.parents("[" + attr + "='" + val + "']")[0]);
        }
    } else {
        if (tar.attr(attr) != val) {
            tar = $(tar.parents("[" + attr + "']")[0]);
        }
    }
    return tar;
};



//将字符串转为json，如果失败不报错，返回null
gem.parseJSON = function(str) {
    var jsn;
    try {
        jsn = JSON.parse(str);
    } catch (e) {
        console.log("数据格式转换失败:" + str.substr(0, 128));
    }
    return jsn;
}



//根据id选择随机主题颜色
gem.themeclrarr = ['#1C758A', '#94424F', '#B77033', '#AD3434', '#437A39', '#644172', '#218270'];
gem.getthemeclr = function(n) {
    var res = gem.themeclrarr[0]
    if (!n) return res;
    res = gem.themeclrarr[n % gem.themeclrarr.length];
    return res;
};

//根据id选择随机主题图片
gem.themeimgarr = [
    gem.rooturl + '_imgs/themeimg1.png',
    gem.rooturl + '_imgs/themeimg2.png',
    gem.rooturl + '_imgs/themeimg3.png',
    gem.rooturl + '_imgs/themeimg4.png',
    gem.rooturl + '_imgs/themeimg5.png',
    gem.rooturl + '_imgs/themeimg6.png',
    //    gem.rooturl+'/_imgs/themeimg7.png',
    gem.rooturl + '_imgs/themeimg8.png',
    gem.rooturl + '_imgs/themeimg9.png',
    gem.rooturl + '_imgs/themeimg10.png',
    gem.rooturl + '_imgs/themeimg11.png',
    gem.rooturl + '_imgs/themeimg12.png',
];
gem.getthemeimg = function(n) {
    var res = gem.themeimgarr[0];
    if (!n) return res;
    var ns = String(n);
    res = gem.themeimgarr[Number(ns[ns.length - 1]) % gem.themeimgarr.length];
    return res;
};


//上传文件限制
gem.fileTypes = {
    all: '.xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf,.png,.jpg,.gif,.zip,.rar',
    pic: '.png,.jpg,.gif,.jpeg',
    file: ".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf,.zip,.rar",
};



//所有可能依赖的css文件
gem.csslib = [{
    name: 'bootstrap',
    url: '//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css',
}, {
    name: 'toastr',
    url: '//cdn.bootcss.com/toastr.js/latest/css/toastr.min.css',
}, {
    name: 'magnific-popup',
    url: '//cdn.bootcss.com/magnific-popup.js/1.0.0/magnific-popup.css',
}, {
    name: 'sweetalert',
    url: gem.rooturl + '_jslibs/swal/sweetalert.css',
}, {
    name: 'common',
    url: gem.rooturl + '_css/common.css',
}, {
    name: 'style',
    url: gem.rooturl + '_css/style.css',
}];


//所有可能依赖的js文件
gem.jslib = [{
    name: 'bootstrap',
    url: '//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js',
}, {
    name: 'toastr',
    url: '//cdn.bootcss.com/toastr.js/latest/js/toastr.min.js',
}, {
    name: 'magnific-popup',
    url: '//cdn.bootcss.com/magnific-popup.js/1.0.0/jquery.magnific-popup.min.js',
}, {
    name: 'sweetalert',
    url: gem.rooturl + '_jslibs/swal/sweetalert.min.js',
}];


//所有可能的依赖库module
gem.moduleLib = [{
    name: 'ui.bootstrap',
    url: '//cdn.bootcss.com/angular-ui-bootstrap/0.13.4/ui-bootstrap-tpls.min.js',
}, {
    name: 'LocalStorageModule',
    url: '//cdn.bootcss.com/angular-local-storage/0.2.2/angular-local-storage.min.js',
}, {
    name: 'ngLocale',
    url: gem.rooturl + '_jslibs/angular-locale_zh.js'
}, {
    name: 'sun',
    url: gem.rooturl + '_jslibs/sun/basics.js'
}];


//初始化整个页面
//前提是jquery和angular已经存在
//自动载入所有css和js，初始化app
gem.initPage = function(midAngularFn, beforeAngularFn, afterAngularfn) {
    //兼容已有，防止angualr自动初始化，去除ng-app标签
    var jo = $('[ng-app]');
    jo.removeAttr('ng-app');

    //所有需要载入的css,js,module库
    var filearr = [];
    gem.csslib.forEach(function(one, i) {
        filearr.push(one.url);
    });
    gem.jslib.forEach(function(one, i) {
        filearr.push(one.url);
    });
    gem.moduleLib.forEach(function(one, i) {
        filearr.push(one.url);
    });

    //载入文件
    gem.loadFiles(filearr, function() {
        angular.element(document).ready(function() {
            //初始化angular
            if (beforeAngularFn) beforeAngularFn();
            var app = gem.initApp();
            if (midAngularFn) midAngularFn();
            angular.bootstrap(document, ['app']);
            if (afterAngularfn) afterAngularfn();
        });
    });
};




//初始化app的同步版本，自动载入所有的依赖库和需要的文件
//由于css文件是即时的，所以不考虑是否载入完成
gem.loadModules = function(okfn) {
    //先自动检查需要的依赖是否已经载入
    var farr = [];
    gem.moduleLib.forEach(function(one, i) {
        var isready = false;
        try {
            var isok = angular.module(one.name);
            if (isok) {
                isready = true;
            };
        } catch (err) {};
        if (!isready) {
            farr.push(one.url);
        }
    });
    //自动载入缺失的modules
    gem.loadFiles(farr, okfn);
};


//载入一个外部文件队列，然后执行一个函数
gem.loadFiles = function(arr, okfn, n) {
    if (n == undefined) n = 0;
    //最后一次执行完成函数
    if (n >= arr.length) {
        okfn();
        return;
    }
    //载入第n个文件
    var url = arr[n];
    var ext = gem.getFileExt(url);
    if (ext == 'js') {
        //载入完成后跳下一个
        n++;
        jQuery.getScript(url, function() {
            gem.loadFiles(arr, okfn, n);
        });
    } else if (ext == 'css') {
        //直接插入到页面head，然后跳下一个
        gem.loadCss(url);
        n++;
        gem.loadFiles(arr, okfn, n);
    } else {
        //css,js以外的文件不处理，跳下一个
        n++;
        gem.loadFiles(arr, okfn, n);
    };
};

//载入css单独函数,只是插入到head，不做其他处理
gem.loadCss = function(url) {
    $("<link>").attr({
        rel: "stylesheet",
        type: "text/css",
        href: url,
    }).appendTo("head");
};



//初始化angular设置的函数，app如果为空则自动创建
//包含$rootScope各种通用变量和函数，post格式设置等
gem.initApp = function(app) {

    //自动判断哪些module是html里面已经载入完成的
    var depModules = [];

    gem.moduleLib.forEach(function(one, i) {
        var isready = false;
        try {
            isready = angular.module(one.name);
            if (isready) {
                depModules.push(one.name);
            };
        } catch (err) {};
    });
    console.log('Default app inject modules:', depModules);

    //如果不存在自动创建并在底部返回这个app
    if (!app) {
        app = angular.module('app', depModules);
    };
    if (!app) return;

    //为引入模板做设定
    app.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        //app.controller = $controllerProvider.register;
        //app.service = $provide.service;
        //app.factory = $provide.factory;
        //app.directive = $compileProvider.directive;
        //app.filter = $filterProvider.register;
    });

    //初始化$rootScope变量和函数
    app.run(function($rootScope, $location, $anchorScroll) {
        //设置提示位置
        gem.setToastr();


        //常用变量
        $rootScope.rooturl = gem.rooturl;
        $rootScope._PAGES = gem._PAGES;
        $rootScope.tmpParas = {};
        $rootScope.apiprefix = gem.apiprefix;
        $rootScope.winwid = window.innerWidth;
        $rootScope.winhei = window.innerHeight;
        $rootScope.bodyScroll = 'auto';

        //顶部底部导航
        $rootScope.baseTopUrl = $rootScope.rooturl + '_controllers/base/baseTop.html';
        $rootScope.baseBotUrl = $rootScope.rooturl + '_controllers/base/baseBot.html';


        //默认的主题图和主体颜色
        $rootScope.getthemeclr = gem.getthemeclr;
        $rootScope.themeclr = $rootScope.getthemeclr();
        $rootScope.getthemeimg = gem.getthemeimg;
        //$rootScope.themeimg=$rootScope.getthemeimg();


        //显示警告框，msg可以是一个字符串，也可以是一个swal设置对象
        $rootScope.swal = function(msg) {
            swal(msg);
        };

        //显示或隐藏提示
        $rootScope.hideToast = function() {
            toastr.clear();
        };
        $rootScope.removeToast = function() {
            toastr.remove();
        };
        $rootScope.showToast = function(str, type, sec) {
            gem.setToastr();
            if (!sec) sec = 3;
            toastr.options.timeOut = sec * 1000;
            switch (type) {
                case 'warn':
                    toastr.warning(str);
                    break;
                case 'err':
                    toastr.error(str);
                    break;
                case 'note':
                    toastr.info(str);
                    break;
                case 'ok':
                    toastr.success(str);
                    break;
                default:
                    toastr.info(str);
            };
        };

        $rootScope.chatToast = function(str,type,sec){
            gem.setToastr();
            toastr.options.positionClass = 'toast-top-right';
            if (!sec) sec = 3;
            toastr.options.timeOut = sec * 1000;
            switch (type) {
                case 'warn':
                    toastr.warning(str);
                    break;
                case 'err':
                    toastr.error(str);
                    break;
                case 'note':
                    toastr.info(str);
                    break;
                case 'ok':
                    toastr.success(str);
                    break;
                default:
                    toastr.info(str);
            };
        };


        //设置单个图片弹窗功能，依赖于magnific-popup库
        //数据填充之后调用,必须传递$event参数进来
        //元素必须有href属性，指向需要弹出的图片
        //items：对象{src:'..url..',title:'标题'}
        $rootScope.setPicPop = function($event, items) {
            var jo = gem.tar($event, 'ng-click', '$root.setPicPop($event)');
            if (jo[0] && !jo.attr('_hasSetPop')) {
                var its;
                if (items) {
                    its = items;
                } else {
                    if (jo && jo.attr('href') && jo.attr('href') != '') {
                        its = {
                            src: jo.attr('href'),
                        };
                    }
                }
                if (!its && !its.url && its.url == '') {
                    return;
                }

                jo.magnificPopup({
                    items: its,
                    type: 'image'
                });
                jo.attr('_hasSetPop', true);
                setTimeout(function() {
                    jo.click();
                    jo.attr('_hasSetPop', false);
                }, 100);
            };
        };

        //设置画廊（多个图片）的弹窗功能，依赖于magnific-popup库
        //数据填充之后调用,必须传递$event参数进来
        //如果不使用items，那么元素的兄弟元素必须有href属性，指向需要弹出的图片
        //items：数组[{src:'..url..',title:'标题'}]
        $rootScope.setGalleryPop = function($event, items) {
            var jo = gem.tar($event, 'ng-click', '$root.setGalleryPop($event)');
            if (jo[0] && !jo.attr('_hasSetPop')) {
                var its = [];
                if (items) {
                    its = items;
                } else {
                    jo.parent().children().each(function(i, one) {
                        var cjo = $(one);
                        if (cjo.attr && cjo.attr('href') && cjo.attr('href') != '') {
                            its.push({
                                src: cjo.attr('href'),
                                title: cjo.attr('title'),
                            });
                        };
                    });
                };


                //调整当前位置
                var id = jo.parent().children().index(jo[0]);
                for (var i = 1; i < id; i++) {
                    var tmp = its[0];
                    its.shift();
                    its.push(tmp);
                };
                if (!its.length) {
                    return;
                }

                jo.magnificPopup({
                    items: its,
                    gallery: {
                        enabled: true,
                    },
                    type: 'image'
                });
                jo.attr('_hasSetPop', true);
                setTimeout(function() {
                    jo.click();
                    jo.attr('_hasSetPop', false);
                }, 100);
            };
        };

        //显示与隐藏弹窗,需要jquery支持;
        //弹窗关闭后悔自动尝试hidePopFn，使用完清空
        $rootScope.hidePop = function() {
            $rootScope.popUrl = undefined;
            $('body').css('overflow-y', 'auto');
            if ($rootScope.hidePopFn) {
                $rootScope.hidePopFn();
                $rootScope.hidePopFn = undefined;
            };
            $rootScope.bodyScroll = 'auto';
        };

        //opt为需要预先写入的属性参数
        //如果需要关闭pop时候执行简单回调，请设置fn,这个fn将被hidePop函数执行
        //如果需要复杂的回调，则应该与模板协调一致通过opt传递参数进去
        //$event，如果提供这个参数，将合并按钮属性attr到opt
        $rootScope.showPop = function(tmpurl, opt, fn) {
            if (fn && typeof(fn) == 'function') {
                $rootScope.hidePopFn = fn;
            };
            var tmp = gem.getTmpName(tmpurl);
            $rootScope.tmpParas[tmp] = opt;
            $rootScope.bodyScroll = 'hidden';
            $rootScope.popUrl = tmpurl;
            $('body').css('overflow-y', 'hidden');
            gem.applyScope($rootScope);
        };


        //安全更新
        $rootScope.applyScope = gem.applyScope;



        //默认的上传文件处理，存入$root.uploaded[btn.attr('id')],如果没有id则直接存入$root.uploaded._arr
        $rootScope.uploaded = {};
        $rootScope.uploaded._arr = [];
        $rootScope.uploadOk = function(jsn, tarjo) {
            var id;
            if (tarjo) id = tarjo.attr('id')
            if (!id || id == '') id = '_arr';
            if (!$rootScope.uploaded[id]) $rootScope.uploaded[id] = [];
            $rootScope.uploaded[id].push(jsn.data);
            $rootScope.$apply();
        };




        //滚动到本页的锚点id
        $rootScope.rollto = function(id) {
            $location.hash(id);
            $anchorScroll();
        }



        //上传文件,resfn(jsn,tarjo)如果不指定则使用$rootScope.uploadOk,
        //type=0不限定，=1限图片，2限文件，参照gem.fileTypes
        $rootScope.uploadFile = function(type, event, resfn) {
            var tarjo;
            if (event) tarjo = $(event.target);
            if (!type) type = 0;
            var filetypes;
            switch (type) {
                case 0:
                    filetypes = gem.fileTypes.all;
                    break;
                case 1:
                    filetypes = gem.fileTypes.pic;
                    break;
                case 2:
                    filetypes = gem.fileTypes.file;
                    break;
                default:
                    filetypes = gem.fileTypes.all;
                    break;
            };

            //检查容器form如果没有就创建一个
            var formbox = $('#uploadformbox');
            if (!formbox[0]) {
                formbox = $('<div id="uploadformbox" style="display:none"></div>');
                $('body').prepend(formbox);
            };

            var formtmp = $("<form id='formtmp' method='post' enctype='multipart/form-data'>");
            formtmp.attr('action', gem.apiprefix + 'common/uploadfile');
            formtmp.css('display', 'none');
            var selbtn = $("<input id='selbtn' type='file' name='filedata'>");
            selbtn.attr("accept", filetypes);
            var sendbtn = $("<input id='sendbtn' type='submit'>");
            selbtn.appendTo(formtmp);
            sendbtn.appendTo(formtmp);
            formbox.append(formtmp);
            selbtn.click();



            //自动开始上传
            selbtn.change(function() {
                //检查容器iframebox,如果没有就创建一个
                var iframebox = $('#uploadiframebox');
                if (!iframebox[0]) {
                    iframebox = $('<div id="uploadiframebox" style="display:none"></div>');
                    $('body').append(iframebox);
                };

                //创建临时的iframe
                var ifname = "uploadiframe" + Number(new Date());
                var iframe = $("<iframe>...uploading...</iframe>");
                iframe.attr("id", ifname);
                iframe.attr("name", ifname);
                iframebox.append(iframe);
                formtmp.css('display', 'none');
                formtmp.attr("target", ifname);
                //添加iframe载入完成的监听
                iframe.load(function() {
                    var contents = $(this).contents().get(0);
                    var data = $(contents).find('body').text();
                    var jsn = gem.parseJSON(data);
                    iframe.remove();

                    if (!jsn) {
                        $rootScope.showToast('数据格式转换失败，请重新上传', 'err', 5);
                    } else if (jsn.code !== 1) {
                        $rootScope.showToast('数据格式转换失败:' + jsn.text, 'err', 5);
                    } else {
                        if (resfn) {
                            resfn(jsn, tarjo);
                            console.log('resfn!');
                        }else{
                            console.log('uploadOk!');
                            $rootScope.uploadOk(jsn, tarjo);
                        }
                    };
                });
                sendbtn.focus();
                sendbtn.click();
                formtmp.remove();
            });

        };
        //----
    });




    //头部控制器
    app.controller('head', function($scope) {
        //--保留函数
    });

    //主体控制器
    app.controller('body', function($scope, $rootScope) {
        //--保留函数
    });

    //初始化设置post的json格式
    app.config(function($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        $httpProvider.defaults.transformRequest = [

            function(data) {
                var param = function(obj) {
                    var query = '';
                    var name, value, fullSubName, subName, subValue, innerObj, i;

                    for (name in obj) {
                        value = obj[name];

                        if (value instanceof Array) {
                            for (i = 0; i < value.length; ++i) {
                                subValue = value[i];
                                fullSubName = name + '[' + i + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value !== undefined && value !== null) {
                            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                        }
                    }
                    return query.length ? query.substr(0, query.length - 1) : query;
                };
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }
        ];
    });

    //返回app，即使没有传app进来也能创建app
    return app;
};



gem.applyScope = function(scp) {
    if (scp) {
        if (scp.$root.$$phase != '$apply' && scp.$root.$$phase != '$digest') {
            scp.$apply();
        };
    };
};

//配置toastr

gem.setToastr = function() {
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.hideDuration = 200;
    toastr.options.closeEasing = 'swing';
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.closeMethod = 'slideUp';
    toastr.options.showDuration = 200;
    toastr.options.preventDuplicates = false;
    toastr.options.progressBar = false;
    toastr.options.escapeHtml = false;
    toastr.options.positionClass = 'toast-bottom-full-width';
    toastr.options.closeButton = false;
}

//所有技术方向，需要手工修改与后台同步
gem.tecdires = {
    i0: "未知",
    iall: "所有技术方向",
    i101: "C语言",
    i201: "C++",
    i301: "JAVA",
    i401: ".net",
    i501: "C#",
    i601: "Android",
    i701: "iOS",
    i801: "WindowsPhone",
    i901: "Web(html+JS+CSS)",
    i1001: "PHP",
    i1101: "Unity3D",
    i1201: "Swift",
    i1301: "Photoshop",
    i1401: "SQL(MySQL)",
    i1501: "Python",
    i1601: "Office",
    i1701: "Linux(Ubuntu)",
    i1801: "Windows(Server)",
    i1901: "MacOS",
    i2000: "其他",
};
gem.tecdirs = gem.tecdires;

//项目状态，需要手工修改与后台同步
gem.pstates = {
    iall: {
        txt: "全部状态",
        val: "all",
    },
    i0: {
        txt: "未知",
        val: "0",
    },
    i1: {
        txt: "草稿",
        val: "1",
    },
    i2: {
        txt: "待审",
        val: "2",
    },
    i6: {
        txt: "立项",
        val: "6",
    },
    i3: {
        txt: "过审",
        val: "3",
    },
    i4: {
        txt: "发布",
        val: "4",
    },
    i5: {
        txt: "关闭",
        val: "5",
    }
};

//项目发布状态，需要手工修改与后台同步
gem.pubstates = {
    iall: {
        txt: "全部",
        val: "all",
    },
    i0: {
        txt: "无",
        val: "0",
    },
    i1: {
        txt: "推荐",
        val: "1",
    },
    i2: {
        txt: "最热",
        val: "2",
    },
    i3: {
        txt: "最新",
        val: "3",
    }
};




//经验能量等级相关
gem.explvstep = [0, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600];
gem.explvtags = ["无名", "菜鸟", "艺人", "工匠", "师傅", "大师", "国师", "大王", "吾皇", "皇太极"];
gem.manalvstep = [0, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600];
gem.manalvtags = ["无名", "学渣", "学酥", "学民", "学痞", "学霸", "学圣", "学神", "学魔", "学仙"];
gem.getexplevel = function(num) {
    var lv = 0;
    for (var i = 0; i < gem.explvstep.length; i++) {
        if (num > gem.explvstep[i]) {
            lv = i;
        }
    }
    return lv;
};
gem.getmanalevel = function(num) {
    var lv = 0;
    for (var i = 0; i < gem.explvstep.length; i++) {
        if (num > gem.getmanalevel[i]) {
            lv = i;
        }
    }
    return lv;
};
gem.getmanalevel = getexprat = function(num) {
    var lv = zh.getexplevel(num);
    var rat = 0;
    if (lv + 1 < gem.explvstep.length) {
        rat = (num - gem.explvstep[lv]) / (gem.explvstep[lv + 1] - gem.explvstep[lv]);
    } else {
        rat = 1;
    }
    return rat;
};
gem.getmanarat = function(num) {
    var lv = gem.getmanalevel(num);
    var rat = 0;
    if (lv + 1 < gem.manalvstep.length) {
        rat = (num - gem.manalvstep[lv]) / (gem.manalvstep[lv + 1] - gem.manalvstep[lv]);
    } else {
        rat = 1;
    }
    return rat;
};
gem.getexptag = function(num) {
    return (gem.explvtags[gem.getexplevel(num)]);
}
gem.getmanatag = function(num) {
    return (gem.manalvtags[gem.getmanalevel(num)]);
};

//用户权限
gem.powers = {
    visitor: 0,
    user: 1,
    grpuser: 2,
    author: 3,
    assistant: 4,
    master: 5,
    admin: 6,
};
gem.getpower = function(jsnobj, user) {
    var pwr = 0;
    var pwrcfg = gem.power;

    if (user == undefined) {
        return pwr;
    } else {
        pwr = 1;
    }
    //admin
    if (user.id == 1) return gem.powers.admin;
    //管理员
    var ismst = false;
    if (jsnobj != undefined && jsnobj.masters && jsnobj.masters.forEach) {
        jsnobj.masters.forEach(function(one, i) {
            if (one.id == user.id || one == user.id) {
                ismst = true;
            };
        });
    };
    if (ismst) return gem.powers.master;
    //助理
    var isassis = false;
    if (jsnobj.assistants != undefined && jsnobj.assistants.forEach != undefined) {
        jsnobj.assistants.forEach(function(one, i) {
            if (one.id == user.id) {
                isassis = true;
            };
        });
    }
    if (isassis) return gem.powers.assistant;
    //作者
    if (jsnobj.author && user.id == jsnobj.author.id) return gem.powers.author;
    if (jsnobj.authorid && user.id == jsnobj.authorid) return gem.powers.author;
    //成员
    var ingrp = false;
    if (jsnobj.users) {
        jsnobj.users.forEach(function(one, i) {
            if (one.id == user.id) {
                ingrp = true;
            };
        });
    };
    if (jsnobj.userids) {
        if (jsnobj.userids.indexOf(user.id) != -1) {
            ingrp = true;
        };
    };
    if (ingrp) return gem.powers.grpuser;
    return pwr;
};


//时间和日期相关----------------
//将日期对象转为指定格式字符串
gem.formatDate = function(dt, formatStr) {
    if (!dt) dt = new Date();
    if (dt.constructor != Date) {
        dt = gem.getDate(dt);
    };
    if (!formatStr) formatStr = 'YYYY-MM-DD hh:mm:ss';
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, dt.getFullYear());
    str = str.replace(/yy|YY/, (dt.getYear() % 100) > 9 ? (dt.getYear() % 100).toString() : '0' + (dt.getYear() % 100));
    str = str.replace(/MM/, dt.getMonth() > 9 ? (dt.getMonth() + 1).toString() : '0' + (dt.getMonth() + 1));
    str = str.replace(/M/g, dt.getMonth());
    str = str.replace(/w|W/g, Week[dt.getDay()]);
    str = str.replace(/dd|DD/, dt.getDate() > 9 ? dt.getDate().toString() : '0' + dt.getDate());
    str = str.replace(/d|D/g, dt.getDate());
    str = str.replace(/hh|HH/, dt.getHours() > 9 ? dt.getHours().toString() : '0' + dt.getHours());
    str = str.replace(/h|H/g, dt.getHours());
    str = str.replace(/mm/, dt.getMinutes() > 9 ? dt.getMinutes().toString() : '0' + dt.getMinutes());
    str = str.replace(/m/g, dt.getMinutes());
    str = str.replace(/ss|SS/, dt.getSeconds() > 9 ? dt.getSeconds().toString() : '0' + dt.getSeconds());
    str = str.replace(/s|S/g, dt.getSeconds());
    return str;
};




//从字符串获取日期对象
gem.getDate = function(str) {
    if (str.constructor == String) {
        return (new Date(Date.parse(str)));
    } else if (str.constructor == Number) {
        return (new Date(str));
    } else {
        return (new Date());
    };
};
//从日期对象获取字符串时间
gem.getStr = function(dt) {
    return gem.formatDate(dt);
};
//获取两个日期对象的时间差
gem.getDist = function(tomor, yest) {
    var d1 = tomor;
    var d2 = yest;
    var dt1;
    var dt2;
    if (typeof(d1) == "string") {
        dt1 = gem.getDate(d1);
    } else {
        dt1 = d1;
    };
    if (typeof(d2) == "string") {
        dt2 = gem.getDate(d2);
    } else {
        dt2 = d2;
    };
    var obj = {};

    if (dt1 != "Invalid Date" && dt2 != "Invalid Date") {
        var dist = dt1 - dt2;
        obj = {
            year: 0,
            month: 0,
            week: 0,
            day: 0,
            hour: 0,
            minute: 0,
            absyear: 0,
            absmonth: 0,
            absweek: 0,
            absday: 0,
            abshour: 0,
            absminute: 0,
        };
        obj.absyear = (dist / (1000 * 3600 * 24 * 365)).toFixed(1);
        obj.absmonth = (dist / (1000 * 3600 * 24 * 30)).toFixed(1);
        obj.absweek = (dist / (1000 * 3600 * 24 * 7)).toFixed(1);
        obj.absday = (dist / (1000 * 3600 * 24)).toFixed(1);
        obj.abshour = (dist / (1000 * 3600)).toFixed(1);
        obj.absminute = (dist / (1000 * 60)).toFixed(1);

        obj.year = Math.floor(dist / (1000 * 3600 * 24 * 365));
        dist -= obj.year * 1000 * 3600 * 24 * 365;
        obj.month = Math.floor(dist / (1000 * 3600 * 24 * 30));
        dist -= obj.month * 1000 * 3600 * 24 * 30;
        obj.week = Math.floor(dist / (1000 * 3600 * 24 * 7));
        dist -= obj.week * 1000 * 3600 * 24 * 7;
        obj.day = Math.floor(dist / (1000 * 3600 * 24));
        dist -= obj.day * 1000 * 3600 * 24;
        obj.hour = Math.floor(dist / (1000 * 3600));
        dist -= obj.hour * 1000 * 3600;
        obj.minute = Math.floor(dist / (1000 * 60));
    }
    return obj;
};

//将一个数字转换成指定位数的字符串
gem.numtostr = function(num, n) {
    var str = String(num);
    var dis = n - str.length;
    if (dis > 0) {
        for (var i = 0; i < dis; i++) {
            str = "0" + str;
        };
    };
    if (dis < 0) {
        str = str.substr(0, n);
    };
    return str;
};

//从一个数组里面随机抽取
gem.genRandArr = function(totalcount, randcount, repeat) {
    var arr = [];
    var arrtmp = [];
    for (var i = 0; i < totalcount; i++) {
        arrtmp.push(i);
    };
    if (randcount >= totalcount || repeat == true) {
        //肯定会重复
        for (var i = 0; i < randcount; i++) {
            var rd = Math.floor(Math.random() * totalcount);
            arr.push(rd);
        };
    } else {
        for (var i = 0; i < randcount; i++) {
            var rd = Math.floor(Math.random() * arrtmp.length);
            arr.push(arrtmp[rd]);
            arrtmp.splice(rd, 1);
        };
    }
    return arr;
}

//以href的链接模式在新窗口打开链接;即使禁止弹窗也可以打开
gem.openurl = function(url) {
    var randid = "zclickatagtemp" + Number(new Date());
    var ele = document.createElement('a');
    ele.href = url;
    ele.style.display = 'none';
    console.log('a click!');
    ele.id = randid;
    ele.target = '_blank';
    ele.innerHTML = randid;
    document.body.appendChild(ele);
    document.getElementById(randid).click();
};


//拼合分享链接
gem.buildshareurl = function(shareto, title, url) {
    if (title == undefined) title = $('head').find("title").html();
    if (url == undefined) url = "http://www.geminno.cn";

    var strp = "title=" + title + "&url=" + url;
    var str;
    if (shareto == "weibo") {
        str = "http://service.weibo.com/share/share.php?" + strp;
        return str;
    };
    if (shareto == "qzone") {
        str = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + strp + "&summary=杰米诺大家庭欢迎你！赶紧分享加入吧！！！";
        return str;
    };
    if (shareto == "qq") {
        str = "http://connect.qq.com/widget/shareqq/index.html?" + strp;
        return str;
    };
    str = shareto + strp;
    return str;
};

//将json格式化成html显示的字符串
gem.formatJson = function(json) {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    //PADDING = '&#09;&#09;&#09;&#09';

    //括号前添加回车
    reg = /([\{\}])/g;
    json = json.replace(reg, '<br>$1<br>');

    //括号后添加回车
    reg = /([\[\]])/g;
    json = json.replace(reg, '<br>$1<br>');

    //逗号后添加回车
    reg = /(\,)/g;
    json = json.replace(reg, '<br>$1<br>');

    //清理多余的回车
    reg = /(<br><br>)/g;
    json = json.replace(reg, '<br>');

    //清理逗号前的回车
    reg = /<br>\,/g;
    json = json.replace(reg, ',');

    //其他格式化
    reg = /\:<br>\{/g;
    json = json.replace(reg, ':{');
    reg = /\:<br>\[/g;
    json = json.replace(reg, ':[');
    reg = /\:/g;
    json = json.replace(reg, ': ');

    //清理逗号前的回车
    reg = /],<br>}/g;
    json = json.replace(reg, '],}');
    reg = /},<br>,}/g;
    json = json.replace(reg, '},}')

    $.each(json.split('<br>'), function(index, node) {
        var i = 0,
            indent = 0,
            padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '<br>';
        pad += indent;
    });

    reg = /<br>(&nbsp;)*(\s)*<br>/g;
    formatted = formatted.replace(reg, '<br>');

    return formatted;
};

//去除两端的空格
gem.fmtTitle = function(str) {
    var newstr = '';
    if (str) {
        newstr = str.replace(/(^\s*)|(\s*$)/g, '');
    };
    return newstr;
};

//获取模板名，模板名称中间不能有点'.'连接
gem.getTmpName = function(url) {
    var spindex = url.lastIndexOf('/');
    var f;
    if (spindex != -1) {
        f = url.substr(spindex + 1);
    } else {
        f = url;
    };
    var dtindex = f.indexOf('.');
    var res;
    if (dtindex != -1) {
        res = f.substr(0, dtindex);
    } else {
        res = f;
    };
    return res;
};


//合并两个对象,base对象将被cover覆盖,如果base为空自动创建
//默认不覆盖
gem.mergeObjs = function(base, cover, override) {
    if (!override) override = false;
    if (!base) base = {};
    for (var k in cover) {
        if (override) {
            base[k] = cover[k];
        } else {
            if (!base[k] || base[k] == '') {
                base[k] = cover[k];
            }
        };
    };
    return base;
};


//获取url文件类型
gem.getFileExt = function(url) {
    var arr = url.split('.');
    var ext = arr[arr.length - 1].replace(' ', '');
    return ext;
};

//