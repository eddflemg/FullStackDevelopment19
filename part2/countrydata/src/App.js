import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Language = ({name}) => <li>{name}</li>

const Weather = ({city}) => {

  const [temperature, setTemperature] = useState([])
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
      .then(response => setTemperature(response.data.current))
    },
  [])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {temperature.temperature}</p>
      <p>Wind: {temperature.wind_speed} kph, direction {temperature.wind_dir}</p>
    </div>
  )
}

const Country = ({country}) => {

  const [flag, setFlag] = useState([])
  useEffect(() => {axios
    .get(country.flag, {responseType: 'text'})
    .then(response => {
      console.log(response.data);
      setFlag(response.data)
      console.log(flag);})
  }, [])
  const rows = () => country.languages.map(language =>
    <Language name={language.name} key={language.name} />
  )

  return (
    <div>
      <h1>{country.name}</h1>
      capital: {country.capital} <br/>
      population: {country.population}
      <h2>Languages</h2>
      <div>{rows()}</div>

      <Weather city={country.capital} />
    </div>
  )
}

const Countries = ({countries, setResult}) => {

  const showCountry = (event) => {
    setResult(countries.filter(country => country.name === event.target.value))
    const res = countries.filter(country => country.name === event.target.value)
    console.log(res);
  }
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  else if (countries.length < 11) {
    const liste = () => countries.map(country => <li key={country.name}>{country.name}<button value={country.name} onClick={showCountry}>show</button></li>)

    return (
      <div>{liste()}</div>
    )
  }
  else {
    return (
        <div>Too many countries</div>
    )
  }
}

const App = () => {

  const [countryName, setCountryName] = useState('')
  const [result, setResult] = useState([])
  const [countries, setCountries] = useState([])

  const countryHandler = (event) => {
    const newResult = countries.filter(country =>
      country
        .name
        .toLowerCase()
        .includes(event.target.value.toLowerCase()))
    setResult(newResult)
    setCountryName(event.target.value)
  }

  useEffect(() =>
    {axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))},
  [])

  return(
    <div>
      <p>find countries:</p>
      <input value={countryName} onChange={countryHandler} />
      <Countries countries={result} setResult={setResult} />
    </div>
  )
}

export default App;
