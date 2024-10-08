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

function excluir(){
    if (confirm("Deseja realmente excluir este body builder?")){
        alert("Excluído com sucesso")
    }
}

function salvar(){
    alert("Cadastrado com sucesso")
    ocultarModal()
    return false
}