
process.loadEnvFile("./.env");
import express from "express";
import { clima } from "./clima.js";
import cors from "cors";

const app = express();
app.use(cors({origin:"http://127.0.0.1:5500"}));

const PORT = 3000;

app.get("/clima", clima);

app.listen(PORT, ()=>{
console.log(`Servidor rodando na porta ${PORT}`);
});
