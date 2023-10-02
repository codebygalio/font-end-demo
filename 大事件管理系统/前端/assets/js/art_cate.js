$(function(){
    initCate()
    fixedEvent()
})

const layer = layui.layer
const form = layui.form
let dialogIndex = ''

function initCate(callback) {
    // 初始化表格数据
    $.ajax({
        type:'get',
        url:'/my/artcate/cates',
        success:function(res){
            // console.log(res)
        // console.log(template('cate-template',res))
        if(res.status == 0){
            $('.cate_table tbody').html(template('cate-template',res))
            eventHandler()
        }
        }
    })
}
function fixedEvent(){
     // dialog添加类别弹窗
     $('.add_button').click(function(){
        dialogIndex = layer.open({
            type:1,
            area:['500px'],
            title: '添加文章分类'
            ,content: $('#dialog-add').html()
          });     
            
    })
   
    // dialog 新增 确定按钮
    $('body').on('submit','.cate_add_form',function(e){ 
        e.preventDefault()
        req_add_form() 
        
    })

}

function eventHandler(){
   
    // dialog取消按钮
    $('body').on('click','.cate_cancel',function(){
        layer.closeAll()
    })
    
    // dialog 编辑 确定按钮
    $('body').on('submit','.cate_edit_form',function(e){
        // console.log(this)
        e.preventDefault()
        req_update_form()
    })
    // 表格 单个 编辑 按钮
    $('.cate_edit').on('click',function(){
          req_get_form(this.getAttribute('data-id'))
    })

    //删除按钮
    $('.cate_delete').on('click',function(){
        layer.confirm(`确认删除分类名称${this.getAttribute('data-name')}?`, {icon: 3, title:'提示'}, index=>{
            // console.log(this.getAttribute('data-name'))
        deleteById(this.getAttribute('data-id'))
            layer.close(index);
          });
        
    })

}


function deleteById(id){
    $.ajax({
        type:'get',
        url:`/my/artcate/deletecate/${id}`,
        success:function(res){
            console.log(res)
            if(res.status == 0){
                layer.msg(res.message)
                initCate()
            }
        }
    })
}




//根据id获取文章类别
function req_get_form(id){
    $.ajax({
        type:'get',
        url:`/my/artcate/cate/${id}`,
        success:function(res){
            // console.log(res)
            if(res.status == 0){
                dialogIndex = layer.open({
                    type:1,
                    area:['500px'],
                    title: '编辑文章分类'
                    ,content: $('#dialog-edit').html()
                  }); 
                form.val('edit_table_form',res.data[0])       
                // console.log(id)
            }
        },
    })
}

//请求   更新数据
function req_update_form(){
    let data = form.val('edit_table_form')
    // console.log(data)
    $.ajax({
        type:'post',
        url:'/my/artcate/updatecate',
        data,
        success:function(res){
            // console.log(res)
            if(res.status == 0){
                // console.log(dialogIndex)
                layer.msg(res.message)
                layer.close(dialogIndex)
                initCate()
            }
        }
    })

}


// 请求   添加数据
function req_add_form(){
    const data = form.val('add_table_form')
    // console.log(data)
    $.ajax({
        type:'post',
        url:'/my/artcate/addcates',
        data,
        success:function(res){
            // console.log(res)
            if(res.status == 0){
                layer.msg(res.message)
                layer.close(dialogIndex)
                initCate()
            }
        }
    })
}


