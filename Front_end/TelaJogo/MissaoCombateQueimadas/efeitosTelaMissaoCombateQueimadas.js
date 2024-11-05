import {getCartaEscolhidaPorJogador} from './MissaoCombateQueimadas.js'
import {getCartaBossRecente, pararMusica, alterarVidaBoss, getTransicaoBoss, setTransicaoBoss, getVidaBoss, atualizarStatusJogo,
    getMusicaTocando
} from '../app.js'
import {diminuirVidaJogador, getQuantidadeHPJogador} from '../jogador.js'
import {danoNoJogador} from './animacoesMissao/animacoesNaTelaMissao.js'
import {setJogoAcabou, getJogoAcabou, reproduzirEfeitoSonoro, retornarAoEstadoNormal, ocultarMaoJogador} from '../script.js'

let pontosJogador = 0;
var jogadorSofreuDano = false
var jogadorLevouDanoPorTempoZerado = false

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
        queimarJogador()
    }
    console.log(getCartaBossRecente() + ' ' + getCartaEscolhidaPorJogador())
}

export function atualizarTelaMissaoCombateQueimadas() {

}

export function queimarJogador() {
    if(getQuantidadeHPJogador() > 2){
    pausarCronometro()
    jogadorSofreuDano = true
    reproduzirEfeitoSonoro("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/RisadaFogareu.mp3", 0.4);
    reproduzirEfeitoSonoro("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/DanoNoJogador.mp3", 1);
    diminuirVidaJogador()
    ocultarMaoJogador()
    danoNoJogador()
        setTimeout(() => {
            setJogadorSofreuDano(false)
            atualizarStatusJogo()
            retornarAoEstadoNormal()
            reiniciarCronometro()
    }, 3000);  
    }
}

export function finalizarMissaoCombateQueimadas() {
    if(getJogoAcabou() === false) {
    pausarCronometro()
    if(getMusicaTocando() === true){
    pararMusica()
    reproduzirEfeitoSonoro("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Creepy Asteroid.mp3", 1);
    }
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

let intervaloCronometro; // Variável para armazenar o intervalo do cronômetro
let tempoRestante = 5; // Tempo inicial padrão

// Função para iniciar o cronômetro com um tempo específico
export function iniciarCronometroLance(tempoInicial = 5) {
    // Define o tempo restante com o valor passado (ou o padrão de 5 segundos)
    tempoRestante = tempoInicial;

    const cronometroElement = document.getElementById('cronometro') || document.createElement('div');
    if (!document.getElementById('cronometro')) {
        cronometroElement.id = 'cronometro';
        cronometroElement.className = 'cronometro';
        document.body.appendChild(cronometroElement);
    }

    // Limpa qualquer intervalo existente para reiniciar o cronômetro do zero
    clearInterval(intervaloCronometro);

    // Inicia o intervalo para o cronômetro
    intervaloCronometro = setInterval(() => {
        const milissegundos = Math.floor((tempoRestante % 1) * 100);
        const segundos = Math.floor(tempoRestante);

        cronometroElement.textContent = `${segundos}.${milissegundos < 10 ? '0' + milissegundos : milissegundos}`;

        // Adiciona a cor vermelha quando o tempo está acabando
        if (tempoRestante <= 1) {
            cronometroElement.style.color = 'red';
        } else {
            cronometroElement.style.color = 'white';
        }

        // Animação de pulso
        if (tempoRestante % 1 === 0) {
            cronometroElement.classList.add('animacao');
            setTimeout(() => {
                cronometroElement.classList.remove('animacao');
            }, 100);
        }

        // Decrementa o tempo restante
        tempoRestante -= 0.01;

        // Limita o cronômetro a 0 e para o intervalo
        if (tempoRestante <= 0) {
            clearInterval(intervaloCronometro);
            cronometroElement.textContent = '0.00';
            queimarJogador()
            setJogadorLevouDanoPorTempoZerado(true)
        }
    }, 10); // Atualiza a cada 10 milissegundos
}

// Função para pausar o cronômetro
export function pausarCronometro() {
    clearInterval(intervaloCronometro);
}

// Função para reiniciar o cronômetro com um novo valor de tempo
export function reiniciarCronometro(tempoInicial = 5) {
    iniciarCronometroLance(tempoInicial); // Reinicia o cronômetro com o novo tempo
}

export function getJogadorSofreuDano() {
    return jogadorSofreuDano
}

export function setJogadorSofreuDano(estado) {
    jogadorSofreuDano = estado
}

export function getJogadorLevouDanoPorTempoZerado() {
    return jogadorLevouDanoPorTempoZerado
}

export function setJogadorLevouDanoPorTempoZerado(estado) {
    jogadorLevouDanoPorTempoZerado = estado
}