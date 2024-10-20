import CartasMissaoCombateDengue from './MissaoCombateDengue/cartasMissaoCombateDengue.js';
import {rearrangeCards} from './playerCard.js';
import {jogadorAtual, jogador2, alternarJogador, selecionarIdCarta} from '../../Back_end/TelaDoJogo/startJogo.js'
import {reproduzirEfeitoSonoro, getTempoMissaoZerado,
    atualizarNumeroCarta} from './script.js'
import {getQuantidadeHPJogador} from './jogador.js'
import {alterarFaseBossMosquitoDengue, verificarCartaEscolhidaDenguemonio, verificaJogadaMosquito
} from './MissaoCombateDengue/mosquitoDengueBoss.js'
import {getBombardeioFumaceAcontecendo, acoesCartaBossMosquitoDengue, finalizarMissaoCombateDengue,
     verificarCartasMissaoDengue, atualizarTelaMissaoCombateDengue
} from './MissaoCombateDengue/efeitosTelaMissaoCombateDengue.js'
import {verificarCartasMissaoQueimadas, atualizarTelaMissaoCombateQueimadas, finalizarMissaoCombateQueimadas} from './MissaoCombateQueimadas/efeitosTelaMissaoCombateQueimadas.js'
import {verificarCartaEscolhidaFogareu, verificaJogadaFogareu} from './MissaoCombateQueimadas/fogareuFoguentoBoss.js'

var alteracaoBossJaAconteceu = false
var danoCausado = 0
var vidaBoss = 100
var efeitoSonoro = true;
var missao = ''
var transicaoBoss = false
const Cartas = CartasMissaoCombateDengue
var cartaBossRecente = 3
var musicaTocando = true;

function getParametroMissao() {
    const params = new URLSearchParams(window.location.search);
    return params.get('missao');
  }
  
  export function selecionarMissao() {
    missao = getParametroMissao();
    if (missao === 'combate-as-queimadas') {
    } else if (missao === 'combate-mosquito-dengue') { 
    }
  }
  
export function selecionarTipoCarta(id){
    if (Cartas[id]) {
        return Cartas[id].tipo;
    } else {
        console.error('Tipo de carta não encontrada para o id:', id);
        return null;
    }
};

export function selecionarCaminhoImagem(id) {
    if (Cartas[id]) {
        return Cartas[id].caminhoImagem;
    } else {
        console.error('Caminho de carta não encontrada para o id:', id);
        return null;
    }
}


export function alterarVidaBoss(porcentagem) {
      var bossHealthBar = document.getElementById('bossHealthBar');
      if(porcentagem <= 0){
        porcentagem = 0
        vidaBoss = 0
      } else if(porcentagem >= 100){
        porcentagem = 100
        vidaBoss = 100
      } else {
        vidaBoss = porcentagem
    }
      bossHealthBar.style.width = porcentagem + '%';
      bossHealthBar.setAttribute('aria-valuenow', porcentagem);

      if(vidaBoss < 60 && alteracaoBossJaAconteceu === false){
        setTransicaoBoss(true)
        alteracaoBossJaAconteceu = true
        alterarFaseBoss()
      } else if (vidaBoss < 10) {
        terminarJogo()
      }
    }

export function alterarFaseBoss() {
    if (missao === 'combate-mosquito-dengue') {
        alterarFaseBossMosquitoDengue()
    } else if (missao === 'combate-as-queimadas'){

    }
}

export function atualizarStatusJogo(){
    
    if(verificarFim() === false){
        if(jogadorAtual === jogador2){
            turnoJogador()
            alternarJogador()
        } else{
            turnoBoss()
            alternarJogador()
            atualizarStatusJogo()
        }
    }else{
        terminarJogo()
    }
}

function turnoJogador(){
    reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/cardInTable.mp3');
}

function turnoBoss(){
    if(vidaBoss > 9){
    jogadaBoss()
    } else{
        terminarJogo()
    }
}

export function jogadaBoss() {
    if (missao === 'combate-mosquito-dengue'){
        verificaJogadaMosquito()
    } else if (missao === 'combate-as-queimadas') {
        verificaJogadaFogareu()
    }
}

export function escolhaDoBoss(){
    if (missao === 'combate-mosquito-dengue'){
        verificarCartaEscolhidaDenguemonio()
    } else if (missao === 'combate-as-queimadas') {
        verificarCartaEscolhidaFogareu()
    }
}

