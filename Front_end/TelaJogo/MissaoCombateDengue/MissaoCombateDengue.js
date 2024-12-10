import {Missao} from '../Missao.js'
import {CartasMissaoCombateDengue} from './cartasMissaoCombateDengue.js';
import {setCartasJogo, iniciarMusica, alterarVideo} from '../app.js'
import {criarCartaParaJogador, criarCartaParaOponente} from '../startJogo.js'
import {ocultarMaoJogador, retornarAoEstadoNormal, iniciarCronometroTempoMissao} from '../script.js'

var cartasInvestimentosContraMosquito = 0
var defendidoContraUmaPicadaSurpresa = false
var defendidoContraUmaPicadaParalizante = false
var picadasRecebidas = 0

export class MissaoCombateDengue extends Missao {
    configurarHtml() {
        this.criarImagemSusto();
        this.criarImagemFumace();
        this.criarOverlayLoucura();
        this.criarBlackOverlay();
        this.criarElementosRaivaERisadaEImagemMosquito();
        this.criarStatusInfo();
        }

        criarImagemSusto() {
            console.log("Configurando HTML da missão combate à dengue.");
         // Criar o elemento div da classe 'susto-overlay'
        const sustoOverlay = document.createElement('div');
        sustoOverlay.classList.add('susto-overlay');
        sustoOverlay.id = 'sustoOverlay';

        // Criar o elemento de imagem do susto
        const imgSusto = document.createElement('img');
        imgSusto.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/AtaqueSusto.png';
        imgSusto.alt = 'Imagem de Susto';
        imgSusto.id = 'imagemSusto';

        // Criar o fundo preto
        const fundoPreto = document.createElement('div');
        fundoPreto.classList.add('fundo-preto');
        fundoPreto.id = 'fundoPreto';

        // Adicionar a imagem e o fundo preto à div 'susto-overlay'
        sustoOverlay.appendChild(imgSusto);
        sustoOverlay.appendChild(fundoPreto);

        // Adicionar a 'susto-overlay' ao corpo do documento (ou a um container específico)
        document.body.appendChild(sustoOverlay);
        }

         criarImagemFumace() {
            // Criar o elemento de imagem
            const imgFumace = document.createElement('img');
            
            // Definir os atributos da imagem
            imgFumace.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/fighting cloud.gif';
            imgFumace.alt = 'ImagemFumace';
            imgFumace.id = 'ImagemFumace';
            
            // Aplicar os estilos diretamente no JavaScript
            imgFumace.style.display = 'none';
            imgFumace.style.position = 'fixed';
            imgFumace.style.top = '-200px';
            imgFumace.style.right = '-90px';
            imgFumace.style.zIndex = '999';
            imgFumace.style.width = '600px';
            imgFumace.style.height = 'auto';
            
            // Adicionar a imagem ao corpo do documento (ou a um container específico)
            document.body.appendChild(imgFumace);
        }

         criarOverlayLoucura() {
            // Criar o elemento div da classe 'overlayLoucura'
            const overlayLoucura = document.createElement('div');
            overlayLoucura.classList.add('overlayLoucura');
            overlayLoucura.id = 'overlayLoucura';
        
            // Lista das imagens a serem adicionadas
            const imagens = [
                { src: '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/crazy01.gif', alt: 'Imagem 1' },
                { src: '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/crazy02.gif', alt: 'Imagem 2' },
                { src: '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/crazy03.gif', alt: 'Imagem 3' },
                { src: '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/crazy04.gif', alt: 'Imagem 4' },
                { src: '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/crazy05.gif', alt: 'Imagem 5' }
            ];
        
            // Criar as imagens e adicionar à div 'overlayLoucura'
            imagens.forEach(imagem => {
                const imgElement = document.createElement('img');
                imgElement.src = imagem.src;
                imgElement.alt = imagem.alt;
                overlayLoucura.appendChild(imgElement);
            });
        
            // Adicionar a 'overlayLoucura' ao corpo do documento (ou a um container específico)
            document.body.appendChild(overlayLoucura);
        }

