const express = require('express')
const app = express()
const port = 3000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let reservas = []


reservas.push({
    salas: "#1",
    hora: "1",
    localizacion: "2:00",
    
})

let usuarios = []

usuarios.push({
    nombre: "#1",
    apellido: "Roman",
    ced: "1",
    
})

let salas = []
salas.push({
    nombre: "105",
    id: "1",
    localizacion: "Edificio A",
    
})
salas.push({
    nombre: "204",
    id: "2",
    localizacion: "Edificio B",
    
})

app.get('/salas', (req, res) => {  
    res.send({"salas":salas})
  })


/*   app.get('/salas', (req, res)=>{
    if(req.query.disponibilidad){
        salas = salas.filter(
            (sala)=>{return sala.disponibilidad == req.query.disponibilidad}
        )
    }
    res.send({"salas":salas})
}) */

app.get('/salas/:id', (req, res)=>{
    console.log("params:", req.params)
    const requestID = req.params.id
    let requiredSala = null;
    for (let index = 0; index < salas.length; index++) {
        console.log(salas[index].id === requestID, salas[index].id, requestID)
        if(salas[index].id === requestID){
            requiredSala = salas[index];
        }
    }
    console.log(requiredSala)
    res.json(requiredSala)
})

app.use("", (req, res)=>{
    res.status(404).send("My milkshake brings all the boys to the yard")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})