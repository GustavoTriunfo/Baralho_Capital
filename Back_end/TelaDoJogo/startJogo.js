

var jogador1 = {
    saldo: 0,
    salario: 0,
    ruindade: 30,
    historicoRuindade: [],
    reves: 0,
    defesa: 0,
    ataque: 0,
    investimento: 0,
    fama: 0,
    transformacao: false,
    historicoCartasJogadas: [],
    cartas: []
};

var jogador2 = {
    saldo: 0,
    salario: 0,
    ruindade: 0,
    historicoRuindade: [],
    reves: 0,
    defesa: 0,
    ataque: 0,
    investimento: 0,
    fama: 0,
    transformacao: false,
    historicoCartasJogadas: [],
    cartas: []
};

var jogadorAtual = jogador1; 

function alternarJogador() {
    jogadorAtual = (jogadorAtual === jogador1) ? jogador2 : jogador1;
}

function selecionarIdCarta()
{
    if(Math.floor(Math.random() * (90 - 1 + 1)) + 1 > 70){
        return Math.floor(Math.random() * (111 - 100 + 1)) + 100;
    }
    else if(jogadorAtual.ruindade > 0 && jogadorAtual.ruindade <= 150){
        if(jogadorAtual.ruindade >= 100 && Math.floor(Math.random() * (7 - 3 + 1)) + 3 >= 6){
            return Math.floor(Math.random() * (7 - 3 + 1)) + 3;
        }
        id = Math.floor(Math.random() * (36 - 8 + 1)) + 8;
        if(id == 36){
            //chama método acabar
            return id
        } else{
            return id
        }
    }else if(jogadorAtual.ruindade > 150){
        if(jogadorAtual.historicoCartasJogadas.includes(4)){
            return 3
        }
        return 4
    } else if(jogadorAtual.investimento > 0){
        return Math.floor(Math.random() * (80 - 51 + 1)) + 51;
    }
}

function criarCartasNoInicio() {
    
    var contador = 0;

    // Loop para criar cartas alternadas para jogador e oponente
    for (var i = 0; i < 8; i++) {
        // Adiciona um intervalo de tempo entre a criação de cada carta
        setTimeout(function() {
            // Calcula para quem a carta deve ser criada com base no contador
            if (contador % 2 === 0) {
                criarCartaParaJogador();
            } else {
                criarCartaParaOponente();
            }
            // Incrementa o contador para a próxima iteração
            contador++;
        }, i * 500); // Multiplica o índice pelo intervalo de tempo desejado (1000ms = 1 segundo)
    }
}

// Função para criar uma carta para o jogador
function criarCartaParaJogador() {
    // Obtém a quantidade atual de cartas existentes
    var quantidadeCartas = document.querySelectorAll('.player-card').length;
    // Verifica se o jogador já tem 5 cartas
    if (quantidadeCartas >= 5) {
        console.log("O jogador já possui o número máximo de cartas.");
        return; // Sai da função se o limite for atingido
    }
    // Calcula o número da nova carta
    var idCorrespondente = selecionarIdCarta();
    console.log(idCorrespondente)
    // Cria uma nova div para representar a nova carta
    var novaCarta = document.createElement('div');
    // Adiciona as classes de estilo
    novaCarta.classList.add('player-card');
    // Define o atributo de dados para representar o número da carta
   // novaCarta.dataset.cardNumber = idCorrespondente;
    novaCarta.id = idCorrespondente
    novaCarta.dataset.cardNumber = numeroCarta++;
    selecionarImagem(idCorrespondente, novaCarta);
    document.querySelector('.card-holder').appendChild(novaCarta);
    reproduzirEfeitoSonoroCartaNaMesa();
    // Chama a função para selecionar a imagem com base no ID e definir como fundo da nova carta
   

    // Chama a função para configurar os eventos das cartas do jogador
    rearrangeCards();
}

// Função para criar uma carta para o oponente
function criarCartaParaOponente() {
    // Obtém a quantidade atual de cartas existentes
    var quantidadeCartas = document.querySelectorAll('.opponent-card').length;
    // Verifica se o oponente já tem 5 cartas
    if (quantidadeCartas >= 5) {
        console.log("O oponente já possui o número máximo de cartas.");
        return; // Sai da função se o limite for atingido
    }
    // Calcula o número da nova carta
    var idCorrespondente = quantidadeCartas + 1;
    // Cria uma nova div para representar a nova carta
    var novaCarta = document.createElement('div');
    // Adiciona as classes de estilo
    novaCarta.classList.add('opponent-card');
    // Define o atributo de dados para representar o número da carta
   // novaCarta.dataset.cardNumber = novoNumero;
    novaCarta.id = idCorrespondente
    novaCarta.dataset.cardNumber = numeroCarta++;
    document.querySelector('.opponent-cards').appendChild(novaCarta);
    reproduzirEfeitoSonoroCartaNaMesa();
    // Chama a função para configurar os eventos das cartas do jogador
    rearrangeCards();
}

startButton.addEventListener('click', function() {
    // Oculta a imagem de início
    startButton.style.display = 'none';
    // Oculta o overlay preto
    startOverlay.style.display = 'none';
    iniciarMusica();
    criarCartasNoInicio();
  });

  function iniciarMusica() {
    // Obtém o elemento de áudio
    var audio = document.getElementById('musica');
    audio.volume = 0.1;
    // Inicia a reprodução da música
    audio.play();
}

function reproduzirEfeitoSonoroCartaNaMesa() {
    var efeitoSonoro = document.getElementById("efeitoSonoroCartaColocadaNaMesa");
    efeitoSonoro.play();
}


