import {Missao} from '../Missao.js'
import {CartasMissaoCombateQueimadas} from './cartasMissaoCombateQueimadas.js'
import {setCartasJogo} from '../app.js'
import {criarAnimacaoFogo} from './animacoesMissao/animacoesNaTelaMissao.js'
import {retornarAoEstadoNormal, ocultarMaoJogador} from '../script.js'
import {criarCartaParaJogador} from '../startJogo.js'

var criouCartasIniciaisJogador = false;
var cartaSelecionada = 10

export class MissaoCombateQueimadas extends Missao {
    configurarHtml() {
        this.criarImagemFogareu();
        this.criarImagemFundo();
        this.criarImagensEspecificasDaMissao();
        criarAnimacaoFogo()
        console.log("Configurando HTML da missão combate às queimadas.");
        
    }

    criarImagemFundo() {
        var fundo = document.querySelector('.black-bg');
        fundo.style.backgroundImage = 'url("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fireBackgroundPhaseTwo.gif")';
    }

    criarImagemFogareu() {
        let imagem = document.getElementById('animatedImage');
        imagem.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogareuv3.gif';
        imagem.style.width = '250px'
        imagem.style.height = 'auto'
        imagem.style.position = 'fixed';
        imagem.style.top = '-80px';
        imagem.style.right = '20px';
        imagem.classList.remove('animated');
        imagem.classList.add('no-animation');
    }

    criarImagensEspecificasDaMissao() {
        const imagemMao = document.getElementById('maoJogador');
        const imagemBaralho = document.getElementById('imagemBaralho');
        const mesa = document.getElementById('mesa')
        const iconeBoss = document.getElementById('iconeBoss')
        
        mesa.style.backgroundImage = 'url("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fireGround.gif")'
        mesa.style.zIndex = 0
        imagemBaralho.style.display = 'none'
        //imagemMao.style.display = 'none';  
       
        iconeBoss.style.right = '10px'

        const fogo = document.createElement('img');
        fogo.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogoParteBaixaTela.gif';
        fogo.alt = 'Fogo';

        fogo.style.position = 'fixed';
        fogo.style.left = '50%';           
        fogo.style.bottom = '20px';         
        fogo.style.transform = 'translateX(-50%)';
        fogo.style.width = '900px';
        fogo.style.zIndex = '3';  

        //document.body.appendChild(fogo);

        const fogoAr = document.createElement('img');
        fogoAr.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogoAr.gif';
        fogoAr.style.position = 'fixed';
        fogoAr.style.left = '50%';             
        fogoAr.style.bottom = '30px';         
        fogoAr.style.transform = 'translateX(-50%)';
        fogoAr.style.width = '900px';
        fogoAr.style.zIndex = '2';  

        //mesa.appendChild(fogoAr);

        const madeiraQueimada = document.createElement('img');
        madeiraQueimada.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/burnedLog.png';
        madeiraQueimada.style.position = 'fixed';
        madeiraQueimada.style.left = '80%';             
        madeiraQueimada.style.top = '400px';         
        madeiraQueimada.style.transform = 'translateX(-50%)';
        madeiraQueimada.style.width = '300px';
        madeiraQueimada.style.zIndex = '1';  

        //document.body.appendChild(madeiraQueimada);

        let botao = document.getElementById('startButton')
        botao.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fireButtonWhite.gif';
        botao.style.width = '110px'
    }

     adicionarCartaLadoEsquerdo(enderecoImagem) {
      
        const carta = document.createElement('img');
        carta.src = enderecoImagem;
        carta.alt = 'Imagem de Carta';
    
        carta.style.position = 'fixed';
        carta.style.left = '10px';       
        carta.style.top = '50%';            
        carta.style.transform = 'translateY(-50%)'; 
        carta.style.width = '150px';        
        carta.style.height = 'auto';        
        carta.style.zIndex = '2';           

        carta.classList.add('carta-animada');
        
        document.body.appendChild(carta);
    }


    configurarMusicasEEfeitosSonoros() {
        console.log("Configurando músicas e efeitos sonoros da missão combate às queimadas.");
        this.alterarMusica("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Forest Funk.mp3");
        this.criarEIniciarAudio(1, "/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Burning Fire sound.mp3")
    }

    alterarMusica(novaFonte) {
        const musica = document.getElementById("musica");
        musica.src = novaFonte;
        musica.load();
    }

     criarEIniciarAudio(id, src) {
        // Cria um novo elemento de áudio
        let audioElement = document.createElement('audio');
        
        // Configura o elemento de áudio
        audioElement.id = id;            // Define o ID para o áudio
        audioElement.src = src;          // Define o caminho do arquivo de áudio
        audioElement.loop = true;        // Define o áudio para tocar em loop
        audioElement.preload = 'auto';   // Carrega o áudio automaticamente
        audioElement.volume = 0.6;       // Ajusta o volume (de 0.0 a 1.0)
    
        // Adiciona o elemento de áudio ao corpo do documento
        document.body.appendChild(audioElement);
    
        // Inicia a reprodução automaticamente
        audioElement.play();
    }

    pararAudioPorId(id) {
        // Busca o elemento de áudio pelo ID
        const audioElement = document.getElementById(id);
        
        // Verifica se o elemento existe e então pausa o áudio
        if (audioElement) {
            audioElement.pause();
        } else {
            console.log(`Áudio com ID ${id} não encontrado.`);
        }
    }

    configurarCartas() {
        setCartasJogo(CartasMissaoCombateQueimadas)
}

funcoesEspecificasDaMissao() {
    this.adicionarCartaLadoEsquerdo('/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/cartas/CartaFogo8.png')
}

criarCartasNoInicioDaMissao() {
    var contador = 0;
    ocultarMaoJogador();
    function criarCartaComIntervalo() {
            criarCartaParaJogador();
        // Incrementa o contador para a próxima iteração
        contador++;
        // Se ainda houver cartas para criar, programa a próxima execução
        if (contador < 4) {
            setTimeout(criarCartaComIntervalo, 500);
        } else {
            // Quando todas as cartas forem criadas, retorne ao estado normal
            setTimeout(retornarAoEstadoNormal, 500);
        }
    }
    // Inicia o processo de criação de cartas com um intervalo inicial
    setTimeout(criarCartaComIntervalo, 0);
    }
  
    selecionarIdentificadorCarta() {
        if (criouCartasIniciaisJogador === false) {
            cartaSelecionada++
            if (cartaSelecionada === 14){
                criouCartasIniciaisJogador = true
            }
        }
        return cartaSelecionada
    }
}