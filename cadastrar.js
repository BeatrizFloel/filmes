document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCadastro");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const genre = document.getElementById("genre").value.trim();
        const ageRating = Number(document.getElementById("ageRating").value);
        const duration = Number(document.getElementById("duration").value);

        if (!title || !genre || Number.isNaN(ageRating) || Number.isNaN(duration)) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        const filme = {
            title,
            genre,
            duration,
            age_rating: ageRating
        };

        try {
            const resposta = await fetch("https://filmes-beatrizfloelegiovannamiglior.vercel.app/filmes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filme)
            });

            const mensagem = await resposta.text();
            alert(mensagem || "Filme cadastrado com sucesso!");

            if (resposta.ok) {
                window.location.href = "./frontend/index.html";
            }
        } catch (erro) {
            console.error(erro);
            alert("Erro ao cadastrar filme.");
        }
    });
});