window.addEventListener('DOMContentLoaded', (ev)=>{
    
    const formulario = document.querySelector(".formulario");

   
    formulario.addEventListener("submit", (ev)=>{
        ev.preventDefault();
        try{
            let nombre = document.getElementById("nombre-registro").value;
            if (nombre.length < 2){
                mostrarError("El nombre ingresado es demasiado corto")
            }
            let telefono = document.getElementById("telefono-registro").value;
            if (telefono.length != 9){
                mostrarError("Recuerde anteponer el 9 al número telefonico")
            }
            let correo = document.getElementById("correo-registro").value;
            let password = document.getElementById("password-registro").value;
            let novedades = getRadio();
            let suscriptor = {
                nombre,
                telefono,
                correo,
                password,
                novedades,
                fechaRegistro: (new Date()).toISOString()
            }
            
            guardarSuscriptor(suscriptor)       
                 
            formulario.reset();
        }catch (e){
            mostrarError(e.message);
        }
        return false;
    })


})

async function guardarSuscriptor(suscriptor){
    const url = "https://portafolio-330b4-default-rtdb.firebaseio.com/suscriptor.json";
    const res = await fetch(url,{
        method: "POST",
        body: JSON.stringify(suscriptor)
    });
    if(!res.ok){
        throw new Error("Error en la respuesta. Código: "+res.status);
    }
    const data = await res.json();
    mostrarExito(`Gracias ${suscriptor.nombre}, se ha guardado su suscripción exitosamente`)
}

function getRadio() {
    let checkSeleccionado = document.querySelector("input[name='radio']:checked");
    if ( checkSeleccionado == null ) {
        throw new Error("Debe seleccionar una opcion de novedades");
    }
    const checked = checkSeleccionado.value;
    return checked;
}

function mostrarMensaje(idContenedor, mensaje) {
    const ul = document.querySelector(`#${idContenedor} ul`);
    const li = document.createElement("li")
    const liContent = document.createTextNode( mensaje )
    li.appendChild( liContent )
    ul.appendChild(li);
}

function displayMensajeExito(b) {
    const idExito = "form-suscripcion-exito";
    const idError = "form-suscripcion-error";
    
    if( b ) {        
        document.getElementById(idExito).style.display = "block";
        document.getElementById(idError).style.display = "none";
    } else {
        document.getElementById(idExito).style.display = "none";
        document.getElementById(idError).style.display = "block";
    }
}

function mostrarExito(mensaje) {
    const idExito = "form-suscripcion-exito";
    displayMensajeExito(true);
    mostrarMensaje(idExito, mensaje);
}

function mostrarError(mensaje) {
    const idError = "form-suscripcion-error";
    displayMensajeExito(false);
    mostrarMensaje(idError, mensaje);
}
