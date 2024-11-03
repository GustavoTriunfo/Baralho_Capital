import {reproduzirEfeitoSonoro} from '../../script.js'
import {pararMusica} from '../../app.js'
import {criarImagemFogareuFaseDois} from '../MissaoCombateQueimadas.js'

export function criarAnimacaoFogo() {

 
}

export function animarCartaJogador(caminhoImagem, elementoClicado) {
       
       var $elementoClicado = $(elementoClicado); 
       var $clone = $('<img>', {
           src: caminhoImagem,
           class: 'carta-clone',
           css: {
               left: $elementoClicado.offset().left + 'px', 
               top: $elementoClicado.offset().top + 'px', 
               width: $elementoClicado.width() + 'px' 
           }
       }).appendTo('body'); 
       requestAnimationFrame(() => {
           
           $clone.addClass('deslizar');
       });
   
       setTimeout(() => {
           $clone.remove();
       }, 1000);
}

export function transicaoFogareu() {
    pararMusica()
    const corpo = document.body;

    const imagem = document.createElement('img');
    imagem.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/explosion.gif';
    imagem.className = 'explosao-transicao';
    imagem.style.position = 'fixed';
    imagem.style.top = '35%';
    imagem.style.left = '60%';
    imagem.style.height = '600px'
    imagem.style.width = 'auto'
    imagem.style.zIndex = 6
    imagem.style.pointerEvents = 'none';
  
    corpo.appendChild(imagem);
  
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Monster Roar.mp3')
    setTimeout(() => {
        telaFicarBrancaPorUmSegundo()
        criarImagemFogareuFaseDois()
      imagem.remove();
    }, 4000);
    pararMusica()
}

function telaFicarBrancaPorUmSegundo() {
    const corpo = document.body;

    // Criar a sobreposição branca
    const sobreposicaoBranca = document.createElement('div');
    sobreposicaoBranca.className = 'sobreposicao-branca';
    corpo.appendChild(sobreposicaoBranca);

    // Definir o fade-out depois de 1 segundo
    setTimeout(() => {
        sobreposicaoBranca.classList.add('fade-out');
    }, 1000);

    // Remover o elemento após a transição de fade-out
    setTimeout(() => {
        sobreposicaoBranca.remove();
    }, 2000);
}