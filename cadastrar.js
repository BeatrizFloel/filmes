function cadastrarFilme() {
    const title = document.getElementById("title").value
    const gender = document.getElementById("gender").value
    const ageLimit = document.getElementById("ageLimit").valueAsNUmber
    const duration = document.getElementById("duration").valueAsNUmber


if (title === "" || gender === "" || ageLimit === || duration === "") {
    alert("Preencha todos os campos!")
    return
 }

 const filme = {
    title: title.value,
    gender: gender.value,
    ageLimit: ageLimit.valueAsNumber,
    duration: duration.valueAsNumber
 }

 const resposta = await fetch "https://filmes-backend", {
    method: "POST",
    headers: {
        "content-type": "application/json"
    }
    body: JSON.stringify(filme)
 }

 const mensagem = await resposta.json()


}