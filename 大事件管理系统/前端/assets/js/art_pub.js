$(function(){
    var layer = layui.layer
    var form = layui.form
    // 初始化文章分类select
    initArtCate()
    // 初始化tinymce
    initEditor()
    
  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)












$('#btnChooseImage').on('click',function(){
$('#coverFile').click()
})

$('#coverFile').on('change',function(e){

  // 将文件，转化为路径
   var imgURL = URL.createObjectURL(e.target.files[0])
  //  重新渲染
   $image
     .cropper('destroy') // 销毁旧的裁剪区域
     .attr('src', imgURL) // 重新设置图片路径
     .cropper(options) // 重新初始化裁剪区域
})

$('[name="state"]~').on('click',function(){
  console.log($(this).attr('data-value'))
  $('[name="state"]').attr('value',$(this).attr('data-value'))
})

$('body').on('submit','.article-form',function(e){
  e.preventDefault()
  let fd = new FormData($(this)[0]);
    $image.cropper('getCroppedCanvas', {
    // 创建一个 Canvas 画布
    width: 100,
    height: 100
  }).toBlob(function(blob){
    fd.append('cover_img',blob)
    sendArticle(fd)
  })
})


function sendArticle(fd){
$.ajax({
  type:'post',
  url:'/my/article/add',
  data:fd,
  contentType:false,
  processData:false, 
  success:function(res){
    console.log(res)
    console.log(res.message)
    if(res == 0){
      layer.msg(res.message)
    }
  }
})
}

// 初始化文章分类select
function initArtCate(){
  $.ajax({
    type:'get',
    url:'/my/artcate/cates',
    success:function(res){
        console.log(res)
        if(res.status == 0) {
            $('.article-form [name="cate_id"]').html(template('art_cate',res))
            form.render('select');
        }
    }
  })
}


})

