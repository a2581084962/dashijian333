$(function () {
    // 点击去登录，隐藏注册区域，显示登录区域
    $('#deng').on('click', function () {
        $('.zhuce').hide();      //hide隐藏  ，show显示
        $('.denglu').show();
    })
    // 点击去注册账号，显示注册区域，隐藏登录区域
    $('#zhu').on('click', function () {
        $('.denglu').hide();
        $('.zhuce').show();
    })
})
// 正则判断
var form = layui.form;
var layer = layui.layer;
form.verify({
    pwd: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
        var pwd = $('.zhuce [name=password]').val();
        if (value != pwd) {
            return '两次密码输入不一致';
        }
    }
})

// 发送  注册的ajax
$('#link_zhuce').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/api/reguser',
        data: {
            username: $('.zhuce [name=username]').val(),
            password: $('.zhuce [name=password]').val(),
        },
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('恭喜您,注册成功！')
            // 清空原来注册的内容
            $('#link_zhuce')[0].reset();
            $('#deng').click();
        }
    })
})

// 发送  登录的ajax
$('#link_deng').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status != 0) {
                return layer.mag(res.message);
            }
            // 成功后
            layer.msg('欢迎,登录成功！');
            location.href = "/index.html";
            // 保存带有token用于有权限接口的身份认证的数据
            localStorage.setItem('token', res.token)
        }
    })
})
