import express, { Request, Response } from 'express';
import cors from 'cors'
import router from './rotas/rotas';
const app = express();
app.use(cors({origin: "http://localhost:5173"}))
app.use(express.json())
app.use(router)
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`);
});

