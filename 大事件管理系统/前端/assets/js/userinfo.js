$(function(){
    // 初始化用户信息
    initUserInfo()
    //事件响应处理
    eventHandler()    

    const form = layui.form
    // 表单校验
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
              return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
              return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
              return '用户名不能全为数字';
            }
            
            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if(value === 'xxx'){
              alert('用户名不能为敏感词');
              return true;
            }
          }
    })

})
// 初始化用户信息
function initUserInfo(){
    const form = layui.form
const getData = JSON.parse(atob(localStorage.getItem('info')))
form.val('userinfo_form',{
    username:getData.user || getData.username,
    nickname:getData.nickname,
    email:getData.email
})
// console.log(getData)
}

  //事件响应处理
function eventHandler(){
    const form = layui.form
    // 提交修改
$('.userinfo_form').submit(function(e){
    e.preventDefault()
    const data = form.val('userinfo_form')
    // console.log('-----------')
    // console.log(data)
    $.ajax({
        type:'post',
        url:'/my/updateinfo',
        data,
       success:function(res){
        if(res.status === 0){
        layui.layer.msg(res.message)
        localStorage.setItem('info', btoa(JSON.stringify(data)))
        window.parent.renderAvatar(data)
        }
        // console.log(res)
       }
    })
})
// 重置按钮
$('.userinfo_form [type=reset]').on('click',function(e){
    e.preventDefault()
    initUserInfo()
})
}
