function comprarWhatsApp(nomeProduto, preco) {
    const numeroWhatsApp = "5531983737130"; // Número formatado com código do Brasil (55) e DDD (31)

    // Pegando os valores do formulário (certifique-se de que os IDs correspondem aos do HTML)
    const quantidade = document.getElementById("quantidade") ? document.getElementById("quantidade").value : 1;
    const endereco = document.getElementById("endereco") ? document.getElementById("endereco").value : "Endereço não informado";
    const pagamento = document.getElementById("pagamento") ? document.getElementById("pagamento").value : "Forma de pagamento não informada";

    // Criando a mensagem personalizada
    const mensagem = `Olá, Lê Rações! Meu pedido é:
    
    *Produto:* ${nomeProduto}
    *Quantidade:* ${quantidade}
    *Valor Total:* R$ ${(preco * quantidade).toFixed(2)}
    *Endereço:* ${endereco}
    *Pagamento:* ${pagamento}

    Por favor, confirme.`;

    // Gerando o link para o WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
}
