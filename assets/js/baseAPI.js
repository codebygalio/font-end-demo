$.ajaxPrefilter(function(options){
    if(options.url.startsWith('/my')){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.url = 'http://127.0.0.1:3007' + options.url
   options.complete = function(res){
    if(res.responseJSON.status == 1 && res.responseJSON.message =='身份认证失败!'){
        localStorage.removeItem('token')
        layui.layer.msg('请重新登录!')
        return setTimeout(function(){location.href = '/login.html'},2500)
    }
   }
   
})