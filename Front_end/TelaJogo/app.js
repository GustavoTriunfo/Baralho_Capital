
var MissaoCombateDengue = true
var Cartas = {
  
    1: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/ExercitoAladoCartaEspecial.png', tipo: 'ATK'},
    2: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/ZumbidoDaLoucuraCartaEspecial.png', tipo: 'ATK'},
    3: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/PicadaSurpresa.png', tipo: 'ATK'},
    4: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/PicadaParalizante.png', tipo: 'ATK'},
    5: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/BlitzAlada.png', tipo: 'EST'},
    6: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/EnxameDeAgulhas.png', tipo: 'EST'},
    7: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/OfensivaSanguessuga.png', tipo: 'EST'},
    8: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/SugadouroNoturno.png', tipo: 'EST'},
    9: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/LagoaDeIncubação.png', tipo: 'EST'},
    10: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/ReservatorioMortal.png', tipo: 'EST'},
    11: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/CriadouroDeLarvas.png', tipo: 'EST'},
    12: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/InfusãoVital.png', tipo: 'CR'},
    13: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/TransfusaoRestauradora.png', tipo: 'CR'},
    16: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/BombardeioDeFumace.png', tipo: 'ATK'},
    17: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/GranadaInseticida.png', tipo: 'ATK'},
    18: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/OChinelo.png', tipo: 'ATK'},
    19: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/OFamosoTapa.png', tipo: 'ATK'},
    20: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/OInseticida.png', tipo: 'ATK'},
    21: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/OSoco.png', tipo: 'ATK'},
    22: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/RaqueteEletrica.png', tipo: 'ATK'},
    23: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/RepelenteSupremo.png', tipo: 'DEF'},
    24: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/RedeProtetora.png', tipo: 'DEF'},
    25: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/RemediosCura.png', tipo: 'CR'},
    26: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/FirstAid.png', tipo: 'CR'},
    27: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/BrigadaAnti-Mosquito.png', tipo: 'EST'},
    28: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/EsquadraoAnti-Dengue.png', tipo: 'EST'},
    29: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/ForcaDeDefesaSanitaria.png', tipo: 'EST'},
    30: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/OperacaoLimpeza.png', tipo: 'EST'},
    31: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/VigilantesDaSaudePublica.png', tipo: 'EST'},
    32: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/PatrulhaAnti-Dengue.png', tipo: 'EST'} 
};

function selecionarTipoCarta(id){
    return Cartas[id].tipo;
};

function selecionarCaminhoImagem(id){
    return Cartas[id].caminhoImagem;
}

function atualizarStatusJogo(){
    
    if(verificarFim() === false){
        if(jogadorAtual === jogador2){
            turnoJogador()
            alternarJogador()
        } else{
            
            if(vidaBoss <= 60 && alteracaoBossJaAconteceu === false){
                transicaoBoss = true
            } else if(cartaJogadorRecente === 16){
                bombardeioFumaceAcontecendo = true
            }  
            turnoBoss()
            alternarJogador()
            atualizarStatusJogo()
            
        }
      
    }else{
        terminarJogo()
    }
    
}

function turnoJogador(){
    verificarCartaJogador()
    reproduzirEfeitoSonoroCartaNaMesa();
}

function turnoBoss(){
    if(vidaBoss > 20){
    jogadaBoss()
    } else{
        terminarJogo()
    }
}

function jogadaBoss() {
    if(transicaoBoss === false && bombardeioFumaceAcontecendo === false && !vidaBoss <= 0){
    iniciarCronometro(15)
    setTimeout(function() {
       
        visualizacaoCartaBoss();
        tocarEfeitoRisadaMosquitoAleatorio();
        exibirImagemTemporizada()
      
        cronometroAtivo = false;
    }, Math.floor(Math.random() * 3000) + 5000); // Atraso de 3 a 5 segundos (3000 a 5000 milissegundos) 
}else{
    if(bombardeioFumaceAcontecendo === true){
        setTimeout(function() {
            jogadaBoss()
        }, 22000);
    } else if(vidaBoss > 0){
        transicaoBoss = false
        setTimeout(function() {
            jogadaBoss()
        }, 7000);
    }

}

}

