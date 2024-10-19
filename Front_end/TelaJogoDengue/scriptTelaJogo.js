


  function toggleMenu() {
    var overlay = document.getElementById("menuOverlay");
    if (overlay.classList.contains("show")) {
        overlay.classList.remove("show");
        overlay.style.display = "none"; // Se a classe "show" estiver presente, oculta o menu
    } else {
        overlay.classList.add("show");
        overlay.style.display = "block"; // Se a classe "show" não estiver presente, mostra o menu
    }
}
