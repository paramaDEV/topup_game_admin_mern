const Category = require('./model')

module.exports = {
  index:async(req,res)=>{
    try{
        const category = await Category.find();
        console.log(category[0]['name'])
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
        console.log(req.body)
        console.log('name',name)
        let category = await Category({name})
        await category.save()

        res.redirect('/category')

    }catch(e){
        console.log(e)
    }
  }
}