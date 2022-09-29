const db = require('../db/db')
//获得所有未删除文章分类数据
exports.getArtCates = (req,res)=>{
    const sql = 'select * from article_cate where is_delete=0 order by id desc'
    db.query(sql,(err,results)=>{
        if(err) return res.cc(err)
        res.send({status:0,message:'获取所有文章分类数据成功',data:results})
    })
}
//新增文章分类数据
exports.addcates = (req,res) =>{
    const sql = 'select * from article_cate where name=? or alias=?'
    db.query(sql,[req.body.name,req.body.alias],(err,results) =>{
        if(err) return res.cc(err)
        if(results.length == 2) return res.cc('名称和别名都被占用') 
        if(results.length == 1 && req.body.name == results[0].name && req.body.alias != results[0].alias) return res.cc('名称被占用了') 
        if(results.length == 1 && req.body.alias == results[0].alias && req.body.name != results[0].name) return res.cc('别名被占用了') 
        if(results.length == 1 && req.body.alias == results[0].alias && req.body.name == results[0].name) return res.cc('别名和名称被占用了') 
         const sql = 'insert into article_cate set ?'
    db.query(sql,{name:req.body.name,alias:req.body.alias},(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows < 1) return res.cc('新增文章分类数据失败')
        res.cc('新增文章分类数据成功',0)
    })
    })
}
//删除文章分类数据
exports.deletecates = (req,res) => {
    const sql = 'update article_cate set is_delete = 1 where id = ?'
    db.query(sql,req.params.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows < 1) return res.cc('删除文章分类数据失败')
        res.cc('删除文章分类数据成功',0)
    })
}
//获得指定文章分类数据
exports.artcate = (req,res) => {
    const sql = 'select * from article_cate where id = ? and is_delete = 0'
    db.query(sql,req.params.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length < 1) return res.cc('没有查询到对应文章分类数据')
        res.send({status:0,msssage:'获取文章分类数据成功',data:results})
    })
}

//更新文章分类数据
exports.updateCateById = (req,res) => {
    const sql = 'select * from article_cate where id <> ? and (name=? or alias=?)'
    db.query(sql,[req.body.id,req.body.name,req.body.alias],(err,results)=>{
        if(err) return res.cc(err)
        if(results.length == 2) return res.cc('名称和别名都被占用') 
        if(results.length == 1 && req.body.name == results[0].name && req.body.alias != results[0].alias) return res.cc('名称被占用了') 
        if(results.length == 1 && req.body.alias == results[0].alias && req.body.name != results[0].name) return res.cc('别名被占用了') 
        if(results.length == 1 && req.body.alias == results[0].alias && req.body.name == results[0].name) return res.cc('别名和名称被占用了') 
        const sql = 'update article_cate set ? where id = ?'
    db.query(sql,[req.body, req.body.Id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows < 1) return res.cc('更新文章分类数据失败')
        res.cc('更新文章数据成功',0)
    })
    })
    
}