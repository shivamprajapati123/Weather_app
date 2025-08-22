# Weather App

A simple Node.js web application to display weather information for selected cities using the RapidAPI Weather API.

## Features

- Search weather by city name
- Displays temperature, humidity, wind speed, sunrise/sunset, and more
- Shows weather for common Indian cities
- Responsive UI built with Bootstrap

## Setup

1. **Clone the repository:**
   ```
   git clone https://github.com/shivamprajapati123/Weather_app.git
   cd Weather_app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory:
     ```
     URL=https://weather-api138.p.rapidapi.com/weather/
     KEY=your_rapidapi_key
     HOST=weather-api138.p.rapidapi.com
     ```
   - Replace `your_rapidapi_key` with your actual RapidAPI key.

4. **Run the app:**
   ```
   node index.js
   ```
   - The app will be available at `http://localhost:3000`

## Usage

- Enter a city name in the search box and click "Search" to view weather details.
- Weather for Mumbai, Lucknow, Delhi, and Bengaluru is shown by default.

## Technologies

- Node.js
- Express
- EJS
- Axios
- Bootstrap
- RapidAPI Weather API

##
