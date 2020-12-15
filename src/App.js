import React, { useState } from 'react';
import './App.css';

const apiKey = process.env.REACT_APP_WEATHER_KEY;
const base = 'http://api.openweathermap.org/data/2.5/'

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    e.preventDefault();
    fetch(`${base}weather?q=${query}&units=metric&&appid=${apiKey}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 15) ? 'app warm' : 'app cold') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
          <button className='button-box ml-2' onClick={search}>
            <i className="mybutton fas fa-search"></i>
          </button>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
            </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
