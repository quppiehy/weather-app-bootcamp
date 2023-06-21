import React from "react";
import ShowForecast from "./ShowForecast";
import Button from "@mui/material/Button";

export default class ShowWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      city: [],
      forecast: false,
      current: true,
    };
  }

  handleClick = (e) => {
    const { name } = e.target;
    if (name === "forecast") {
      this.setState({
        forecast: true,
        current: false,
      });
    } else if (name === "current") {
      this.setState({
        current: true,
        forecast: false,
      });
    }
  };

  render() {
    const { city, cityForecast } = this.props;
    const { current, forecast } = this.state;
    console.log(city.main.temp);
    return (
      <div>
        <br />
        <Button variant="contained" name="current" onClick={this.handleClick}>
          Current Weather
        </Button>
        {"    "}
        <Button variant="contained" name="forecast" onClick={this.handleClick}>
          5-day Forecast
        </Button>
        <br />
        {current && (
          <div>
            <h2>Current Weather</h2>
            <h3>City: {city.name}</h3>
            <p>Temperature: {city.main.temp}°C</p>
            <p>
              Weather: {city.weather[0].main}, {city.weather[0].description}
            </p>
          </div>
        )}
        {forecast && (
          <div>
            <ShowForecast city={cityForecast} />
          </div>
        )}
      </div>
    );
  }
}
