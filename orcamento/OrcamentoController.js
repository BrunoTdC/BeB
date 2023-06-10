const express = require("express");
const router = express.Router()
const Orcamento = require("./Orcamento")
const Category  = require("../categories/Category")
const Orcamentos = require("../orcamentos/Orcamentos");
const moment = require('moment');

router.post("/orcamento/save",(req,res)=>{
    let descricao = req.body.descricao
    let quantidade = req.body.quantidade
    let unitario = req.body.unitario
    let total = req.body.total
    let orcamento = req.body.orcamento
    let categories = req.body.categories

    if(descricao == "" || quantidade == "" || unitario == "" || total == "" || orcamento == ""){
        Orcamentos.destoy({
            where:{
                id:orcamento
            }
        }).then(()=>{
            res.redirect("/admin/orcamentos/new")
        })
    }else{
        Orcamento.create({
            decricao: descricao,
            quantidade: quantidade,
            valorunitario: unitario,
            valortotal: total,
            orcamentoId: orcamento,
            categoryId: categories
        }).then(()=>{
            res.redirect("/")
        })
    }

})

router.post("/orcamento/filter/codigo",(req,res)=>{
    let codigo = req.body.codigo

    Orcamentos.findOne({
        where:{
            codigo:codigo
        }
    }).then(orcamentos =>{
        let orcamentosId = orcamentos.id
        Orcamento.findAll({
            where: {
                orcamentoId:orcamentosId
            },
            include:[{
                model: Orcamentos
            },
            {
                model: Category
            }]
        }).then( orcamento_detalhes =>{
            Category.findAll().then(categories=>{
                res.render("admin/orcamento/filterCodigo",{
                    orcamento_detalhes:orcamento_detalhes,
                    categories: categories
                })
            })
        })
    })
})

router.get("/orcamento/filter/:id", (req,res)=>{
    if (req.session.user == undefined){
        res.redirect("admin/login")
    }else{
    let id = req.params.id
    Orcamento.findAll({
        where :{
            categoryId:id
        },
        include: [{
            model: Orcamentos    
        },{
            model: Category
        }]
    }).then(orcamento_detalhes =>{
        Category.findAll().then(categories =>{
            res.render("admin/orcamento/filter",{
                orcamento_detalhes: orcamento_detalhes,
                categories: categories
            })
        })
    })
}
})

router.get("/orcamento/print/:codigo",(req, res)=>{
    if (req.session.user == undefined){
        res.redirect("admin/login")
    }else{
    let codigo = req.params.codigo
    Orcamentos.findOne({
        where:{
            codigo:codigo
        }
    }).then(orcamentos=>{
      let orcamentoId = orcamentos.id
        Orcamento.findAll({
            where:{
                orcamentoId:orcamentoId
            }
        }).then((orcamento_detalhes)=>{
            let cont = 0
            let formatDate = moment(orcamentoId.createdAt).format('DD/MM/YY')
            res.render("admin/orcamento/print",{
                orcamento_detalhes: orcamento_detalhes,
                orcamentos : orcamentos,
                cont:cont,
                formatDate: formatDate
            })
        })
        
    })
}

})



module.exports = router