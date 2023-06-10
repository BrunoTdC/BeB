const express = require('express');
const router = express.Router()
const Category = require("../categories/Category")
const Orcamentos = require("./Orcamentos")

router.get('/admin/orcamentos/new',(req,res)=>{
    if (req.session.user == undefined){
        res.redirect("admin/login")
    }else{
    Category.findAll().then(categories =>{
        Orcamentos.findOne({
            order: [
                ['id', 'DESC'], 
              ],
              limit: 1
            }).then((orcamentos)=>{
                let orcamentoCod = orcamentos.codigo
                res.render("admin/orcamentos/new",{
                    categories:categories,
                    orcamentos:orcamentoCod
                })
            }).catch(() => {
                let orcamentoCod = "Primeiro registro"
                res.render("admin/orcamentos/new",{
                    categories:categories,
                    orcamentos: orcamentoCod
                })
              });
    })
}
})

router.post("/orcamentos/save",(req,res)=>{
    let codigo = req.body.codigo
    let nome = req.body.nome
    let empresa = req.body.empresa
    let contato = req.body.contato
    let category = req.body.category

    if(codigo == "" || nome == "" || category == "" || empresa == "" || contato == ""){
        res.redirect("/admin/orcamentos/new")
    }else{
        Orcamentos.create({
            codigo: codigo,
            nome: nome,
            categoryId: category,
            empresa: empresa,
            contato: contato
        }).then(()=>{
            Orcamentos.findOne({
                where:{
                    codigo: codigo
                },
                order: [
                    ['id', 'DESC'], 
                  ],
                  limit: 1,
                  
                attributes: ['id','categoryId']
            }).then(orcamentosid =>{
                  res.render("admin/orcamento/orcamento-detalhes",{
                  orcamentosid:orcamentosid
                })
            })
            
        }).catch(()=>{ 
           res.redirect("/admin/orcamentos/new")
        })
    }
    
})

module.exports = router