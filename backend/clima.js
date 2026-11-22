import {consultarOpenWeather} from "./services/openWeatherService.js"
import { interpretarClima } from "./services/interpretarClimaService.js";

export async function clima(req, res) {
    const cidade = req.query.cidade;
    if (typeof cidade !== "string") {
        res.status(400).json("Valor invalido!");
        return;
    }

    const cidadeNormalizada = cidade.trim();
    console.log(cidadeNormalizada);
    if (!cidadeNormalizada) {
        res.status(400).json({
            erro: "Cidade não informada"
        });
        return;
    }
    try {
        const dadosClima = await consultarOpenWeather(cidadeNormalizada);
        const cidadeClima = dadosClima.name;
        const temperaturaClima = dadosClima.main.temp;
        const umidadeClima = dadosClima.main.humidity;
        const { condicaoTraduzida, ehDia } = interpretarClima(dadosClima);
        res.json({
            cidade:cidadeClima,
            temperatura:temperaturaClima,
            umidade:umidadeClima,
            condição:condicaoTraduzida,
            ehDia:ehDia,
            timezone: dadosClima.timezone,
            descricao: dadosClima.weather[0].description,
            temperaturaMinima: dadosClima.main.temp_min,
            temperaturaMaxima: dadosClima.main.temp_max
        });

        return

    } catch (error) {
        if (error.status === 404) {
            res.status(404).json({ erro: "Cidade não encontrada" });
            return;
        }
        console.error(error);
        res.status(502).json({erro:"Não foi possível consultar o clima"});

        return

    }


}
