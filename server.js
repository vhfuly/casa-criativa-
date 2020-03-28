// usei o express para ligar e configurar meu servidor 
const express = require('express')
const server = express()
const db = require('./db')

/*
const ideas = [
   {

    img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title:"Curso de programação",
    category:"Estudo",
    description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem voluptate architecto suscipit culpa illum quaerat aperiam natus, velit, voluptatem quas eligendi ut quibusdam libero! Sequi consequatur ad accusamus facilis aliquam!",
    url:"http://rocketseat.com.br"  
  
 },
 {
    img:"https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title:"Exercícios",
    category:"Saúde",
    description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem voluptate architecto suscipit culpa illum quaerat aperiam natus, velit, voluptatem quas eligendi ut quibusdam libero! Sequi consequatur ad accusamus facilis aliquam!",
    url:"https://saude.gov.br/" 
 
 },
 {
    img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title:"Meditação",
    category:"Mentalidade",
    description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem voluptate architecto suscipit culpa illum quaerat aperiam natus, velit, voluptatem quas eligendi ut quibusdam libero! Sequi consequatur ad accusamus facilis aliquam!",
    url:"https://www.derosemethodjardins.com.br/meditacao-e-foco?gclid=Cj0KCQjwpfHzBRCiARIsAHHzyZrD2IjDg90d2MFZ_AvjpCMeRPLfgId2iv9sES0az_hmF9jpcT7JQikaAjjVEALw_wcB" 

 } ,
 {
    img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title:"Karaokê",
    category:"Diversão em Família",
    description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem voluptate architecto suscipit culpa illum quaerat aperiam natus, velit, voluptatem quas eligendi ut quibusdam libero! Sequi consequatur ad accusamus facilis aliquam!",
    url:"https://www.tvkaraoke.com.br/"

 }, 
] */
//configuração do nunjucks
const nunjusks = require('nunjucks')
nunjusks.configure("views", {
    express: server,
    noCache: true // boolean

})

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({extended: true}))
// criei uma rota /
//e capturo o pedido para resposnder 
server.get("/",function(req, res){

    

    db.all(`SELECT * FROM ideas`, function(err,rows){
        if (err){
            console.log(err)
            return res.send("Erro no bando de dados !")
        }
        const reversedideas =  [...rows].reverse()
            let lastideas =[]
         for (let ideia of reversedideas ){
         if (lastideas.length < 2){
            lastideas.push(ideia)

        }
    
    }

    
        
    return res.render("index.html",{ideas:lastideas })
    })
     

    
})
server.get("/ideias",function(req, res){

    db.all(`SELECT * FROM ideas`, function(err,rows){

        if (err){
            console.log(err)
            return res.send("Erro no bando de dados !")
        }
        const reversedideas =  [...rows].reverse()
        return res.render("ideias.html",{ideas: reversedideas})
    })
    
})

server.post("/",function(req, res){
    //Inserir dados na tabela
    
   const query=`
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
   ) VALUES (?,?,?,?,?)
   `
         const values =[
          req.body.image,  
          req.body.title, 
          req.body.category, 
          req.body.description, 
          req.body.link       
         ]

    db.run(query, values, function(err){
        if (err){
            console.log(err)
            return res.send("Erro no bando de dados !")
        }

        return res.redirect("/ideias")
    }) 

    
    })

//liguei meu servidor na porta 3000
server.listen(3000)

