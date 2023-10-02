const path = require('path')
const db = require('../db/db')

// 查询数据列表
exports.getList = (req,res) => {
   // console.log(typeof 0)
  const sql = 'select a.Id, a.title, a.cover_img, a.pub_date, a.state, a.cate_id, b.name as cate_name  from article as a ,article_cate as b where b.is_delete = 0 and a.is_delete = 0  and  a.cate_id = b.Id and a.cate_id = ifnull(?,a.cate_id) and a.state = ifnull(?,a.state) limit ?,?'
   
   db.query(sql,[req.query.cate_id || null, req.query.state || null, parseInt((req.query.pagenum-1) * req.query.pagesize), parseInt(req.query.pagesize)],(err,results)=>{
   if(err) return res.cc(err)
   const sql = 'select count(*) as total  from article as a ,article_cate as b where b.is_delete = 0 and a.is_delete = 0  and  a.cate_id = b.Id and a.cate_id = ifnull(?,a.cate_id) and a.state = ifnull(?,a.state)'
   db.query(sql, [req.query.cate_id || null, req.query.state || null],(err,total)=>{
    if(err) return res.cc(err)
    res.send({status:0,message:'获取列表成功',data:results,total:total[0].total})  
   })
   // res.send({status:0,message:'获取列表成功',data:results})
   })
}


// 增加文章数据带文件上传
exports.add = (req,res) =>{
   if(req.file.fieldname !== 'cover_img')return res.cc('文件参数是必选参数')
   const articleInfo = {
    ...req.body,
    cover_img: path.join('/uploads',req.file.filename),
    pub_date: new Date(),
    author_id: req.user.id
   }
 const sql = 'insert into article set ?'
 db.query(sql, articleInfo, (err,results)=>{
    if (err) return res.cc(err)
    if(results.affectedRows < 1) return res.cc('发布新文章失败')
    res.cc('发布新文章成功',0)
 })
}

// 删除文章
exports.delete = (req,res) => {
   const sql = 'delete from article where ?'
   db.query(sql,{Id:req.params.Id}, (err,results)=>{
      if(err) return res.cc(err)
      if(results.affectedRows < 1) return res.cc('删除文章失败')
      res.cc('删除文章成功',0)
   })
}