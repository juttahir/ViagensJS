function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document
    .querySelector("#botao-cadastrar")
    .addEventListener("click", (event) => {
        event.preventDefault()

        const form = document.querySelector("form")

        const passageiro = {
            id: uuidv4(),
            nome: form.nome.value,
            sobrenome: form.sobrenome.value,
            empresa: form.empresa.value,
            origem: form.origem.value,
            destino: form.destino.value,
            passeio: form.passeio.value,
            dataPasseio: form.dataPasseio.value
        }

        console.log(form.nome.value)

        if(passageiro.nome && 
            passageiro.sobrenome &&
            passageiro.empresa &&
            passageiro.origem &&
            passageiro.destino &&
            passageiro.passeio &&
            passageiro.dataPasseio
        ){
            console.log("Funcionou")
            salvar(passageiro)
        }
    })

function salvar(passageiro){
    const passageiros = JSON.parse(localStorage.getItem("passageiros")) || []
    passageiros.push(passageiro)
    localStorage.setItem("passageiros", JSON.stringify(passageiros))

    window.location = "Consulta.html"
}