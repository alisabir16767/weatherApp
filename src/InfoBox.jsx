import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

export default function InfoBox({ weatherInfo }) {
  if (!weatherInfo) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" component="h1" gutterBottom>
        Weather Info
      </Typography>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {weatherInfo.city}, {weatherInfo.country}
          </Typography>
          <Typography variant="h6" component="div">
            {weatherInfo.temp}°C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Feels like: {weatherInfo.feels_like}°C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Max: {weatherInfo.temp_max}°C, Min: {weatherInfo.temp_min}°C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Humidity: {weatherInfo.humidity}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {weatherInfo.description}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="140"
          image={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
          alt={weatherInfo.description}
        />
      </Card>
    </>
  );
}
