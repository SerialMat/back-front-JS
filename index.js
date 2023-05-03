const express = require('express')
const app = express()
const port = 3000

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
    res.sendFile('src/page/index.html', { root: __dirname });
});

app.get('/test', function (req, res) {
   res.sendFile('src/test.html', { root: __dirname });
});

app.get('/login', function (req, res) {
   res.sendFile('src/page/auth.html', { root: __dirname });
});

app.post('/verif', async function (req, res) {
   
   var login = req.body.nom;
   var password = req.body.password;
   
   const User1 = await prisma.user.findFirst({
      where : {
         nom: login,
         password: password,
      }
   })

   console.dir(User1, { depth: null })
});


app.post('/add-ticket', async function (req, res) {


   await prisma.ticket.create({
     data: {

        titre: req.body.titre,
        description: req.body.description,
        etat: 1,
        iduser: this.user.id
         
     }
   })

 });

 app.post('/update-ticket', async function (req, res) {


   await prisma.ticket.update({
     data: {

        titre: req.body.titre,
        description: req.body.description,
        etat: 1,
        iduser: this.user.id
         
     }
   })

 });

 app.post('/delete-ticket', async function (req, res) {


   await prisma.ticket.delete({
      where : {
         etat: 0,
         
     }
   })

 });




app.post('/submit-user', async function (req, res) {


    await prisma.user.create({
      data: {

         nom: req.body.nom,
         password: req.body.password,
         admin: 1,

          ticket: {
              create: { titre: req.body.nomTicket, description: req.body.description, etat: 1 },
          },
      },
  })

   const allUsers = await prisma.user.findMany()
   console.dir(allUsers, { depth: null })
    
   res.send(name + ' ça marche! 1');
});

app.get('/liste', async function (req, res) {

   JSON.parse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}', (key, value) => {
      console.log(key);
      return value;
    });

   const allUsers = await prisma.user.findMany()
   const allTicket = await prisma.ticket.findMany()

   console.dir(allUsers, { depth: null })
   console.dir(allTicket, { depth: null })

   /*const User1 = await prisma.user.findMany({
      where : {id:1}
   })
 
   console.dir(User1, { depth: null })
   user = JSON.stringify(allUsers)
   console.dir(user)
   console.dir(User1.nom)
   console.dir(User1.prenom)

   res.send('Voici la liste : ' + allUsers + '|  '+ User1+' User1 '+ User1.nom + ' '+User1.prenom+ ' '+User1.id + user);*/
});

app.get('/json', async function (req, res) {
   const user2 = await prisma.user.findMany()
   res.json(user2);
});

app.put('/put', function (req, res) {
   res.send('PUT Request');
});

app.delete('/delete', function (req, res) {
   res.send('DELETE Request');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});