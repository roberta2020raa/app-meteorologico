export function interpretarClima(dadosClima) {
    const condicaoClima = dadosClima.weather[0].main;
    const horarioAtualClima = dadosClima.dt;
    const nascerDoSol = dadosClima.sys.sunrise;
    const porDoSol = dadosClima.sys.sunset;
    const ehDia = (horarioAtualClima >= nascerDoSol && horarioAtualClima < porDoSol);
    const ehNoite = (horarioAtualClima < nascerDoSol || horarioAtualClima >= porDoSol);

    let condicaoTraduzida = condicaoClima;
    if (condicaoClima === "Rain") {
        condicaoTraduzida = "Chuva"
    }
    if (condicaoClima === "Clouds") {
        condicaoTraduzida = "Nublado"
    }
    if (condicaoClima === "Clear" && ehDia) {
        condicaoTraduzida = "Ensolarado"
    }
    if (condicaoClima === "Clear" && ehNoite) {
        condicaoTraduzida = "Noite"
    }
    return{condicaoTraduzida,ehDia};
}