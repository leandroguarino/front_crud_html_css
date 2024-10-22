// Falso banco de dados de clientes, em memória RAM
var clientes = []

function mostrarModal(){
    const modal = document.getElementById("modal")
    modal.style.display = "block"
}

function ocultarModal(){
    const modal = document.getElementById("modal")
    modal.style.display = "none"
}

function adicionar(){
    mostrarModal()
}

function alterar(){
    mostrarModal()
}

function excluir(cpf){
    if (confirm("Deseja realmente excluir este body builder?")){
        //busca o cliente pelo cpf e exclui-o se encontrar
        for(let i = 0; i < clientes.length; i++){
            let cliente = clientes[i]
            if (cliente.cpf == cpf){
                clientes.splice(i, 1)
                alert("Excluído com sucesso")
                atualizarLista()
            }
        }

        
    }
}

function salvar(){
    let nome = document.getElementById("nome").value
    let cpf = document.getElementById("cpf").value
    let peso = document.getElementById("peso").value
    let altura = document.getElementById("altura").value
    let dataNascimento = document.getElementById("dataNascimento").value

    let novoBodyBuilder = {
        nome: nome,
        cpf: cpf,
        peso: peso,
        altura: altura,
        dataNascimento: dataNascimento
    }

    //adiciona um bodyBuilder na lista de clientes
    clientes.push(novoBodyBuilder)

    alert("Cadastrado com sucesso")
    ocultarModal()

    limparFormulario()

    atualizarLista()
    return false
}

function limparFormulario(){
    document.getElementById("nome").value = ""
    document.getElementById("cpf").value = ""
    document.getElementById("peso").value = ""
    document.getElementById("altura").value = ""
    document.getElementById("dataNascimento").value = ""
}

function atualizarLista(){
    let tbody = document.getElementsByTagName("tbody")[0] //pega o primeiro tbody da página
    tbody.innerHTML = "" //limpa as linhas da tabela
    for(let i = 0; i < clientes.length; i++){
        let cliente = clientes[i]
        
        let linhaTabela = document.createElement("tr")
        linhaTabela.innerHTML = `
            <td>${cliente.cpf}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.peso}kg</td>
            <td>${cliente.altura}m</td>
            <td>${cliente.dataNascimento}</td>
            <td>
                <button onclick="alterar()">Alterar</button>
                <button onclick="excluir('${cliente.cpf}')">Excluir</button>
            </td>`
        
        tbody.appendChild(linhaTabela)
    }
}