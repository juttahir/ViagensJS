const passageiros = JSON.parse(localStorage.getItem("passageiros")) || []

passageiros.forEach( passageiro => card(passageiro) )

function card(passageiro){

        const content = `
        <td>${passageiro.nome}</td>
        <td>${passageiro.sobrenome}</td>
        <td>${passageiro.aviacao}</td>
        <td>${passageiro.origem}</td>
        <td>${passageiro.destino}</td>
        <td>${passageiro.voo}</td>
        <td>${passageiro.dataVoo}</td>
        <td>
            <button type="button" class="btn btn-primary btn-sm editar" data-id="${passageiro.id}">Editar</button>
            <button type="button" class="btn btn-danger btn-sm excluir" data-id="${passageiro.id}">Excluir</button>
        </td>
        `

        const card = document.createElement("tr")
        card.innerHTML = content

    document
        .querySelector("#listaDePassageiros")
        .appendChild(card);
}


// --------- editar ---------
document.querySelectorAll(".editar").forEach(button => {
    button.addEventListener("click", (event) => {
        const passageiroId = event.target.getAttribute("data-id");

        const passageiro = encontrarPassageiroPorId(passageiroId);
                
        $('#modalEditar').on('shown.bs.modal', function () {
            document.getElementById('nomeEdit').value = passageiro.nome;
            document.getElementById('sobrenomeEdit').value = passageiro.sobrenome;
            document.getElementById('destinoEdit').value = passageiro.destino;
            document.getElementById('origemEdit').value = passageiro.origem;
            document.getElementById('aviacaoEdit').value = passageiro.aviacao;
            document.getElementById('vooEdit').value = passageiro.voo;
            document.getElementById('dataVooEdit').value = passageiro.dataVoo;
        });
      
        $('#modalEditar').modal('show');
        console.log("Editar passageiro com ID:", passageiroId);
        

        $('#salvarAlteracoes').click(function() {
            passageiro.nome = $('#nomeEdit').val();
            passageiro.sobrenome = $('#sobrenomeEdit').val();
            passageiro.destino = $('#destinoEdit').val();
            passageiro.origem = $('#origemEdit').val();
            passageiro.aviacao = $('#aviacaoEdit').val();
            passageiro.voo = $('#vooEdit').val();
            passageiro.dataVoo = $('#dataVooEdit').val();

            let passageiros = JSON.parse(localStorage.getItem("passageiros")) || [];

            passageiros = passageiros.map(p => {
                if (p.id === passageiroId) {
                    return passageiro;
                } else {
                    return p;
                }
            });

            localStorage.setItem("passageiros", JSON.stringify(passageiros));

            $('#modalEditar').modal('hide');
            window.location = "Consulta.html"
        });

    });
});



// --------- excluir ---------
function encontrarPassageiroPorId(id) {
    const passageiros = JSON.parse(localStorage.getItem("passageiros")) || [];
    return passageiros.find(passageiro => passageiro.id === id) || null;
}

document.querySelectorAll(".excluir").forEach(button => {
    button.addEventListener("click", (event) => {
        const passageiroId = event.target.getAttribute("data-id");
        const passageiro = encontrarPassageiroPorId(passageiroId);
        console.log("Excluir passageiro com ID:", passageiroId);

        if (confirm("Tem certeza de que deseja excluir o passageiro " + passageiro.nome + "?")) {
            const index = passageiros.findIndex(passageiro => passageiro.id === passageiroId);
            
            if (index !== -1) {
                passageiros.splice(index, 1);
                
                localStorage.setItem("passageiros", JSON.stringify(passageiros));
                
                event.target.closest("tr").remove();
                
                console.log("Passageiro excluído com sucesso:", passageiroId.nome);
            } else {
                console.error("Passageiro não encontrado:", passageiroId.nome);
            }
        }
    });
});
