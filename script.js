<<<<<<< HEAD

  $(document).ready(function() {
    $(".card").click(function() {
      // Verificar se a carta já está ativa
      if ($(this).hasClass("active")) {
        $(this).removeClass("active"); // Remover classe 'active'
        $(this).css("z-index", "1"); // Definir o z-index de volta ao padrão
      } else {
        $(".card").removeClass("active").css("z-index", "1"); // Remover classe 'active' e redefinir o z-index de todas as cartas
        $(this).addClass("active").css("z-index", "1000"); // Adicionar classe 'active' e definir um z-index maior para a carta selecionada
      }
    });
=======
$(document).ready(function() {
  $(".card").click(function(event) {
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
      $(".card").removeClass("active").css("z-index", "1");
      
      // Adicionar classe 'active' e definir um z-index maior para a carta selecionada
      $(this).addClass("active").css("z-index", "1000");
    }
>>>>>>> develop
  });

  // Evento de clique no documento inteiro para remover a pré-visualização
  $(document).click(function(event) {
    if (!$(event.target).closest('.card').length && !$(event.target).closest('#cardPreviewOverlay').length) {
      // Se o clique não for em uma carta e nem na pré-visualização, remove a pré-visualização
      $("#cardPreviewOverlay").removeClass("d-block");
      $(".card").removeClass("active").css("z-index", "1");
    }
  });
});


  

  function toggleMenu() {
    console.log("Toggle menu clicked");
    var overlay = document.getElementById("menuOverlay");
    if (overlay.classList.contains("show")) {
        overlay.classList.remove("show");
        overlay.style.display = "none"; // Se a classe "show" estiver presente, oculta o menu
    } else {
        overlay.classList.add("show");
        overlay.style.display = "block"; // Se a classe "show" não estiver presente, mostra o menu
    }
}

function option1() {
    // Ação para a opção 1
    alert("Opção 1 selecionada");
}

function option2() {
    // Ação para a opção 2
    alert("Opção 2 selecionada");
}

function option3() {
    // Ação para a opção 3
    alert("Opção 3 selecionada");
}

// Função para atualizar o valor do dinheiro na label
function atualizarDinheiro(valor) {
  var dinheiroLabel = document.getElementById('moneyLabel');
  // Formatando o valor para o padrão brasileiro
  var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  dinheiroLabel.textContent = 'Dinheiro: ' + valorFormatado;
}

var dinheiroRecebido = 10000; // Este é apenas um exemplo, você deve substituir pelo valor real recebido
atualizarDinheiro(dinheiroRecebido);