const API_URL = "https://filmes-beatrizfloelegiovannamiglior.vercel.app";

async function buscarFilmes() {
    const resposta = await fetch(`${API_URL}/`)
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")

    sectionFilmes.innerHTML = ""

    if (!filmes.length) {
        sectionFilmes.innerHTML = '<div class="empty-state">Nenhum filme cadastrado ainda.</div>'
        return
    }

    filmes.forEach((filme) => {
        const classificacao = Number(filme.age_rating ?? filme.ageLimit ?? 0)
        const textoClassificacao = classificacao > 0 ? `${classificacao} anos` : "Livre"

        const card = document.createElement("article")
        card.className = "movie-card"
        card.innerHTML = `
            <div class="movie-meta">
                <span class="movie-badge">${filme.genre || "Gênero"}</span>
            </div>
            <h2>${filme.title}</h2>
            <ul class="movie-info">
                <li>
                    <span>Duração</span>
                    <strong>${filme.duration} min</strong>
                </li>
                <li>
                    <span>Classificação</span>
                    <strong>${textoClassificacao}</strong>
                </li>
            </ul>
            <div class="movie-actions">
                <button class="btn btn-secondary btn-editar" data-id="${filme.id}" type="button">Editar</button>
                <button class="btn btn-danger btn-apagar" data-id="${filme.id}" type="button">Excluir</button>
            </div>
        `

        sectionFilmes.appendChild(card)
    })
}

async function apagarFilme(id) {
    const resposta = await fetch(`${API_URL}/filmes/${id}`, {
        method: "DELETE"
    })

    if (!resposta.ok) {
        alert("Erro ao excluir filme.")
        return
    }

    alert("Filme excluído com sucesso!")
    buscarFilmes()
}

document.addEventListener("click", (event) => {
    const botaoEditar = event.target.closest(".btn-editar")

    if (botaoEditar) {
        const id = botaoEditar.dataset.id
        window.location.href = `../editar.html?id=${id}`
        return
    }

    const botaoApagar = event.target.closest(".btn-apagar")

    if (!botaoApagar) return

    const id = botaoApagar.dataset.id
    apagarFilme(id)
})

buscarFilmes()