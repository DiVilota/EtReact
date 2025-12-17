package com.puertogames.backend.dto.request;

import jakarta.validation.constraints.*;

public class ResenaRequestDTO {

    @NotNull(message = "El ID del usuario es requerido")
    private Long usuarioId;

    @NotNull(message = "El ID del juego es requerido")
    private Long juegoId;

    @NotNull(message = "El rating es requerido")
    @Min(value = 1, message = "El rating mínimo es 1")
    @Max(value = 5, message = "El rating máximo es 5")
    private Integer rating;

    private String comentario;

    // Constructor vacío (OBLIGATORIO para Jackson)
    public ResenaRequestDTO() {
    }

    // Constructor con parámetros
    public ResenaRequestDTO(Long usuarioId, Long juegoId, Integer rating, String comentario) {
        this.usuarioId = usuarioId;
        this.juegoId = juegoId;
        this.rating = rating;
        this.comentario = comentario;
    }

    // Getters y Setters
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(Long juegoId) {
        this.juegoId = juegoId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
}