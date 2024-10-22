import {reproduzirEfeitoSonoro, getCartaJogadorRecente, iniciarCronometro, setCronometroAtivo, visualizacaoCartaBoss,

} from '../script.js'
import {tocarEfeitoSoco, getQuantidadeCartasExercitoAladoUtilizadas, getBombardeioFumaceAcontecendo, setBombardeioFumaceAcontecendo,

} from './efeitosTelaMissaoCombateDengue.js'
import {getCartaBossRecente, setCartaBossRecente, getEstadoEfeitoSonoro, pararMusica, getVidaBoss, getTransicaoBoss,
  jogadaBoss, setTransicaoBoss, getMusicaTocando
} from '../app.js'

var faseDois = false

    
    export function alterarFaseBossMosquitoDengue() {
      var audioElement = document.getElementById('musica');
      var raivaIcone = document.getElementById('raiva');
      var mosquito = document.getElementById('animatedImage');
      var fundo = document.querySelector('.black-bg');
    
      
    
      raivaIcone.style.display = "block";
      var risadaMosquito = new Audio('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/mosquito-laugh.wav');
      risadaMosquito.play(); // Inicia a música
      // Altera a música
      audioElement.src = "/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/Kuroshitsuji II Ost - Danse Macabre.mp3";
      // Recarrega e inicia a nova música
      audioElement.load();
      audioElement.play();
    
      var transicao = document.querySelector(".overlay-transition-boss");
      transicao.style.display = "block";
    
    
      // Adiciona a classe 'show' após 2 segundos
      setTimeout(function() {
          $(".overlay-transition-boss").addClass("show");
        setTimeout(function(){
              mosquito.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png';
              fundo.style.backgroundImage = 'url("/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/FireBackground.gif")';
              raivaIcone.style.display = "none";
        }, 1000);
          // Remove a classe 'show' após 3 segundos adicionais
          setTimeout(function() {
              
              $(".overlay-transition-boss").removeClass("show");
              transicao.style.display = "none";
              mosquito.style.top = "50px";
              mosquito.style.width = "550px";
              faseDois = true
              
              reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/mus_f_orchhit_l.wav')
          }, 3000);
      }, 2800);
    }
    
    var efeitosSonorosFaseUm = [
        "/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/Mosquito Laugh 1.mp3",
        "/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/Mosquito Laugh 2.mp3",
        "/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/Mosquito Laugh 3.mp3",
        "/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/Mosquito - Sound Effect.mp3"
      ];
      
      var efeitosSonorosFaseDois = [
        "/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/RisadaFaseDois_1.wav",
        "/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/RisadaFaseDois_2.wav",
        "/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/RisadaFaseDois_3.wav",
        "/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/Mosquito - Sound Effect.mp3"
      ];
      
      export function tocarEfeitoRisadaAleatoriaMosquitoDengue() {
        let efeitosSonoros = []

        if(getEstadoEfeitoSonoro()){
          if(faseDois === false){
            efeitosSonoros = efeitosSonorosFaseUm
          }else{
            efeitosSonoros = efeitosSonorosFaseDois
          }
          var indice = Math.floor(Math.random() * 4); // Gera um número aleatório entre 0 e 2
          var audio = new Audio(efeitosSonoros[indice]);
          audio.play();
        }
      }
      
      export function exibirImagemRisadaTemporizada() {
        var imagem = document.getElementById('risada');
        imagem.style.display = 'block'; // Exibe a imagem
      
        // Define um temporizador para ocultar a imagem após alguns segundos (por exemplo, 3 segundos)
        setTimeout(function() {
            imagem.style.display = 'none'; // Oculta a imagem após 3 segundos
        }, 2000); // Tempo em milissegundos (3 segundos = 3000 milissegundos)
      }
      
      export function danoBoss() {
        let boss = []
      tocarEfeitoSoco()
      var mosquitoFaseUm = [
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengueFerido.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengueFerido.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png"
        ];
      
      var mosquitoFaseDois = [
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitaoFerido.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitaoFerido.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png"
        ];
      if(faseDois === false){
        boss = mosquitoFaseUm
      } else{
        boss = mosquitoFaseDois
      }
      
        var index = 0;
        var animatedImage = document.getElementById('animatedImage');
      
        // Define um temporizador para alternar as imagens a cada 1 segundo
        var intervalo = setInterval(function() {
            animatedImage.src = boss[index]; // Altera a imagem para a próxima na sequência
      
            index++; // Incrementa o índice para a próxima imagem
      
            // Se chegou ao final do array, reinicia do início
            if (index >= boss.length) {
                index = 0;
            }
        }, 100); 
      
        // Define outro temporizador para parar a alternância após 4 segundos (4 imagens x 1 segundo cada)
        setTimeout(function() {
            clearInterval(intervalo); // Para o intervalo de alternância
        
        
        if (animatedImage.src.endsWith('MosquitoDengueFerido.png')) {
                animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png';
            } else if (animatedImage.src.endsWith('mosquitaoFerido.png')) {
                animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png';
            }
          }, 600); 
      }
      
      export function choqueDanoBoss() {
        let boss = []
      reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/choque.mp3', 1)
      var mosquitoFaseUm = [
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengueChoque.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengueChoque.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png"
        ];
      
      var mosquitoFaseDois = [
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitaoChoque.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitaoChoque.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png"
        ];
      if(faseDois === false){
        boss = mosquitoFaseUm
      } else{
        boss = mosquitoFaseDois
      }
      
        var index = 0;
        var animatedImage = document.getElementById('animatedImage');
      
        // Define um temporizador para alternar as imagens a cada 1 segundo
        var intervalo = setInterval(function() {
            animatedImage.src = boss[index]; // Altera a imagem para a próxima na sequência
      
            index++; // Incrementa o índice para a próxima imagem
      
            // Se chegou ao final do array, reinicia do início
            if (index >= boss.length) {
                index = 0;
            }
        }, 100); 
      
        // Define outro temporizador para parar a alternância após 4 segundos (4 imagens x 1 segundo cada)
        setTimeout(function() {
            clearInterval(intervalo); // Para o intervalo de alternância
        
        
        if (animatedImage.src.endsWith('MosquitoDengueChoque.png')) {
                animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png';
            } else if (animatedImage.src.endsWith('mosquitaoChoque.png')) {
                animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png';
            }
          }, 3500); 
      }
      
      
      export function fumacaDanoBoss(tempoAnimacao) {
        let boss = []
      if(getCartaJogadorRecente() === 17){
        
        reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/mus_explosion.wav', 0.2)
      }
      reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/MosquitoTossindo.mp3', 1)
      
      var mosquitoFaseUm = [
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengueTossindo.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengueTossindo.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png"
        ];
      
      var mosquitoFaseDois = [
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitaoTossindo.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitaoTossindo.png",
            "/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png"
        ];
      if(faseDois === false){
        boss = mosquitoFaseUm
      } else{
        boss = mosquitoFaseDois
      }
      
        var index = 0;
        var animatedImage = document.getElementById('animatedImage');
      
        // Define um temporizador para alternar as imagens a cada 1 segundo
        var intervalo = setInterval(function() {
            animatedImage.src = boss[index]; // Altera a imagem para a próxima na sequência
      
            index++; // Incrementa o índice para a próxima imagem
      
            // Se chegou ao final do array, reinicia do início
            if (index >= boss.length) {
                index = 0;
            }
        }, 100); 
      
        // Define outro temporizador para parar a alternância após 4 segundos (4 imagens x 1 segundo cada)
        setTimeout(function() {
            clearInterval(intervalo); // Para o intervalo de alternância
        
        
        if (animatedImage.src.endsWith('MosquitoDengueTossindo.png')) {
                animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png';
            } else if (animatedImage.src.endsWith('mosquitaoTossindo.png')) {
                animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/mosquitao.png';
            }
          }, tempoAnimacao); //3500
      }

      var audioLoucura1 = new Audio('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/Mosquito Flying Buzz Sound Effect.mp3');
