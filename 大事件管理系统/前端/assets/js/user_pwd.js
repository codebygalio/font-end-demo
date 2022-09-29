$(function(){
    verifyForm()
    eventHandler()
})
// 验证表单
function verifyForm(){
    layui.form.verify({
      pass: [
          /^[\s\S]{6,12}$/
          ,'密码必须6到12位'
        ],
        repass:function(value, item){
          if($('.pwd-form [name=newPwd]').val() !== value){
            return '两次密码不一致'
          }
          if($('.pwd-form [name=oldPwd]').val() === value){
            return '新旧密码不能相同'
          }
        } 
      });     
}
// 事件处理
function eventHandler(){
    $('.pwd-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:layui.form.val('pwd-form'),
            success:function(res){
                if(res.status === 0){
                    layui.layer.msg(res.message)
                    $('.pwd-form')[0].reset()
                }
            }
        })
    })
}