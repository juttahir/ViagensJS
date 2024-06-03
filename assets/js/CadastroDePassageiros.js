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
            aviacao: form.aviacao.value,
            origem: form.origem.value,
            destino: form.destino.value,
            voo: form.voo.value,
            dataVoo: form.dataVoo.value
        }

        console.log(form.nome.value)

        if(passageiro.nome && 
            passageiro.sobrenome &&
            passageiro.aviacao &&
            passageiro.origem &&
            passageiro.destino &&
            passageiro.voo &&
            passageiro.dataVoo
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