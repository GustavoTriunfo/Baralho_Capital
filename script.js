$(document).ready(function() {
  $(".card").mouseenter(function() {
      $(this).css("z-index", "1000"); // Definindo a carta com mouse em cima na frente das outras
  });

  $(".card").mouseleave(function() {
      $(this).css("z-index", "1"); // Devolvendo a carta para a posição original
  });

  $(".card").click(function() {
      // Verificar se a carta já está ativa
      if ($(this).hasClass("active")) {
          $(this).removeClass("active"); // Remover classe 'active'
          $(this).css("z-index", "1"); // Definir o z-index de volta ao padrão
          $("#expanded-card").hide(); // Esconder a carta expandida
      } else {
          $(".card").removeClass("active").css("z-index", "1"); // Remover classe 'active' e redefinir o z-index de todas as cartas
          $(this).addClass("active").css("z-index", "1000"); // Adicionar classe 'active' e definir um z-index maior para a carta selecionada
          // Mudar o fundo da carta expandida para mostrar o conteúdo desejado
          $("#expanded-card .card-back").css("background-image", "url('./images/OdsAmbiente.png')");
          // Exibir a carta expandida
          $("#expanded-card").show();
          // Posicionar a carta expandida no centro da tela
          $("#expanded-card").css({
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
          });
      }
  });

  // Evento de clique no botão para devolver a carta ao baralho
  $(".return-button").click(function() {
      alert("Carta devolvida ao baralho.");
      $(".card.active").removeClass("active").css("z-index", "1"); // Remover classe 'active' e redefinir o z-index da carta
      $("#expanded-card").hide(); // Esconder a carta expandida
  });

  // Evento de clique no botão para jogar a carta
  $(".play-button").click(function() {
      alert("Carta jogada.");
      $(".card.active").removeClass("active").css("z-index", "1"); // Remover classe 'active' e redefinir o z-index da carta
      $("#expanded-card").hide(); // Esconder a carta expandida
  });
});

// menu
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