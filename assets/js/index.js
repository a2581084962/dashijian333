$(function () {
    indexBa();

    // 实现退出功能
    $('#tuichu').on('click', function () {
        layer.confirm('确认是否退出？', { icon: 3, title: '提示' }, function (index) {
            // 清空token
            localStorage.removeItem('token');
            // 跳转登录页
            location.href = '/login.html';
            // 自动关闭弹出层，自带的
            layer.close(index);
        });
    })


})
// 获取基本信息
function indexBa() {
    // 发送ajax
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            // 成功后
            xuanran(res.data);
            // console.log(res);
        },
        // 不论失败还是成功，都会调用complete这个回调函数   → 拦截所有响应，判断身份认证信息
        // complete: function (res) {
        //     // console.log(res);
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         // 清空销毁token
        //         localStorage.removeItem('token');
        //         // 返回登录页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}

// 渲染昵称和用户头像
function xuanran(user) {
    // 获取昵称,用户名优先，没有的话就用登录名
    var name = user.nickname || user.username;
    $('#wenzi').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', 'user.user_pic');
        $('.zi').hide();
    } else {
        $('.layui-nav-img').hide();
        // 获取第一个昵称的首字母，且要大写
        var text = name[0].toUpperCase();
        $('.zi').show().html(text);
    }
}

