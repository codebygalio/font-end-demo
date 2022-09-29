$.ajaxPrefilter(function(options){
    // 接口开头/my开头的加token
    if(options.url.startsWith('/my')){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // url拼接
    options.url = 'http://127.0.0.1:3007' + options.url
    // 错误处理
   options.complete = function(res){
    if(res.status != 200){
       return layui.layer.msg('error')
    }
    if(res.responseJSON.status == 1 && res.responseJSON.message =='身份认证失败!'){
        localStorage.removeItem('token')
        layui.layer.msg('请重新登录!')
        return setTimeout(function(){location.href = '/login.html'},2500)
    }
    if(res.responseJSON.status == 1){
        return layui.layer.msg(res.responseJSON.message)
    }
   }
   
})