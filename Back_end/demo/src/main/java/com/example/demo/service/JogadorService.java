package com.example.demo.service;

import com.example.demo.modelo.Jogador;

import java.util.List;

public interface JogadorService {
    
    List<Jogador> getAllJogadores();
    Jogador getJogadorById(Long id);
    Jogador createJogador(Jogador jogador);
    Jogador updateJogador(Jogador jogador);
    Boolean deleteJogador(Long id);
}
