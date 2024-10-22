import {Missao} from '../Missao.js'

export class MissaoCombateQueimadas extends Missao {
    configurarHtml() {
        this.criarImagemFogareu();
        console.log("Configurando HTML da missão combate às queimadas.");

        var fundo = document.querySelector('.black-bg');
        fundo.style.backgroundImage = 'url("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fireBackgroundPhaseTwo.gif")';
    }

    criarImagemFogareu() {
        let imagem = document.getElementById('animatedImage');
        imagem.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogareuv3.gif';
        imagem.style.width = '260px'
        imagem.style.height = 'auto'
        imagem.style.position = 'fixed';
        imagem.style.top = '-130px';
        imagem.style.right = '20px';
        imagem.classList.remove('animated');
        imagem.classList.add('no-animation');
    }

    configurarMusicasEEfeitosSonoros() {
        console.log("Configurando músicas e efeitos sonoros da missão combate às queimadas.");
        this.alterarMusica("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Demon_s-Crest-OST_-The-Infinite-Demon-.wav");
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
}