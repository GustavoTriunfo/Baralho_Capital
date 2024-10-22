import {Missao} from '../Missao.js'

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

                // Adicionar os elementos à 'black-bg'
                blackBg.appendChild(imgRaiva);
                blackBg.appendChild(imgRisada);

                
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
            this.alterarMusica("/Baralho_Capital/Back_end/TelaDoJogo/musicasEEfeitos/Danse macabre.mp3");
    }
     alterarMusica(novaFonte) {
        const musica = document.getElementById("musica");
        musica.src = novaFonte;
        musica.load();
    }
}