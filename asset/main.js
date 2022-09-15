window.addEventListener("DOMContentLoaded",(ev)=>{
    const menuAbierto = document.getElementById("nav-menu-responsive");
    const menuCerrado = document.getElementById("nav-menu-responsive-closed");

    menuAbierto.addEventListener("click", menuHamburguesa);
    menuCerrado.addEventListener("click", menuHamburguesaCerrado);



})

function menuHamburguesa(){
    const headerOpen = document.getElementById("header");
    const botonAbierto = document.getElementById("nav-menu-responsive");
    const botonCerrado = document.getElementById("nav-menu-responsive-closed");

    headerOpen.style.display="flex";
    botonAbierto.style.display="none";
    botonCerrado.style.display="flex";
    
}

function menuHamburguesaCerrado(){
    const headerOpen = document.getElementById("header");
    const botonAbierto = document.getElementById("nav-menu-responsive");
    const botonCerrado = document.getElementById("nav-menu-responsive-closed");

    headerOpen.style.display="none";
    botonAbierto.style.display="flex";
    botonCerrado.style.display="none";
    
}