document.addEventListener("DOMContentLoaded", function() {
  const square = document.querySelector(".square");
  const innerBlackDiv = document.querySelector(".inner-black-div");
  const moveUpButton = document.getElementById("move-up");
  const moveDownButton = document.getElementById("move-down");
  const moveLeftButton = document.getElementById("move-left");
  const moveRightButton = document.getElementById("move-right");
  const squareStyle = getComputedStyle(square);
  let topPosition = parseInt(squareStyle.top);
  let leftPosition = parseInt(squareStyle.left);
  

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

  function moveSquare(direction) {
      const innerDivStyle = getComputedStyle(innerBlackDiv);

      switch(direction) {
          case "up":
              if (topPosition > 60) {
                  square.style.top = `${Math.max(0, topPosition - 20)}px`;
                  topPosition -= 20;
              }
              break;
          case "down":
              if (topPosition < 540) {
                  square.style.top = `${Math.max(0, topPosition + 20)}px`;
                  topPosition += 20;
              }
              break;
          case "left":
              if (leftPosition > 40) {
                  square.style.left = `${Math.max(0, leftPosition - 20)}px`;
                  leftPosition -= 20;
              }
              break;
          case "right":
              if (leftPosition < 320) {
                  square.style.left = `${Math.max(0, leftPosition + 20)}px`;
                  leftPosition += 20;
              }
              break;
      }
      checkPlayerCollision();
  }

  let enemyPositions = [];

  function moveEnemy(enemy) {
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

      // Verificar se houve colisão com outros inimigos
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

  window.criarInimigos = function(tempo, quantidadeInimigos) {
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

            // Adicionar posição do inimigo ao array
            enemyPositions.push({ enemy: enemy, top: enemyTopPosition, left: enemyLeftPosition });

            setInterval(function() {
                moveEnemy(enemy);
            }, tempo); // Ajuste o intervalo conforme necessário para a velocidade desejada
        }, Math.random() * 1000 * i); // Cria cada inimigo em um intervalo aleatório de tempo
    }
}

  function checkPlayerCollision() {
    enemyPositions.forEach(posicao => {
        if (checkCollision(posicao.enemy, square)) {
            finalizarMinigameFuga();
        }
    });
}

 
});

let gameEnded = false;

function checkCollision(square1, square2) {
  const rect1 = square1.getBoundingClientRect();
  const rect2 = square2.getBoundingClientRect();

  return !(rect1.right < rect2.left || 
           rect1.left > rect2.right || 
           rect1.bottom < rect2.top || 
           rect1.top > rect2.bottom);
}

function iniciarMinigameFuga(){
  let blackOverlay = document.querySelector('.black-overlay');
  blackOverlay.style.display = "block";
  criarInimigos(30, 10);
  gameEnded = false; 
  reproduzirEfeitoMinigameStart()
 // alert('Sobreviva até que o tempo acabe!')
}

function finalizarMinigameFuga(){
 
  if (!gameEnded) {
    let blackOverlay = document.querySelector('.black-overlay');
    blackOverlay.style.display = "none";
  
  
      const enemies = document.querySelectorAll('.enemy');
      enemies.forEach(enemy => {
        enemy.remove();
      });
      //clearInterval(cronometroMinigameAtual);
      cronometroAtivo = false
      enemyPositions = [];
  //alert("Game Over! Você colidiu com um inimigo.");
    gameEnded = true; 
    reproduzirEfeitoMinigameOverLoser()
    jogadaBoss()
  }
}

function finalizarMinigameFugaVitorioso(){
  
    if (!gameEnded) {
        let blackOverlay = document.querySelector('.black-overlay');
        blackOverlay.style.display = "none";
      
      
          const enemies = document.querySelectorAll('.enemy');
          enemies.forEach(enemy => {
            enemy.remove();
          });
          
         
          enemyPositions = [];
        
        //alert("Você sobreviveu!! :D");
        gameEnded = true; 
        retornarAoEstadoNormal()
        reproduzirEfeitoMinigameVictory()
    }
  }