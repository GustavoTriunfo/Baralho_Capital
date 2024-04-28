// Conectar-se ao servidor Socket.IO
const socket = io();

// Capturar o botão de criar sala
const criarBtn = document.getElementById('criarBtn');

// Lidar com o clique no botão de criar sala
criarBtn.addEventListener('click', () => {
    // Capturar o nome da sala do campo de texto
    const nomeSala = document.getElementById('nomeSala').value;

    // Emitir um evento para criar uma sala com o nome fornecido
    socket.emit('criarSala', { nomeSala });
});

// Lidar com a resposta do servidor após criar a sala
socket.on('salaCriada', (data) => {
    // Redirecionar para outra página após criar a sala
    window.location.href = data.urlSala;
});
