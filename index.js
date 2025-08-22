import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const port = 3000;
const app = express();

// Setup EJS and static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = "https://weather-api138.p.rapidapi.com/weather";
const API_KEY = "80def33d48msha5bd8a932359f74p15d1e9jsn2b2bd0ab4afb";
const API_HOST = "weather-api138.p.rapidapi.com";

const getWeather = async (city) => {
  try {
    const response = await axios.get(API_URL, {
      params: { city_name: city },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

app.get("/", async (req, res) => {
  // Main city
  const iniCity = "Fergana";
  const mainData = await getWeather(iniCity);

  // Common Indian cities
  const cities = ["Mumbai", "Lucknow", "Delhi", "Bengaluru"];
  const cityData = {};
  for (const city of cities) {
    cityData[city] = await getWeather(city);
  }

  // Helper to safely extract and convert values
  const extract = (data, key, sub = "main") =>
    data && data[sub] && data[sub][key] !== undefined
      ? data[sub][key]
      : "N/A";

  const extractWind = (data, key) =>
    data && data.wind && data.wind[key] !== undefined
      ? data.wind[key]
      : "N/A";

  const extractSys = (data, key) =>
    data && data.sys && data.sys[key] !== undefined
      ? data.sys[key]
      : "N/A";

  res.render("index.ejs", {
    City: mainData?.name || iniCity,
    Temperature: (mainData?.main?.temp ? (mainData.main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like: (mainData?.main?.feels_like ? (mainData.main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity: extract(mainData, "humidity"),
    Min_temp: (mainData?.main?.temp_min ? (mainData.main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp: (mainData?.main?.temp_max ? (mainData.main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed: extractWind(mainData, "speed"),
    Wind_degrees: extractWind(mainData, "deg"),
    Sunrise: extractSys(mainData, "sunrise"),
    Sunset: extractSys(mainData, "sunset"),

    Temperature_mumbai: (cityData["Mumbai"]?.main?.temp ? (cityData["Mumbai"].main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like_mumbai: (cityData["Mumbai"]?.main?.feels_like ? (cityData["Mumbai"].main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity_mumbai: extract(cityData["Mumbai"], "humidity"),
    Min_temp_mumbai: (cityData["Mumbai"]?.main?.temp_min ? (cityData["Mumbai"].main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp_mumbai: (cityData["Mumbai"]?.main?.temp_max ? (cityData["Mumbai"].main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed_mumbai: extractWind(cityData["Mumbai"], "speed"),
    Wind_degrees_mumbai: extractWind(cityData["Mumbai"], "deg"),
    Sunrise_mumbai: extractSys(cityData["Mumbai"], "sunrise"),
    Sunset_mumbai: extractSys(cityData["Mumbai"], "sunset"),

    Temperature_lucknow: (cityData["Lucknow"]?.main?.temp ? (cityData["Lucknow"].main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like_lucknow: (cityData["Lucknow"]?.main?.feels_like ? (cityData["Lucknow"].main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity_lucknow: extract(cityData["Lucknow"], "humidity"),
    Min_temp_lucknow: (cityData["Lucknow"]?.main?.temp_min ? (cityData["Lucknow"].main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp_lucknow: (cityData["Lucknow"]?.main?.temp_max ? (cityData["Lucknow"].main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed_lucknow: extractWind(cityData["Lucknow"], "speed"),
    Wind_degrees_lucknow: extractWind(cityData["Lucknow"], "deg"),
    Sunrise_lucknow: extractSys(cityData["Lucknow"], "sunrise"),
    Sunset_lucknow: extractSys(cityData["Lucknow"], "sunset"),

    Temperature_delhi: (cityData["Delhi"]?.main?.temp ? (cityData["Delhi"].main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like_delhi: (cityData["Delhi"]?.main?.feels_like ? (cityData["Delhi"].main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity_delhi: extract(cityData["Delhi"], "humidity"),
    Min_temp_delhi: (cityData["Delhi"]?.main?.temp_min ? (cityData["Delhi"].main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp_delhi: (cityData["Delhi"]?.main?.temp_max ? (cityData["Delhi"].main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed_delhi: extractWind(cityData["Delhi"], "speed"),
    Wind_degrees_delhi: extractWind(cityData["Delhi"], "deg"),
    Sunrise_delhi: extractSys(cityData["Delhi"], "sunrise"),
    Sunset_delhi: extractSys(cityData["Delhi"], "sunset"),

    Temperature_Bengaluru: (cityData["Bengaluru"]?.main?.temp ? (cityData["Bengaluru"].main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like_Bengaluru: (cityData["Bengaluru"]?.main?.feels_like ? (cityData["Bengaluru"].main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity_Bengaluru: extract(cityData["Bengaluru"], "humidity"),
    Min_temp_Bengaluru: (cityData["Bengaluru"]?.main?.temp_min ? (cityData["Bengaluru"].main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp_Bengaluru: (cityData["Bengaluru"]?.main?.temp_max ? (cityData["Bengaluru"].main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed_Bengaluru: extractWind(cityData["Bengaluru"], "speed"),
    Wind_degrees_Bengaluru: extractWind(cityData["Bengaluru"], "deg"),
    Sunrise_Bengaluru: extractSys(cityData["Bengaluru"], "sunrise"),
    Sunset_Bengaluru: extractSys(cityData["Bengaluru"], "sunset"),
  });
});

app.post("/submit", async (req, res) => {
  const newCity = req.body.newCity || "Fergana";
  const mainData = await getWeather(newCity);

  // Fetch data for common Indian cities
  const cities = ["Mumbai", "Lucknow", "Delhi", "Bengaluru"];
  const cityData = {};
  for (const city of cities) {
    cityData[city] = await getWeather(city);
  }

  // Helper functions
  const extract = (data, key, sub = "main") =>
    data && data[sub] && data[sub][key] !== undefined
      ? data[sub][key]
      : "N/A";

  const extractWind = (data, key) =>
    data && data.wind && data.wind[key] !== undefined
      ? data.wind[key]
      : "N/A";

  const extractSys = (data, key) =>
    data && data.sys && data.sys[key] !== undefined
      ? data.sys[key]
      : "N/A";

  res.render("index.ejs", {
    City: mainData?.name || newCity,
    Temperature: (mainData?.main?.temp ? (mainData.main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like: (mainData?.main?.feels_like ? (mainData.main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity: mainData?.main?.humidity ?? "N/A",
    Min_temp: (mainData?.main?.temp_min ? (mainData.main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp: (mainData?.main?.temp_max ? (mainData.main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed: mainData?.wind?.speed ?? "N/A",
    Wind_degrees: mainData?.wind?.deg ?? "N/A",
    Sunrise: mainData?.sys?.sunrise ?? "N/A",
    Sunset: mainData?.sys?.sunset ?? "N/A",

    Temperature_mumbai: (cityData["Mumbai"]?.main?.temp ? (cityData["Mumbai"].main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like_mumbai: (cityData["Mumbai"]?.main?.feels_like ? (cityData["Mumbai"].main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity_mumbai: extract(cityData["Mumbai"], "humidity"),
    Min_temp_mumbai: (cityData["Mumbai"]?.main?.temp_min ? (cityData["Mumbai"].main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp_mumbai: (cityData["Mumbai"]?.main?.temp_max ? (cityData["Mumbai"].main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed_mumbai: extractWind(cityData["Mumbai"], "speed"),
    Wind_degrees_mumbai: extractWind(cityData["Mumbai"], "deg"),
    Sunrise_mumbai: extractSys(cityData["Mumbai"], "sunrise"),
    Sunset_mumbai: extractSys(cityData["Mumbai"], "sunset"),

    Temperature_lucknow: (cityData["Lucknow"]?.main?.temp ? (cityData["Lucknow"].main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like_lucknow: (cityData["Lucknow"]?.main?.feels_like ? (cityData["Lucknow"].main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity_lucknow: extract(cityData["Lucknow"], "humidity"),
    Min_temp_lucknow: (cityData["Lucknow"]?.main?.temp_min ? (cityData["Lucknow"].main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp_lucknow: (cityData["Lucknow"]?.main?.temp_max ? (cityData["Lucknow"].main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed_lucknow: extractWind(cityData["Lucknow"], "speed"),
    Wind_degrees_lucknow: extractWind(cityData["Lucknow"], "deg"),
    Sunrise_lucknow: extractSys(cityData["Lucknow"], "sunrise"),
    Sunset_lucknow: extractSys(cityData["Lucknow"], "sunset"),

    Temperature_delhi: (cityData["Delhi"]?.main?.temp ? (cityData["Delhi"].main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like_delhi: (cityData["Delhi"]?.main?.feels_like ? (cityData["Delhi"].main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity_delhi: extract(cityData["Delhi"], "humidity"),
    Min_temp_delhi: (cityData["Delhi"]?.main?.temp_min ? (cityData["Delhi"].main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp_delhi: (cityData["Delhi"]?.main?.temp_max ? (cityData["Delhi"].main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed_delhi: extractWind(cityData["Delhi"], "speed"),
    Wind_degrees_delhi: extractWind(cityData["Delhi"], "deg"),
    Sunrise_delhi: extractSys(cityData["Delhi"], "sunrise"),
    Sunset_delhi: extractSys(cityData["Delhi"], "sunset"),

    Temperature_Bengaluru: (cityData["Bengaluru"]?.main?.temp ? (cityData["Bengaluru"].main.temp - 273.15).toFixed(2) : "N/A"),
    Feels_like_Bengaluru: (cityData["Bengaluru"]?.main?.feels_like ? (cityData["Bengaluru"].main.feels_like - 273.15).toFixed(2) : "N/A"),
    Humidity_Bengaluru: extract(cityData["Bengaluru"], "humidity"),
    Min_temp_Bengaluru: (cityData["Bengaluru"]?.main?.temp_min ? (cityData["Bengaluru"].main.temp_min - 273.15).toFixed(2) : "N/A"),
    Max_temp_Bengaluru: (cityData["Bengaluru"]?.main?.temp_max ? (cityData["Bengaluru"].main.temp_max - 273.15).toFixed(2) : "N/A"),
    Wind_speed_Bengaluru: extractWind(cityData["Bengaluru"], "speed"),
    Wind_degrees_Bengaluru: extractWind(cityData["Bengaluru"], "deg"),
    Sunrise_Bengaluru: extractSys(cityData["Bengaluru"], "sunrise"),
    Sunset_Bengaluru: extractSys(cityData["Bengaluru"], "sunset"),
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});