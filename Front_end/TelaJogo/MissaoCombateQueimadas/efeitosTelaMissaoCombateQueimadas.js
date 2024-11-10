import {getCartaEscolhidaPorJogador} from './MissaoCombateQueimadas.js'
import {getCartaBossRecente, pararMusica, alterarVidaBoss, getVidaBoss, atualizarStatusJogo,
    getMusicaTocando, selecionarCaminhoImagem, setTurnoMaisLongoDoJogador
} from '../app.js'
import {diminuirVidaJogador, getQuantidadeHPJogador} from '../jogador.js'
import {danoNoJogador, fogareuDerrotado} from './animacoesMissao/animacoesNaTelaMissao.js'
import {setJogoAcabou, getJogoAcabou, reproduzirEfeitoSonoro, retornarAoEstadoNormal, ocultarMaoJogador, getTempoMissaoZerado} from '../script.js'

let pontosJogador = 0;
var jogadorSofreuDano = false
var jogadorLevouDanoPorTempoZerado = false

export function verificarCartasMissaoQueimadas() {
    if(
        parseInt(getCartaBossRecente()) === 3 && parseInt(getCartaEscolhidaPorJogador()) === 10 || 
        parseInt(getCartaBossRecente()) === 1 && parseInt(getCartaEscolhidaPorJogador()) === 11 || 
        parseInt(getCartaBossRecente()) === 9 && parseInt(getCartaEscolhidaPorJogador()) === 12 || 
        ([2, 4, 5, 6, 7, 8, 0].includes(parseInt(getCartaBossRecente())) && parseInt(getCartaEscolhidaPorJogador()) === 13)
    ) {
            adicionarPontoAJogador()
            verificarItensDePontuacao()
        
    } else {
        queimarJogador()
    }
    console.log(getCartaBossRecente() + ' ' + getCartaEscolhidaPorJogador())
}

export function atualizarTelaMissaoCombateQueimadas() {

}

export function queimarJogador() {
    if(getQuantidadeHPJogador() > 2){
    pausarCronometro()
    jogadorSofreuDano = true
    reproduzirEfeitoSonoro("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/RisadaFogareu.mp3", 0.4);
    reproduzirEfeitoSonoro("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/DanoNoJogador.mp3", 1);
    diminuirVidaJogador()
    ocultarMaoJogador()
    danoNoJogador()
        setTimeout(() => {
            setJogadorSofreuDano(false)
            atualizarStatusJogo()
            retornarAoEstadoNormal()
            reiniciarCronometro()
    }, 3000);  
    }
}

export function finalizarMissaoCombateQueimadas() {
    if(getJogoAcabou() === false) {
        if(getVidaBoss() < 10){
            fogareuDerrotado()
        } else if(getQuantidadeHPJogador() < 2 || getTempoMissaoZerado() === true){
            pausarCronometro()
            if(getMusicaTocando() === true){
            pararMusica()
            reproduzirEfeitoSonoro("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/musicasEEfeitosSonoros/Creepy Asteroid.mp3", 1);
            }
            setJogoAcabou(true)
            var endgamePlayerLose = document.getElementById('endgamePlayerLose');
            var imagemDerrota = document.getElementById('imagemDerrota');
            endgamePlayerLose.style.display = 'block';
            imagemDerrota.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/burnedSkull.png'

            const imagemOverlay = document.createElement('img');
            var corpo = document.body
            imagemOverlay.src = '/Baralho_Capital/Front_end/TelaJogo/MissaoCombateQueimadas/imagensMissaoQueimadas/fogoFundoDerrota.gif';

            imagemOverlay.style.position = 'fixed';
            imagemOverlay.style.top = '0';
            imagemOverlay.style.left = '0';
            imagemOverlay.style.width = '100%';
            imagemOverlay.style.height = '100%';
            imagemOverlay.style.objectFit = 'cover';
            imagemOverlay.style.zIndex = '10000';
            imagemOverlay.style.opacity = '1';
            imagemOverlay.style.pointerEvents = 'none';

            corpo.appendChild(imagemOverlay);
        }
    }
}

export function adicionarPontoAJogador() {
    let pontoContainer = document.getElementById('pontoContainer');
    if (!pontoContainer) {
        pontoContainer = document.createElement('div');
        pontoContainer.id = 'pontoContainer';
        pontoContainer.className = 'p-3 rounded';
        pontoContainer.innerHTML = `
            <span>Pontos:</span>
            <span id="pontoContador" class="ponto-contador">${pontosJogador}</span>
        `;
        document.body.appendChild(pontoContainer);
    }

    // Incrementa os pontos
    pontosJogador++;
    const pontoContador = document.getElementById('pontoContador');
    pontoContador.textContent = pontosJogador;

    // Adiciona a classe para a animação de aumento
    pontoContador.classList.add('ponto-animado');

    // Remove a animação após 300ms para o efeito de pulso
    setTimeout(() => {
        pontoContador.classList.remove('ponto-animado');
    }, 300);
}

