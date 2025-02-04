function validateForm() {
    var nome = document.getElementById('nome').value;
    var endereco = document.getElementById('endereco').value;
    var produto = document.getElementById('produto').value;
    var telefone = document.getElementById('telefone').value;

    // Verificar se todos os campos estão preenchidos
    if (nome === "" || endereco === "" || telefone === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    // Verificar se o nome do produto foi preenchido
    var produtoNome = document.getElementById('produtoNome').value;
    if (produtoNome === "") {
        alert("Por favor, preencha o nome do produto.");
        return false;
    }

    // Verificar se a categoria é "Ração" e a quantidade em kg foi preenchida
    if (produto === "racao") {
        var quantidadeKg = document.getElementById('quantidadeKg').value;
        if (quantidadeKg === "") {
            alert("Por favor, selecione a quantidade da ração.");
            return false;
        }

        // Salvar os detalhes da ração no localStorage
        localStorage.setItem('quantidadeKg', quantidadeKg);
    }

    // Verificar se a categoria é "Eletrônicos", "Hidráulicos" ou outra e a quantidade em unidades foi preenchida
    if (produto !== "racao") {
        var quantidadeUnidade = document.getElementById('quantidadeUnidade').value;
        if (quantidadeUnidade === "") {
            alert("Por favor, insira a quantidade em unidades.");
            return false;
        }

        // Salvar os detalhes da quantidade em unidades
        localStorage.setItem('quantidadeUnidade', quantidadeUnidade);
    }

    // Salvar as informações gerais no localStorage
    localStorage.setItem('nome', nome);
    localStorage.setItem('endereco', endereco);
    localStorage.setItem('produto', produto);
    localStorage.setItem('telefone', telefone);

    // Salvar o nome do produto
    localStorage.setItem('produtoNome', produtoNome);

    // Redirecionar para a segunda página (confirmação do pedido)
    window.location.href = 'confirmacao.html';
    return false;
}

// Função para exibir os detalhes do produto com base na categoria escolhida
function toggleProductDetails() {
    var produto = document.getElementById('produto').value;
    var racaoDetails = document.getElementById('racaoDetails');
    var unidadeDetails = document.getElementById('unidadeDetails');

    // Se o produto for "Ração", mostrar os detalhes de quantidade em kg
    if (produto === "racao") {
        racaoDetails.style.display = "block";
        unidadeDetails.style.display = "none";
    } else {
        // Para outros produtos, mostrar a quantidade em unidades
        unidadeDetails.style.display = "block";
        racaoDetails.style.display = "none";
    }
}
