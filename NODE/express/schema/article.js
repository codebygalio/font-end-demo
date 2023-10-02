const joi = require('joi')

const Id = joi.number().integer().min(1).required()
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().required().valid('已发布','草稿')


exports.add_active_schema = {
    body:{
        title,content,state,cate_id
    }
}
exports.delete_active_schema = {
    params:{
        Id
    }
}