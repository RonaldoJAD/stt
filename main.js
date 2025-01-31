function arredondarValor(valor) {
    let centavos = valor * 100;
    if ([1, 2].includes(centavos % 10)) {
        centavos = Math.floor(centavos / 10) * 10;
    } else if ([3, 4, 6, 7].includes(centavos % 10)) {
        centavos = Math.floor(centavos / 10) * 10 + 5;
    } else {
        centavos = Math.ceil(centavos / 10) * 10;
    }
    return centavos / 100;
}

function calcularTroco(valorPago, valorProduto) {
    valorProduto = arredondarValor(valorProduto);
    let troco = valorPago - valorProduto;
    const moedas = [1.00, 0.50, 0.25, 0.10, 0.05];
    let trocoFinal = [];

    for (let moeda of moedas) {
        let quantidadeMoedas = Math.floor(troco / moeda);
        troco -= quantidadeMoedas * moeda;
        if (quantidadeMoedas > 0) {
            trocoFinal.push({ quantidade: quantidadeMoedas, moeda: moeda });
        }
    }

    return trocoFinal;
}