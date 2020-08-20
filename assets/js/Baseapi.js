// 为了简单的操作大量地址的拼接，根据他有一个特定的函数，提取出来相同的地址链接
// 开发地址
BURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (canshu) {
    // 拼接环境
    canshu.url = BURL + canshu.url;
    console.log(canshu);
})















