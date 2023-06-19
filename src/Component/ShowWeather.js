import React from "react";

export default class ShowWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      city: [],
    };
  }

  render() {
    const { city } = this.props;
    console.log(city.main.temp);
    return (
      <div>
        <h3>City: {city.name}</h3>
        <p>The current temperature is {city.main.temp} °C.</p>
        <p>
          The {city.weather[0].main} are {city.weather[0].description}.
        </p>
      </div>
    );
  }
}

//const receivedWeather = data.data.weather;
// const receivedTemperatures = data.data.main;
// const receivedCity = data.data.name;
// return temp,weather,city;
