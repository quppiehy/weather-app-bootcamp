import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default class ShowWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: [],
    };
  }

  extractInfo = () => {
    const { city } = this.props;
    let newArray = [];
    for (let i = 0; i < city.list.length; i++) {
      newArray[i] = {
        id: city.list[i].dt_txt,
        temp: `${city.list[i].main.temp}°C`,
        weather: `${city.list[i].weather[0].main}, ${city.list[i].weather[0].description}`,
        icon: `https://openweathermap.org/img/wn/${city.list[i].weather[0].icon}@2x.png`,
      };
    }

    return newArray;
  };

  render() {
    const { city } = this.props;
    const columns = [
      { field: "id", headerName: "Date", width: 180 },
      { field: "temp", headerName: "Temperature", width: 130 },
      { field: "weather", headerName: "Weather", width: 200 },
      {
        field: "icon",
        headerName: "Icon",
        renderCell: (params) => (
          <img src={params.value} alt="weather icon" width="50" />
        ),
        width: 100,
      },
    ];

    const rows = this.extractInfo();

    return (
      <div>
        <h3>City: {city.city.name}</h3>
        {city.list.length > 0 ? (
          <div style={{ width: `100%` }}>
            <DataGrid
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#009879",
                  color: "#ffffff",
                  fontSize: 16,
                },
                "& .MuiDataGrid-virtualScrollerRenderZone": {
                  "& .MuiDataGrid-row": {
                    "&:nth-child(2n)": {
                      color: "#ffffff",
                    },
                    "&:nth-child(1n)": {
                      color: "#f3f3f3",
                    },
                  },
                },
                "& .MuiTablePagination-toolbar": {
                  color: "#ffffff",
                },
                "& .MuiTablePagination-selectIcon": {
                  color: "#ffffff",
                },
              }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
            {/* <h2>Forecast Weather</h2>
            <h3>City: {city.city.name}</h3>
            <h4>Date/Time: {city.list[0].dt_txt}</h4>
            <p>Temperature: {city.list[0].main.temp}°C</p>
            <p>
              Weather: {city.list[0].weather[0].main},{" "}
              {city.list[0].weather[0].description}
            </p> */}
          </div>
        ) : (
          "Forecast is not available"
        )}
      </div>
    );
  }
}
