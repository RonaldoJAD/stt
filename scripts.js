let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
    alert(`${nome} foi adicionado ao carrinho!`);
}

function comprarAgora(nome, preco) {
    alert(`Você comprou ${nome} por R$ ${preco}`);
}

function atualizarCarrinho() {
    const carrinhoElement = document.querySelector('.carrinho a');
    carrinhoElement.textContent = `Carrinho (${carrinho.length})`;
}