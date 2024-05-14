package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.modelo.Jogador;

public interface JogadorRepository extends JpaRepository<Jogador, Long> {
    List<Jogador> findAll();
    Jogador findById(Long id);
    Jogador save(Jogador Jogador);
    Jogador update(Jogador Jogador);
    Boolean delete(Long id);
}