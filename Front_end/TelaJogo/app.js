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
});


// Função para selecionar o tipo de carta e retornar o ID correspondente
function selecionarTipoCarta() {
    // Aqui você implementaria a lógica para selecionar o tipo de carta com base nos níveis do jogador
    // e retornar o ID correspondente à imagem da carta
    // Por exemplo:
    var nivel = 1; // Suponha que o nível atual do jogador seja 1
    // Lógica para determinar o ID da imagem com base no tipo de carta
    var idImagem = ''; // Aqui você definiria o ID da imagem com base no tipo de carta
    return idImagem;
}

// Função para selecionar a imagem com base no ID e definir como fundo da carta
function selecionarImagem(idImagem, novaCarta) {
    // Objeto que mapeia os IDs das imagens para seus respectivos caminhos
    var caminhosImagens = {
        id1: 'caminho_da_imagem_1.jpg',
        id2: 'caminho_da_imagem_2.jpg',
        id3: 'caminho_da_imagem_3.jpg',
        // Adicione mais IDs e caminhos conforme necessário
    };

    // Verifica se o ID da imagem existe no objeto
    if (idImagem in caminhosImagens) {
        // Obtém o caminho da imagem com base no ID
        var caminhoImagem = caminhosImagens[idImagem];
        // Define o caminho da imagem como o estilo de fundo da nova carta
        novaCarta.style.backgroundImage = 'url(' + caminhoImagem + ')';
    } else {
        console.error('ID de imagem inválido:', idImagem);
    }
}

