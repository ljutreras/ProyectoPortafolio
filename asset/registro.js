window.addEventListener('DOMContentLoaded', (ev)=>{
    
    const botonRegistro = document.getElementById("boton-registro");
   
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
