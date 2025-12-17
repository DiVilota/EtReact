package com.puertogames.backend.controller;

import com.puertogames.backend.dto.request.response.EstadisticasResponseDTO;
import com.puertogames.backend.service.EstadisticasService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/estadisticas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EstadisticasController {
    
    private final EstadisticasService estadisticasService;
    
    @GetMapping
    public ResponseEntity<EstadisticasResponseDTO> obtenerEstadisticas() {
        EstadisticasResponseDTO response = estadisticasService.obtenerEstadisticas();
        return ResponseEntity.ok(response);
    }
}