function escolhaDoBoss(){
   let min = 1; 
   let max = 13; 
   let cartaSelecionada = Math.floor(Math.random() * (max - min + 1)) + min;
   cartaBossRecente = cartaSelecionada
    if (cartaBossRecente === 1 || cartaBossRecente === 2){
        reproduzirEfeitoCartaEspecial()
       } else{
        reproduzirEfeitoSonoroCartaNaMesa();
       }
    return cartaSelecionada
}

function verificarFim(){
    if(vidaBoss <= 0){
        return true
    } else if(quantidadeHPJogador <= 0){
        return true
    } else if(tempoMissaoZerado){
        return true
    }
    return false
}
// Função para atualizar o status do jogador com base no ID da carta escolhida
function atualizarStatusJogador(objetoJogador, id_carta) {
 
}

function terminarJogo(){
    if(jogoAcabou === false){

    if(vidaBoss <= 20){
        pararZumbidoLoucura()
        pararMusica()
        reproduzirEfeitoMorteMosquito()
        reproduzirMusicaVitoriaJogador()
        var endgameOverlay = document.getElementById('endgameOverlay');
        endgameOverlay.style.display = 'block';
        jogoAcabou = true
        setTimeout(function(){
            var animatedImage = document.getElementById('animatedImage');
            animatedImage.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/Grave.png';
            animatedImage.style.top = "0px";
            animatedImage.style.width = "350px";
        },4000)
 

    } else if(quantidadeHPJogador <= 0 || tempoMissaoZerado === true){
        pararMusica()
        reproduzirEfeitoDerrotaJogador()
        var endgamePlayerLose = document.getElementById('endgamePlayerLose');
        endgamePlayerLose.style.display = 'block';
        jogoAcabou = true
    }
    }

}

function atualizarTelaStatus(objetoJogador){
    

    var ruindadeSpan = document.getElementById('ruindadeJogador');
    ruindadeSpan.textContent = objetoJogador.ruindade;
    
    var investimentoSpan = document.getElementById('investimentoJogador');
    investimentoSpan.textContent = objetoJogador.investimento;

    var famaSpan = document.getElementById('famaJogador');
    famaSpan.textContent = objetoJogador.fama;

    var defesaSpan = document.getElementById('defesaJogador');
    defesaSpan.textContent = objetoJogador.defesa;

    var ataqueSpan = document.getElementById('ataqueJogador');
    ataqueSpan.textContent = objetoJogador.ataque;

    var transformacaoSpan = document.getElementById('transformacaoJogador');
    if(objetoJogador.transformacao == true){
        transformacaoSpan.textContent = true  
    } else{
        transformacaoSpan.textContent = false  
    }

}

function verificarCartaJogador(){
    quantidadeDanoNoBoss = 0
    if(selecionarTipoCarta(cartaJogadorRecente) === 'ATK'){
    if(cartaJogadorRecente === 16){
        if(cartaBossRecente === 2){
            pararZumbidoLoucura()
        }
        ataqueBombardeioFumace()
    }  else if(cartaJogadorRecente === 17){
        quantidadeDanoNoBoss = 20
        fumacaDanoBoss(3500)
    } else if(cartaJogadorRecente === 18){
        quantidadeDanoNoBoss = 10
        danoBoss()
    } else if(cartaJogadorRecente === 19){
        quantidadeDanoNoBoss = 10
        danoBoss()
    } else if(cartaJogadorRecente === 20){
        quantidadeDanoNoBoss = 20
        fumacaDanoBoss(3500)
    } else if(cartaJogadorRecente === 21){
        quantidadeDanoNoBoss = 10
        danoBoss()
    } else if(cartaJogadorRecente === 22){
        quantidadeDanoNoBoss = 20
        choqueDanoBoss()
    }
   
    if(cartaJogadorRecente !== 16){
        alterarVidaBoss(vidaBoss -= quantidadeDanoNoBoss)
        return
    } else{
        return
    }

} else if(selecionarTipoCarta(cartaJogadorRecente) === 'DEF'){
    if(cartaJogadorRecente === 23){
        defendidoContraUmaPicadaSurpresa = true
        reproduzirEfeitoSomSpray()
    } else if(cartaJogadorRecente === 24){
        defendidoContraUmaPicadaParalizante = true
        reproduzirEfeitoSomRedeProtetora()
    }
    return
} else if(selecionarTipoCarta(cartaJogadorRecente) === 'INV'){
    if(cartaJogadorRecente === 30 && cartaBossRecente === 9){
        aumentoPorcentagemAtaqueContraMosquito()
    } else if(cartaJogadorRecente === 29 && cartaBossRecente === 10){
        aumentoPorcentagemAtaqueContraMosquito()
    } else if(cartaBossRecente === 5 || cartaBossRecente === 6 || cartaBossRecente === 7 || cartaBossRecente === 8 || cartaBossRecente === 11){
        if(cartaJogadorRecente === 27 || cartaJogadorRecente === 28 || cartaJogadorRecente === 29 || cartaJogadorRecente === 30 || cartaJogadorRecente === 31 || cartaJogadorRecente === 32){
        aumentoPorcentagemAtaqueContraMosquito()
        }
        return
    }

} else if(selecionarTipoCarta(cartaJogadorRecente) === 'CR'){
    if(cartaJogadorRecente === 25){
        quantidadeDeCura = 20
    } else if(cartaJogadorRecente === 26){
        quantidadeDeCura = 50
    }
    curarVidaJogador(quantidadeDeCura)
    return
}
}

