import {Missao} from '../Missao.js'
import {CartasMissaoCombateQueimadas} from './cartasMissaoCombateQueimadas.js'
import {setCartasJogo, atualizarStatusJogo, iniciarMusica} from '../app.js'
import {criarAnimacaoFogo, animarCartaJogador} from './animacoesMissao/animacoesNaTelaMissao.js'
import {ocultarMaoJogador, reproduzirEfeitoSonoro, iniciarCronometroTempoMissao} from '../script.js'
import {criarCartaParaJogador} from '../startJogo.js'

var criouCartasIniciaisJogador = false;
var cartaSelecionada = 9
var cartaEscolhidaPorJogador = 0
var intro = true

export class MissaoCombateQueimadas extends Missao {
    configurarHtml() {
        this.criarImagemFundo();
        this.criarImagensEspecificasDaMissao();
        criarAnimacaoFogo()
        console.log("Configurando HTML da missão combate às queimadas.");
        
    }

    criarImagemFundo() {
        var fundo = document.querySelector('.black-bg');
        fundo.style.backgroundImage = 'url("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fireBackgroundPhaseTwo.gif")';
    }

    criarImagemFogareu(caminho) {
        let imagem = document.getElementById('animatedImage');
        imagem.src = caminho;
        imagem.style.width = '250px'
        imagem.style.height = 'auto'
        imagem.style.position = 'fixed';
        imagem.style.top = '-80px';
        imagem.style.right = '20px';
        imagem.style.zIndex = 3
        imagem.classList.remove('animated');
        imagem.classList.add('no-animation');
    }

    criarImagensEspecificasDaMissao() {
        let redirecionarTelaMissao = document.getElementById('redirecionarParaTelaMissoes');
        redirecionarTelaMissao.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mapa.png';

        let botaoMenu = document.getElementById('toggleButton')
        let botaoPokedex = document.getElementById('arrowButton')
        botaoMenu.style.visibility = 'hidden'
        botaoPokedex.style.visibility = 'hidden'

        var elementoTempo = document.getElementById("tempo-missao-div");
        elementoTempo.style.left = '-5%'
        elementoTempo.style.top = '20%'

        var fundo = document.querySelector('.black-bg');
        
        let arrow = document.getElementById('arrowButton');
        let pokedex = document.getElementById('pokedexOverlay');
        arrow.style.display = 'block'
        pokedex.style.display = 'block'

        const imagemMao = document.getElementById('maoJogador');
        const imagemBaralho = document.getElementById('imagemBaralho');
        const mesa = document.getElementById('mesa')
        const iconeBoss = document.getElementById('iconeBoss')
        
        mesa.style.backgroundImage = 'url("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fireGround.gif")'
        mesa.style.zIndex = 0
        imagemBaralho.style.display = 'none'
        imagemMao.style.display = 'none';  
        imagemMao.style.zIndex = 999
       
        iconeBoss.style.right = '10px'

        const fogo = document.createElement('img');
        fogo.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogoParteBaixaTela.gif';
        fogo.id = 'FogoBaixo';

        fogo.style.position = 'fixed';
        fogo.style.left = '50%';           
        fogo.style.top = '40px';         
        fogo.style.transform = 'translateX(-50%)';
        fogo.style.width = '500px';
        fogo.style.zIndex = '1';  
        
        fundo.appendChild(fogo);

        let botao = document.getElementById('startButton')
        botao.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fireButtonWhite.gif';
        botao.style.width = '110px'


        const cronometroElement = document.createElement('div');
        cronometroElement.id = 'cronometro';
        cronometroElement.style.zIndex = 10
        cronometroElement.style.position = 'fixed';
        cronometroElement.style.top = '20px';
        cronometroElement.style.left = '50%';
        cronometroElement.style.transform = 'translateX(-50%)';
        cronometroElement.style.fontSize = '3rem';
        document.body.appendChild(cronometroElement);


        const iconeExclamacao = document.createElement('img');
        iconeExclamacao.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/recebeuCartaEspecial.gif';
        iconeExclamacao.id = 'exclamacao';
        iconeExclamacao.style.display = 'none'
        iconeExclamacao.style.position = 'fixed';
        iconeExclamacao.style.right = '-16%';           
        iconeExclamacao.style.top = '40px';         
        iconeExclamacao.style.transform = 'translateX(-50%)';
        iconeExclamacao.style.width = '100px';
        iconeExclamacao.style.zIndex = '5';  
        
        fundo.appendChild(iconeExclamacao);
    }

    configurarMusicasEEfeitosSonoros() {
        alterarMusica("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Precipice.mp3");
        this.criarEIniciarAudio(1, "/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Burning Fire sound.mp3", 0.3)
        this.criarEIniciarAudio(2, "/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Lantern Run.mp3", 0.6)
    }

   
     criarEIniciarAudio(id, src, volume = 0.5) {
        // Cria um novo elemento de áudio
        let audioElement = document.createElement('audio');
        
        // Configura o elemento de áudio
        audioElement.id = id;            // Define o ID para o áudio
        audioElement.src = src;          // Define o caminho do arquivo de áudio
        audioElement.loop = true;        // Define o áudio para tocar em loop
        audioElement.preload = 'auto';   // Carrega o áudio automaticamente
        audioElement.volume = volume;       // Ajusta o volume (de 0.0 a 1.0)
    
        // Adiciona o elemento de áudio ao corpo do documento
        document.body.appendChild(audioElement);
    
        // Inicia a reprodução automaticamente
        audioElement.play();
    }

   

