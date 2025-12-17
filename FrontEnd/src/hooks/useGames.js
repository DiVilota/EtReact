import { useState, useEffect } from "react";
import gameService from "../services/gameService";

const useGames = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchGames(searchTerm);
    } else if (selectedCategory !== "all") {
      loadGamesByCategory(selectedCategory);
    } else {
      loadGames();
    }
  }, [searchTerm, selectedCategory]);

  const loadGames = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await gameService.getAllGames();
      setGames(data);
    } catch (err) {
      setError(err.message || "Error al cargar juegos");
      console.error("Error loading games:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const searchGames = async (term) => {
    if (!term.trim()) {
      loadGames();
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await gameService.searchGames(term);
      setGames(data);
    } catch (err) {
      setError(err.message || "Error al buscar juegos");
      console.error("Error searching games:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadGamesByCategory = async (category) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await gameService.getGamesByCategory(category);
      setGames(data);
    } catch (err) {
      setError(err.message || "Error al cargar juegos por categoría");
      console.error("Error loading games by category:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getGameById = async (id) => {
    try {
      const data = await gameService.getGameById(id);
      return data;
    } catch (err) {
      console.error("Error loading game:", err);
      throw err;
    }
  };

  return {
    games,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    loadGames,
    searchGames,
    getGameById,
  };
};

export default useGames;
