import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import InfoBox from "./InfoBox";
import { useSpring, animated } from "react-spring";
import styled from "@emotion/styled";

const AnimatedBox = animated(Box);

const StyledContainer = styled(Container)`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  background-color: #1976d2;
  &:hover {
    background-color: #1565c0;
  }
`;

export default function SearchBox() {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "b881f6c98f6c446cbf0a76bd0b3b36f9";

  const getWeatherInfo = async (city) => {
    const response = await fetch(
      `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`
    );
    const jsonResponse = await response.json();
    const result = {
      temp: jsonResponse.main.temp,
      city: jsonResponse.name,
      country: jsonResponse.sys.country,
      humidity: jsonResponse.main.humidity,
      description: jsonResponse.weather[0].description,
      icon: jsonResponse.weather[0].icon,
      temp_max: jsonResponse.main.temp_max,
      temp_min: jsonResponse.main.temp_min,
      feels_like: jsonResponse.main.feels_like,
    };
    setWeatherInfo(result);
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherInfo(city);
    setCity("");
  };

  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <StyledContainer maxWidth="sm">
      <AnimatedBox
        style={props}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" component="h3" gutterBottom>
          Search for the weather
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            id="city"
            label="City Name"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={city}
            required
            sx={{ mb: 2 }}
          />
          <StyledButton variant="contained" type="submit" fullWidth>
            Search
          </StyledButton>
        </form>
        <InfoBox weatherInfo={weatherInfo} />
      </AnimatedBox>
    </StyledContainer>
  );
}
