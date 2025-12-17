package com.puertogames.backend.repository;

import com.puertogames.backend.entity.Juego;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JuegoRepository extends JpaRepository<Juego, Long> {
    List<Juego> findByCategoria(String categoria);

    List<Juego> findByNombreContainingIgnoreCase(String nombre);

    Optional<Juego> findByRawgId(Long rawgId);

    @Query("SELECT j FROM Juego j ORDER BY j.visualizaciones DESC")
    List<Juego> findJuegosMasVistos();

    @Query("SELECT j FROM Juego j ORDER BY j.ratingPromedio DESC")
    List<Juego> findJuegosMejorRankeados();

    @Query("SELECT j FROM Juego j LEFT JOIN j.resenas r GROUP BY j ORDER BY COUNT(r) DESC")
    Optional<Juego> findJuegoMasPopular();

    // ✅ NUEVO: Método para encontrar la categoría más popular
    @Query("SELECT j.categoria FROM Juego j GROUP BY j.categoria ORDER BY COUNT(j) DESC")
    Optional<String> findCategoriaMasPopular();

    @Query("SELECT DISTINCT j.categoria FROM Juego j WHERE j.categoria IS NOT NULL ORDER BY j.categoria")
    List<String> findAllCategorias();

}
