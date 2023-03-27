import React, { useState, useEffect } from 'react';

export const Weather = () => {
  const [data, setData] = useState({ forecasts: [], loading: true });

  const populateWeatherData = async () => {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    setData({ forecasts: data, loading: false });
  }

  useEffect(() => {
    populateWeatherData();
  }, []);

  return (
    <>
      {
        data.loading ? (
          <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        ) : (
          <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
              <tr>
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {data.forecasts.map(forecast =>
                <tr key={forecast.date}>
                  <td>{forecast.date}</td>
                  <td>{forecast.temperatureC}</td>
                  <td>{forecast.temperatureF}</td>
                  <td>{forecast.summary}</td>
                </tr>
              )}
            </tbody>
          </table>
        )
      }
    </>
  );
}