function validateForm() {
    var nome = document.getElementById('nome').value;
    var endereco = document.getElementById('endereco').value;
    var produto = document.getElementById('produto').value;
    var quantidade = document.getElementById('quantidade').value;
    var telefone = document.getElementById('telefone').value;

    // Verificar se todos os campos estão preenchidos
    if (nome === "" || endereco === "" || produto === "" || quantidade === "" || telefone === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    // Se todos os campos estiverem preenchidos corretamente, mostrar a página de confirmação
    localStorage.setItem('nome', nome);
    localStorage.setItem('endereco', endereco);
    localStorage.setItem('produto', produto);
    localStorage.setItem('quantidade', quantidade);
    localStorage.setItem('telefone', telefone);

    // Redirecionar para a segunda página (confirmação do pedido)
    window.location.href = 'confirmacao.html';
    return false;
}
