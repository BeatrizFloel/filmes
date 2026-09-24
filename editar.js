document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("formEdicao")
    const tituloPagina = document.getElementById("tituloPagina")
    const parametros = new URLSearchParams(window.location.search)
    const id = parametros.get("id")

    if (!form || !tituloPagina) return

    if (!id) {
        alert("Filme não informado.")
        window.location.href = "./frontend/index.html"
        return
    }

    try {
        const resposta = await fetch(`https://filmes-beatrizfloelegiovannamiglior.vercel.app/filmes/${id}`)

        if (!resposta.ok) {
            throw new Error("Filme não encontrado")
        }

        const filme = await resposta.json()

        document.getElementById("editTitle").value = filme.title || ""
        document.getElementById("editGenre").value = filme.genre || ""
        document.getElementById("editDuration").value = filme.duration || ""
        document.getElementById("editAgeRating").value = filme.age_rating ?? filme.ageLimit ?? ""
        tituloPagina.textContent = `Editar ${filme.title}`
    } catch (erro) {
        console.error(erro)
        alert("Não foi possível carregar o filme para edição.")
        window.location.href = "./frontend/index.html"
        return
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const title = document.getElementById("editTitle").value.trim()
        const genre = document.getElementById("editGenre").value.trim()
        const duration = Number(document.getElementById("editDuration").value)
        const ageRating = Number(document.getElementById("editAgeRating").value)

        if (!title || !genre || Number.isNaN(duration) || Number.isNaN(ageRating)) {
            alert("Preencha todos os campos corretamente!")
            return
        }

        const filmeAtualizado = {
            title,
            genre,
            duration,
            age_rating: ageRating
        }

        try {
            const resposta = await fetch(`https://filmes-beatrizfloelegiovannamiglior.vercel.app/filmes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filmeAtualizado)
            })

            const mensagem = await resposta.text()
            alert(mensagem || "Filme atualizado com sucesso!")

            if (resposta.ok) {
                window.location.href = "./frontend/index.html"
            }
        } catch (erro) {
            console.error(erro)
            alert("Erro ao atualizar filme.")
        }
    })
})
