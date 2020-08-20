// 为了简单的操作大量地址的拼接，根据他有一个特定的函数，提取出来相同的地址链接
// 开发地址
BURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (canshu) {
    // 拼接环境
    canshu.url = BURL + canshu.url;
    console.log(canshu);

    // 对需要权限的接口配置头信息
    // 必须以my开头才行
    if (canshu.url.indexOf('/my/') != -1) {
        canshu.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 拦截所有响应，判断身份认证信息
    canshu.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 清空销毁token
            localStorage.removeItem('token');
            // 返回登录页面
            location.href = '/login.html';
        }
    }
})















