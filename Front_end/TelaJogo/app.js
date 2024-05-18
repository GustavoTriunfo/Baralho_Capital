
var MissaoCombateDengue = true
var Cartas = {
  
    1: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/BarrilDeAgua2.png', tipo: 'DEF', pontos: 0},
    2: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/ExercitoAlado.png', tipo: 'ATK', pontos: 0},
    5: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Chantageado.png', tipo: 'RV', pontos: 0},
    6: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Rabo Preso I.png', tipo: 'RV', pontos: 0},
    7: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Rabo Preso II.png', tipo: 'RV', pontos: 0},
    8: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Estrategista I.png', tipo: 'DEF', pontos: 20},
    9: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Estrategista II.png', tipo: 'DEF', pontos: 40},
    10: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Duas Caras.png', tipo: 'R', pontos: 50},
    11: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Chantageador I.png', tipo: 'R', pontos: 15},
    12: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Chantageador II.png', tipo: 'R', pontos: 25}
};

function selecionarTipoCarta(id){
    return Cartas[id].tipo;
};

function atualizarStatusJogo(){
    console.log("entrou atualizar status")
    if(verificarFim() === false){
        if(jogadorAtual === jogador2){
            console.log("vez jogador")
            turnoJogador()
            alternarJogador()
        } else{
            console.log("vez boss")
            if(vidaBoss == 60){
                console.log("entrou no clicke vidaBoss")
                transicaoBoss = true
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
    reproduzirEfeitoSonoroCartaNaMesa();
    danoBoss()
    alterarVidaBoss(vidaBoss -= 10)
}

function turnoBoss(){
    jogadaBoss()
}

function jogadaBoss() {
    if(transicaoBoss === false){
        console.log("entrou no if transicaoBoss")
    iniciarCronometro(15)
    setTimeout(function() {
        reproduzirEfeitoSonoroCartaNaMesa();
        visualizacaoCartaBoss();
        tocarEfeitoRisadaMosquitoAleatorio();
        exibirImagemTemporizada()
      
        cronometroAtivo = false;
    }, Math.floor(Math.random() * 3000) + 3000); // Atraso de 3 a 5 segundos (3000 a 5000 milissegundos) 
}else{
    transicaoBoss = false
    setTimeout(function() {
        jogadaBoss()
    }, 7000);
}

}

function verificarFim(){
    if(verificarBarraDeProgressoZerada()){
        return true
    } else{
        return false
    }
}
// Função para atualizar o status do jogador com base no ID da carta escolhida
function atualizarStatusJogador(objetoJogador, id_carta) {
 
}

function terminarJogo(){
    endgameOverlay.style.display = 'block';
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

function verificarCartaBoss(id){
    if(id === 2){
        iniciarCronometroMinigame(15)
        iniciarMinigameFuga()
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
        console.log("O jogador já possui o número máximo de cartas.");
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

  