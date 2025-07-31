import { useState, useEffect } from 'react'

function DailyForecast({data, hours}){
    const convert12 = (h) =>{
        if(h==12){return 12 +"pm"}
        if(h==24){return 12 +"am"}
        if(h>12){return (h%12+"pm")}
        if(h<12){return h+"am"}
        return h%12
    }

    return(
        <>
            {console.log(data)}
            {console.log(hours)}
            <div className='hourly-forecast-container'>
                {hours.map((h) => (
                    <>
                        <div key={h} className ="hour-div">
                            <p className="forecast-time" >{convert12(h) || "Loading..."}</p>
                            <img src={`https:${data?.forecast?.forecastday[0]?.hour[h]?.condition?.icon}`} alt="weather icon" />
                            <p className ="forecast-temp">{parseInt(Math.round(data?.forecast?.forecastday[0]?.hour[h]?.temp_c)) + "°C"}</p>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}
export default DailyForecast