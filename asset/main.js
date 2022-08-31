window.addEventListener('DOMContentLoaded', (ev)=>{
    
    const boton = document.getElementById("boton-enviar");
    const botonRegistro = document.getElementById("boton-registro")
    const registro = document.getElementById("registro")
    boton.addEventListener("click", (ev)=>{
        try{
            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let asunto = document.getElementById("asunto").value;
            let mensaje = document.getElementById("mensaje").value;
            if (nombre.length<3) {
                throw new Error("El nombre es demasiado corto")
            }
            let contacto = {
                nombre,
                correo,
                asunto,
                mensaje,
                fechaRegistro: (new Date()).toISOString()
            }

            guardarContacto(contacto);
        }catch{
            console.error("Ingresa bien")

        }
    })

    botonRegistro.addEventListener("click", (ev)=>{
        try{
            let correo = document.getElementById("correo-registro").value;
            let password = document.getElementById("password").value;
            let suscriptor = {
                correo,
                password,
                fechaRegistro: (new Date()).toISOString()
            }
            
            guardarSuscriptor(suscriptor)
            registro.classList("inactive")
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

async function guardarContacto (contacto){
    const url = "https://portafolio-330b4-default-rtdb.firebaseio.com/contacto.json";
    const res = await fetch ( url, {
        method: "POST",
        body: JSON.stringify(contacto)
    });
    const data = await res.json()
}
