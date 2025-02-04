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

    // Verificar se a categoria do produto é "racao" e se o nome e quantidade foram preenchidos
    if (produto === "racao") {
        var racaoNome = document.getElementById('racaoNome').value;
        var quantidadeKg = document.getElementById('quantidadeKg').value;

        if (racaoNome === "" || quantidadeKg === "") {
            alert("Por favor, preencha o nome da ração e a quantidade.");
            return false;
        }

        // Salvar os detalhes da ração no localStorage
        localStorage.setItem('racaoNome', racaoNome);
        localStorage.setItem('quantidadeKg', quantidadeKg);
    }

    // Salvar as informações gerais no localStorage
    localStorage.setItem('nome', nome);
    localStorage.setItem('endereco', endereco);
    localStorage.setItem('produto', produto);
    localStorage.setItem('telefone', telefone);

    // Redirecionar para a segunda página (confirmação do pedido)
    window.location.href = 'confirmacao.html';
    return false;
}

// Função para exibir os detalhes da ração quando a categoria "Ração" for selecionada
function toggleProductDetails() {
    var produto = document.getElementById('produto').value;
    var racaoDetails = document.getElementById('racaoDetails');

    if (produto === "racao") {
        racaoDetails.style.display = "block"; // Exibir os detalhes da ração
    } else {
        racaoDetails.style.display = "none"; // Ocultar os detalhes da ração
    }
}
