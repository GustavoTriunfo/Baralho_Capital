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
      const innerDivWidth = parseInt(innerDivStyle.width);
   
     
  
      switch(direction) {
        case "up":
          if (topPosition > 60) {
            square.style.top = `${Math.max(0, topPosition - 20)}px`;
            topPosition -= 20
            console.log(innerDivWidth + " , " + topPosition)
          }
          break;
        case "down":
          if (topPosition < 540) {
            square.style.top = `${Math.max(0, topPosition + 20)}px`;
            topPosition += 20
            console.log(innerDivWidth + " , " + topPosition)
          }
          break;
        case "left":
          if (leftPosition > 40) {
            square.style.left = `${Math.max(0, leftPosition - 20)}px`;
            leftPosition -= 20
            console.log(innerDivWidth + " , " + leftPosition)
          }
          break;
        case "right":
            if (leftPosition < 320) {
                square.style.left = `${Math.max(0, leftPosition + 20)}px`;
                leftPosition += 20
                console.log(innerDivWidth + " , " + leftPosition)
          }
          break;
      }
    }

    let enemyPositions = [];
    
  

    function criarInimigos(tempo, quantidadeInimigos) {
      for (let i = 0; i < quantidadeInimigos; i++) {
          setTimeout(function() {
              const enemy = document.createElement("div");
              enemy.className = "enemy";
              innerBlackDiv.appendChild(enemy);
    
              let enemyTopPosition, enemyLeftPosition;
    
              // Função para definir a posição do inimigo sem sobreposição
              function definirPosicaoInimigo() {
                  enemyTopPosition = Math.floor(Math.random() * parseInt(getComputedStyle(innerBlackDiv).height));
                  enemyLeftPosition = Math.floor(Math.random() * parseInt(getComputedStyle(innerBlackDiv).width));
                  
                  // Verificar se a nova posição se sobrepõe com as posições existentes
                  let sobreposicao = enemyPositions.some(posicao => {
                      return Math.abs(posicao.top - enemyTopPosition) < 60 && Math.abs(posicao.left - enemyLeftPosition) < 80;
                  });
    
                  // Se houver sobreposição, chamar novamente a função para definir uma nova posição
                  if (sobreposicao) {
                      definirPosicaoInimigo();
                  } else {
                      // Se não houver sobreposição, adicionar a posição do inimigo ao array
                      enemyPositions.push({ top: enemyTopPosition, left: enemyLeftPosition });
                  }
              }
    
              definirPosicaoInimigo();
    
              // Definir a posição inicial do inimigo no CSS
              enemy.style.top = `${enemyTopPosition}px`;
              enemy.style.left = `${enemyLeftPosition}px`;
    
              setInterval(function() {
                  // Movendo o inimigo na direção do jogador
                  let topDifference = topPosition - parseInt(enemy.style.top) - 60;
                  let leftDifference = leftPosition - parseInt(enemy.style.left) - 40;
    
                  // Movendo o inimigo na direção do jogador com base na diferença
                  if (topDifference !== 0) {
                      enemy.style.top = `${parseInt(enemy.style.top) + Math.sign(topDifference)}px`;
                  }
                  if (leftDifference !== 0) {
                      enemy.style.left = `${parseInt(enemy.style.left) + Math.sign(leftDifference)}px`;
                  }
    
                  // Atualizar posição do jogador (se necessário)
                  topPosition = parseInt(squareStyle.top);
                  leftPosition = parseInt(squareStyle.left);
              }, tempo); // Ajuste o intervalo conforme necessário para a velocidade desejada
          }, Math.random() * 1000 * i); // Cria cada inimigo em um intervalo aleatório de tempo
      }
    }
    
  // Chame a função para criar múltiplos inimigos
  criarInimigos(30, 10);
  
    
    

  });
  