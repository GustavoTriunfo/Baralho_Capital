package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.modelo.Jogador;
import com.example.demo.service.JogadorService;

import java.util.List;

@RestController
@RequestMapping("/jogadores")
public class JogadorController {

    private final JogadorService jogadorService;

    public JogadorController(JogadorService jogadorService) {
        this.jogadorService = jogadorService;
    }

    @PostMapping("/adicionar")
    public ResponseEntity<Jogador> adicionarJogador(@RequestBody Jogador jogador) {
        Jogador novoJogador = jogadorService.createJogador(jogador);
        return new ResponseEntity<>(novoJogador, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Jogador> listarJogadores() {
        return jogadorService.getAllJogadores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jogador> buscarJogadorPorId(@PathVariable Long id) {
        Jogador jogador = jogadorService.getJogadorById(id);
        if (jogador != null) {
            return new ResponseEntity<>(jogador, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Jogador> atualizarJogador(@PathVariable Long id, @RequestBody Jogador jogadorAtualizado) {
        Jogador jogador = jogadorService.getJogadorById(id);
        if (jogador != null) {
            jogador.setNome(jogadorAtualizado.getNome());
            jogador.setEmail(jogadorAtualizado.getEmail());
            jogador.setNivel(jogadorAtualizado.getNivel());

            jogadorService.updateJogador(jogador);
            return new ResponseEntity<>(jogador, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirJogador(@PathVariable Long id) {
        if (jogadorService.deleteJogador(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
}
