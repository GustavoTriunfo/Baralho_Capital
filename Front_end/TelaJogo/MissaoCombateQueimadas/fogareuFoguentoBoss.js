import {setCartaBossRecente, getCartaBossRecente, selecionarCaminhoImagem} from '../app.js'
import {adicionarCartaLadoEsquerdo, getEstadoIntro} from './MissaoCombateQueimadas.js'
import {reproduzirEfeitoSonoro, retornarAoEstadoNormal} from '../script.js'
import {verificarCartasMissaoQueimadas} from './efeitosTelaMissaoCombateQueimadas.js'

export function verificarCartaEscolhidaFogareu() {
   let min = 0; 
   let max = 9; 
   let cartaSelecionada = Math.floor(Math.random() * (max - min + 1)) + min;

   if (Math.random() < 0.3) {
    const cartasEspeciais = [1, 9, 3];
    cartaSelecionada = cartasEspeciais[Math.floor(Math.random() * cartasEspeciais.length)];
}
   setCartaBossRecente(cartaSelecionada)
}

export function verificaJogadaFogareu() {
    if (getEstadoIntro() === false) {
        verificarCartasMissaoQueimadas();
    }
    verificarCartaEscolhidaFogareu();
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/jogadaFogareu.mp3', 0.3);
    adicionarCartaLadoEsquerdo(selecionarCaminhoImagem(getCartaBossRecente()));
    setTimeout(() => {
        retornarAoEstadoNormal();
    }, 200);  
}