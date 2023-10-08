console.log('hola')

const apiUrlGet = "http://127.0.0.1:3000/salas";
const apiUrlPut = "http://127.0.0.1:3000/salas/"

//fetch
async function fetchSalas(){
    try {
        const res = await fetch(apiUrlGet);
        if(!response.ok){
            throw new Error(`HTTP error Status: ${res.status} `)
        }
        const salas = await res.json();
        return salas
    } catch (error) {
        console.log('Error with the fetch :(', error);
        return
    }
}

let data = null
async function renderSalas(){
    data = await fetchSalas();
    console.log(data)

    let cardContainer = document.getElementById('cardContainer')
    cardContainer.innerHTML = null;

    data.salas.foreach(e => {
        console.log(e)

        let roomCard = document.createElement('figure')
        roomCard.classList.add("roomCard");

        let roomName = document.createElement('label')
        roomName.classList.add("roomName");

        let roomBuiding = document.createElement('label')
        roomBuiding.classList.add('roomBuilding')

        roomCard.appendChild(roomName)
        roomCard.appendChild(roomBuiding)


        for (let i = 0; i < e.reservaciones.length; i++) {
            let listaDeReservas = document.createElement('div');
            listaDeReservas.classList.add('listaDeReservasCss');

            let reservationSchedule = document.createElement('label');
            reservationSchedule.innerText = `La reserva es de ${e.reservaciones[0].schedule} hasta ${e.reservaciones[0].schedule + 1}`
            
            let reservationName = document.createElement('label')
            if(e.reservaciones[0].name != null){
                reservationName.innerText = e.reservaciones[0].name
            }else{
                reservationName.innerText = "No reservada"
            }

            let reservationId = document.createElement('label')
            if(e.reservaciones[0].uid != null){
                reservationId.innerText = e.reservaciones[0].uid
                listaDeReservas.classList.add('salaReservada');
            }else{
                reservationId.innerText = "";
            }

            let reservationBtn = document.createElement('button')
            reservationBtn.id = i
            reservationBtn.name = e.name
            reservationBtn.innerText = "Reservar"
            reservationBtn.addEventListener('click', function(event) {
                reservarSala(this.name, this.id)
            })

            listaDeReservas.appendChild(reservationSchedule)
            listaDeReservas.appendChild(reservationName)
            listaDeReservas.appendChild(reservationId)
            if(e.reservaciones[i].uid == null){
                listaDeReservas.appendChild(reservationId)
            }

            roomCard.appendChild(listaDeReservas)
        }
        cardContainer.appendChild(roomCard)
    })
}

function reservarSala (sala, hora){
    let inputName = document.getElementById('inputName').value
    let inputLast = document.getElementById('inputLast').value
    let inputId = document.getElementById('inputId').value
    if (inputName == "" || inputLast == "" || inputId == "") {
        alert("At least one of the inputs is empty")
        return
    }
    let horario = parseInt(hora) + 7
    alert(`${inputName} ${inputLast}, ${inputId}, ${sala}, From ${horario} hrs to ${horario+1} hrs`);

    let nuevaSala = null
    for(let i = 0; i < data.salas.length; i++){
        if(data.salas[i].name == sala){
            console.log(data.salas[i])
            nuevaSala = data.salas[i];
            nuevaSala.reservaciones[schedule].name = `${inputName} ${inputLast}`
            nuevaSala.reservaciones[schedule].id = inputId
        }
    }

    apiUrl = `${apiUrlPut} ${sala}`
    colocarNuevo(nuevaSala, apiUrl)
}

async function colocarNuevo (data, apiUrl){
    try {
        const res = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!res.ok){
            throw new Error(`HTTP error : Status : ${res.status}`)
        }

        const resData = await res.json()
        renderSalas()
        return resData
    } catch (error) {
        console.error('No se pudo postear', error)
        renderSalas()
        return null
    }
}

renderSalas();