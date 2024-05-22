

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
    let min = 16; 
    let max = 32; 
    let cartaSelecionada = Math.floor(Math.random() * (max - min + 1)) + min;
    return cartaSelecionada
}

function criarCartasNoInicio() {
    var contador = 0;

    function criarCartaComIntervalo() {
        // Calcula para quem a carta deve ser criada com base no contador
        if (contador % 2 === 0) {
            ocultarMaoJogador();
            criarCartaParaJogador();
        } else {
            criarCartaParaOponente();
        }
        // Incrementa o contador para a próxima iteração
        contador++;

        // Se ainda houver cartas para criar, programa a próxima execução
        if (contador < 8) {
            setTimeout(criarCartaComIntervalo, 500);
        } else {
            // Quando todas as cartas forem criadas, retorne ao estado normal
            setTimeout(retornarAoEstadoNormal, 500);
        }
    }

    // Inicia o processo de criação de cartas com um intervalo inicial
    setTimeout(criarCartaComIntervalo, 0);
}


// Função para criar uma carta para o jogador
function criarCartaParaJogador() {
    // Obtém a quantidade atual de cartas existentes
    var quantidadeCartas = document.querySelectorAll('.player-card').length;
    // Verifica se o jogador já tem 5 cartas
    if (quantidadeCartas >= 5) {
       
        return; // Sai da função se o limite for atingido
    }
    // Calcula o número da nova carta
    var idCorrespondente = selecionarIdCarta();
    //selecionarIdCarta()

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

    iniciarCronometroTempoMissao(600)
    iniciarMusica();
    criarCartasNoInicio();
    
  });

  function iniciarMusica() {
    // Obtém o elemento de áudio
    var audio = document.getElementById('musica');
    audio.volume = 0.2;
    // Inicia a reprodução da música
    audio.play();
}

function reproduzirEfeitoSonoroCartaNaMesa() {
    var audio = new Audio('/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/cardInTable.mp3');
    audio.play();
}


