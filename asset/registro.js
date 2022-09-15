window.addEventListener('DOMContentLoaded', (ev)=>{
    
    const formulario = document.querySelector(".formulario");

   
    formulario.addEventListener("submit", (ev)=>{
        ev.preventDefault();
        try{
            let nombre = document.getElementById("nombre-registro").value;
            let telefono = document.getElementById("telefono-registro").value;
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
        }catch{
            console.error("Ingresa bien los datos")
        }
    })


})

async function guardarSuscriptor(suscriptor){
    const url = "https://portafolio-330b4-default-rtdb.firebaseio.com/suscriptor.json";
    const res = await fetch(url,{
        method: "POST",
        body: JSON.stringify(suscriptor)
    });
    const data = await res.json()
}

function getRadio() {
    let checkSeleccionado = document.querySelector("input[name='radio']:checked");
    if ( checkSeleccionado == null ) {
        throw new Error("Debe seleccionar una opcion");
    }
    const checked = checkSeleccionado.value;
    return checked;
}
