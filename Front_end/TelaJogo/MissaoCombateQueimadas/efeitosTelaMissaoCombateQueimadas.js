import {getCartaEscolhidaPorJogador} from './MissaoCombateQueimadas.js'
import {getCartaBossRecente, pararMusica} from '../app.js'
import {diminuirVidaJogador} from '../jogador.js'
import {danoNoJogador} from './animacoesMissao/animacoesNaTelaMissao.js'
import {setJogoAcabou, getJogoAcabou, reproduzirEfeitoSonoro} from '../script.js'


export function verificarCartasMissaoQueimadas() {
    if(
        parseInt(getCartaBossRecente()) === 3 && parseInt(getCartaEscolhidaPorJogador()) === 10 || 
        parseInt(getCartaBossRecente()) === 1 && parseInt(getCartaEscolhidaPorJogador()) === 11 || 
        parseInt(getCartaBossRecente()) === 9 && parseInt(getCartaEscolhidaPorJogador()) === 12 || 
        ([2, 4, 5, 6, 7, 8, 0].includes(parseInt(getCartaBossRecente())) && parseInt(getCartaEscolhidaPorJogador()) === 13)
    ) {
        adicionarPontoAJogador()
    } else {
        diminuirVidaJogador()
        danoNoJogador()
    }
    console.log(getCartaBossRecente() + ' ' + getCartaEscolhidaPorJogador())
}

export function atualizarTelaMissaoCombateQueimadas() {

}

export function finalizarMissaoCombateQueimadas() {
    if(getJogoAcabou() === false) {
    pararMusica()
    reproduzirEfeitoSonoro("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Creepy Asteroid.mp3", 1);
    setJogoAcabou(true)
    var endgamePlayerLose = document.getElementById('endgamePlayerLose');
    var imagemDerrota = document.getElementById('imagemDerrota');
    endgamePlayerLose.style.display = 'block';
    imagemDerrota.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/burnedSkull.png'

    const imagemOverlay = document.createElement('img');
    var corpo = document.body
    imagemOverlay.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogoFundoDerrota.gif';

    // Definir estilo para a nova imagem
    imagemOverlay.style.position = 'fixed';
    imagemOverlay.style.top = '0';
    imagemOverlay.style.left = '0';
    imagemOverlay.style.width = '100%';
    imagemOverlay.style.height = '100%';
    imagemOverlay.style.objectFit = 'cover';
    imagemOverlay.style.zIndex = '10000'; // Garantir que fique no topo
    imagemOverlay.style.opacity = '0.8'; // Leve transparência
    imagemOverlay.style.pointerEvents = 'none'; // Permite clique através da imagem

    // Adiciona a imagem ao body
    corpo.appendChild(imagemOverlay);
}
}

export function adicionarPontoAJogador() {

}