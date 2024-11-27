import {reproduzirEfeitoSonoro, setJogoAcabou, ocultarMaoJogador, retornarAoEstadoNormal} from '../../script.js'
import {pararMusica, alterarVidaBoss, getVidaBoss} from '../../app.js'
import {criarImagemFogareuFaseDois, removerTodasCartas, pararAudioPorId} from '../MissaoCombateQueimadas.js'
import {pausarCronometro, reiniciarCronometro} from '../efeitosTelaMissaoCombateQueimadas.js'

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
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Monster Roar.mp3', 0.6)
    ocultarMaoJogador()
    pararMusica()
    pausarCronometro()
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
    setTimeout(() => {
        telaFicarBrancaPorUmSegundo()
        criarImagemFogareuFaseDois()
        fantasmasDeFogoAnimacao()
        imagem.remove();
        reiniciarCronometro()
        retornarAoEstadoNormal()
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

export function danoNoJogador(numPiscos = 3) {
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Ethan screaming.mp3', 0.4)
    const flash = document.createElement('div');
    flash.classList.add('flash-red');
    document.body.appendChild(flash);

    let piscadas = 0;

    // Função para alternar o flash on/off
    function piscar() {
        flash.classList.add('active'); // Ativa o flash

        setTimeout(() => {
            flash.classList.remove('active'); // Desativa o flash

            piscadas++;
            if (piscadas < numPiscos) {
                setTimeout(piscar, 100); // Espera antes de iniciar a próxima piscada
            } else {
                flash.remove(); // Remove o elemento após todas as piscadas
            }
        }, 100); // Duração de cada piscada
    }

    piscar(); // Inicia o primeiro flash
}


let intervaloAnimacao;
let animacaoAtiva = true;

export function fantasmasDeFogoAnimacao() {
    function animarImagem() {
        if (!animacaoAtiva) return;

        const fundoAnimacao = document.querySelector('.black-bg');

        // Seleciona um número aleatório de fantasma entre 1 e 4
        const numeroFantasma = Math.floor(Math.random() * 4) + 1; // Número entre 1 e 4
        const imagemSrc = `/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fireGhost${numeroFantasma}.gif`;

        const imagem = document.createElement('img');
        imagem.src = imagemSrc;
        imagem.style.position = 'fixed';
        
        // Verifica o número do fantasma para ajustar o tamanho
        if (numeroFantasma === 1 || numeroFantasma === 2) {
            imagem.style.width = '120px'; // Reduz a largura para 100px
            imagem.style.height = 'auto';  // Mantém a proporção
        } else {
            imagem.style.height = '100px'; // Tamanho padrão para os outros fantasmas
        }

        imagem.style.zIndex = 1;

        // Define uma altura aleatória entre 5% e 15%
        const alturaAleatoria = Math.random() * (20 - 0) + 5;
        imagem.style.top = `${alturaAleatoria}%`;

        // Configura a posição inicial e a velocidade
        let posicaoX;
        const larguraTela = window.innerWidth;
        let velocidade = Math.random() * (8 - 1) + 1; // Velocidade aleatória entre 1 e 4

        if (numeroFantasma % 2 === 0) { // Se par, move para a esquerda
            posicaoX = larguraTela + 100; // Começa fora da tela, à direita
            imagem.style.left = `${posicaoX}px`;
            fundoAnimacao.appendChild(imagem);

            // Mover para a esquerda
            const moverImagem = setInterval(() => {
                if (!animacaoAtiva) {
                    clearInterval(moverImagem);
                    imagem.remove();
                    return;
                }

                posicaoX -= velocidade; // Decrementa a posição horizontal (esquerda)
                imagem.style.left = `${posicaoX}px`;

                // Remove a imagem quando sai completamente da tela
                if (posicaoX < -100) {
                    clearInterval(moverImagem);
                    imagem.remove();
                }
            }, 16); // Aproximadamente 60 fps

        } else { // Se ímpar, move para a direita
            posicaoX = -100; // Começa fora da tela, à esquerda
            imagem.style.left = `${posicaoX}px`;
            fundoAnimacao.appendChild(imagem);

            // Mover para a direita
            const moverImagem = setInterval(() => {
                if (!animacaoAtiva) {
                    clearInterval(moverImagem);
                    imagem.remove();
                    return;
                }

                posicaoX += velocidade; // Incrementa a posição horizontal (direita)
                imagem.style.left = `${posicaoX}px`;

                // Remove a imagem quando sai completamente da tela
                if (posicaoX > larguraTela + 100) {
                    clearInterval(moverImagem);
                    imagem.remove();
                }
            }, 16); // Aproximadamente 60 fps
        }
    }

    // Chama a função repetidamente em intervalos para manter a animação ativa
    intervaloAnimacao = setInterval(animarImagem, 2000); // Ajuste o intervalo para controlar a frequência da animação
}


// Função para parar a animação
export function pararFantasmasDeFogoAnimacao() {
    animacaoAtiva = false; // Define a flag para interromper novas animações
    clearInterval(intervaloAnimacao); // Para o intervalo de criação de novas imagens
}

export function fogareuDerrotado() {
    removerTodasCartas()
    pararMusica()
    pararAudioPorId(1)
    setJogoAcabou(true)
    pausarCronometro()
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/fogareuGritando.mp3', 0.2)
    setTimeout(function () {
        configurarJogador()
        fogareuMorrendo()
        pararFantasmasDeFogoAnimacao()
        setTimeout(function () {
             reproduzirEfeitoSonoro("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Erik Satie - Gnossienne No.1.mp3", 1);
             chamasApagando()
             setTimeout(function () {
                var endgameOverlay = document.getElementById('endgameOverlay');
                endgameOverlay.style.display = 'block';
           }, 10000);
        }, 3000);
    }, 1500);
}

 function fogareuMorrendo() {
    const fogareuImagem = document.getElementById('animatedImage');

    if (fogareuImagem) {
        fogareuImagem.classList.add('boss-death');

        fogareuImagem.addEventListener('animationend', () => {
            telaFicarBrancaPorUmSegundo()
            fogareuImagem.remove();
        });
    }
}

 function chamasApagando() {
    var fundo = document.querySelector('.black-bg');
    fundo.style.backgroundSize = '200% 100%';
    fundo.style.backgroundImage = 'url("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/jogadorVenceuFundo.png")';
    const chamas = document.getElementById('FogoBaixo');
    chamas.style.display = 'none'
    const mesa = document.getElementById('mesa')
    mesa.style.backgroundImage = 'url("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/charredGround.jpg")'
 }

 function configurarJogador() {
    let cronometro = document.getElementById('cronometro')
    cronometro.style.display = 'none'

    let iconeBoss = document.getElementById('iconeBoss')
    iconeBoss.style.left = '1%'
    iconeBoss.style.top = '0.5%'
    iconeBoss.style.width = '55px'
    iconeBoss.style.height = 'auto'
    iconeBoss.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/deadBossFace.png'

    let botaoMenu = document.getElementById('toggleButton')
    let botaoPokedex = document.getElementById('arrowButton')
    botaoMenu.style.visibility = 'hidden'
    botaoPokedex.style.visibility = 'hidden'

    const imagemMao = document.getElementById('maoJogador');
    imagemMao.style.display = 'none';  

    var elementoTempo = document.getElementById("tempo-missao-div");
    elementoTempo.style.visibility = 'hidden'
 }


 export function exibirTempestade() {
    ocultarMaoJogador()
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/raio.mp3', 1)
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Thunderstorm sound effectv2.mp3', 1)
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/fogareuGritandoTempestadev3.mp3', 1)
    // Cria o elemento do contêiner da tempestade
    const tempestadeDiv = document.createElement('div');
    tempestadeDiv.classList.add('tempestade');

    // Cria o elemento de imagem do GIF de tempestade
    const gifTempestade = document.createElement('img');
    gifTempestade.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/chuvaTorrencial.gif';
    gifTempestade.alt = 'Gif da Tempestade';
    gifTempestade.classList.add('gifTempestade');

    const fumaca = document.createElement('img');
    fumaca.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/smoke1.gif';
    fumaca.alt = 'Gif da Fumaça';
    fumaca.style.position = 'absolute';
    fumaca.style.width = '1000px';
    fumaca.style.height = 'auto';
    fumaca.style.top = '20%';
    fumaca.style.left = '60%';
    fumaca.style.transform = 'translate(-50%, -50%)'; // Centraliza a imagem
    fumaca.style.zIndex = '8';
    fumaca.style.opacity = 0.5


    tempestadeDiv.appendChild(fumaca);
    tempestadeDiv.appendChild(gifTempestade);

    // Adiciona o contêiner da tempestade ao body ou qualquer outro elemento
    document.body.appendChild(tempestadeDiv);

    // A animação de entrada já é aplicada via CSS
    // Remover o contêiner da tempestade após 10 segundos (ajustar conforme necessário)
    setTimeout(() => {
        alterarVidaBoss(getVidaBoss() - 40)
        retornarAoEstadoNormal()
        tempestadeDiv.remove();
    }, 10000); // 10 segundos para a animação durar e depois ser removido
}

export function exibirJatoDaMangueira() {
    ocultarMaoJogador()
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/fogareuGritandoTempestadev3.mp3', 1)
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/FIRE EXTINGUISHERv2.mp3', 0.6)
    // Cria o elemento do jato de água
    const jatoAgua = document.createElement('img');
    jatoAgua.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/waterAttack02.gif'; // Substitua pelo caminho correto
    jatoAgua.alt = 'Jato de Água';
    jatoAgua.classList.add('jatoAgua');

    // Personalização de tamanho e posição diretamente no JavaScript
    jatoAgua.style.width = '800px';
    jatoAgua.style.height = 'auto';
    jatoAgua.style.top = '20%';
    jatoAgua.style.left = '-25%';
    jatoAgua.style.zIndex = 9;
    jatoAgua.style.transform = 'rotate(-30deg)';

    // Cria o elemento da fumaça de impacto
    const fumacaImpacto = document.createElement('img');
    fumacaImpacto.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/smoke1.gif'; // Substitua pelo caminho correto
    fumacaImpacto.alt = 'Fumaça do Impacto';
    fumacaImpacto.classList.add('fumacaImpacto');

    // Personalização de tamanho e posição diretamente no JavaScript
    fumacaImpacto.style.width = '800px';
    fumacaImpacto.style.height = 'auto';
    fumacaImpacto.style.top = '-10%';
    fumacaImpacto.style.left = '-50%';
    fumacaImpacto.style.zIndex = 8
    // Adiciona os elementos ao body
    document.body.appendChild(jatoAgua);
    document.body.appendChild(fumacaImpacto);

    // Remove o jato e a fumaça após 1 segundo
    setTimeout(() => {
        alterarVidaBoss(getVidaBoss() - 30)
        retornarAoEstadoNormal()
        jatoAgua.remove();
        fumacaImpacto.remove();
    }, 10000); // Ajuste a duração conforme necessário
}
