

var Cartas = {
    1: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Redenção.png', tipo: 'TRF', pontos: 0},
    2: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/HabeasCorpus.png', tipo: 'DEF', pontos: 10},
    3: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Preso.png', tipo: 'RV', pontos: 0},
    4: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Descoberto.png', tipo: 'RV', pontos: 0},
    5: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Chantageado.png', tipo: 'RV', pontos: 0},
    6: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Rabo Preso I.png', tipo: 'RV', pontos: 0},
    7: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Rabo Preso II.png', tipo: 'RV', pontos: 0},
    8: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Estrategista I.png', tipo: 'DEF', pontos: 20},
    9: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Estrategista II.png', tipo: 'DEF', pontos: 40},
    10: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Duas Caras.png', tipo: 'R', pontos: 50},
    11: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Chantageador I.png', tipo: 'R', pontos: 15},
    12: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Chantageador II.png', tipo: 'R', pontos: 25},
    13: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Chantageador III.png', tipo: 'R', pontos: 60},
    14: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Aliciador I.png', tipo: 'R', pontos: 30},
    15: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Aliciador II.png', tipo: 'R', pontos: 25},
    16: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Aliciador III.png', tipo: 'R', pontos: 60},
    17: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Corruptor I.png', tipo: 'R', pontos: 30},
    18: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Corruptor II.png', tipo: 'R', pontos: 60},
    19: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Corruptor III.png', tipo: 'R', pontos: 80},
    20: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Suborno I.png', tipo: 'DEF', pontos: 5},
    21: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Suborno II.png', tipo: 'DEF', pontos: 10},
    22: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Suborno III.png', tipo: 'DEF', pontos: 15},
    23: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Tráfico de Ilícitos.png', tipo: 'R', pontos: 25},
    24: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Lavagem de Dinheiro.png', tipo: 'R', pontos: 25},
    25: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Destruição de Provas.png', tipo: 'R', pontos: 20},
    26: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Isso é Jogo Sujo.png', tipo: 'R', pontos: 30},
    27: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Cassino Royale.png', tipo: 'R', pontos: 80},
    28: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Orcrim Municipal.png', tipo: 'R', pontos: 40},
    29: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Orcrim Estadual.png', tipo: 'R', pontos: 80},
    30: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Orcrim Nacional.png', tipo: 'R', pontos: 140},
    31: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Sonegador de Imposto.png', tipo: 'R', pontos: 35},
    32: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Investidor Suspeito.png', tipo: 'R', pontos: 50},
    33: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Amigo Oculto I.png', tipo: 'DEF', pontos: 25},
    34: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Amigo Oculto II.png', tipo: 'DEF', pontos: 50},
    35: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Amigo Oculto III.png', tipo: 'DEF', pontos: 100},
    36: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Morte.png', tipo: '?', pontos: 0},
    51: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/O Bom Samaritano.png', tipo: 'INV', pontos: 0},
    100: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Cheio de Amigos.png', tipo: 'FM', pontos: 10},
    101: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Famoso I.png', tipo: 'FM', pontos: 25},
    102: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Famoso II.png', tipo: 'FM', pontos: 40},
    103: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Famoso III.png', tipo: 'FM', pontos: 60},
    104: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Olho Mágico I.png', tipo: 'ATK', pontos: 5},
    105: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Olho Mágico II.png', tipo: 'ATK', pontos: 10},
    106: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Olho Mágico III.png', tipo: 'ATK', pontos: 15},
    107: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Fecha o Olho I.png', tipo: 'DEF', pontos: 5},
    108: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Fecha o Olho II.png', tipo: 'DEF', pontos: 10},
    109: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Fecha o Olho III.png', tipo: 'DEF', pontos: 15},
    110: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Hora de Aventura.png', tipo: 'DEF', pontos: 25},
    111: { caminhoImagem: '/Baralho_Capital/Back_end/TelaDoJogo/ImagensDasCartas/Precisa de Repouso.png', tipo: 'DEF', pontos: 25}
};

function selecionarTipoCarta(id){
    return Cartas[id].tipo;
};

