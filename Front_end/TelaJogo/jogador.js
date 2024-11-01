import {reproduzirEfeitoSonoro, setJogoAcabou} from './script.js'
import {terminarJogo} from './app.js'

var quantidadeHPJogador = 100.0

export function curarVidaJogador(numero) {
  var quantidadeVidaJogador = document.getElementById('playerHealthBar');
  
  if (quantidadeHPJogador < 100) {
      if (numero === 20) {
          if (quantidadeHPJogador + 33.3 < 100) {
              quantidadeHPJogador += 33.3;
          } else {
              quantidadeHPJogador = 100;
          }
      } else if (numero === 50) {
          quantidadeHPJogador = 100;
      }
      
      reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/mus_piano9.wav', 1);

      ajustarOpacidadeVida(1 - (quantidadeHPJogador / 100));

      quantidadeVidaJogador.style.width = quantidadeHPJogador + '%';
      quantidadeVidaJogador.setAttribute('aria-valuenow', quantidadeHPJogador);
  }
}
    
    export function diminuirVidaJogador() {
      var quantidadeVidaJogador = document.getElementById('playerHealthBar');
      quantidadeHPJogador -= 33.3;
      if (quantidadeHPJogador > 32){
        ajustarOpacidadeVida(1 - (quantidadeHPJogador / 100));
      }

      quantidadeVidaJogador.style.width = quantidadeHPJogador + '%';
      quantidadeVidaJogador.setAttribute('aria-valuenow', quantidadeHPJogador);
  
      if (quantidadeHPJogador < 2) {
          terminarJogo();
      }
  }

    export function ajustarOpacidadeVida(opacidade) {
      var vidaJogadorOverlay = document.getElementById('vidaJogadorOverlay');
      if (opacidade < 0) opacidade = 0;
      if (opacidade > 1) opacidade = 1;
      vidaJogadorOverlay.style.opacity = opacidade;
    }

  export function getQuantidadeHPJogador() {
    return quantidadeHPJogador
  }