import React, { useState } from "react";
import useWeather from "./useWeather";
import "./App.css"; 

const Weather = () => {
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const { weatherData, loading, error } = useWeather(query);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city) {
        alert("Please enter a city name"); 
        return;
      }
    setQuery(city);
  };

  return (
    <div className="container">
      <h1 className="animate__animated animate__heartBeat title">Weather Forecast <span ><img style={{ maxWidth: '100px' }} src="./images/sun.png" alt="" /></span> </h1>
      <form onSubmit={handleSearch} className="form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      {loading && <p>Loading weather data...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weatherCard">
          <h2 className="city">{weatherData.name}</h2>
          <p className="text">Temperature: {weatherData.main.temp}°C</p>
          <p className="text">Weather: {weatherData.weather[0].description}</p>
          <p className="text">Humidity: {weatherData.main.humidity}%</p>
          <p className="text">Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
