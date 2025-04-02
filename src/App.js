import { useState } from "react";
import "./App.css"; // Tambahkan file CSS

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "c0b41b2cc4504bbcb4794801250204";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await response.json();
      if (data.error) {
        alert("Kota tidak ditemukan!");
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1 className="title">Weather App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Masukkan nama kota..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="city-input"
          />
          <button onClick={fetchWeather} className="search-button">
            Cari
          </button>
        </div>

        {weather && (
          <div className="weather-info">
            <h2 className="location">
              {weather.location.name}, {weather.location.country}
            </h2>
            <div className="temperature">
              {weather.current.temp_c}°C
            </div>
            <p className="condition">{weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt="Weather icon"
              className="weather-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;