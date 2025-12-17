package com.puertogames.backend.service;

import com.puertogames.backend.dto.request.response.EstadisticasResponseDTO;
import com.puertogames.backend.repository.JuegoRepository;
import com.puertogames.backend.repository.ResenaRepository;
import com.puertogames.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class EstadisticasService {

    private final JuegoRepository juegoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ResenaRepository resenaRepository;

    public EstadisticasResponseDTO obtenerEstadisticas() {
        log.info("📊 Calculando estadísticas generales del sistema");

        // Contar totales
        long totalJuegos = juegoRepository.count();
        long totalUsuarios = usuarioRepository.count();
        long totalResenas = resenaRepository.count();
        long usuariosOnline = usuarioRepository.countByEstaOnline(true);

        log.info("Total de juegos: {}, usuarios: {}, reseñas: {}, online: {}",
                totalJuegos, totalUsuarios, totalResenas, usuariosOnline);

        // Calcular rating promedio global de todas las reseñas
        Double ratingPromedio = resenaRepository.findAverageRatingGlobal();
        if (ratingPromedio == null || ratingPromedio.isNaN()) {
            ratingPromedio = 0.0;
        }

        // Obtener juego más popular (el que tiene más reseñas)
        String juegoMasPopular = juegoRepository.findJuegoMasPopular()
                .map(juego -> juego.getNombre())
                .orElse("N/A");

        // Obtener categoría más popular (la que tiene más juegos)
        String categoriaMasPopular = juegoRepository.findCategoriaMasPopular()
                .orElse("N/A");

        log.info("Juego más popular: {}, Categoría más popular: {}",
                juegoMasPopular, categoriaMasPopular);

        return EstadisticasResponseDTO.builder()
                .totalJuegos(totalJuegos)
                .totalUsuarios(totalUsuarios)
                .totalResenas(totalResenas)
                .usuariosOnline(usuariosOnline)
                .ratingPromedio(Math.round(ratingPromedio * 10.0) / 10.0) // 1 decimal
                .juegoMasPopular(juegoMasPopular)
                .categoriaMasPopular(categoriaMasPopular)
                .build();
    }
}
