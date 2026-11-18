import express from "express";

const app = express();
const PORT = 3000;


app.get("/clima",(req,res)=>{
    const cidade = req.query.cidade;
    console.log(cidade);
    if (!cidade){
        res.status(400).json({
            erro:"Cidade não informada"
        });
        return;
    }

    const clima={
        cidade:cidade,
        temperatura:27,
        umidade:65,
        condição:"Ensolarado"
    };

    res.json(clima);
});

app.listen(PORT, ()=>{
console.log(`Servidor rodando na porta ${PORT}`);
});