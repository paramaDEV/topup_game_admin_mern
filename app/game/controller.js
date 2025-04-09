const Game = require('./model')
const Category = require('../category/model')
const session = require('express-session')


module.exports = {
  index:async(req,res)=>{
    try{
      const category = await Category.find()
      const game = await Game.aggregate([{
        $lookup:{
          from:"categories",
          localField:"categoryId",
          foreignField:"_id",
          as:"category"
        }
      }]).exec()
      alertStatus = req.session.alertStatus
      alertMessage = req.session.alertMessage
      console.log(game[0])
      res.render('game/index',{game,alertStatus,alertMessage})
      req.session.destroy()
    }catch(e){
        console.log('error',e.message)
    }
  },
  viewCreate:async(req,res)=>{
      try{
        const category = await Category.find()
        res.render('game/create',{category})
      }catch(e){
          console.log(e)
      }
    },
  actionCreate:async(req,res)=>{
        try{
            const {name,categoryId} = await req.body
            let game = await Game({name,categoryId})
            await game.save()
            console.log(game)
            req.session.alertStatus='success'
            req.session.alertMessage='Data created successfully !'
            res.redirect('/game')
        }catch(e){
            console.log(e)
        }
      },
  viewEdit:async(req,res)=>{
        try{
          const{id} = await req.params
          const category = await Category.find()
          const game = await Game.findById(id)

          console.log(category,game)
          res.render('game/edit',{category,id,game})
        }catch(e){
            console.log(e)
        }
      },
  actionEdit:async(req,res)=>{
        try{
            const {id,name,categoryId} = await req.body
            const game = await Game.findByIdAndUpdate(id,{name,categoryId})
            req.session.alertStatus='success'
            req.session.alertMessage='Data updated successfully !'
            res.redirect('/game')
        }catch(e){
            console.log(e)
        }
      },
   actionDelete:async(req,res)=>{
      try{
          const {id} = await req.body
          const game = await Game.findByIdAndDelete(id)
          req.session.alertStatus='success'
          req.session.alertMessage='Data deleted successfully !'
          res.redirect('/game')
      }catch(e){
          console.log(e)
      }
    },
  
}