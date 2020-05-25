import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState(0)

  useEffect(() => {
    axios
      .get(
        'http://api.weatherstack.com/current' +
          '?access_key=' +
          api_key +
          '&query=' +
          country.capital
      )
      .then((response) => {
        setWeather(response.data.current)
      })
  }, [api_key, country])

  return (
    <>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((l) => {
          return <li key={l.name}>{l.name}</li>
        })}
      </ul>
      <img alt='flag' src={country.flag} width='200px'></img>
      <h3>Weather in {country.capital}</h3>
      <p>Temperature: {weather.temperature}</p>
      <img alt='weather' src={weather.weather_icons} width='200px'></img>
      <p>
        Wind: {weather.wind_speed} km/h {weather.wind_dir}
      </p>
    </>
  )
}

const CountryList = ({ countries, countryFilter, handleSelect }) => {
  const handleClick = (event) => {
    const country = filteredCountries
      .filter((c) => c.alpha3Code === event.target.id)[0]
      .name.toLowerCase()
    handleSelect(country)
  }

  if (countryFilter === '') return null
  const filteredCountries = countries.filter((c) => {
    return c.name.toLowerCase().includes(countryFilter)
  })
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return <ShowCountry country={country} />
  }
  if (filteredCountries.length > 10)
    return <p>Too many matches, specify another filter</p>
  return filteredCountries.map((c) => (
    <div key={c.alpha3Code}>
      {c.name}
      <button id={c.alpha3Code} onClick={handleClick}>
        show
      </button>
    </div>
  ))
}

export default CountryList
