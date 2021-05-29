import React, { useState } from "react";
import keys from "./keys";
import { Button } from "semantic-ui-react";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const searchKey = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };


  const searchIcon = (e) => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setQuery("");
        setWeather(result);
        console.log(result);
      });

  };




  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "app hot"
            : "app cold"
          : "app"
      }
    >
      <main>
        <div className="top-heading">
          <h1>Check Weather Of Your City</h1>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter a city"
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={searchKey}
          />
          <Button className="search-icon" onClick={searchIcon}>
            <i class="fas fa-search fa-2x"></i>
          </Button>

        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">{Math.round(weather.main.temp)}°C </div>
              <div className="weather-icon"><img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" /></div>
              <div className="weather">{weather.weather[0].description}</div>
              <div className="wx">
               <h3> Humidity: {Math.round(weather.main.humidity)}%</h3>
               <br/>
               <h3>Pressure : {Math.round(weather.main.pressure)} hPa</h3>
              </div>
             
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;