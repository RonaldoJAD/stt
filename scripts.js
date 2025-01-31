const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let valorCompra, valorPago, score = 0, attempts = 3, timer = 30, highScore = 0;
let imagensCarregadas = 0;

let cliente = new Image();
let caixa = new Image();
let dinheiro = new Image();

cliente.src = 'https://cdn-icons-png.flaticon.com/512/1995/1995511.png';
caixa.src = 'https://cdn-icons-png.flaticon.com/512/2896/2896436.png';
dinheiro.src = 'https://cdn-icons-png.flaticon.com/512/1041/1041884.png';

function verificarCarregamento() {
    imagensCarregadas++;
    if (imagensCarregadas === 3) {
        carregarItems(); // Carregar os itens após as imagens estarem carregadas
    }
}

cliente.onload = verificarCarregamento;
caixa.onload = verificarCarregamento;
dinheiro.onload = verificarCarregamento;

function gerarValorAleatorio(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

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

function gerarValores() {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    valorCompra = randomItem.price;
    valorPago = parseFloat(gerarValorAleatorio(valorCompra + 1.00, valorCompra + 50.00));

    document.getElementById("equation").innerText = `R$${valorPago} - R$${valorCompra} = ?`;
    document.getElementById("question").innerText = `Compra: ${randomItem.name}, Pago: R$${valorPago}. Qual é o troco?`;
}

function verificarResposta() {
    const respostaUsuario = parseFloat(document.getElementById("answer").value);
    const trocoCalculado = calcularTroco(valorPago, valorCompra);
    const trocoEsperado = trocoCalculado.reduce((acc, item) => acc + (item.quantidade * item.moeda), 0);

    const feedback = document.getElementById("feedback");
    const scoreDisplay = document.getElementById("score");
    const attemptsDisplay = document.getElementById("attempts");

    if (respostaUsuario === trocoEsperado) {
        feedback.innerText = "Correto!";
        score += 10;
        scoreDisplay.innerText = score;
        if (score > highScore) {
            highScore = score;
            document.getElementById("highScore").innerText = highScore;
        }
    } else {
        feedback.innerText = `Errado! O troco correto é R$${trocoEsperado.toFixed(2)}`;
        attempts--;
        attemptsDisplay.innerText = attempts;
        if (attempts <= 0) {
            alert("Fim de jogo! Sua pontuação foi " + score);
            score = 0;
            attempts = 3;
            document.getElementById("score").innerText = score;
            document.getElementById("attempts").innerText = attempts;
        }
    }

    gerarValores();
    document.getElementById("answer").value = '';
}

function carregarItems() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            window.items = data; // Armazenar os itens no objeto window para acesso global
            loop();
        });
}

function loop() {
    gerarValores();
    let interval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer <= 0) {
            clearInterval(interval);
            alert("Fim de jogo! Sua pontuação foi " + score);
            score = 0;
            attempts = 3;
            timer = 30;
            document.getElementById("score").innerText = score;
            document.getElementById("attempts").innerText = attempts;
            document.getElementById("timer").innerText = timer;
            gerarValores();
        }
    }, 1000);
}

window.onload = function() {
    loop();
};
