/*$(document).ready(function() {
    $(".card").mouseenter(function() {
      $(this).css("z-index", "1000"); // Definindo a carta com mouse em cima na frente das outras
    });
  
    $(".card").mouseleave(function() {
      $(this).css("z-index", "1"); // Devolvendo a carta para a posição original
    });
  });*/

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
  });