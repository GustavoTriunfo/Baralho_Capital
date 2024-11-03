import {setCartaBossRecente, getCartaBossRecente, selecionarCaminhoImagem} from '../app.js'
import {adicionarCartaLadoEsquerdo} from './MissaoCombateQueimadas.js'
import {reproduzirEfeitoSonoro, retornarAoEstadoNormal} from '../script.js'

export function verificarCartaEscolhidaFogareu() {
   let min = 1; 
   let max = 10; 
   let cartaSelecionada = Math.floor(Math.random() * (max - min + 1)) + min;
   setCartaBossRecente(cartaSelecionada)
}

export function verificaJogadaFogareu() {
    verificarCartaEscolhidaFogareu();
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/jogadaFogareu.mp3');
    adicionarCartaLadoEsquerdo(selecionarCaminhoImagem(getCartaBossRecente()));
    setTimeout(() => {
        retornarAoEstadoNormal();
    }, 1300);  
}