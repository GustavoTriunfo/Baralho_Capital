import {reproduzirEfeitoSonoro, iniciarCronometroMinigame, retornarAoEstadoNormal, getDefendidoContraUmaPicadaSurpresa,
    setPicadasRecebidas, setDefendidoContraUmaPicadaSurpresa, getDefendidoContraUmaPicadaParalizante,
    setDefendidoContraUmaPicadaParalizante, setCartasInvestimentosContraMosquito, getCartaJogadorRecente,
    getQuantidadeCartasJogadas, getCartasInvestimentosContraMosquito, getPicadasRecebidas, setJogoAcabou, getJogoAcabou,
    getTempoMissaoZerado
} from '../script.js'
import {alterarVidaBoss, jogadaBoss, getVidaBoss, getCartaBossRecente, pararMusica, setDanoCausado, selecionarTipoCarta,
    getDanoCausado
} from '../app.js'
import {iniciarMinigameFuga} from './miniGameFuga.js'
import {zumbidoLoucura, iniciarSusto, fumacaDanoBoss, choqueDanoBoss, danoBoss, pararZumbidoLoucura} from './mosquitoDengueBoss.js'
import {diminuirVidaJogador, curarVidaJogador, getQuantidadeHPJogador, ajustarOpacidadeVida} from '../jogador.js'

var bombardeioFumaceAcontecendo = false
var quantidadeCartasExercitoAladoUtilizadas = 0

export function ataqueBombardeioFumace(){
    pararMusica()

    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/BombardeioFumace.mp3', 0.2)
    var animatedImage = document.getElementById('animatedImage');
    if (animatedImage.src.endsWith('MosquitoDengue.png')) {
              animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengueComMedo.png';
          } else if (animatedImage.src.endsWith('mosquitao.png')) {
              animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitaoComMedo.png';
          }
          setTimeout(() => {
            var fumacaBombardeio = document.getElementById('ImagemFumace');
            fumacaBombardeio.style.display = 'block'
            fumacaDanoBoss(5000)
                setTimeout(() => {
                  setDanoCausado(30)
                  alterarVidaBoss(getVidaBoss() - 30)
                  fumacaBombardeio.style.display = 'none'
                  bombardeioFumaceAcontecendo = false
                  pararMusica()
              }, 5000);
          }, 13000); 
    }

    var efeitosSonoroSoco = [
        "/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/Soco 1.mp3",
        "/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/Soco 2.mp3"
      ];
      
      export function tocarEfeitoSoco() {
      if(efeitosSonoroSoco){
        var indice = Math.floor(Math.random() * 2); 
        var audio = new Audio(efeitosSonoroSoco[indice]);
        audio.play();
      }
      }

export function getBombardeioFumaceAcontecendo() {
    return bombardeioFumaceAcontecendo
}

export function setBombardeioFumaceAcontecendo(estado) {
    bombardeioFumaceAcontecendo = estado
}

export function acoesCartaBossMosquitoDengue() {
    if(getCartaBossRecente() === 1){
        quantidadeCartasExercitoAladoUtilizadas += 1
        iniciarCronometroMinigame(15)
        iniciarMinigameFuga()
    } else if(getCartaBossRecente() === 2){
        zumbidoLoucura()
        retornarAoEstadoNormal()
    } else if(getCartaBossRecente() === 3){
        if(getDefendidoContraUmaPicadaSurpresa() === false){
            setPicadasRecebidas(1)
        iniciarSusto()
        diminuirVidaJogador()
        retornarAoEstadoNormal()
        }else{
            setDefendidoContraUmaPicadaSurpresa(false)
            retornarAoEstadoNormal()
        }
    } else if(getCartaBossRecente() === 4){
        if(getDefendidoContraUmaPicadaParalizante() === false){
            setPicadasRecebidas(1)
        iniciarSusto()
        setTimeout(function(){
            jogadaBoss()   
        },8000)
      
        }else{
            setDefendidoContraUmaPicadaParalizante(false)
            retornarAoEstadoNormal()
        }
    } else if(getCartaBossRecente() === 12){
        alterarVidaBoss(getVidaBoss() + 20)
        retornarAoEstadoNormal()   
    } else if(getCartaBossRecente() === 13){
        alterarVidaBoss(getVidaBoss() + 100)
        retornarAoEstadoNormal()   
    }else{
        retornarAoEstadoNormal()   
    }
}

