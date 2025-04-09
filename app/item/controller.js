const Game = require('../game/model')
const Category = require('../category/model')
const Item = require('./model')
const session = require('express-session')


module.exports = {
  index:async(req,res)=>{
    try{
      const item = await Item.aggregate([{
        $lookup:{
          from:"games",
          localField:"gameId",
          foreignField:"_id",
          as:"game"
        }
      }]).exec()
      alertStatus = req.session.alertStatus
      alertMessage = req.session.alertMessage
      res.render('item/index',{item,alertStatus,alertMessage})
      req.session.destroy()
    }catch(e){
        console.log('error',e.message)
    }
  },
  viewCreate:async(req,res)=>{
      try{
        const game = await Game.find()
        res.render('item/create',{game})
      }catch(e){
          console.log(e)
      }
    },
  actionCreate:async(req,res)=>{
        try{
            const {name,gameId} = await req.body
            let item = await Item({name,gameId})
            await item.save()
            req.session.alertStatus='success'
            req.session.alertMessage='Data created successfully !'
            res.redirect('/item')
        }catch(e){
            console.log(e)
        }
      },
  viewEdit:async(req,res)=>{
        try{
          const{id} = await req.params
          const game = await Game.find()
          const item = await Item.findById(id)
          res.render('item/edit',{item,id,game})
        }catch(e){
            console.log(e)
        }
      },
  actionEdit:async(req,res)=>{
        try{
            const {id,name,gameId} = await req.body
            const item = await Item.findByIdAndUpdate(id,{name,gameId})
            req.session.alertStatus='success'
            req.session.alertMessage='Data updated successfully !'
            res.redirect('/item')
        }catch(e){
            console.log(e)
        }
      },
   actionDelete:async(req,res)=>{
      try{
          const {id} = await req.body
          const item = await Item.findByIdAndDelete(id)
          req.session.alertStatus='success'
          req.session.alertMessage='Data deleted successfully !'
          res.redirect('/item')
      }catch(e){
          console.log(e)
      }
    },
  
}