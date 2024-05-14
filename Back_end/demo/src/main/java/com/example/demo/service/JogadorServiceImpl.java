package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.modelo.Jogador;
import com.example.demo.repository.JogadorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class JogadorServiceImpl implements JogadorService {
    
    private final JogadorRepository jogadorRepository;

    public JogadorServiceImpl(JogadorRepository jogadorRepository) {
        this.jogadorRepository = jogadorRepository;
    }

    @Override
    public List<Jogador> getAllJogadores() {
        return jogadorRepository.findAll();
    }

    @Override
    public Jogador getJogadorById(Long id) {
        Optional<Jogador> optionalJogador = jogadorRepository.findById(id);
        return optionalJogador.orElse(null);
    }

    @Override
    public Jogador createJogador(Jogador jogador) {
        return jogadorRepository.save(jogador);
    }

    @Override
    public Jogador updateJogador(Jogador jogador) {
        return jogadorRepository.save(jogador);
    }

    @Override
    public Boolean deleteJogador(Long id) {
        if (jogadorRepository.existsById(id)) {
            jogadorRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
