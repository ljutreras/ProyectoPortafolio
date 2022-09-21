window.addEventListener('DOMContentLoaded', (ev)=>{
    
    const boton = document.getElementById("boton-enviar");
    const formulario = document.getElementById("form-contacto");
    boton.addEventListener("click", (ev)=>{
        try{
            let nombre = document.getElementById("nombre").value;
            if (nombre.length < 2){
                mostrarError("El nombre ingresado es demasiado corto")
            }
            let correo = document.getElementById("correo").value;
            let asunto = document.getElementById("asunto").value;
            let mensaje = document.getElementById("mensaje").value;
            let horario = getHorario()
            let contacto = {
                nombre,
                correo,
                asunto,
                horario,
                mensaje,
                fechaRegistro: (new Date()).toISOString()
            }

            guardarContacto(contacto);
            formulario.reset();

        }catch(e){
            mostrarError(e.message);
        }
        return false;
    })

})

async function guardarContacto (contacto){
    const url = "https://portafolio-330b4-default-rtdb.firebaseio.com/contacto.json";
    const res = await fetch ( url, {
        method: "POST",
        body: JSON.stringify(contacto)
    });
    if(!res.ok){
        throw new Error("Error en la respuesta. Código: "+res.status);
    }
    const data = await res.json()
    mostrarExito(`Felicidades ${contacto.nombre}, se ha enviado exitosamente`)
}

function getHorario() {
    let horarioSeleccionado = document.querySelector("option[class='horario']:checked");
    if ( horarioSeleccionado == null ) {
        throw new Error("Debe seleccionar un horario");
    }
    const horario = horarioSeleccionado.value;
    return horario;
}

function mostrarMensaje(idContenedor, mensaje) {
    const ul = document.querySelector(`#${idContenedor} ul`);
    const li = document.createElement("li")
    const liContent = document.createTextNode( mensaje )
    li.appendChild( liContent )
    ul.appendChild(li);
}

function displayMensajeExito(b) {
    const idExito = "form-contacto-exito";
    const idError = "form-contacto-error";
    
    if( b ) {        
        document.getElementById(idExito).style.display = "block";
        document.getElementById(idError).style.display = "none";
    } else {
        document.getElementById(idExito).style.display = "none";
        document.getElementById(idError).style.display = "block";
    }
}

function mostrarExito(mensaje) {
    const idExito = "form-contacto-exito";
    displayMensajeExito(true);
    mostrarMensaje(idExito, mensaje);
}

function mostrarError(mensaje) {
    const idError = "form-contacto-error";
    displayMensajeExito(false);
    mostrarMensaje(idError, mensaje);
}