let intervaloCronometro; // Variável para armazenar o intervalo do cronômetro
let tempoRestante = 5; // Tempo inicial padrão

// Função para iniciar o cronômetro com um tempo específico
export function iniciarCronometroLance(tempoInicial = 5) {
    // Define o tempo restante com o valor passado (ou o padrão de 5 segundos)
    tempoRestante = tempoInicial;

    const cronometroElement = document.getElementById('cronometro') || document.createElement('div');
    if (!document.getElementById('cronometro')) {
        cronometroElement.id = 'cronometro';
        cronometroElement.className = 'cronometro';
        document.body.appendChild(cronometroElement);
    }

    // Limpa qualquer intervalo existente para reiniciar o cronômetro do zero
    clearInterval(intervaloCronometro);

    // Inicia o intervalo para o cronômetro
    intervaloCronometro = setInterval(() => {
        const milissegundos = Math.floor((tempoRestante % 1) * 100);
        const segundos = Math.floor(tempoRestante);

        cronometroElement.textContent = `${segundos}.${milissegundos < 10 ? '0' + milissegundos : milissegundos}`;

        // Adiciona a cor vermelha quando o tempo está acabando
        if (tempoRestante <= 1) {
            cronometroElement.style.color = 'red';
        } else {
            cronometroElement.style.color = 'white';
        }

        // Animação de pulso
        if (tempoRestante % 1 === 0) {
            cronometroElement.classList.add('animacao');
            setTimeout(() => {
                cronometroElement.classList.remove('animacao');
            }, 100);
        }

        // Decrementa o tempo restante
        tempoRestante -= 0.01;

        // Limita o cronômetro a 0 e para o intervalo
        if (tempoRestante <= 0) {
            clearInterval(intervaloCronometro);
            cronometroElement.textContent = '0.00';
            queimarJogador()
            setJogadorLevouDanoPorTempoZerado(true)
        }
    }, 10); // Atualiza a cada 10 milissegundos
}


export function verificarItensDePontuacao() {
    if(pontosJogador === 8) {
        entregarCartaEspecial(17)
        setTurnoMaisLongoDoJogador(true)
    } else if (pontosJogador === 16) {
        entregarCartaEspecial(19)
        setTurnoMaisLongoDoJogador(true)
    }
     else if (pontosJogador === 26) {
        entregarCartaEspecial(23)
        setTurnoMaisLongoDoJogador(true)
     }  else if (pontosJogador === 38) {
        entregarCartaEspecial(25)
        setTurnoMaisLongoDoJogador(true)
     }  else if (pontosJogador === 50) {
        entregarCartaEspecial(27)
        setTurnoMaisLongoDoJogador(true)
     }  else if (pontosJogador >= 70) {
        entregarCartaEspecial(28)
        setTurnoMaisLongoDoJogador(true)
     }
}

export function entregarCartaEspecial(limiteIdCartaGerada) {
   let min = 14; 
   let max = limiteIdCartaGerada; 
   let cartaSelecionada = Math.floor(Math.random() * (max - min + 1)) + min;
   adicionarImagemNaPokedex(selecionarCaminhoImagem(cartaSelecionada), cartaSelecionada)
}

let celulaSelecionada = null;

export function adicionarImagemNaPokedex(caminhoImagem, id) {
    // Seleciona a grid da Pokédex
    const pokedexGrid = document.getElementById('pokedexGrid');

    // Cria um novo slot (div) para a imagem
    const novaCelula = document.createElement('div');
    novaCelula.classList.add('pokedex-cell'); // Adiciona uma classe para estilização
    novaCelula.dataset.selecionado = "false"; // Inicialmente, não está selecionada
    novaCelula.dataset.id = id; // Armazena o ID da imagem como um atributo da célula

    // Cria a imagem
    const novaImagem = document.createElement('img');
    novaImagem.src = caminhoImagem;
    novaImagem.alt = 'Imagem do item'; // Texto alternativo para acessibilidade
    novaImagem.classList.add('pokedex-image'); // Adiciona uma classe para estilização

    // Adiciona a imagem à nova célula
    novaCelula.appendChild(novaImagem);

    // Adiciona a nova célula à grid da Pokédex
    pokedexGrid.appendChild(novaCelula);

    // Adiciona o evento de clique diretamente ao novo elemento
    novaCelula.addEventListener("click", function(event) {
        event.stopPropagation();  // Impede a propagação do evento de clique

        // Chama o método de visualização passando o elemento clicado
        visualizarCartaAtravesDeClique(novaCelula);

        // Se já existe uma célula selecionada, remove a seleção dela
        if (celulaSelecionada && celulaSelecionada !== novaCelula) {
            celulaSelecionada.style.backgroundColor = ''; // Restaura a cor original
            celulaSelecionada.dataset.selecionado = "false";
            $(celulaSelecionada).removeClass("active"); // Remover a classe 'active' da célula anterior
        }

        // Alterna o estado da célula clicada
        if (novaCelula.dataset.selecionado === "false") {
            // Marca a nova célula como selecionada
            novaCelula.style.backgroundColor = 'yellow'; // Cor de seleção para a célula atual
            novaCelula.dataset.selecionado = "true";
            celulaSelecionada = novaCelula; // Atualiza a referência para a célula selecionada
            $(novaCelula).addClass("active"); // Adiciona a classe 'active' à nova célula
        }
    });

    // Exibe o ícone de exclamação por 1,5 segundos
    const exclamacao = document.getElementById('exclamacao');
    exclamacao.style.display = 'block';
    setTimeout(() => {
         exclamacao.style.display = 'none';
    }, 1500);  
}
// Exemplo de função que realiza uma ação com a imagem selecionada
function realizarAcaoComImagemSelecionada(id) {
    alterarVidaBoss(getVidaBoss() - 20)
    verificarCartaEspecialDoJogador(id)
    document.getElementById('arrowButton').click();

    if (celulaSelecionada) {
        celulaSelecionada.remove();
        celulaSelecionada = null;
    }
}

