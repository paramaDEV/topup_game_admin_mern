const mongoose = require("mongoose")

const gameSchema = mongoose.Schema({
    name : String,
    gameId : mongoose.Schema.ObjectId,
},{
    versionKey : false
})

module.exports=mongoose.model('Item',gameSchema)