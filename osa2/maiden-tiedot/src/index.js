import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import CountryList from './CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value.toLowerCase())
  }

  const handleSelect = (text) => {
    setCountryFilter(text)
  }

  return (
    <div>
      <h1>Country information</h1>
      <div>
        find countries
        <input value={countryFilter} onChange={handleFilterChange} />
      </div>
      <CountryList
        countries={countries}
        countryFilter={countryFilter}
        handleSelect={handleSelect}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
