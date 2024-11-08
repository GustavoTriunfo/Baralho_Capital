import {setCartaBossRecente, getCartaBossRecente, selecionarCaminhoImagem} from '../app.js'
import {adicionarCartaLadoEsquerdo, getEstadoIntro} from './MissaoCombateQueimadas.js'
import {reproduzirEfeitoSonoro, retornarAoEstadoNormal, getJogoAcabou} from '../script.js'
import {verificarCartasMissaoQueimadas, iniciarCronometroLance, getJogadorSofreuDano, getJogadorLevouDanoPorTempoZerado,
    setJogadorLevouDanoPorTempoZerado
} from './efeitosTelaMissaoCombateQueimadas.js'

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
    adicionarCartaLadoEsquerdo(selecionarCaminhoImagem(getCartaBossRecente()));
    setTimeout(() => {
        if(getJogoAcabou() === false) {
            iniciarCronometroLance()
            retornarAoEstadoNormal();
        }
    }, 200);  
    }
 } else {
        return
    }
}