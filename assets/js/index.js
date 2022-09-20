$(function(){
getUserInfo()
eventHandler()
})
function getUserInfo(){
    if(!localStorage.getItem('token')){
        layui.layer.msg('请重新登录!')
    return setTimeout(function(){location.href = '/login.html'},2500)
    }
    $.ajax({
    method:'GET',
    url:'/my/userinfo',
    success: function(res){
        if(res.status == 0){
            renderAvatar(res.data)
        }
    },
})
}

function renderAvatar(user) {
    const name = user.nickname || user.user
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if(!user.user_pic){
        $('.text-avatar').html(name[0].toUpperCase())
       return $('.text-avatar').css({display: 'inline-block'})
    }
    $('.userinfo img').show()
}
function eventHandler(){
    $('.login-out').on('click',function(){
        layer.confirm('确认退出账号?', {icon: 3, title:'提示'}, function(index){
          localStorage.removeItem('token')
          location.href = '/login.html'
            layer.close(index);
          });
    })
}

