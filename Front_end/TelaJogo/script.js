import {escolhaDoBoss, getCartaBossRecente, selecionarCaminhoImagem, terminarJogo} from './app.js'
import {finalizarMinigameFugaVitorioso} from './MissaoCombateDengue/miniGameFuga.js'

var jogoAcabou = false;
var cartaJogadorRecente = 16;
var cronometroAtivo = false;
var cronometroAtivoJogo = false;
var tempoMissaoZerado = false;
var quantidadeCartasJogadas = 0;
var numeroCarta = 0;

export function ocultarMaoJogador() {
  var maoJogador = document.getElementById('maoJogador');
  var baralho = document.getElementById('imagemBaralho');
  maoJogador.style.pointerEvents = 'none';
  baralho.style.pointerEvents = 'none';

  maoJogador.classList.add("disabled");
  baralho.classList.add("disabled");
}

export function retornarAoEstadoNormal() {
  var maoJogador = document.getElementById('maoJogador');
  var baralho = document.getElementById('imagemBaralho');

  maoJogador.style.pointerEvents = 'auto';
  baralho.style.pointerEvents = 'auto';

  maoJogador.classList.remove("disabled");
  baralho.classList.remove("disabled");
}

export function visualizacaoCartaBoss(){
      escolhaDoBoss()
      let cartaSelecionada = getCartaBossRecente()
      var imgElement = document.createElement('img');
      imgElement.src = selecionarCaminhoImagem(cartaSelecionada);

      var cartaBoss = document.getElementById('opponentCardPreviewOverlay');
      cartaBoss.classList.remove("d-none");
      cartaBoss.appendChild(imgElement);
}

export function iniciarCronometro(tempoRecebido) {
  var elementoTempo = document.getElementById("tempo-restante-div");
  elementoTempo.classList.remove("d-none");
  
  var tempoRestante = tempoRecebido; // Tempo inicial em segundos

  cronometroAtivo = true; // Define o cronômetro como ativo
  
  var cronometro = setInterval(function() {
      // Atualiza o tempo restante na tela
      document.getElementById("tempo-restante").textContent = "Aguardando Adversário: " + tempoRestante + " segundos...";
      
      // Verifica se o tempo acabou ou se o cronômetro foi interrompido
      if (tempoRestante <= 0 || !cronometroAtivo) {
          clearInterval(cronometro); // Para o cronômetro
          elementoTempo.classList.add("d-none");
          document.getElementById("tempo-restante").textContent = "Aguardando Adversário: 16 segundos..." 
          return;
      }
      
      // Decrementa o tempo restante
      tempoRestante--;
  }, 1000);
}

export function iniciarCronometroMinigame(tempoRecebido) {
  var elementoTempo = document.getElementById("tempo-minigame-div");
  elementoTempo.classList.remove("d-none");
  
  var tempoRestante = tempoRecebido; // Tempo inicial em segundos

  cronometroAtivoJogo = true; // Define o cronômetro como ativo
  
  var cronometro = setInterval(function() {
      // Atualiza o tempo restante na tela
      document.getElementById("tempo-minigame").textContent = "Tempo restante: " + tempoRestante + "s...";
      
      // Verifica se o tempo acabou ou se o cronômetro foi interrompido
      if (tempoRestante <= 0 || !cronometroAtivoJogo) {
          clearInterval(cronometro); // Para o cronômetro
          elementoTempo.classList.add("d-none");
          document.getElementById("tempo-minigame").textContent = "Tempo restante: 16s..." 
          finalizarMinigameFugaVitorioso()
          return;
      }
      
      // Decrementa o tempo restante
      tempoRestante--;
  }, 1000);
}

export function iniciarCronometroTempoMissao(tempoRecebido) {
  var elementoTempo = document.getElementById("tempo-missao-div");
  elementoTempo.classList.remove("d-none");
  
  var tempoRestante = tempoRecebido; // Tempo inicial em segundos

  
  var cronometro = setInterval(function() {
      // Atualiza o tempo restante na tela com formatação
      document.getElementById("tempo-missao").textContent = formatarTempo(tempoRestante);
      
      // Verifica se o tempo acabou ou se o cronômetro foi interrompido
      if (tempoRestante <= 0 || jogoAcabou === true) {
          clearInterval(cronometro); // Para o cronômetro
          elementoTempo.classList.add("d-none");
          tempoMissaoZerado = true;
          terminarJogo()
          return;
      }
      
      // Decrementa o tempo restante
      tempoRestante--;
  }, 1000);
}

function formatarTempo(segundos) {
  var minutos = Math.floor(segundos / 60);
  var segundos = segundos % 60;
  return (minutos < 10 ? "0" : "") + minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
}

export function reproduzirEfeitoSonoro(url, volume = 1){
  var audio = new Audio(url);
  audio.volume = volume; 
  audio.play();
}

document.getElementById('imagemDerrota').addEventListener('click', function() {
  window.location.href = '/Baralho_Capital/Front_end/TelaMissoes/mapaMissoes.html';
});

function checkOrientation() {
const contentElement = document.querySelector('.content');
const warningElement = document.querySelector('.landscape-warning');

if (contentElement && warningElement) {
  if (window.innerHeight < window.innerWidth) {
    contentElement.style.display = 'none';
    warningElement.style.display = 'block';
  } else {
    contentElement.style.display = 'block';
    warningElement.style.display = 'none';
  }
} else {
  console.error('Elementos não encontrados.');
}
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

export function getNumeroCarta() {
    return numeroCarta;
}

export function setNumeroCarta(numero) {
    numeroCarta += numero;
}

export function atualizarNumeroCarta(numero) {
   let valorAtualizado = getNumeroCarta() + numero
   setNumeroCarta(valorAtualizado)
   return valorAtualizado
}

export function getCartaJogadorRecente() {
    return cartaJogadorRecente;
}

export function setCartaJogadorRecente(novoNumero) {
    cartaJogadorRecente = novoNumero
}

export function getTempoMissaoZerado() {
    return tempoMissaoZerado;
}

export function getQuantidadeCartasJogadas() {
    return quantidadeCartasJogadas
}

export function setQuantidadeCartasJogadas(numero) {
    quantidadeCartasJogadas += numero
}

export function setCronometroAtivo(estado) {
    cronometroAtivo = estado
}

export function setCronometroAtivoJogo(estado) {
    cronometroAtivoJogo = estado
}

export function getJogoAcabou() {
    return jogoAcabou
}

export function setJogoAcabou(estado) {
    jogoAcabou = estado
}