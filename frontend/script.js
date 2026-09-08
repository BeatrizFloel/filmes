async function buscarFilmes() {
    // acessar a rota GET do backend, trazer os filmes e mostrar os filmes na tela
    const resposta = await fetch("https://filmes-beatrizfloelegiovannamiglior.vercel.app/") // resposta do backend
    const filmes = await resposta.json() // converte a resposta num objeto JS
    const sectionFilmes = document.querySelector(".filmes")

    sectionFilmes.innerHTML = ""

    filmes.forEach((filme) => {
        const card = document.createElement("div")
        card.innerHTML = `
            <h2>${filme.title}</h2>
            <p><strong>Gênero:</strong> ${filme.genre}</p>
            <p><strong>Duração:</strong> ${filme.duration} minutos</p>
            <p><strong>Classificação indicativa:</strong> ${filme.ageLimit > 0 ? filme.ageLimit + ' anos' : 'Livre'}</p>
            <button class="btn-apagar" data-id="${filme.id}" type="button">apagar</button>
        `

        sectionFilmes.appendChild(card)
    })
}

async function apagarFilme(id) {
    const resposta = await fetch(`https://filmes-beatrizfloelegiovannamiglior.vercel.app/filmes/${id}`, {
        method: "DELETE"
    })

    if (!resposta.ok) {
        alert("Erro ao apagar filme.")
        return
    }

    alert("Filme apagado com sucesso!")
    buscarFilmes()
}

document.addEventListener("click", (event) => {
    const botao = event.target.closest(".btn-apagar")

    if (!botao) return

    const id = botao.dataset.id
    apagarFilme(id)
})

buscarFilmes()