export function verificarCartaEspecialDoJogador(id) {

}

// Função para pausar o cronômetro
export function pausarCronometro() {
    clearInterval(intervaloCronometro);
}

// Função para reiniciar o cronômetro com um novo valor de tempo
export function reiniciarCronometro(tempoInicial = 5) {
    iniciarCronometroLance(tempoInicial); // Reinicia o cronômetro com o novo tempo
}

export function getJogadorSofreuDano() {
    return jogadorSofreuDano
}

export function setJogadorSofreuDano(estado) {
    jogadorSofreuDano = estado
}

export function getJogadorLevouDanoPorTempoZerado() {
    return jogadorLevouDanoPorTempoZerado
}

export function setJogadorLevouDanoPorTempoZerado(estado) {
    jogadorLevouDanoPorTempoZerado = estado
}

export function visualizarCartaAtravesDeClique(elementoClicado) {
    // Verificar se a carta clicada já está ativa
    if ($(elementoClicado).hasClass("active")) {
        // Se a carta clicada já estiver ativa, remover a pré-visualização e a classe 'active'
        $("#cardPreviewOverlay").removeClass("d-block");
        $(elementoClicado).removeClass("active").css("z-index", "1");
        $(elementoClicado).data("selecionado", "false"); // Resetar o selecionado
    } else {
        // Tornar visível a div de pré-visualização
        $("#cardPreviewOverlay").addClass("d-block").css("z-index", "999");

        // Obter a imagem da carta clicada
        const cardImage = $(elementoClicado).find('img').attr('src');
        
        // Atualizar a pré-visualização com a imagem da carta clicada
        if ($("#cardPreviewOverlay img").length === 0) {
            // Se não houver uma imagem dentro de #cardPreviewOverlay, crie uma
            const imgElement = document.createElement('img');
            imgElement.src = cardImage;
            $("#cardPreviewOverlay").append(imgElement);
        } else {
            // Se já houver uma imagem dentro de #cardPreviewOverlay, atualize o src dela
            $("#cardPreviewOverlay img").attr('src', cardImage);
        }

        // Remover classe 'active' e redefinir o z-index de todas as cartas
        $(".player-card").removeClass("active").css("z-index", "1");

        // Adicionar classe 'active' e definir um z-index maior para a carta selecionada
        $(elementoClicado).addClass("active").css("z-index", "1000");

        const idCarta = $(".player-card.active").attr("id");

        // Configurar o estado dos botões
        if ([3, 4, 5, 6, 7, 36].includes(parseInt(idCarta))) {
            $("#botaoDevolver, #botaoJogar").prop("disabled", true);
        } else {
            $("#botaoDevolver, #botaoJogar").prop("disabled", false);

            // Configura o evento de clique para o botão Jogar
            $("#botaoJogar").off("click").on("click", () => realizarAcaoComImagemSelecionada(idCarta));
        }

        // Modifica o texto do botão "Devolver" para "Fechar"
        $("#botaoDevolver").text("Fechar");

        // Configura o evento de clique para o botão "Fechar"
        $("#botaoDevolver").off("click").on("click", () => {
            // Remove a pré-visualização e a classe 'active' da carta
            $("#cardPreviewOverlay").removeClass("d-block");
            $(elementoClicado).removeClass("active").css("z-index", "1");
            $(elementoClicado).data("selecionado", "false"); // Resetar o selecionado
            $("#botaoDevolver").text("Devolver"); // Volta o texto para "Devolver" ao fechar
        });
    }
}