export function verificarCartasMissaoDengue() {
    let quantidadeDanoNoBoss = 0
    if(selecionarTipoCarta(getCartaJogadorRecente()) === 'ATK'){
    if(getCartaJogadorRecente() === 16){
        setBombardeioFumaceAcontecendo(true) 
        if(getCartaBossRecente() === 2){
            pararZumbidoLoucura()
        }
        ataqueBombardeioFumace()
    }  else if(getCartaJogadorRecente() === 17){
        quantidadeDanoNoBoss = 20
        fumacaDanoBoss(3500)
    } else if(getCartaJogadorRecente() === 18){
        quantidadeDanoNoBoss = 10
        danoBoss()
    } else if(getCartaJogadorRecente() === 19){
        quantidadeDanoNoBoss = 10
        danoBoss()
    } else if(getCartaJogadorRecente() === 20){
        quantidadeDanoNoBoss = 20
        fumacaDanoBoss(3500)
    } else if(getCartaJogadorRecente() === 21){
        quantidadeDanoNoBoss = 10
        danoBoss()
    } else if(getCartaJogadorRecente() === 22){
        quantidadeDanoNoBoss = 20
        choqueDanoBoss()
    }
   
    if(getCartaJogadorRecente() !== 16){
        setDanoCausado(quantidadeDanoNoBoss)
        alterarVidaBoss(getVidaBoss() - quantidadeDanoNoBoss)
        return
    } else{
        return
    }

} else if(selecionarTipoCarta(getCartaJogadorRecente()) === 'DEF'){
    if(getCartaJogadorRecente() === 23){
        setDefendidoContraUmaPicadaSurpresa(true)
      
        reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/SPRAY.mp3', 0.3)
    } else if(getCartaJogadorRecente() === 24){
        setDefendidoContraUmaPicadaParalizante(true)
   
        reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/defenseNetAltura1.mp3', 1)
    }
    return
} else if(selecionarTipoCarta(getCartaJogadorRecente()) === 'INV'){
    setCartasInvestimentosContraMosquito(1)
  
} else if(selecionarTipoCarta(getCartaJogadorRecente()) === 'CR'){
    let quantidadeDeCura = 0
    if(getCartaJogadorRecente() === 25){
        quantidadeDeCura = 20
    } else if(getCartaJogadorRecente() === 26){
        quantidadeDeCura = 50
    }
    curarVidaJogador(quantidadeDeCura)
    return
}
}

export function atualizarTelaMissaoCombateDengue() {
    var vidaJogador = document.getElementById('vidaJogador');
    vidaJogador.textContent = getQuantidadeHPJogador()

    var vidaMosquito = document.getElementById('vidaMosquito');
    vidaMosquito.textContent = getVidaBoss()
    
    var cartasJogadas = document.getElementById('cartasJogadas');
    cartasJogadas.textContent = getQuantidadeCartasJogadas()

    var danoCausadoTotal = document.getElementById('danoCausado');
    danoCausadoTotal.textContent = getDanoCausado()

    var defesaContraPicadaSur = document.getElementById('defesaContraPicadaSur');
    defesaContraPicadaSur.textContent = getDefendidoContraUmaPicadaSurpresa()

    var defesaContraPicadaPar = document.getElementById('defesaContraPicadaPar');
    defesaContraPicadaPar.textContent = getDefendidoContraUmaPicadaParalizante()

    var investimentosContraMosquitoTotal = document.getElementById('investimentosContraMosquito');
    investimentosContraMosquitoTotal.textContent = getCartasInvestimentosContraMosquito()

    var danoRecebido = document.getElementById('danoRecebido');
    danoRecebido.textContent = getPicadasRecebidas()
}

export function finalizarMissaoCombateDengue() {
    if(getJogoAcabou() === false){

        if(getVidaBoss() < 10){
            pararZumbidoLoucura()
            pararMusica()
            ajustarOpacidadeVida(0)
            reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/MorteMosquito.mp3', 1)
            reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/Saint-Saëns_ Le carnaval des animaux, R. 125_ VII. Aquarium - VIII. Personnages à longues....mp3', 0.5)
            var endgameOverlay = document.getElementById('endgameOverlay');
            endgameOverlay.style.display = 'block';
            setJogoAcabou(true)
            setTimeout(function(){
                var animatedImage = document.getElementById('animatedImage');
                animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/Grave.png';
                animatedImage.style.top = "0px";
                animatedImage.style.width = "350px";
            },4000)
     
    
        } else if(getQuantidadeHPJogador() < 2 || getTempoMissaoZerado() === true){
            pararMusica()
            reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/Darkest Dungeon - Death door bell.mp3', 1)
            var endgamePlayerLose = document.getElementById('endgamePlayerLose');
            endgamePlayerLose.style.display = 'block';
            setJogoAcabou(true)
        }
        }
}

export function getQuantidadeCartasExercitoAladoUtilizadas() {
    return quantidadeCartasExercitoAladoUtilizadas
}

export function setQuantidadeCartasExercitoAladoUtilizadas(numero) {
    quantidadeCartasExercitoAladoUtilizadas += numero
}
