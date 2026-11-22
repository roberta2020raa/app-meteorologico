import { aplicarVisual } from "./visual.js";
import { buscarClima } from "./api.js";

const menino = document.querySelector(".img-menino");

const body =document.querySelector("body");
const black = document.querySelector(".wrapper");
const inputValue = document.querySelector("#cityValue");
const buscar = document.querySelector("#buscar");
const searchError = document.querySelector("#search-error");
let buscaAtual = 0;


const chuva = document.querySelector(".chuva");

 
const city = document.querySelector("#city");
const temperature = document.querySelector("#temperature");
const weather = document.querySelector("#clima");
const description = document.querySelector("#description");
const weatherIcon = document.querySelector("#weather-icon");
const humidity = document.querySelector('#humidity');
const temperatureRange = document.querySelector("#temperature-range");
const minimumTemperature = document.querySelector("#minimum-temperature");
const maximumTemperature = document.querySelector("#maximum-temperature");
const localTime = document.querySelector("#local-time");
const localTimeRow = document.querySelector("#local-time-row");

const weatherIcons = new Map([
    ["Ensolarado", ["icon-sun", "icon-sun"]],
    ["Noite", ["icon-moon", "icon-moon"]],
    ["Nublado", ["icon-cloud", "icon-cloud-night"]],
    ["Chuva", ["icon-rain", "icon-rain-night"]]
]);



// EVENTOS
    menino.addEventListener("animationend",(evento)=>{
    if (evento.animationName === "caminhar"){
        menino.classList.add("meninoParado");
    }
});

buscar.addEventListener('click', async(e)=>{
    e.preventDefault();
    const cidadeDigitada = inputValue.value.trim();
    const busca = ++buscaAtual;
    if (!cidadeDigitada) {
        searchError.textContent = "Digite o nome de uma cidade.";
        return;
    }

    let dadosClima;
    try {
        dadosClima = await buscarClima(cidadeDigitada);
    } catch (error) {
        if (busca !== buscaAtual) return;
        searchError.textContent = error.status === 404
            ? "Cidade não encontrada. Verifique o nome e tente novamente."
            : "Não foi possível consultar o clima. Tente novamente.";
        return;
    }

    if (busca !== buscaAtual) return;
    searchError.textContent = "";
    console.log(dadosClima);
    city.innerText = dadosClima.cidade;
    temperature.innerText = `${Math.round(dadosClima.temperatura)}°C`;
    weather.innerText = dadosClima.condição;
    const icon = weatherIcons.get(dadosClima.condição)?.[dadosClima.ehDia === false ? 1 : 0];
    if (icon) {
        weatherIcon.setAttribute("href", `#${icon}`);
    } else {
        weatherIcon.removeAttribute("href");
    }
    humidity.innerText = `Umidade: ${dadosClima.umidade}%`;
    const descricao = dadosClima.descricao?.trim() ?? "";
    description.textContent = descricao.localeCompare(dadosClima.condição.trim(), "pt-BR", { sensitivity: "base" }) === 0
        ? ""
        : descricao;
    const { temperaturaMinima, temperaturaMaxima, timezone } = dadosClima;
    temperatureRange.hidden = !Number.isFinite(temperaturaMinima) || !Number.isFinite(temperaturaMaxima);
    minimumTemperature.textContent = temperatureRange.hidden ? "" : `Mín: ${Math.round(temperaturaMinima)}°C`;
    maximumTemperature.textContent = temperatureRange.hidden ? "" : `Máx: ${Math.round(temperaturaMaxima)}°C`;
    localTime.textContent = Number.isFinite(timezone)
        ? `Horário local: ${new Date(Date.now() + timezone * 1000).toISOString().slice(11, 16)}`
        : "";
    localTimeRow.hidden = !localTime.textContent;
    aplicarVisual(dadosClima.condição, body, menino, black, dadosClima.ehDia, dadosClima.temperatura);

    menino.classList.remove("meninoParado");
    menino.classList.remove("meninoCaminhando");

    void menino.offsetWidth;//offsetWidth pode forçar o navegador a recalcular o layout.

    menino.classList.add("meninoCaminhando");
    console.log(menino.classList);
    console.log(getComputedStyle(menino).animationName);
})



