const express = require('express');
const { validateUser } = require('./users');
const app = express()
const port = 3000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* const cors = require('cors');
app.use(cors());  */


let salas = []
let usuarios = []
let reservas = []


usuarios.push({
    name: "Andres",
    last: "Nei",
    id: 1107836489,
    
})

//Aca creamos 3 salas y que hagan de una vez parte del arreglo que se pintara en el frontend
for (let i = 0; i < 3; i++) {
    let nuevaSala = {
        name: `Sala ${i}`,
        edificio: `Biblioteca`,
        reservaciones: reservas
    }
    salas.push(nuevaSala)
}

//los valores inician null ya que como se sabe, aun no se han reservado
for (let i = 7; i < 19; i++) {
    let nuevaReserva = {
        name: null,
        uid: null,
        schedule: `${i}:00`
    }
    reservas.push(nuevaReserva)
}

//------------------------------Salas------------------------------------//

app.get('/salas', (req, res) => {  
    res.send({"salas":salas})
  })

app.patch('/salas/:name', (req, res) => {
    let index = salas.findIndex(sala => sala.name == req.params.name)
    let updateSala = {
        name: req.body.name,
        edificio: req.body.edificio,
        reservaciones: req.body.reservaciones
    }
    salas[index] = nuevaSala
    res.send("Sala actualizada" + nuevaSala)
})
  
  //----------------------------------Usuarios-----------------------------------//
  
  app.get('/usuarios', (req,res) => {
    res.send({"usuarios":usuarios})
  })
  
  app.post('/usuarios', (req, res) => {
      const userValidationResult = validateUser(req.body);
      console.log('result', userValidationResult.error)
  
      if(userValidationResult.error){
          return res.status(400).send(
              {message:JSON.parse(userValidationResult.error.message)}
          )
      }
  
      let nuevoUsuario = {
          name: userValidationResult.data.name,
          last: userValidationResult.data.last,
          id: userValidationResult.data.id
      }
      usuarios.push(nuevoUsuario);
      res.status(201).send({"message":"Nuevo estudiante en busca de su sala", "user":nuevoUsuario})
  })
  
  app.delete('/usuarios/:id', (req, res) => {
    const idToDelete = req.params.id;
    let indexToDelete = usuarios.findIndex(usuario => usuario.id == idToDelete)
    let usuarioDeleted = usuarios.splice(indexToDelete, 1)  
    res.send("Alguien se nos fue del server, con id:" + usuarioDeleted[0].id)
  })


//------------------------reservas------------------------------------------//

app.get('/reservaciones', (req, res) => {
    res.send({"reservaciones": reservas})
})



app.use("", (req, res)=>{
    res.status(404).send("My milkshake brings all the boys to the yard")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})