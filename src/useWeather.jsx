import { useState, useEffect } from "react";

const useWeather = (city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;

      setLoading(true);
      setError(null);
      setWeatherData(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5e0656675b5335c81811032664859d4b`
        );

        if (!response.ok) {
          throw new Error("City not found...!");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weatherData, loading, error };
};

export default useWeather;