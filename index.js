const express = require("express")
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser")
const connection = require("./database/database")
const CategoriesController = require("./categories/CategoriesController")
const OrcamentosController = require("./orcamentos/OrcamentosController")
const OrcamentoController = require("./orcamento/OrcamentoController")
const userController = require("./user/userController")
//Modeus
const Category = require("./categories/Category")
const Orcamentos = require("./orcamentos/Orcamentos")
const Orcamento = require("./orcamento/Orcamento")
const User = require("./user/User")
//View engine
app.set('view engine','ejs');

//Static
app.use(express.static('public'))

// Sessions
app.use(session({
    secret:"bruno22535041Br@", cookie:{maxAge: 300000}
}))

//Body Parcer
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso!")
    }).catch((error)=>{
        console.log(error)
    })

app.use("/",CategoriesController)

app.use("/",OrcamentosController)

app.use("/",OrcamentoController)

app.use("/", userController)

app.get("/", (req, res)=>{

    if (req.session.user == undefined){
        res.redirect("admin/login")
    }else{
        Orcamento.findAll({
            include: [{
                model: Orcamentos   
            },
        {
            model: Category
        }]
    
        }).then(orcamento_detalhes =>{
            Category.findAll().then(categories =>{
                res.render("index",{
                    orcamento_detalhes: orcamento_detalhes,
                    categories: categories
                })
            })
        })
        
    }
  
})

app.get("/sair", (req,res)=>{

    req.session.user = undefined

    res.redirect("admin/login")

})

app.post("/orcamento/delete",(req,res)=>{
    let id = req.body.orcamento_detalheId
    let orcamentoId = req.body.orcamentoId
    if(id == ""){
       res.redirect("/")
    }else{
        Orcamento.destroy({
            where: {
                id:id
            }
        }).then(()=>{
            Orcamentos.destroy({
                where:{
                    id: orcamentoId
                }
            }).then(()=>{
                res.redirect("/")
            })
           
        })
    }
    
})



app.listen(8080,()=>{
    console.log("Servidor Rodando!")
})