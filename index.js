const menino = document.querySelector(".img-menino");

const body =document.querySelector("body");
const black = document.querySelector(".wrapper");
const inputValue = document.querySelector("#cityValue");
const buscar = document.querySelector("#buscar");

const chuva = document.querySelector(".chuva");

 
const city = document.querySelector("#city");
const temperature = document.querySelector("#temperature");
const weather = document.querySelector("#clima");
const description = document.querySelector("#description");


for (let i=0; i < 5 ; i++){

    const novaGota= document.createElement("div");
    novaGota.classList.add("gota");

    const posicao = Math.random()*100 ;
    novaGota.style.left = posicao +"%";
    
    chuva.appendChild(novaGota);
   
   
    
    
}



//FUNÇÕES



// EVENTOS
    menino.addEventListener("animationend",(evento)=>{
    if (evento.animationName === "caminhar"){
        menino.classList.add("meninoParado");
    }
});

buscar.addEventListener('click',(e)=>{
    e.preventDefault();
    const cidadeDigitada = inputValue.value;
    city.innerText= cidadeDigitada;

    
    menino.classList.remove("meninoParado");
    menino.classList.remove("meninoCaminhando");

    void menino.offsetWidth;//offsetWidth pode forçar o navegador a recalcular o layout.

    menino.classList.add("meninoCaminhando");
    console.log(menino.classList);
    console.log(getComputedStyle(menino).animationName);

    console.log(weather.innerText);

    if (weather.innerText ==="Ensolarado" ) {
        body.classList.add("ensolarado");
        menino.classList.add("meninoAmarelo")
        black.style.color = "black";

    }else if (weather.innerText === "Nublado"){

        body.classList.add("nublado");
        black.style.color ="#fdfdfd";
        menino.classList.add("meninoVerde")

    }else if (weather.innerText ==="Chuva"){
        body.classList.add("tempestade");
        black.style.color = "#fdfdfd";
        menino.classList.add("meninoAzul");

    }else if(weather.innerText ==="Noite")
        body.classList.add("noite");
        menino.classList.add("meninoAmarelo");

})



