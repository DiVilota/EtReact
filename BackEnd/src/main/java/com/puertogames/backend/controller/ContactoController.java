package com.puertogames.backend.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contacto")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ContactoController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> enviarContacto(@Valid @RequestBody ContactoDTO dto) {
        log.info("📧 Mensaje de contacto recibido de: {} - {}", dto.getNombre(), dto.getEmail());

        // Aquí puedes agregar lógica para:
        // - Enviar email
        // - Guardar en base de datos
        // - Notificar a administradores
        // Por ahora confirmamos la recepción

        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "¡Mensaje recibido correctamente! Te contactaremos pronto.");
        response.put("fecha", LocalDateTime.now());
        response.put("nombre", dto.getNombre());
        response.put("email", dto.getEmail());

        log.info("✅ Mensaje de contacto procesado exitosamente");

        return ResponseEntity.ok(response);
    }
}

@Data
class ContactoDTO {
    @NotBlank(message = "El nombre es requerido")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String nombre;

    @NotBlank(message = "El email es requerido")
    @Email(message = "El email debe tener un formato válido")
    private String email;

    @NotBlank(message = "El mensaje es requerido")
    @Size(min = 10, max = 1000, message = "El mensaje debe tener entre 10 y 1000 caracteres")
    private String mensaje;
}
