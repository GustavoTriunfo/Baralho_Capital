import { reproduzirEfeitoSonoro, retornarAoEstadoNormal, setCronometroAtivo, setCronometroAtivoJogo } from '../script.js';
import { jogadaBoss } from '../app.js';

let enemyPositions = [];
let gameEnded = false;
let minigameCriado = false
let topPosition = 0
let leftPosition = 0

export function iniciarMinigameFuga() {
    if(minigameCriado === false){
        minigameCriado = true
        atribuirEventosMovimentacaoMinigame()
    }
    const blackOverlay = document.querySelector('.black-overlay');
    blackOverlay.style.display = "block";
    criarInimigos(30, 10);
    gameEnded = false;

    reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/mus_sfx_star.wav');
}

function finalizarMinigameFuga() {
    if (!gameEnded) {
        const blackOverlay = document.querySelector('.black-overlay');
        blackOverlay.style.display = "none";

        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => enemy.remove());
        
        setCronometroAtivo(false);
        enemyPositions = [];
        gameEnded = true; 
        setCronometroAtivoJogo(true);

        reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/snd_fall2.wav');
        jogadaBoss();
    }
}

export function finalizarMinigameFugaVitorioso() {
    if (!gameEnded) {
        const blackOverlay = document.querySelector('.black-overlay');
        blackOverlay.style.display = "none";

        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => enemy.remove());

        enemyPositions = [];
        gameEnded = true; 
        retornarAoEstadoNormal();

        reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/snd_levelup.wav');
    }
}

window.criarInimigos = function(tempo, quantidadeInimigos) {
    const innerBlackDiv = document.querySelector('.inner-black-div');
    const square = document.querySelector(".square");
    const squareStyle = getComputedStyle(square);
     topPosition = parseInt(squareStyle.top);
     leftPosition = parseInt(squareStyle.left);
    
    for (let i = 0; i < quantidadeInimigos; i++) {
        setTimeout(function() {
            const enemy = document.createElement("div");
            enemy.className = "enemy";
            innerBlackDiv.appendChild(enemy);

            const distanciaMinima = 100;
            const innerDivHeight = parseInt(getComputedStyle(innerBlackDiv).height);
            const innerDivWidth = parseInt(getComputedStyle(innerBlackDiv).width);
            let enemyTopPosition, enemyLeftPosition;

            do {
                enemyTopPosition = Math.floor(Math.random() * innerDivHeight);
                enemyLeftPosition = Math.floor(Math.random() * innerDivWidth);
            } while (Math.abs(enemyTopPosition - topPosition) < distanciaMinima || Math.abs(enemyLeftPosition - leftPosition) < distanciaMinima);

            enemy.style.top = `${enemyTopPosition}px`;
            enemy.style.left = `${enemyLeftPosition}px`;

            enemyPositions.push({ enemy: enemy, top: enemyTopPosition, left: enemyLeftPosition });

            setInterval(function() {
                moveEnemy(enemy, square, topPosition, leftPosition);
            }, tempo); // Ajuste o intervalo conforme necessário para a velocidade desejada
        }, Math.random() * 1000 * i); // Cria cada inimigo em um intervalo aleatório de tempo
    }
}

function moveSquare(direction) {
    const square = document.querySelector(".square");
    const squareStyle = getComputedStyle(square);
    let topPosition = parseInt(squareStyle.top);
    let leftPosition = parseInt(squareStyle.left);

    switch (direction) {
        case "up":
            if (topPosition > 60) {
                square.style.top = `${Math.max(0, topPosition - 20)}px`;
            }
            break;
        case "down":
            if (topPosition < 540) {
                square.style.top = `${Math.max(0, topPosition + 20)}px`;
            }
            break;
        case "left":
            if (leftPosition > 40) {
                square.style.left = `${Math.max(0, leftPosition - 20)}px`;
            }
            break;
        case "right":
            if (leftPosition < 320) {
                square.style.left = `${Math.max(0, leftPosition + 20)}px`;
            }
            break;
    }
    checkPlayerCollision(square);
    atualizarPosicaoJogador(topPosition, leftPosition)
}

function moveEnemy(enemy, square, topPosition, leftPosition) {
    const enemyStyle = getComputedStyle(enemy);
    let enemyTopPosition = parseInt(enemyStyle.top);
    let enemyLeftPosition = parseInt(enemyStyle.left);

    let topDifference = topPosition - enemyTopPosition - 60;
    let leftDifference = leftPosition - enemyLeftPosition - 40;

    if (topDifference !== 0) {
        enemy.style.top = `${parseInt(enemy.style.top) + Math.sign(topDifference)}px`;
    }
    if (leftDifference !== 0) {
        enemy.style.left = `${parseInt(enemy.style.left) + Math.sign(leftDifference)}px`;
    }

    // Atualizar posição do inimigo
    enemyTopPosition = parseInt(enemy.style.top);
    enemyLeftPosition = parseInt(enemy.style.left);

    // Verificar colisão com outros inimigos
    enemyPositions.forEach(posicao => {
        if (enemy !== posicao.enemy && checkCollision(enemy, posicao.enemy)) {
            // Reposiciona o inimigo para evitar a colisão
            let angle = Math.random() * 2 * Math.PI;
            let newTop = enemyTopPosition + Math.cos(angle) * 20;
            let newLeft = enemyLeftPosition + Math.sin(angle) * 20;

            enemy.style.top = `${newTop}px`;
            enemy.style.left = `${newLeft}px`;
        }
    });

    // Atualizar posição do inimigo no array
    enemyPositions = enemyPositions.map(posicao => {
        if (posicao.enemy === enemy) {
            return { enemy: enemy, top: enemyTopPosition, left: enemyLeftPosition };
        }
        return posicao;
    });

    if (checkCollision(enemy, square)) {
        finalizarMinigameFuga();
    }
}

// Função para verificar colisões do jogador
function checkPlayerCollision(square) {
    enemyPositions.forEach(posicao => {
        if (checkCollision(posicao.enemy, square)) {
            finalizarMinigameFuga();
        }
    });
}

function atualizarPosicaoJogador(posicaoTop, posicaoEsquerda) {
    topPosition = posicaoTop
    leftPosition = posicaoEsquerda
}

// Função para verificar colisões
function checkCollision(square1, square2) {
    const rect1 = square1.getBoundingClientRect();
    const rect2 = square2.getBoundingClientRect();

    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function atribuirEventosMovimentacaoMinigame(){
    const moveUpButton = document.getElementById("move-up");
    const moveDownButton = document.getElementById("move-down");
    const moveLeftButton = document.getElementById("move-left");
    const moveRightButton = document.getElementById("move-right");

    moveUpButton.addEventListener("click", function() {
        moveSquare("up");
    });

    moveDownButton.addEventListener("click", function() {
        moveSquare("down");
    });

    moveLeftButton.addEventListener("click", function() {
        moveSquare("left");
    });

    moveRightButton.addEventListener("click", function() {
        moveSquare("right");
    });
}