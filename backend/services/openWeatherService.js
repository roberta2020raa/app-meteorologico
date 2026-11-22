export async function consultarOpenWeather(cidade) {
    const apiKey = process.env.OPENWEATHER_API_KEY

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${apiKey}&units=metric&lang=pt_br`
    const resposta = await fetch(url);

    if(resposta.ok === false){
        const error = new Error("Erro ao consultar a OpenWeather");
        error.status = resposta.status;
        throw error;
    }
    const dados = await resposta.json();
    return dados;
}
