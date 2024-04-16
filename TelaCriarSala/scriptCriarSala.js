function criarSala() {
    // Captura o valor do campo de texto
    var nomeSala = document.getElementById("nomeSala").value;

    // Verifica se o campo não está vazio
    if (nomeSala.trim() !== "") {
      // Aqui você pode fazer o que quiser com o nome da sala, como enviar para o servidor, etc.
      console.log("Sala criada com o nome: " + nomeSala);
    } else {
      alert("Por favor, digite o nome da sala.");
    }
  }