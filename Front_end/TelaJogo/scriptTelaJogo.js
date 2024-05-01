


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

