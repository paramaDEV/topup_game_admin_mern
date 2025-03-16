const mongoose = require('mongoose')
const {urlDb} = require('../config')

mongoose.connect(urlDb)
    .then(()=>{
        console.log('Connection success')
    })

const db = mongoose.connection

module.exports = db