const sqlite3 = require ('sqlite3').verbose()

const db = new sqlite3.Database('./ws.db') 

db.serialize(function(){
    //criar a tabela
    db.run(`CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
         );
    `)
    
    //Inserir dados na tabela
   /*
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
          "https://image.flaticon.com/icons/svg/2729/2729007.svg",
          "Curso de programação",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem voluptate architecto suscipit culpa illum quaerat aperiam natus, velit, voluptatem quas eligendi ut quibusdam libero! Sequi consequatur ad accusamus facilis aliquam!",
        "http://rocketseat.com.br"  
    
    ]

    db.run(query, values, function(err){
        if (err) return console.log (err)

        console.log(this)
    }) 

     //Deletar dados da tabela

    //db.run(`DELETE FROM ideas WHERE id= ? `,[1],function(err){
    //    if (err) return console.log (err)

   //     console.log(this)
  //  })
*/
    //consultar dados da tabela

    db.all(`SELECT * FROM ideas`, function(err,rows){
        if (err) return consolog.log (err)
        console.log(rows)
   })

    


})
module.exports= db