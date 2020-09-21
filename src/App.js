import React, { useState } from 'react';

const api = {
  key: "750ac157f966b1a1f30f2f0fc2172e9b",
  base: "https://api.openweathermap.org/data/2.5/"
  
}
  


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(result => result.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder= (d) => {
    let months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className="app ">
      <main>
        <div className="search-box">
        <input 
            type="text"
            className="search-bar"
            placeholder="Search City"
            onChange = { e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
              <div className="location">
              <div className="city"> {weather.name}, {weather.sys.country} </div>
              <div className="date">{ dateBuilder(new Date()) }</div>
            </div>

            <div  className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)} &#xb0; C </div>
              <div className="weather"> {weather.weather[0].main} </div>
            </div>
          </div>
        ) : ('')}
        
          
      </main>
    </div>
  );
}

export default App;
