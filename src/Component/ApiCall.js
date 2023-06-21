import React from "react";
import axios from "axios";
import ShowWeather from "./ShowWeather";

export default class ApiCall extends React.Component {
  constructor() {
    super();
    this.state = {
      city: [],
      cityForecast: [],
      input: "",
      lat: "",
      lon: "",
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ input: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
      )
      .then((data) => {
        console.log(data);
        const receivedLat = data.data[0].lat;
        const receivedLon = data.data[0].lon;
        this.setState({ lat: receivedLat, lon: receivedLon });
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${receivedLat}&lon=${receivedLon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        );
      })
      .then((data) => {
        console.log(data.data);
        this.setState({ city: data.data }, () => {
          console.log(this.state.city.main.temp);
        });
      })
      .then(() => {
        return axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
        );
      })
      .then((data) => {
        console.log(data.data);
        this.setState({ cityForecast: data.data }, () => {
          console.log(this.state.cityForecast);
        });
      })
      .catch((error) => {
        console.log("Api error is : " + error);
      });
  };

  render() {
    return (
      <div>
        <label for="cityname">City Name: </label>
        <input
          type="text"
          value={this.state.input}
          id="cityname"
          name="cityname"
          onChange={(e) => this.handleChange(e)}
        ></input>
        <input type="submit" value="submit" onClick={this.handleSubmit} />
        {this.state.city && Object.keys(this.state.city).length > 0 ? (
          <ShowWeather
            city={this.state.city}
            cityForecast={this.state.cityForecast}
          />
        ) : (
          // <p>Tested</p>
          <p>Please enter a city name to get its weather data.</p>
        )}
        <br />
      </div>
    );
  }
}
