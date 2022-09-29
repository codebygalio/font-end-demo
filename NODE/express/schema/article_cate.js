const joi = require('joi')

const id = joi.number().integer().min(1).required()

const name = joi.string().required()

exports.article_schema = {
    body:{
        name:name,
        alias:name
    }
}
exports.id_schema = {
    params:{
        id
    }
}
exports.update_schema = {
    body:{
        Id:id,
        name,
        alias:name
    }
}
