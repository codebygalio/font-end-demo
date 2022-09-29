$(function(){
    initArt()
    initCate()
})
let q = {
    pagenum:1,
    pagesize:2,
    cate_id:'',
    state:''
}
const layer = layui.layer
const form = layui.form
const laypage = layui.laypage

template.defaults.imports.dataFormat = function(date){
    const dt = new Date(date)
    const y = dt.getFullYear()
    const m = padZero(dt.getMonth() + 1)
    const d = padZero(dt.getDate())
    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}
function padZero(n){
    return n <10 ? '0' + n : n
}
// 获得文章列表
function initArt(){
$.ajax({
    type:'get',
    url:'/my/article/list',
    data:q,
    success:function(res){
        // console.log(res)
        if(res.status == 0){
            $('.list-table  tbody').html(template('list-template',res))
        eventHandler()
        randerPage(res.total)
        }
    }
})
}
// 获取分类列表
function initCate(){
    $.ajax({
        type:'get',
        url:'/my/artcate/cates',
        success:function(res){
            console.log(res)
            if(res.status == 0){
               $('[name=cate_id]').html(template('tpl-cate',res))
               form.render('select');
               formEventHandler()
            }
        }
    })
}




// 事件响应处理
function eventHandler(){
    // console.log(total)
    // 删除文章button
    $('.editAndDelete').on('click',':eq(1)',function(){
        console.log($(this).parent().parent().siblings().length)
        // console.log($(this).attr('data-title'))
        layer.confirm(`确定删除文章 ${$(this).attr('data-title')}?`, {icon: 3, title:'提示'}, (index)=>{
            //do something
            // console.log($(this).parent().attr('data-Id'))
            deleteById($(this).parent().attr('data-Id'))
            layer.close(index);
          });
    })

    
     
}
// 渲染分页组件
function randerPage(total){
        // 分页处理
        laypage.render({
          elem: 'pageTotal', //注意，这里的 test1 是 ID，不用加 # 号
          count: total, //数据总数，从服务端得到
          limit:q.pagesize,
          layout:['count','limit','skip','prev', 'page', 'next'],
          limits:[2,1,4,10,100],
          curr:q.pagenum,
          jump: function(obj, first){
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            //   console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            //   console.log(obj.limit); //得到每页显示的条数
              
              //首次不执行
              if(!first){
                  initArt()
                //do something
              }
          }
        });
    
}
// 表单提交
function formEventHandler(){
    $('.form-search').on('submit',function(e){
        // console.log('123456')
        e.preventDefault();
        const cate_id = $('[name=cate_id]').val()
        // console.log(cate_id)
        const state = $('[name=state]').val()
        // console.log(state)
        q = {...q, cate_id, state}
        initArt(q)
        // console.log(q)

    })
}

// 请求  删除文章
function deleteById(Id){
    $.ajax({
        type:'post',
        url:`/my/article/delete/${Id}`,
        success:function(res){
            // console.log(res)
        if(res.status == 0){
            layer.msg(res.message)
        
            if($('.editAndDelete').length <= 1){
                q.pagenum = q.pagenum == 1? 1 : q.pagenum -1
            }
            initArt()
        }
        }
    })
}

