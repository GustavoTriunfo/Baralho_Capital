import {setCartaBossRecente, getCartaBossRecente, selecionarCaminhoImagem, getTurnoMaisLongoDoJogador,
    setTurnoMaisLongoDoJogador,
    getVidaBoss
} from '../app.js'
import {adicionarCartaLadoEsquerdo, getEstadoIntro} from './MissaoCombateQueimadas.js'
import {reproduzirEfeitoSonoro, retornarAoEstadoNormal, getJogoAcabou} from '../script.js'
import {verificarCartasMissaoQueimadas, iniciarCronometroLance, getJogadorSofreuDano, getJogadorLevouDanoPorTempoZerado,
    setJogadorLevouDanoPorTempoZerado
} from './efeitosTelaMissaoCombateQueimadas.js'

var tempoRodada = 5
var tempoDeRespostaFogareu = 1

export function verificarCartaEscolhidaFogareu() {
   let min = 0; 
   let max = 9; 
   let cartaSelecionada = Math.floor(Math.random() * (max - min + 1)) + min;

   if (Math.random() < 0.4) {
    const cartasEspeciais = [1, 9, 3];
    cartaSelecionada = cartasEspeciais[Math.floor(Math.random() * cartasEspeciais.length)];
}
   setCartaBossRecente(cartaSelecionada)
}

export function verificaJogadaFogareu() {
    if(getJogadorSofreuDano() === false) {
    if (getEstadoIntro() === false && getJogadorLevouDanoPorTempoZerado() === false) {
        verificarCartasMissaoQueimadas();
    }
    if(getJogadorSofreuDano() === false) {
    setJogadorLevouDanoPorTempoZerado(false)
    verificarCartaEscolhidaFogareu();
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/jogadaFogareu.mp3', 0.3);
    adicionarCartaLadoEsquerdo(selecionarCaminhoImagem(getCartaBossRecente()), tempoDeRespostaFogareu);
    setTimeout(() => {
        if(getJogoAcabou() === false) {
            if (getTurnoMaisLongoDoJogador() === false) {
                iniciarCronometroLance(tempoRodada)
            } else {
                iniciarCronometroLance(15)
                setTurnoMaisLongoDoJogador(false)
            }
            acoesFogareuApartirDeVida();
            retornarAoEstadoNormal();
        }
    }, 200);  
    }
 } else {
        return
    }
}

function acoesFogareuApartirDeVida() {
    const vidaBoss = getVidaBoss();
    const vidaMaximaBoss = 100 // Supondo que haja uma função que retorna a vida máxima do boss
    const porcentagemVida = (vidaBoss / vidaMaximaBoss) * 100; // Calcula a porcentagem de vida do boss

    if (porcentagemVida > 80) {
        tempoDeRespostaFogareu = 1;
        tempoRodada = 5;
    } else if (porcentagemVida <= 80 && porcentagemVida > 60) {
        tempoDeRespostaFogareu = 0.7;
        tempoRodada = 4;
    } else if (porcentagemVida <= 60 && porcentagemVida > 40) {
        tempoDeRespostaFogareu = 0.4;
        tempoRodada = 3;
    } else if (porcentagemVida <= 40 && porcentagemVida > 10) {
        tempoDeRespostaFogareu = 0.2;
        tempoRodada = 2;
    } else {
        // Caso o boss tenha menos que 10% de vida
        tempoDeRespostaFogareu = 0.1; // Resposta ainda mais rápida
        tempoRodada = 1; // Rodada mais curta
    }
}