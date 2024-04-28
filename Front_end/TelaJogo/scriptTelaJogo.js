

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

function option4() {
  // Ação para a opção 3
  alert("Opção 4 selecionada");
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