export async function buscarClima(cidade) {
    const url =(`http://localhost:3000/clima?cidade=${encodeURIComponent(cidade)}`);
    const resposta = await fetch(url);
    if(resposta.ok === false){
        const error = new Error("Erro ao consultar o clima");
        error.status = resposta.status;
        throw error;
    }
    const dados = await resposta.json();
    return dados;
}