         criarBlackOverlay() {
            // Criar o elemento div da classe 'black-overlay'
            const blackOverlay = document.createElement('div');
            blackOverlay.classList.add('black-overlay');
            blackOverlay.style.display = 'none'; // Definir inicialmente como não visível
        
            // Criar a div interna
            const innerBlackDiv = document.createElement('div');
            innerBlackDiv.classList.add('inner-black-div');
        
            // Criar a div quadrada
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            innerBlackDiv.appendChild(squareDiv); // Adicionar o quadrado à div interna
        
            // Adicionar a div interna à black overlay
            blackOverlay.appendChild(innerBlackDiv);
        
            // Criar a div para os botões de controle
            const controlButtonsDiv = document.createElement('div');
            controlButtonsDiv.classList.add('control-buttons');
        
            // Criar e adicionar os botões de controle
            const buttons = [
                { id: 'move-up', text: '↑' },
                { id: 'move-left', text: '←' },
                { id: 'move-down', text: '↓' },
                { id: 'move-right', text: '→' }
            ];
        
            buttons.forEach(button => {
                const btnElement = document.createElement('button');
                btnElement.id = button.id;
                btnElement.textContent = button.text;
                controlButtonsDiv.appendChild(btnElement); // Adicionar o botão à div de controle
            });
        
            // Adicionar a div de controle à black overlay
            blackOverlay.appendChild(controlButtonsDiv);
        
            // Adicionar a 'black-overlay' ao corpo do documento (ou a um container específico)
            document.body.appendChild(blackOverlay);
        }

        criarElementosRaivaERisadaEImagemMosquito() {
             // Selecionar a div 'black-bg' existente
                const blackBg = document.querySelector('.black-bg');

                // Criar a imagem da raiva
                const imgRaiva = document.createElement('img');
                imgRaiva.id = 'raiva';
                imgRaiva.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/angry2.gif';
                imgRaiva.style.display = 'none';
                imgRaiva.style.position = 'fixed';
                imgRaiva.style.top = '70px';
                imgRaiva.style.right = '145px';
                imgRaiva.style.width = '40px';
                imgRaiva.style.zIndex = '99';

                // Criar a imagem da risada
                const imgRisada = document.createElement('img');
                imgRisada.id = 'risada';
                imgRisada.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/haha.gif';
                imgRisada.style.display = 'none';
                imgRisada.style.position = 'fixed';
                imgRisada.style.top = '10px';
                imgRisada.style.right = '55px';
                imgRisada.style.width = '80px';

                // Criar a imagem do mosquito cantando
                const imgMosquito = document.createElement('img');
                imgMosquito.id = 'mosquitoNotes';
                imgMosquito.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoSinging.gif';
                imgMosquito.alt = 'mosquito notes'; // Texto alternativo para acessibilidade
                imgMosquito.style.position = 'fixed';
                imgMosquito.style.top = '0px'; // Defina a posição desejada
                imgMosquito.style.right = '50px'; // Defina a posição desejada
                imgMosquito.style.width = '130px'; // Ajuste o tamanho conforme necessário
                imgMosquito.style.zIndex = '99'; // Ajuste o z-index conforme necessário

                // Adicionar os elementos à 'black-bg'
                blackBg.appendChild(imgRaiva);
                blackBg.appendChild(imgRisada);
                blackBg.appendChild(imgMosquito);
                
                let imagem = document.getElementById('animatedImage');
                imagem.src = '/Baralho_Capital/Front_end/TelaJogo/ImagensTelaJogo/MosquitoDengue.png';
                imagem.classList.add('animated');
        }

        criarStatusInfo() {
                // Seleciona o menu de status
                const statusMenu = document.getElementById("statusMenu");
                
                // Cria a div para informações de status
                const statusInfo = document.createElement("div");
                statusInfo.className = "status-info";
                
                // Lista de informações a serem adicionadas
                const informacoes = [
                    { label: "Nome Jogador(a):", id: "nomeJogador", className: "text-primary" },
                    { label: "Vida Jogador:", id: "vidaJogador", className: "text-success" },
                    { label: "Vida Mosquito:", id: "vidaMosquito", className: "text-danger" },
                    { label: "Quantidade Cartas Jogadas:", id: "cartasJogadas", className: "text-info" },
                    { label: "Dano Causado:", id: "danoCausado", className: "text-info" },
                    { label: "Defesa contra Picada Surpresa:", id: "defesaContraPicadaSur", className: "text-info" },
                    { label: "Defesa contra Picada Paralizante:", id: "defesaContraPicadaPar", className: "text-info" },
                    { label: "Investimentos contra Mosquito da Dengue:", id: "investimentosContraMosquito", className: "text-info" },
                    { label: "Picadas Recebidas:", id: "danoRecebido", className: "text-info" }
                ];
            
                // Cria e adiciona cada informação à div
                informacoes.forEach(info => {
                    const p = document.createElement("p");
                    p.className = "mb-2";
                    p.innerHTML = `<strong>${info.label}</strong> <span id="${info.id}" class="${info.className}"></span>`;
                    statusInfo.appendChild(p);
                });
            
                // Adiciona a div de statusInfo ao statusMenu
                statusMenu.appendChild(statusInfo);
        }