function verificarFim(){
    if(vidaBoss < 10){
        return true
    } else if(getQuantidadeHPJogador() < 2){
        return true
    } else if(getTempoMissaoZerado()){
        return true
    }
    return false
}

export function pararMusica() {
    let imagemBotaoMusica = document.getElementById('imagemMusica');
    if (musicaTocando || getTempoMissaoZerado() === true || getBombardeioFumaceAcontecendo()) {
        musica.pause(); // Pausa a música se estiver tocando
        musicaTocando = false;
        imagemBotaoMusica.src = "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/songFalse.png";
    } else {
        musica.play(); // Toca a música se estiver parada
        musicaTocando = true;
        imagemBotaoMusica.src = "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/songTrue.png";
    }
  }

export function terminarJogo(){
    if (missao === 'combate-mosquito-dengue'){
        finalizarMissaoCombateDengue()
    } else if (missao === 'combate-as-queimadas') {
        finalizarMissaoCombateQueimadas()
    }
}

export function atualizarTelaStatus(){
    if (missao === 'combate-mosquito-dengue'){
        atualizarTelaMissaoCombateDengue()
    } else if (missao === 'combate-as-queimadas') {
        atualizarTelaMissaoCombateQueimadas()
    }
}

export function verificarCartaJogador(){
    if (missao === 'combate-mosquito-dengue'){
        verificarCartasMissaoDengue()
    } else if (missao === 'combate-as-queimadas') {
        verificarCartasMissaoQueimadas()
    }
}

export function verificarCartaBoss(){
    if (missao === 'combate-mosquito-dengue') {
        acoesCartaBossMosquitoDengue()
    }
  
}

// Obtém a referência para o elemento da imagem que o jogador irá clicar
var imagemBaralho = document.getElementById('imagemBaralho');

// Adiciona um event listener para detectar o clique na imagem
imagemBaralho.addEventListener('click', function() {
    // Obtém a quantidade atual de cartas existentes
    var quantidadeCartas = document.querySelectorAll('.player-card').length;
    // Verifica se o jogador já tem 5 cartas
    if (quantidadeCartas >= 5) {
    
        return; // Sai da função se o limite for atingido
    }
    // Calcula o número da nova carta
    var idCorrespondente = selecionarIdCarta()
    
    // Cria uma nova div para representar a nova carta
    var novaCarta = document.createElement('div');
    // Adiciona as classes de estilo
    novaCarta.classList.add('player-card');
    // Define o atributo de dados para representar o número da carta
    novaCarta.id = idCorrespondente;
    novaCarta.dataset.cardNumber = atualizarNumeroCarta(1);
    novaCarta.style.zIndex = "10";
    selecionarImagem(idCorrespondente, novaCarta);
    // Adiciona a nova carta ao elemento card-holder
    document.querySelector('.card-holder').appendChild(novaCarta);
    reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/cardInTable.mp3');
    // Chama a função para selecionar a imagem com base no ID e definir como fundo da nova carta
    

    // Chama a função para configurar os eventos das cartas do jogador
    rearrangeCards();
});


export function selecionarImagem(idImagem, novaCarta) {
    var enderecoImagem = Cartas[idImagem].caminhoImagem;
    
    // Cria um elemento de imagem
    var imagem = document.createElement('img');
    // Define o caminho da imagem
    imagem.src = enderecoImagem;

    // Adiciona a imagem como filho da div novaCarta
    novaCarta.appendChild(imagem);
}

export function getCartaBossRecente() {
    return cartaBossRecente
}

export function setCartaBossRecente(numero) {
    cartaBossRecente = numero
}

export function getEstadoEfeitoSonoro() {
    return efeitoSonoro
  }
  
  export function setEstadoEfeitoSonoro(estado) {
    efeitoSonoro = estado
  }

  export function getVidaBoss() {
    return vidaBoss
  }

  export function getDanoCausado() {
    return danoCausado
  }

  export function setDanoCausado(numero) {
    danoCausado += numero
  }

  export function getMissaoSelecionada() {
    return missao
  }


  export function getTransicaoBoss() {
    return transicaoBoss
  }

  export function setTransicaoBoss(estado){
    transicaoBoss = estado
  }

  export function getAlteracaoBossJaAconteceu() {
    return alteracaoBossJaAconteceu
  }

  export function setAlteracaoBossJaAconteceu(estado) {
    alteracaoBossJaAconteceu = estado
  }

 