$(function(){
 // 获取用户信息   
getUserInfo()
// 事件响应处理
eventHandler()
})
// 获取用户信息
function getUserInfo(){
    // 获取token
    if(!localStorage.getItem('token')){
        layui.layer.msg('请重新登录!')
    return setTimeout(function(){location.href = '/login.html'},2500)
    }
    // 根据token获取用户信息
    $.ajax({
    method:'GET',
    url:'/my/userinfo',
    success: function(res){
        if(res.status == 0){
            // 初始化头像
            renderAvatar(res.data)
            localStorage.setItem('info',btoa(JSON.stringify(res.data))) 
        }
    },
})
}

// 初始化头像
function renderAvatar(user) {
    const name = user.nickname || user.user
    // console.log(name)
    $('#welcome').html('&nbsp;&nbsp;欢迎&nbsp;&nbsp;' + name)
    if(!user.user_pic){
        $('.text-avatar').html(name[0].toUpperCase())
        $('.userinfo img').hide()
       return $('.text-avatar').css({display: 'inline-block'})
    }
    $('.userinfo img').attr({'src':user.user_pic}).show()
}
// 事件响应处理
function eventHandler(){
    $('.login-out').on('click',function(){
        layer.confirm('确认退出账号?', {icon: 3, title:'提示'}, function(index){
          localStorage.removeItem('token')
          location.href = '/login.html'
            layer.close(index);
          });
    })
}

