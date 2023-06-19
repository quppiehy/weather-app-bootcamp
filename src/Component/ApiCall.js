import React from "react";
import axios from "axios";
import ShowWeather from "./ShowWeather";

export default class ApiCall extends React.Component {
  constructor() {
    super();
    this.state = {
      city: [],
      input: "",
    };
  }

  componentDidUpdate() {
    console.log(this.state.city);
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ input: value }, () => {
      console.log(this.state.input);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.input}&limit=1&appid=cbcca65cc5df09daefa0db05b4f591c7`
      )
      .then((data) => {
        console.log(data);
        const receivedLat = data.data[0].lat;
        const receivedLon = data.data[0].lon;
        console.log(receivedLat, receivedLon);
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${receivedLat}&lon=${receivedLon}&appid=cbcca65cc5df09daefa0db05b4f591c7&units=metric`
        );
      })
      .then((data) => {
        console.log(data.data);
        this.setState(
          {
            city: data.data,
          },
          () => {
            console.log(this.state.city);
          }
        );
      })
      .catch((error) => {
        console.log("Api error is : " + error);
      });
  };

  render() {
    // const { city, weather, temp } = this.state;
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
          <ShowWeather city={this.state.city} />
        ) : (
          // <p>Tested</p>
          <p>No Weather Data Available</p>
        )}
        <br />
      </div>
    );
  }
}
