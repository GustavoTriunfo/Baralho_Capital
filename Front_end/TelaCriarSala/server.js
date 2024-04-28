// Importando os módulos http e fs (file system)
const http = require('http');
const fs = require('fs');

// Criando um servidor HTTP simples
const server = http.createServer((req, res) => {
    // Configurando o cabeçalho da resposta
    res.writeHead(200, {'Content-Type': 'text/html'});

    // Lendo um arquivo HTML e enviando como resposta
    fs.readFile('criarSala.html', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Arquivo não encontrado');
        } else {
            res.write(data);
        }
        res.end();
    });
});

// Definindo a porta em que o servidor irá ouvir
const PORT = process.env.PORT || 3000;

// Iniciando o servidor na porta especificada
server.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT}`);
});
