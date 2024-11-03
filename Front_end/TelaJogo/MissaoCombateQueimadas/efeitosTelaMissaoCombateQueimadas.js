import {getCartaEscolhidaPorJogador} from './MissaoCombateQueimadas.js'
import {getCartaBossRecente, pararMusica, alterarVidaBoss, getTransicaoBoss, setTransicaoBoss, getVidaBoss} from '../app.js'
import {diminuirVidaJogador} from '../jogador.js'
import {danoNoJogador} from './animacoesMissao/animacoesNaTelaMissao.js'
import {setJogoAcabou, getJogoAcabou, reproduzirEfeitoSonoro} from '../script.js'

let pontosJogador = 0;

export function verificarCartasMissaoQueimadas() {
    if(
        parseInt(getCartaBossRecente()) === 3 && parseInt(getCartaEscolhidaPorJogador()) === 10 || 
        parseInt(getCartaBossRecente()) === 1 && parseInt(getCartaEscolhidaPorJogador()) === 11 || 
        parseInt(getCartaBossRecente()) === 9 && parseInt(getCartaEscolhidaPorJogador()) === 12 || 
        ([2, 4, 5, 6, 7, 8, 0].includes(parseInt(getCartaBossRecente())) && parseInt(getCartaEscolhidaPorJogador()) === 13)
    ) {
        if([14].includes(parseInt(getCartaEscolhidaPorJogador()))){
            alterarVidaBoss(50)
            if(getVidaBoss() <= 50 && getTransicaoBoss() === false) {
                setTransicaoBoss(true)
                transicaoFogareu()
            }
        } else {
            adicionarPontoAJogador()
        }
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

    imagemOverlay.style.position = 'fixed';
    imagemOverlay.style.top = '0';
    imagemOverlay.style.left = '0';
    imagemOverlay.style.width = '100%';
    imagemOverlay.style.height = '100%';
    imagemOverlay.style.objectFit = 'cover';
    imagemOverlay.style.zIndex = '10000';
    imagemOverlay.style.opacity = '1';
    imagemOverlay.style.pointerEvents = 'none';

    corpo.appendChild(imagemOverlay);
}
}

export function adicionarPontoAJogador() {
    let pontoContainer = document.getElementById('pontoContainer');
    if (!pontoContainer) {
        pontoContainer = document.createElement('div');
        pontoContainer.id = 'pontoContainer';
        pontoContainer.className = 'p-3 rounded';
        pontoContainer.innerHTML = `
            <span>Pontos:</span>
            <span id="pontoContador" class="ponto-contador">${pontosJogador}</span>
        `;
        document.body.appendChild(pontoContainer);
    }

    // Incrementa os pontos
    pontosJogador++;
    const pontoContador = document.getElementById('pontoContador');
    pontoContador.textContent = pontosJogador;

    // Adiciona a classe para a animação de aumento
    pontoContador.classList.add('ponto-animado');

    // Remove a animação após 300ms para o efeito de pulso
    setTimeout(() => {
        pontoContador.classList.remove('ponto-animado');
    }, 300);
}