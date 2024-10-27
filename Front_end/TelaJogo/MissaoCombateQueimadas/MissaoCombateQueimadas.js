import {Missao} from '../Missao.js'
import {CartasMissaoCombateQueimadas} from './cartasMissaoCombateQueimadas.js'
import {setCartasJogo} from '../app.js'
import {criarAnimacaoFogo} from './animacoesMissao/animacoesNaTelaMissao.js'

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
        const iconeConfig = document.getElementById('configurations');
        const imagemMao = document.getElementById('maoJogador');
        const imagemBaralho = document.getElementById('imagemBaralho');
        const mesa = document.getElementById('mesa')
        const iconeBoss = document.getElementById('iconeBoss')
        // mesa.style.display = 'none'
        mesa.style.backgroundImage = 'url("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fireGround.gif")'
        mesa.style.zIndex = 0
        iconeConfig.style.display = 'none'
        imagemBaralho.style.display = 'none'
        imagemMao.style.display = 'none';  
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

        document.body.appendChild(fogoAr);

        const arvoreQueimada = document.createElement('img');
        arvoreQueimada.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/burnedtree.png';
        arvoreQueimada.style.position = 'fixed';
        arvoreQueimada.style.left = '10%';             
        arvoreQueimada.style.top = '-550px';         
        arvoreQueimada.style.transform = 'translateX(-50%)';
        arvoreQueimada.style.width = '900px';
        arvoreQueimada.style.zIndex = '1';  

        document.body.appendChild(arvoreQueimada);

        const madeiraQueimada = document.createElement('img');
        madeiraQueimada.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/burnedLog.png';
        madeiraQueimada.style.position = 'fixed';
        madeiraQueimada.style.left = '80%';             
        madeiraQueimada.style.top = '400px';         
        madeiraQueimada.style.transform = 'translateX(-50%)';
        madeiraQueimada.style.width = '300px';
        madeiraQueimada.style.zIndex = '1';  

        document.body.appendChild(madeiraQueimada);
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

    configurarCartas() {
        setCartasJogo(CartasMissaoCombateQueimadas)
}

funcoesEspecificasDaMissao() {
    
}
}