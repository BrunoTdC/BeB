const express = require("express")
const session = require("express-session")
const User = require("./User")
const router = express.Router()

router.get("/admin/login",(req, res)=>{
    res.render("admin/login")
})

router.post("/login",(req,res)=>{
    
    let usuario = req.body.usuario
    let senha = req.body.senha

    if (usuario == "" || senha == "" ){
        res.redirect("admin/login")
    }else{
        User.findOne({
            where:{
                usuario : usuario,
                senha : senha,
            }
        }).then(user =>{
         req.session.user = {
         usuario: user.usuario,
         senha: user.senha
        }
        res.redirect("/")

        }).catch(() => {
            res.redirect("admin/login")
          });
    }

    

})

module.exports = router