// Função para criar cartas no início do jogo
function criarCartasNoInicio() {
    // Contador para controlar o intervalo de tempo entre as cartas
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
    var novoNumero = quantidadeCartas + 1;
    // Cria uma nova div para representar a nova carta
    var novaCarta = document.createElement('div');
    // Adiciona as classes de estilo
    novaCarta.classList.add('player-card');
    // Define o atributo de dados para representar o número da carta
    novaCarta.dataset.cardNumber = novoNumero;
    // Chama a função para selecionar o tipo de carta e obter o ID da imagem
    var idImagem = selecionarTipoCarta();
    // Define o ID da imagem como o ID da nova carta
    novaCarta.id = idImagem;
    // Adiciona a nova carta ao elemento card-holder
    document.querySelector('.card-holder').appendChild(novaCarta);
    reproduzirEfeitoSonoroCartaNaMesa();
    // Chama a função para selecionar a imagem com base no ID e definir como fundo da nova carta
    selecionarImagem(idImagem, novaCarta);

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
    var novoNumero = quantidadeCartas + 1;
    // Cria uma nova div para representar a nova carta
    var novaCarta = document.createElement('div');
    // Adiciona as classes de estilo
    novaCarta.classList.add('opponent-card');
    // Define o atributo de dados para representar o número da carta
    novaCarta.dataset.cardNumber = novoNumero;
    // Chama a função para selecionar o tipo de carta e obter o ID da imagem
    var idImagem = selecionarTipoCarta();
    // Define o ID da imagem como o ID da nova carta
    novaCarta.id = idImagem;
    // Adiciona a nova carta ao elemento opponent-cards
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
