// hooks/useLocationSearch.js
import { useCallback } from "react";

export function useLocationSearch(onFound, onNotFound) {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const handleCitySelect = useCallback(async (cityName) => {
    try {
      const res = await fetch(`${API}/locations/search?q=${cityName}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        onFound(data[0]); // { adm4_code, name }
      } else {
        onNotFound?.(cityName);
      }
    } catch (err) {
      onNotFound?.(cityName);
    }
  }, []);

  return handleCitySelect;
}