    configurarCartas() {
        setCartasJogo(CartasMissaoCombateQueimadas)
}

funcoesEspecificasDaMissao() {
    iniciarCronometroTempoMissao(300)
    intro = true
    iniciarMusica(0.2)
    pararAudioPorId(2)
    reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/fogareuIntroP1.mp3')
    setTimeout(() => {
        this.criarImagemFogareu('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogareuIntrov2.gif');
        setTimeout(() => {
            reproduzirEfeitoSonoro('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/fogareuIntroP2.mp3')
        setTimeout(() => {
            this.criarImagemFogareu('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogareuv3.gif');
                setTimeout(() => {
                     intro = false
                 }, 4000);  
        }, 700);  
    }, 1000);  
}, 500);  
}

criarCartasNoInicioDaMissao() 
{
     setTimeout(() => {
        const imagemMao = document.getElementById('maoJogador');
        imagemMao.style.display = 'block';  
            var contador = 0;
            ocultarMaoJogador();
            function criarCartaComIntervalo() {
                    criarCartaParaJogador();
                // Incrementa o contador para a próxima iteração
                contador++;
                // Se ainda houver cartas para criar, programa a próxima execução
                if (contador < 4) {
                    setTimeout(criarCartaComIntervalo, 800);
                } else {
                    
                    
                }
            }
            // Inicia o processo de criação de cartas com um intervalo inicial
            setTimeout(criarCartaComIntervalo, 0);
            setTimeout(() => {
                let botaoMenu = document.getElementById('toggleButton')
                let botaoPokedex = document.getElementById('arrowButton')
                botaoMenu.style.visibility = 'visible'
                botaoPokedex.style.visibility = 'visible'
                atualizarStatusJogo() //inicio da missão turno boss
            }, 3000); 
        }, 3000); 
    }
  
    selecionarIdentificadorCarta() {
        if (criouCartasIniciaisJogador === false) {
            cartaSelecionada++
            if (cartaSelecionada === 13){
                criouCartasIniciaisJogador = true
            }
        } else {
            cartaSelecionada = 15
        }
        return cartaSelecionada
    }

    eventoCliqueNaCartaDeAcordoComMissao(elementoClicado) {
         // Passo 1: Obter o ID do elemento clicado
    var idCarta = $(elementoClicado).attr("id");
 
    // Passo 2: Verificar se o ID é válido
    if (idCarta && CartasMissaoCombateQueimadas[idCarta]) {
        cartaEscolhidaPorJogador = idCarta
        // Passo 3: Obter a carta correspondente
        var cartaSelecionada = CartasMissaoCombateQueimadas[idCarta];
        
        // // Passo 4: Lógica com base no tipo da carta
        // console.log("Carta ID:", idCarta); // Exibe o ID da carta
        // console.log("Caminho da Imagem:", cartaSelecionada.caminhoImagem); // Exibe o caminho da imagem
        // console.log("Tipo de Carta:", cartaSelecionada.tipo); // Exibe o tipo da carta
        
        // // Aqui você pode adicionar a lógica que precisa com base no tipo de carta
        // if (cartaSelecionada.tipo === 'ATK') {
        //     // Execute a lógica para cartas de ataque
        //     console.log("Esta é uma carta de ataque.");
        // } else if (cartaSelecionada.tipo === 'EST') {
        //     // Execute a lógica para cartas de estratégia
        //     console.log("Esta é uma carta de estratégia.");
        // }
        //verificarCartasMissaoQueimadas()

        animarCartaJogador(cartaSelecionada.caminhoImagem, $(elementoClicado));
        //ocultarMaoJogador()
        atualizarStatusJogo()
    } else {
        console.error("ID da carta não válido ou não encontrado nas cartas disponíveis.");
    }
    }

}

export function adicionarCartaLadoEsquerdo(enderecoImagem, tempoAnimacao = 1) {
    const carta = document.createElement('img');
    carta.src = enderecoImagem;
    carta.alt = 'Imagem de Carta';

    // Define estilos iniciais
    carta.style.position = 'fixed';
    carta.style.left = '10px';
    carta.style.top = '50%';
    carta.style.transform = 'translateY(-50%)';
    carta.style.width = '150px';
    carta.style.height = 'auto';
    carta.style.zIndex = '2';

    // Define a duração da animação usando uma variável CSS personalizada
    carta.style.setProperty('--tempo-animacao', `${tempoAnimacao}s`);
    
    carta.classList.add('carta-animada');  // Classe para animação
    carta.classList.add('carta-lateral');  // Classe para fácil seleção e remoção

    // Adiciona a carta ao DOM
    document.body.appendChild(carta);
}

export function removerTodasCartas() {
    const cartas = document.querySelectorAll('.carta-lateral'); // Seleciona todas as cartas com a classe 'carta-lateral'
    cartas.forEach(carta => carta.remove()); // Remove cada carta do DOM
}

export function criarImagemFogareuFaseDois() {
    let imagem = document.getElementById('animatedImage');
    imagem.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogareuForma2.gif';
    imagem.style.width = '230px'
    imagem.style.height = 'auto'
    imagem.style.position = 'fixed';
    imagem.style.top = '20px';
    imagem.style.right = '20px';
    imagem.style.zIndex = 3
    imagem.classList.add('animated');
    imagem.classList.remove('no-animation');
}

export function getCartaEscolhidaPorJogador() {
    return cartaEscolhidaPorJogador
}

export function getEstadoIntro() {
    return intro
}

export function alterarMusica(novaFonte) {
    const musica = document.getElementById("musica");
    musica.src = novaFonte;
    musica.load();
}

export function pararAudioPorId(id) {
    // Busca o elemento de áudio pelo ID
    const audioElement = document.getElementById(id);
    
    // Verifica se o elemento existe e então pausa o áudio
    if (audioElement) {
        audioElement.pause();
    } else {
        console.log(`Áudio com ID ${id} não encontrado.`);
    }
}
