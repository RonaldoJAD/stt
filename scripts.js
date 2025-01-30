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
        loop();
    }
}

cliente.onload = verificarCarregamento;
caixa.onload = verificarCarregamento;
dinheiro.onload = verificarCarregamento;

function gerarValores() {
    function gerarValorAjustado() {
        return (Math.floor(Math.random() * 90) + 10) + (Math.random() < 0.5 ? 0.00 : 0.05);
    }
    
    valorCompra = parseFloat(gerarValorAjustado().toFixed(2));
    valorPago = parseFloat((gerarValorAjustado() + valorCompra).toFixed(2));
    
    document.getElementById("equation").innerText = `R$${valorPago} - R$${valorCompra} = ?`;
    document.getElementById("question").innerText = `Compra: R$${valorCompra}, Pago: R$${valorPago}. Qual é o troco?`;
}

function desenharCenario() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "brown";
    ctx.fillRect(0, 300, canvas.width, 100);
    
    ctx.drawImage(cliente, 50, 180, 100, 100);
    ctx.drawImage(caixa, 650, 200, 100, 100);
    ctx.drawImage(dinheiro, 380, 250, 50, 50);
}

function verificarResposta() {
    const respostaUsuario = parseFloat(document.getElementById("answer").value);
    const trocoCorreto = parseFloat((valorPago - valorCompra).toFixed(2));
    const feedback = document.getElementById("feedback");
    const scoreDisplay = document.getElementById("score");
    const attemptsDisplay = document.getElementById("attempts");

    if (respostaUsuario === trocoCorreto) {
        feedback.innerText = "Correto!";
        feedback.style.color = "green";
        score += 10;
        gerarValores();
    } else {
        feedback.innerText = "Troco incorreto!";
        feedback.style.color = "red";
        attempts--;
    }

    scoreDisplay.innerText = score;
    attemptsDisplay.innerText = attempts;

    if (attempts === 0) {
        alert("Fim de jogo! Sua pontuação: " + score);
        if (score > highScore) {
            highScore = score;
            document.getElementById("highScore").innerText = highScore;
        }
        score = 0;
        attempts = 3;
        gerarValores();
    }
}

function loop() {
    desenharCenario();
    requestAnimationFrame(loop);
}

function startTimer() {
    const timerDisplay = document.getElementById("timer");
    const countdown = setInterval(() => {
        timer--;
        timerDisplay.innerText = timer;
        if (timer <= 0) {
            clearInterval(countdown);
            alert("Tempo esgotado! Sua pontuação: " + score);
            if (score > highScore) {
                highScore = score;
                document.getElementById("highScore").innerText = highScore;
            }
            score = 0;
            attempts = 3;
            gerarValores();
            timer = 30;
            startTimer();
        }
    }, 1000);
}

gerarValores();
startTimer();
