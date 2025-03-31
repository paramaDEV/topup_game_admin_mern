const Category = require('./model')

module.exports = {
  index:async(req,res)=>{
    try{
        const category = await Category.find();
        res.render('category/index',{category})
    }catch(e){
        console.log(e)
    }
  },
  viewCreate:async(req,res)=>{
    try{
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
        res.redirect('/category')
    }catch(e){
        console.log(e)
    }
  },
  actionDelete:async(req,res)=>{
    try{
        const {id} = req.body
        const category = await Category.findByIdAndDelete(id)
        res.redirect('/category')
    }catch(e){
        console.log(e)
    }
  },
}