// Função para atualizar o status do jogador com base no ID da carta escolhida
function atualizarStatusJogador(objetoJogador, id_carta) {
    // Verifica se o ID da carta está presente no objeto de valores de cartas
    if (Cartas.hasOwnProperty(id_carta)) {
        const valores = Cartas[id_carta].pontos;
        const tipo = selecionarTipoCarta(id_carta)

        if (tipo == 'R'){
            atualizarRuindade(objetoJogador, valores)
        }  else if (tipo == 'TRF'){
            transformar(objetoJogador);
        } else if (tipo == 'DEF'){
            objetoJogador.defesa += valores
        } else if (tipo == 'ATK'){
            objetoJogador.ataque += valores
        } else if (tipo == 'INV'){
            objetoJogador.investimento += valores
        } else if (tipo == 'FM'){
            objetoJogador.fama += valores
        } else if (tipo == 'RV'){
            objetoJogador.reves += valores
        } else if (tipo == '?'){
           terminarJogo();
        }
        atualizarSalario(objetoJogador, id_carta);
        atualizarTelaStatus(objetoJogador);
    } else {
        console.error("ID de carta inválido:", id_carta);
    }
}

function atualizarTelaStatus(objetoJogador){
    atualizarDinheiroTela(objetoJogador.saldo)

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

}

function atualizarSalario(objetoJogador, id_carta){
    if(objetoJogador.fama > 0){
        objetoJogador.salario += 500
    } else if(objetoJogador.investimento > 0){
        objetoJogador.salario += 500
    } else if(id_carta == 14){
        objetoJogador.saldo += 25000
    }else if(id_carta == 15){
        objetoJogador.saldo += 50000
    }else if(id_carta == 16){
        objetoJogador.saldo += 100000
    }
}

// Função para atualizar a ruindade do jogador
function atualizarRuindade(objetoJogador, novoValorRuindade) {
    // Atualiza a ruindade do jogador
    objetoJogador.ruindade += novoValorRuindade;

    // Adiciona o novo valor da ruindade ao históricoRuindade
    objetoJogador.historicoRuindade.push(novoValorRuindade);
}

// Função para transformar a ruindade em algo positivo
function transformar(objetoJogador) {
    // Verifica se o jogador tem capacidade de transformação disponível
    if (objetoJogador.transformacao) {
        // Verifica se há ruindade no histórico
        if (objetoJogador.historicoRuindade.length > 0) {
            // Seleciona o primeiro nível de ruindade da lista
            var ruindadeSelecionada = objetoJogador.historicoRuindade[0];

            // Calcula o valor a ser pago pela transformação (nível de ruindade * 100)
            var valorTransformacao = ruindadeSelecionada * 100;

            // Verifica se o jogador tem dinheiro suficiente para pagar pela transformação
            //if (Jogador.saldo >= valorTransformacao) {
                // Remove o valor da transformação do saldo do jogador
                objetoJogador.saldo -= valorTransformacao;

                // Remove o valor da ruindade selecionada do históricoRuindade e da ruindade total
                objetoJogador.historicoRuindade.shift(); // Remove o primeiro elemento da lista
                objetoJogador.ruindade -= ruindadeSelecionada;

                // Define transformacao como false, indicando que a transformação foi realizada
                objetoJogador.transformacao = false;

                // Retorna true indicando que a transformação foi bem-sucedida
                return true;
           // } //else {
                // Se o jogador não tiver dinheiro suficiente, retorna false indicando falha na transformação
               // return false;
            //}
        } else {
            // Se não houver ruindade no histórico, retorna false indicando falha na transformação
            return false;
        }
    } else {
        // Se a transformação não estiver disponível, retorna false indicando falha na transformação
        return false;
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


// Função para atualizar o valor do dinheiro na label
function atualizarDinheiroTela(valor) {
    var dinheiroLabel = document.getElementById('moneyLabel');
    // Formatando o valor para o padrão brasileiro
    var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    dinheiroLabel.textContent = 'Dinheiro: ' + valorFormatado;
  
    var dinheiroSpan = document.getElementById('dinheiroJogador');
    dinheiroSpan.textContent = valorFormatado;
  }
  

 // atualizarDinheiro(jogadorAtual.saldo);
