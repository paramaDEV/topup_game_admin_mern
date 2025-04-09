const mongoose = require("mongoose")

const gameSchema = mongoose.Schema({
    name : String,
    categoryId : mongoose.Schema.ObjectId,
},{
    versionKey : false
})

module.exports=mongoose.model('Game',gameSchema)