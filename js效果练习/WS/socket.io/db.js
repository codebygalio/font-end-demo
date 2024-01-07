let mongoose = require('mongoose')
let conn = mongoose.createConnection('mongodb://127.0.0.1/mychat')

let MessageSchema = mongoose.Schema({
    username: String,
    content: String,
    createAt: {type: Date, default: Date.now}
})
let Message = conn.model('Message',MessageSchema)
module.exports = {Message}