

const Category = require('./model')
const session = require('express-session')
const globals = require('../GlobalVariables.js')
module.exports = {
  index:async(req,res)=>{
    try{
      const category = await Category.find();
      alertStatus=req.session.alertStatus,
      alertMessage=req.session.alertMessage
      res.render('category/index',{category,alertStatus,alertMessage})
      req.session.destroy()
    }catch(e){
        console.log(e.message)
    }
  },
  viewCreate:async(req,res)=>{
    try{
        req.session.destroy()
        res.render('category/create')
    }catch(e){
        console.log(e)
    }
  },
  actionCreate:async(req,res)=>{
    try{
        const {name} = await req.body
        let category = await Category({name})
        await category.save()
        req.session.alertStatus='success'
        req.session.alertMessage='Data created successfully !'
        res.redirect('/category')
    }catch(e){
        console.log(e)
    }
  },
  viewEdit:async(req,res)=>{
    try{
        const {id} = req.params
        const category = await Category.findById(id)
        res.render('category/edit',{category})
    }catch(e){
        console.log(e)
    }
  },
  actionEdit:async(req,res)=>{
    try{
        const {id,name} = req.body
        const category = await Category.findByIdAndUpdate(id,{name})
        req.session.alertStatus='success'
        req.session.alertMessage='Data updated successfully !'
        res.redirect('/category')
    }catch(e){
        console.log(e)
    }
  },
  actionDelete:async(req,res)=>{
    try{
        const {id} = req.body
        const category = await Category.findByIdAndDelete(id)
        req.session.alertStatus='success'
        req.session.alertMessage='Data deleted successfully !'
        res.redirect('/category')
    }catch(e){
        console.log(e)
    }
  },
}