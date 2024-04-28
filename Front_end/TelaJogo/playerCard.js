$(document).on("click", ".player-card", function(event) {
    event.stopPropagation(); // Impede a propagação do evento de clique para o documento
  
    // Verificar se a carta clicada já está ativa
    if ($(this).hasClass("active")) {
        // Se a carta clicada já estiver ativa, remover a pré-visualização e a classe 'active'
        $("#cardPreviewOverlay").removeClass("d-block");
        $(this).removeClass("active").css("z-index", "1");
    } else {
        // Tornar visível a div de pré-visualização
        $("#cardPreviewOverlay").addClass("d-block");
    
        // Obter o caminho da imagem de fundo da carta clicada
        var cardImage = $(this).css('background-image');
    
        // Atualizar a pré-visualização com a imagem da carta clicada
        $("#cardPreviewOverlay").css('background-image', cardImage);
    
        // Remover classe 'active' e redefinir o z-index de todas as cartas
        $(".player-card").removeClass("active").css("z-index", "1");
    
        // Adicionar classe 'active' e definir um z-index maior para a carta selecionada
        $(this).addClass("active").css("z-index", "1000");
    }


// Evento de clique no documento inteiro para remover a pré-visualização
$(document).click(function(event) {
    if (!$(event.target).closest('.player-card').length && !$(event.target).closest('#cardPreviewOverlay').length) {
        // Se o clique não for em uma carta e nem na pré-visualização, remove a pré-visualização
        $("#cardPreviewOverlay").removeClass("d-block");
        $(".player-card").removeClass("active").css("z-index", "1");
    }
});

// Aplica rotação aleatória para as cartas
$(".player-card").each(function() {
    var rotation = Math.floor(Math.random() * 11) - 5; // Gera um número aleatório entre -5 e 5
    $(this).css("transform", "translate(-50%, -50%) scale(1.1) rotate(" + rotation + "deg)");
});
rearrangeCards();
});
  
  
  
  
  function rearrangeCards() {
    var $cards = $(".player-card");
    var spacing = -50; // Define o espaçamento entre as cartas
    var totalWidth = ($cards.outerWidth(true) + spacing) * $cards.length;
    var parentWidth = $(".card-holder").width();
    var marginLeft = (parentWidth - totalWidth) / 2;
  
    $cards.each(function(index) {
      var leftOffset = marginLeft + (index * ($cards.outerWidth(true) + spacing) + 20);
      $(this).css("left", leftOffset);
    });
  }