function verificarCartaBoss(){
    if(cartaBossRecente === 1){
        iniciarCronometroMinigame(15)
        iniciarMinigameFuga()
    } else if(cartaBossRecente === 2){
        zumbidoLoucura()
        retornarAoEstadoNormal()
    } else if(cartaBossRecente === 3){
        if(defendidoContraUmaPicadaSurpresa === false){
        iniciarSusto()
        diminuirVidaJogador()
        retornarAoEstadoNormal()
        }else{
            defendidoContraUmaPicadaSurpresa = false
            retornarAoEstadoNormal()
        }
    } else if(cartaBossRecente === 4){
        if(defendidoContraUmaPicadaParalizante === false){
        iniciarSusto()
        setTimeout(function(){
            jogadaBoss()   
        },8000)
      
        }else{
            defendidoContraUmaPicadaParalizante = false
            retornarAoEstadoNormal()
        }
    } else if(cartaBossRecente === 12){
        alterarVidaBoss(vidaBoss += 20)
        retornarAoEstadoNormal()   
    } else if(cartaBossRecente === 13){
        alterarVidaBoss(vidaBoss += 100)
        retornarAoEstadoNormal()   
    }else{
        retornarAoEstadoNormal()   
    }
}

// Obtém a referência para o elemento da imagem que o jogador irá clicar
var imagemBaralho = document.getElementById('imagemBaralho');

// Adiciona um event listener para detectar o clique na imagem
imagemBaralho.addEventListener('click', function() {
    // Obtém a quantidade atual de cartas existentes
    var quantidadeCartas = document.querySelectorAll('.player-card').length;
    // Verifica se o jogador já tem 5 cartas
    if (quantidadeCartas >= 5) {
    
        return; // Sai da função se o limite for atingido
    }
    // Calcula o número da nova carta
    var idCorrespondente = selecionarIdCarta()
    // Cria uma nova div para representar a nova carta
    var novaCarta = document.createElement('div');
    // Adiciona as classes de estilo
    novaCarta.classList.add('player-card');
    // Define o atributo de dados para representar o número da carta
    novaCarta.id = idCorrespondente;
    novaCarta.dataset.cardNumber = numeroCarta++;
    novaCarta.style.zIndex = "10";
    selecionarImagem(idCorrespondente, novaCarta);
    // Adiciona a nova carta ao elemento card-holder
    document.querySelector('.card-holder').appendChild(novaCarta);
    reproduzirEfeitoSonoroCartaNaMesa();
    // Chama a função para selecionar a imagem com base no ID e definir como fundo da nova carta
    

    // Chama a função para configurar os eventos das cartas do jogador
    rearrangeCards();
});


function selecionarImagem(idImagem, novaCarta) {
    var enderecoImagem = Cartas[idImagem].caminhoImagem;
    
    // Cria um elemento de imagem
    var imagem = document.createElement('img');
    // Define o caminho da imagem
    imagem.src = enderecoImagem;

    // Adiciona a imagem como filho da div novaCarta
    novaCarta.appendChild(imagem);
}

  