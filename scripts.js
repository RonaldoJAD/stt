let carrinho = [];

function adicionarAoCarrinho(nomeProduto, preco) {
    carrinho.push({ nome: nomeProduto, preco: preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoItens = document.getElementById("carrinho-itens");
    const totalElement = document.getElementById("total");
    carrinhoItens.innerHTML = "";

    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        const itemElemento = document.createElement("div");
        itemElemento.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerDoCarrinho(${index})">Remover</button>`;
        carrinhoItens.appendChild(itemElemento);
    });

    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    
    const numeroWhatsApp = "5531983737130";
    let mensagem = "Olá, Lê Rações! Meu pedido é:\n\n";
    let total = 0;

    carrinho.forEach(item => {
        mensagem += `*Produto:* ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
        total += item.preco;
    });

    mensagem += `\n*Total:* R$ ${total.toFixed(2)}\n\nPor favor, confirme.`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
}
