const roupasPorCondicao = new Map([
    ["Ensolarado", "meninoAmarelo"],
    ["Nublado", "meninoVerde"],
    ["Chuva", "meninoAzul"],
    ["Noite", "meninoVermelho"]
]);

function aplicarCenario(condicao, body, wrapper, ehDia) {
    body.classList.remove("ensolarado", "nublado", "tempestade", "noite", "chuvaNoite", "noiteNublado");

    if (condicao === "Ensolarado") {
        body.classList.add("ensolarado");
        wrapper.style.color = "black";
    } else if (condicao === "Noite") {
        body.classList.add("noite");
    } else if (ehDia === true || ehDia === false) {
        if (condicao === "Nublado") {
            body.classList.add(ehDia ? "nublado" : "noiteNublado");
            wrapper.style.color = "#fdfdfd";
        } else if (condicao === "Chuva") {
            body.classList.add(ehDia ? "tempestade" : "chuvaNoite");
            wrapper.style.color = "#fdfdfd";
        }
    }
}

export function aplicarVisual(condicao, body, menino, wrapper, ehDia, temperatura) {
    aplicarCenario(condicao, body, wrapper, ehDia);
    menino.classList.remove(...roupasPorCondicao.values(), "meninoFrio");

    const roupa = Number.isFinite(temperatura) && temperatura < 15
        ? "meninoFrio"
        : roupasPorCondicao.get(condicao);
    if (roupa) menino.classList.add(roupa);
}
