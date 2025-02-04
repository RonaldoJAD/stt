// Preencher os detalhes do pedido na página de confirmação
document.getElementById('confirmNome').innerText = localStorage.getItem('nome');
document.getElementById('confirmEndereco').innerText = localStorage.getItem('endereco');
document.getElementById('confirmProduto').innerText = localStorage.getItem('produto');
document.getElementById('confirmQuantidade').innerText = localStorage.getItem('quantidade');
document.getElementById('confirmTelefone').innerText = localStorage.getItem('telefone');

// Função para confirmar o pedido
function confirmarPedido() {
    // Aqui você pode enviar os dados para o banco de dados (PHP ou outra linguagem)
    // Por enquanto, vamos apenas mostrar a mensagem de sucesso

    alert("Pedido Encaminhado!");
    
    // Limpar os dados do localStorage
    localStorage.clear();

    // Redirecionar para a página inicial após a confirmação
    window.location.href = 'index.html';
}
