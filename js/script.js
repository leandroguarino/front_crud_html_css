// Falso banco de dados de clientes, em memória RAM
var clientes = []

//guarda o cliente que está sendo alterado
var clienteAlterado = null

function mostrarModal(){
    const modal = document.getElementById("modal")
    modal.style.display = "block"
}

function ocultarModal(){
    const modal = document.getElementById("modal")
    modal.style.display = "none"
}

function adicionar(){
    clienteAlterado = null // marca que está adicionando um cliente
    limparFormulario() 
    mostrarModal()
}

function alterar(cpf){
    //busca o cliente que será alterado
    for(let i=0; i < clientes.length; i++){
        let cliente = clientes[i]
        if (cliente.cpf == cpf){
            document.getElementById("nome").value = cliente.nome
            document.getElementById("cpf").value = cliente.cpf
            document.getElementById("peso").value = cliente.peso
            document.getElementById("altura").value = cliente.altura
            document.getElementById("dataNascimento").value = cliente.dataNascimento
            document.getElementById("sapato").value = cliente.sapato
            clienteAlterado = cliente //guarda o cliente que está sendo alterado
            mostrarModal()
        }
    }

    
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
    let sapato = document.getElementById("sapato").value

    let novoBodyBuilder = {
        nome: nome,
        cpf: cpf,
        peso: peso,
        altura: altura,
        dataNascimento: dataNascimento,
        sapato: sapato
    }

    //se clienteAlterado == null, então está adicionando um novo cliente
    if (clienteAlterado == null){
        fetch('http://localhost:3000/body-builder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(novoBodyBuilder)
        }).then(() => {
            alert("Cadastrado com sucesso")
        }).catch((error) => {
            alert("Erro ao cadastrar")
        })
    }else{ //senao está alterando um cliente
        clienteAlterado.nome = nome
        clienteAlterado.peso = peso
        clienteAlterado.altura = altura
        clienteAlterado.dataNascimento = dataNascimento
        clienteAlterado.sapato = sapato
        alert("Alterado com sucesso")
    }
    
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
    document.getElementById("sapato").value = ""
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
            <td>${cliente.sapato}</td>
            <td>
                <button onclick="alterar('${cliente.cpf}')">Alterar</button>
                <button onclick="excluir('${cliente.cpf}')">Excluir</button>
            </td>`
        
        tbody.appendChild(linhaTabela)
    }
}