import express from "express"
import cors from "cors"
import mysql2 from "mysql2"

const app = express()

app.use(express.json())
app.use(cors());


const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos", 
    database: "alunos_filmes03MB"
});



app.get("/filmes", (req, res) => {

    const sql = "SELECT * FROM filmes_BeatrizFloelGiovannaMigliorini";

    sql.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.json(resultado);
    });

});


app.get("/filmes/:id", (req, res) => {

    const sql = "SELECT * FROM filmes_BeatrizFloelGiovannaMigliorini WHERE id = ?";

    sql.query(sql, [req.params.id], (erro, resultado) => {
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

    sql.query(sql, [title, genre, duration, age_rating], (erro) => {
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

    sql.query(
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

    sql.query(sql, [req.params.id], (erro) => {
        if (erro) {
            return res.status(500).json(erro);
        }

        res.send("Filme excluído com sucesso!");
    });

});


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});