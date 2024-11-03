export function criarAnimacaoFogo() {

 
}

// Método para animar a carta
export function animarCartaJogador(caminhoImagem, elementoClicado) {
       // Certifique-se de que o elemento clicado é um objeto jQuery
       var $elementoClicado = $(elementoClicado);

       // Criar um clone da imagem da carta usando jQuery
       var $clone = $('<img>', {
           src: caminhoImagem,
           class: 'carta-clone', // Classe para estilização
           css: {
               left: $elementoClicado.offset().left + 'px', // Posição horizontal
               top: $elementoClicado.offset().top + 'px', // Posição vertical
               width: $elementoClicado.width() + 'px' // Largura igual à carta original
           }
       }).appendTo('body'); // Adiciona o clone ao body
   
       // Usar a classe CSS para iniciar a animação
       requestAnimationFrame(() => {
           // Adiciona a classe que inicia a animação
           $clone.addClass('deslizar');
       });
   
       // Remover o clone após a animação
       setTimeout(() => {
           $clone.remove();
       }, 1000); // O tempo deve ser o mesmo da transição CSS
}

export function animacaoFundoIntro() {
    const fundoIntro = document.getElementById('fundoIntro');

    // Adiciona a classe "active" para iniciar a animação
    fundoIntro.classList.add('active');

    // Depois de 5 segundos, remove a classe para desaparecer suavemente
    setTimeout(() => {
        fundoIntro.classList.remove('active');
    }, 1500); // Mantém a opacidade de 50% por 5 segundos
}