import express, { Request, Response, Router } from "express";
import { UsersController } from "./controller/users.controller";

const app = express();

app.use(express.json());

app.all("/", (req: Request, res: Response) => {
  console.log("cheguei ate aqui");
  res.status(200).json({ message: "To aqui" });
});

app.listen(3000, () => {
  console.log("Serve ON, PORTA 3000");
  console.log("Servidor rodando em http://localhost:3000");
});

// Tratamento de erros não capturados
process.on("uncaughtException", (error) => {
  console.error("Erro não capturado:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Promise rejeitada não tratada:", reason);
  process.exit(1);
});
