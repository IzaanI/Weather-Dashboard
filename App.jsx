import { useState, useEffect } from 'react'
import './App.css'
import DailyForecast from './DailyForecast'

function App() {
  const [weatherObject, setWeatherObject] = useState()
  const [hoursArr, setHoursArr] = useState([])

  const [city, setCity] = useState('')
  const [currentTemp, setCurrentTemp] = useState()
  const [condition, setCondition] = useState('')
  const [icon, setIcon] = useState()

  const [lon,setLon] = useState(0)
  const [lat, setLat] = useState(0)

  function success(pos){
    const coord = pos.coords
    setLon(coord.longitude)
    setLat(coord.latitude)
  }
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
    const date = new Date()
    const hours = []

    for(let i = 0; i < 11; i++){
      hours[i] =  i + date.getHours() + 1
      hours[i] = (hours[i] % 24)
    }

    setHoursArr(hours)
    
  }, []) 

  useEffect(() => {
    if (lat !== null && lon !== null) {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=bee3c7acce1e426e8ae172149252307&q=${lat},${lon}`)//&lang=hi
        .then(res => res.json())
        .then(data => {
          //console.log(data)
          setCity(data.location.name)
          setCurrentTemp(parseInt(Math.round(data.current.temp_c)))
          setCondition(data.current.condition.text)
          setIcon(data.current.condition.icon)
          setWeatherObject(data) //.forecast.forecastday[0].hour
        })
        .catch(err => console.log(err.message))
    }
  }, [lat, lon])

  return (
    <>
      <title>Weather Forecast</title>
      <div className ='current-weather-container'>
        <h1 className="header">{city}</h1>  
        <h2 className = "temp-text">Temperature: {currentTemp}°C</h2>
        <p className ='condition-text'>{condition}</p>
        <img src={`https:${icon}`} alt="weather icon" />
      </div>     
      <DailyForecast data={weatherObject} hours = {hoursArr}/>
    </>
  )
}

export default App