        configurarMusicasEEfeitosSonoros() {
            console.log("Configurando músicas e efeitos sonoros da missão combate à dengue.");
            this.alterarMusica("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/Danse macabre.mp3");
            alterarVideo("/Baralho_Capital/Front_end/TelaJogo/MissaoCombateDengue/musicasEEfeitos/tutorialMissaoDengue.mp4")
        }
     alterarMusica(novaFonte) {
        const musica = document.getElementById("musica");
        musica.src = novaFonte;
        musica.load();
    }

        configurarCartas() {
            setCartasJogo(CartasMissaoCombateDengue)
    }

    funcoesEspecificasDaMissao() {
        iniciarCronometroTempoMissao(600)
        iniciarMusica(0.4)
    }

    criarCartasNoInicioDaMissao() {
        var contador = 0;
        ocultarMaoJogador();
    function criarCartaComIntervalo() {
        // Calcula para quem a carta deve ser criada com base no contador
        if (contador % 2 === 0) {
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

    selecionarIdentificadorCarta() {
        let min = 16; 
        let max = 32; 
        if(getCartasInvestimentosContraMosquito() > 5 && getCartasInvestimentosContraMosquito() <= 7){
            min = 18; 
        } else if (getCartasInvestimentosContraMosquito() > 7 && getCartasInvestimentosContraMosquito() < 10){
            min = 16;
        } else if(getCartasInvestimentosContraMosquito() >= 10){
            min = 16; 
            max = 26;
        }else{
            min = 23
        }
       
        let cartaSelecionada = Math.floor(Math.random() * (max - min + 1)) + min;
        return cartaSelecionada
    }

    eventoCliqueNaCartaDeAcordoComMissao(elementoClicado) {
         // Verificar se a carta clicada já está ativa
    if ($(elementoClicado).hasClass("active")) {
        // Se a carta clicada já estiver ativa, remover a pré-visualização e a classe 'active'
        $("#cardPreviewOverlay").removeClass("d-block");
        $(elementoClicado).removeClass("active").css("z-index", "1");
    } else {
        // Tornar visível a div de pré-visualização
        $("#cardPreviewOverlay").addClass("d-block");
    
        // Obter a imagem da carta clicada
        var cardImage = $(elementoClicado).find('img').attr('src');
        // Atualizar a pré-visualização com a imagem da carta clicada
    if ($("#cardPreviewOverlay img").length === 0) {
        // Se não houver uma imagem dentro de #cardPreviewOverlay, crie uma
        var imgElement = document.createElement('img');
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
        var idCarta = $(".player-card.active").attr("id");
        if (idCarta == 3 || idCarta == 4 || idCarta == 5 || idCarta == 6 || idCarta == 7 || idCarta == 36) {
            $("#botaoDevolver, #botaoJogar").prop("disabled", true);
        } else {
            $("#botaoDevolver, #botaoJogar").prop("disabled", false);
        }
    }
    }
}


export function getCartasInvestimentosContraMosquito() {
    return cartasInvestimentosContraMosquito
}

export function setCartasInvestimentosContraMosquito(numero) {
    cartasInvestimentosContraMosquito += numero
}

export function getDefendidoContraUmaPicadaSurpresa() {
    return defendidoContraUmaPicadaSurpresa
}

export function setDefendidoContraUmaPicadaSurpresa(estado) {
    defendidoContraUmaPicadaSurpresa = estado
}

export function getDefendidoContraUmaPicadaParalizante() {
    return defendidoContraUmaPicadaParalizante
}

export function setDefendidoContraUmaPicadaParalizante(estado) {
    defendidoContraUmaPicadaParalizante = estado
}

export function getPicadasRecebidas() {
    return picadasRecebidas
}

export function setPicadasRecebidas(numero) {
    picadasRecebidas += numero
}