audioLoucura1.volume = 0.7; 
audioLoucura1.loop = true; 


var audioLoucura2 = new Audio('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/mus_disturbing.wav');
audioLoucura2.volume = 0.5; 
audioLoucura2.loop = true; 


function reproduzirEfeitoZumbidoLoucura() {
  audioLoucura1.play();
  audioLoucura2.play();
}

function pararEfeitoZumbidoLoucura() {
  audioLoucura1.pause();
  audioLoucura1.currentTime = 0;

  audioLoucura2.pause();
  audioLoucura2.currentTime = 0;
}


export function zumbidoLoucura() {
reproduzirEfeitoZumbidoLoucura()
document.getElementById('mosquitoNotes').style.display = 'block'; 
document.getElementById('overlayLoucura').style.display = 'block'; 

setTimeout(pararZumbidoLoucura, 15000);
}

export function pararZumbidoLoucura() {
document.getElementById('mosquitoNotes').style.display = 'none'; 
document.getElementById('overlayLoucura').style.display = 'none';
pararEfeitoZumbidoLoucura()
}

export function iniciarSusto() {
    var sustoOverlay = document.getElementById('sustoOverlay');
    var imagemSusto = document.getElementById('imagemSusto');
    let parouMusica = false

    if(getMusicaTocando()){
      parouMusica = true
      pararMusica()
    }
    var audioSusto = new Audio('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/MosquitoAtaqueMaisLeve.mp3');
    audioSusto.volume = 0.2; 
    audioSusto.play();
    if(getCartaBossRecente() === 4){
      imagemSusto.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/AtaqueSustoParalizante.png'
    } else{
      imagemSusto.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/AtaqueSusto.png'
    }
    sustoOverlay.style.display = 'block';
    setTimeout(() => {
        sustoOverlay.classList.add('active');
    }, 100); // Pequeno delay para garantir transição
  
    // Após 4 segundos, ocultar tudo e resetar a animação
    setTimeout(() => {
        sustoOverlay.classList.remove('active');
        setTimeout(() => {
            sustoOverlay.style.display = 'none';
        }, 3000); // Tempo para a transição de volta ao normal
        if (parouMusica) {
          parouMusica = false
          pararMusica()
        }
        
        reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/Fast Heart Beat - Sound Effect.mp3', 1)
    }, 6000); // Duração total da animação antes do reset
  }

  export function verificarCartaEscolhidaDenguemonio() {
   let min = 1; 
   let max = 13; 
   let cartaSelecionada = Math.floor(Math.random() * (max - min + 1)) + min;
   if(cartaSelecionada === 4 && faseDois === false){
    cartaSelecionada = 3
   } else if(cartaSelecionada === 13 && getVidaBoss() >= 50){
    cartaSelecionada = 3
   } else if(cartaSelecionada === 1 && getQuantidadeCartasExercitoAladoUtilizadas() > 3){
    cartaSelecionada = 3
   }
    else if(cartaSelecionada === 12 && getVidaBoss() === 100){
    cartaSelecionada = 3
    }
    else if(getVidaBoss() <= 30){
    cartaSelecionada = 3
   }
   setCartaBossRecente(cartaSelecionada)
    if (getCartaBossRecente() === 1 || getCartaBossRecente() === 2){
       
        reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/mus_create.wav')
       } else{
        reproduzirEfeitoSonoro('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/cardInTable.mp3');
       }
  }

  export function verificaJogadaMosquito() {

    if(getTransicaoBoss() === false && getBombardeioFumaceAcontecendo() === false && getVidaBoss() > 0){
      iniciarCronometro(15)
      setTimeout(function() {
         
          visualizacaoCartaBoss();
          tocarEfeitoRisadaAleatoriaMosquitoDengue();
          exibirImagemRisadaTemporizada()
        
          setCronometroAtivo(false);
      }, Math.floor(Math.random() * 3000) + 5000);
  }else{
      if(getBombardeioFumaceAcontecendo() === true){
          setTimeout(function() {
              setBombardeioFumaceAcontecendo(false)
              jogadaBoss()
          }, 22000);
      } else if(getVidaBoss() > 0){
        setTransicaoBoss(false)
          setTimeout(function() {
              jogadaBoss()
          }, 7000);
      }
  }
  }
