package com.puertogames.backend.service;

import com.puertogames.backend.dto.request.JuegoRequestDTO;
import com.puertogames.backend.dto.request.response.JuegoResponseDTO;
import com.puertogames.backend.entity.Juego;
import com.puertogames.backend.repository.JuegoRepository;
import com.puertogames.backend.repository.ResenaRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class JuegoService {
    
    private final JuegoRepository juegoRepository;
    private final ResenaRepository resenaRepository;
    
    public JuegoResponseDTO crearJuego(JuegoRequestDTO request) {
        log.info("Creando nuevo juego: {}", request.getNombre());
        
        Juego juego = Juego.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .imagenUrl(request.getImagenUrl())
                .consola(request.getConsola())
                .anoLanzamiento(request.getAnoLanzamiento())
                .categoria(request.getCategoria())
                .rawgId(request.getRawgId())
                .build();
        
        Juego savedJuego = juegoRepository.save(juego);
        return convertirADTO(savedJuego);
    }
    
    public JuegoResponseDTO obtenerJuego(Long id) {
        Juego juego = juegoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));
        
        // Incrementar visualizaciones
        juego.setVisualizaciones(juego.getVisualizaciones() + 1);
        juegoRepository.save(juego);
        
        return convertirADTO(juego);
    }
    
    public List<JuegoResponseDTO> obtenerTodosJuegos() {
        return juegoRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Obtiene todas las categorías únicas disponibles
     */
    public List<String> obtenerTodasCategorias() {
        log.info("Obteniendo todas las categorías");
        return juegoRepository.findAllCategorias();
    }
    
    /**
     * Filtra juegos por múltiples criterios
     */
    public List<JuegoResponseDTO> filtrarJuegos(String categoria, String consola, Integer anoMin, Integer anoMax) {
        log.info("Filtrando juegos - Categoría: {}, Consola: {}, Año Min: {}, Año Max: {}", 
                 categoria, consola, anoMin, anoMax);
        
        List<Juego> juegos = juegoRepository.findAll();
        
        return juegos.stream()
                .filter(juego -> {
                    // Filtrar por categoría
                    if (categoria != null && !categoria.isEmpty()) {
                        if (juego.getCategoria() == null || 
                            !juego.getCategoria().equalsIgnoreCase(categoria)) {
                            return false;
                        }
                    }
                    
                    // Filtrar por consola
                    if (consola != null && !consola.isEmpty()) {
                        if (juego.getConsola() == null || 
                            !juego.getConsola().toLowerCase().contains(consola.toLowerCase())) {
                            return false;
                        }
                    }
                    
                    // Filtrar por año mínimo
                    if (anoMin != null) {
                        if (juego.getAnoLanzamiento() == null || 
                            juego.getAnoLanzamiento() < anoMin) {
                            return false;
                        }
                    }
                    
                    // Filtrar por año máximo
                    if (anoMax != null) {
                        if (juego.getAnoLanzamiento() == null || 
                            juego.getAnoLanzamiento() > anoMax) {
                            return false;
                        }
                    }
                    
                    return true;
                })
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<JuegoResponseDTO> obtenerJuegosPorCategoria(String categoria) {
        return juegoRepository.findByCategoria(categoria)
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<JuegoResponseDTO> obtenerJuegosMasVistos() {
        return juegoRepository.findJuegosMasVistos()
                .stream()
                .limit(10)
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<JuegoResponseDTO> obtenerJuegosMejorRankeados() {
        return juegoRepository.findJuegosMejorRankeados()
                .stream()
                .limit(10)
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<JuegoResponseDTO> buscarJuegos(String nombre) {
        return juegoRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public void actualizarRatingPromedio(Long juegoId) {
        Double nuevoRating = resenaRepository.findAverageRatingByJuegoId(juegoId);
        Juego juego = juegoRepository.findById(juegoId)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));
        
        juego.setRatingPromedio(nuevoRating != null ? nuevoRating : 0.0);
        juegoRepository.save(juego);
    }
    
    private JuegoResponseDTO convertirADTO(Juego juego) {
        Long totalResenas = resenaRepository.countByJuegoId(juego.getId());
        
        return JuegoResponseDTO.builder()
                .id(juego.getId())
                .rawgId(juego.getRawgId())
                .nombre(juego.getNombre())
                .descripcion(juego.getDescripcion())
                .imagenUrl(juego.getImagenUrl())
                .consola(juego.getConsola())
                .anoLanzamiento(juego.getAnoLanzamiento())
                .categoria(juego.getCategoria())
                .visualizaciones(juego.getVisualizaciones())
                .ratingPromedio(juego.getRatingPromedio())
                .totalResenas(totalResenas)
                .build();
    }
}
