const express = require("express");
const router = express.Router()
const Category = require("./Category")
const slugify = require("slugify")

router.get('/admin/categories/new',(req,res)=>{
    if (req.session.user == undefined){
        res.redirect("admin/login")
    }else{
    res.render("admin/categories/new")
    }
})

router.post('/categories/save', (req, res)=>{
    let title = req.body.title;

    if(title == undefined || title == "" ){
        res.redirect("/admin/categories/new");
    }else{
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories");
        })
        
    }
})

router.get("/categories/edit/:id",(req,res)=>{
    if (req.session.user == undefined){
        res.redirect("admin/login")
    }else{
    let id = req.params.id
    Category.findOne({
        where:{
            id:id
        }
    }).then((category)=>{
        res.render("admin/categories/edit", {
            category:category
        })
    })
}
})

router.post("/categories/update", (req, res)=>{
    let id = req.body.id;
    let title = req.body.title;

    if(title){
        Category.update({title: title, slug: slugify(title)},{
            where: {
                id:id
            }
        }).then(()=>{
            aviso = ""
            res.redirect("/admin/categories")
        })
    }else{
            res.redirect(`/admin/categories/edit/${id}`)
    }

    
})

router.post("/categories/delete",(req,res)=>{
    let id = req.body.id
    if(id == ""){
        res.redirect("/")
    }else{
        Category.destroy({
            where: {
                id:id
            }
        }).then(()=>{
            res.redirect("/admin/categories")
        })
    }
})

router.get('/admin/categories/',(req,res)=>{
    if (req.session.user == undefined){
        res.redirect("admin/login")
    }else{

    Category.findAll({
        order: [
          ['id', 'DESC'], 
        ]}).then(categories =>{
        res.render("admin/categories/categorias", 
        {categories: categories})
    })
}
    
})

module.exports = router;