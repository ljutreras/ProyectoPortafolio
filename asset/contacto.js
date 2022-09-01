window.addEventListener('DOMContentLoaded', (ev)=>{
    
    const boton = document.getElementById("boton-enviar");
    const formulario = document.getElementById("form-contacto");
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
            formulario.reset();

        }catch{
            console.error("Ingresa bien")

        }
    })

})

async function guardarContacto (contacto){
    const url = "https://portafolio-330b4-default-rtdb.firebaseio.com/contacto.json";
    const res = await fetch ( url, {
        method: "POST",
        body: JSON.stringify(contacto)
    });
    const data = await res.json()
}
