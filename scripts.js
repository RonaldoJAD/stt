const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let valorCompra, valorPago, score = 0, attempts = 3, timer = 30, highScore = 0;
let imagensCarregadas = 0;
let isPaused = false;
let interval;

let cliente = new Image();
let caixa = new Image();
let dinheiro = new Image();

cliente.src = 'https://cdn-icons-png.flaticon.com/512/1995/1995511.png';
caixa.src = 'https://cdn-icons-png.flaticon.com/512/2896/2896436.png';
dinheiro.src = 'https://cdn-icons-png.flaticon.com/512/1041/1041884.png';

cliente.onload = verificarCarregamento;
caixa.onload = verificarCarregamento;
dinheiro.onload = verificarCarregamento;

function verificarCarregamento() {
    imagensCarregadas++;
    if (imagensCarregadas === 3) {
        carregarItems();
    }
}

function carregarItems() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            window.items = data;
        })
        .catch(error => console.error('Erro ao carregar os itens:', error));
}

function gerarValorAleatorio(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function gerarValores() {
    const randomItem = window.items[Math.floor(Math.random() * window.items.length)];
    valorCompra = randomItem.price;
    valorPago = parseFloat(gerarValorAleatorio(valorCompra + 1.00, valorCompra + 50.00));

    document.getElementById("equation").innerText = `R$${valorPago} - R$${valorCompra} = ?`;
    document.getElementById("question").innerText = `Compra: ${randomItem.name}, Pago: R$${valorPago}. Qual é o troco?`;

    desenharGrafico();
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
        feedback.className = "correct";
        score += 10;
        scoreDisplay.innerText = score;
        if (score > highScore) {
            highScore = score;
            document.getElementById("highScore").innerText = highScore;
            localStorage.setItem('highScore', highScore);
        }
    } else {
        feedback.innerText = `Errado! O troco correto é R$${trocoEsperado.toFixed(2)}`;
        feedback.className = "incorrect";
        attempts--;
        attemptsDisplay.innerText = attempts;
        if (attempts <= 0) {
            alert("Fim de jogo! Sua pontuação foi " + score);
            restartGame();
        }
    }

    gerarValores();
    document.getElementById("answer").value = '';
}

function desenharGrafico() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cliente, 50, 50, 100, 100);
    ctx.drawImage(caixa, 200, 50, 100, 100);
    ctx.drawImage(dinheiro, 350, 50, 100, 100);
}

function loop() {
    gerarValores();
    interval = setInterval(() => {
        if (!isPaused) {
            timer--;
            document.getElementById("timer").innerText = timer;
            if (timer <= 0) {
                clearInterval(interval);
                alert("Fim de jogo! Sua pontuação foi " + score);
                restartGame();
            }
        }
    }, 1000);
}

function startGame() {
    document.getElementById("playButton").style.display = 'none';
    document.getElementById("restartButton").style.display = 'inline';
    document.getElementById("pauseButton").style.display = 'inline';
    loop();
}

function restartGame() {
    clearInterval(interval);
    score = 0;
    attempts = 3;
    timer = 30;
    document.getElementById("score").innerText = score;
    document.getElementById("attempts").innerText = attempts;
    document.getElementById("timer").innerText = timer;
    document.getElementById("feedback").innerText = '';
    document.getElementById("feedback").className = '';
    gerarValores();
}

function togglePause() {
    isPaused = !isPaused;
    document.getElementById("pauseButton").innerText = isPaused ? "Continuar" : "Pausar";
}

window.onload = function() {
    const savedHighScore = localStorage.getItem('highScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        document.getElementById("highScore").innerText = highScore;
    }
};