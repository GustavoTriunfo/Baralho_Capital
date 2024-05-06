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
    
        // Obter a imagem da carta clicada
        var cardImage = $(this).find('img').attr('src');
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
        $(this).addClass("active").css("z-index", "1000");
        var idCarta = $(".player-card.active").attr("id");
        if (idCarta == 3 || idCarta == 4 || idCarta == 5 || idCarta == 6 || idCarta == 7 || idCarta == 36) {
            $("#botaoDevolver, #botaoJogar").prop("disabled", true);
        } else {
            $("#botaoDevolver, #botaoJogar").prop("disabled", false);
        }
    }
});
rearrangeCards();

// Evento de clique no documento inteiro para remover a pré-visualização
$(document).click(function(event) {
    if (!$(event.target).closest('.player-card').length && !$(event.target).closest('#cardPreviewOverlay').length) {
        // Se o clique não for em uma carta e nem na pré-visualização, remove a pré-visualização
        $("#cardPreviewOverlay").removeClass("d-block");
        $(".player-card").removeClass("active").css("z-index", "1");

        $("#botaoDevolver, #botaoJogar").prop("disabled", false);
    }
});

  function rearrangeCards() {
    var $cards = $(".player-card");
    var spacing = -50; // Define o espaçamento entre as cartas
    var totalWidth = ($cards.outerWidth(true) + spacing) * $cards.length;
    var parentWidth = $(".card-holder").width();
    var marginLeft = (parentWidth - totalWidth) / 2;
  
    $cards.each(function(index) {
      var leftOffset = marginLeft + (index * ($cards.outerWidth(true) + spacing) + 30);
      $(this).css("left", leftOffset);
    });
  }


  $(document).on("click", "#botaoDevolver", function(event) {
    event.stopPropagation(); // Impede a propagação do evento de clique para o documento

    // Verificar se há uma carta ativa
    if ($(".player-card.active").length) {
        // Obter o número da carta ativa
        var cardNumber = $(".player-card.active").data("cardNumber");

        // Obtém o elemento card-holder
           // Remove a carta específica do card-holder
        $(".card-holder").find("[data-card-number='" + cardNumber + "']").remove();

        // Esconde a div de pré-visualização
        $("#cardPreviewOverlay").removeClass("d-block");

        rearrangeCards()
    }
});


$(document).on("click", "#botaoJogar", function(event) {
    event.stopPropagation(); // Impede a propagação do evento de clique para o documento

    // Verificar se há uma carta ativa
    if ($(".player-card.active").length) {

        var idCarta = $(".player-card.active").attr("id");
        console.log(idCarta)
        atualizarStatusJogador(jogadorAtual, idCarta)

        // Obter o número da carta ativa
        var cardNumber = $(".player-card.active").data("cardNumber");

        // Obtém o elemento card-holder
           // Remove a carta específica do card-holder
        $(".card-holder").find("[data-card-number='" + cardNumber + "']").remove();

        // Esconde a div de pré-visualização
        $("#cardPreviewOverlay").removeClass("d-block");

        rearrangeCards()
    }
});