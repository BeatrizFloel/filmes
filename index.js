const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos", 
    database: "alunos_filmes03MB"
});

db.connect((err) => {
    if (err) {
        console.log("Erro ao conectar ao banco!");
        console.log(err);
    } else {
        console.log("Conectado ao banco de dados!");
    }
});

app.get("/filmes", (req, res) => {

    const sql = "SELECT * FROM filmes_BeatrizFloelGiovannaMigliorini";

    db.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });

});


app.get("/filmes/:id", (req, res) => {

    const sql = "SELECT * FROM filmes_BeatrizFloelGiovannaMigliorini WHERE id = ?";

    db.query(sql, [req.params.id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });

});


app.post("/filmes", (req, res) => {

    const { title, genre, duration, age_rating } = req.body;

    const sql = `
        INSERT INTO filmes_BeatrizFloelGiovannaMigliorini
        (title, genre, duration, age_rating)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [title, genre, duration, age_rating], (erro) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.send("Filme cadastrado com sucesso!");
    });

});


app.put("/filmes/:id", (req, res) => {

    const { title, genre, duration, age_rating } = req.body;

    const sql = `
        UPDATE filmes_BeatrizFloelGiovannaMigliorini
        SET title = ?, genre = ?, duration = ?, age_rating = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [title, genre, duration, age_rating, req.params.id],
        (erro) => {
            if (erro) {
                return res.status(500).json(erro);
            }

            res.send("Filme atualizado com sucesso!");
        }
    );

});

app.delete("/filmes/:id", (req, res) => {                                     

    const sql = "DELETE FROM filmes_BeatrizFloelGiovannaMigliorini WHERE id = ?";

    db.query(sql, [req.params.id], (erro) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.send("Filme excluído com sucesso!");
    });

});


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});