const mongoose = require("mongoose")
// const {Schema} = mongoose;

const categorySchema = mongoose.Schema({
    name : String
},{
    versionKey : false
})

module.exports=mongoose.model('Category',categorySchema)