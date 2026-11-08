import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const times = [
  { id: 1, nome: "Grêmio", estadio: "Arena do Grêmio", cidade: "Porto Alegre" },
  { id: 2, nome: "Internacional", estadio: "Beira-Rio", cidade: "Porto Alegre" },
  { id: 3, nome: "Flamengo", estadio: "Maracanã", cidade: "Rio de Janeiro" }
];
app.get("/", (req, res) => {
  res.render("index", {
    mensagem: "Bem-vindo ao catálogo de times!"
  });
});

app.get("/times", (req, res) => {
  res.render("times", { times });
});

app.get("/times/:id", (req, res) => {
  const id = Number(req.params.id);
  const time = times.find((time) => time.id === id);

  if (!time) {
    return res.status(404).send("Time não encontrado.");
  }

  res.render("detalhe", { time });
});

app.listen(PORT, () => {
  console.log(`Servidor disponível em http://localhost:${PORT}`);
});