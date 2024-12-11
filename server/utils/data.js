const os = require('os');
const axios = require('axios');

// Function to fetch weather data
const getWeather = async (city) => {
  const apiKey = 'YOUR_WEATHER_API_KEY'; // Use your API key from OpenWeatherMap or another weather API provider
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await axios.get(url);
    return response.data.main.temp;
  } catch (error) {
    return 'Error fetching weather';
  }
};

// Function to fetch currency exchange rate (USD to EUR)
const getExchangeRate = async () => {
  const url = 'https://api.exchangerate-api.com/v4/latest/USD'; // Free API for currency rates
  try {
    const response = await axios.get(url);
    return response.data.rates.EUR;
  } catch (error) {
    return 'Error fetching exchange rate';
  }
};

// Function to fetch Bitcoin price
const getBitcoinPrice = async () => {
  const url = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json'; // CoinDesk API for Bitcoin price
  try {
    const response = await axios.get(url);
    return response.data.bpi.USD.rate_float;
  } catch (error) {
    return 'Error fetching Bitcoin price';
  }
};

// Function to fetch sunrise and sunset times (using city coordinates)
const getSunTimes = async (city) => {
  const apiKey = 'YOUR_SUNRISE_SUNSET_API_KEY'; // Replace with actual API key from Sunrise-Sunset.org or a similar API
  const url = `https://api.sunrise-sunset.org/json?lat=LATITUDE&lng=LONGITUDE&date=today`; // Replace with actual latitude and longitude
  try {
    const response = await axios.get(url);
    return {
      sunrise: response.data.results.sunrise,
      sunset: response.data.results.sunset,
    };
  } catch (error) {
    return { sunrise: 'Error', sunset: 'Error' };
  }
};

// Function to replace placeholders with real data
const generateGeneralKnowledge = async (city) => {
  const weather = await getWeather(city);
  const exchangeRate = await getExchangeRate();
  const bitcoinPrice = await getBitcoinPrice();
  const sunTimes = await getSunTimes(city);

  let generalKnowledge = `
1. **Today's Date and Time**:
   Today's date is ${new Date().toLocaleDateString()}.
   Current Time is ${new Date().toLocaleTimeString()}.

2. **System Information**:
   Your system is running on ${os.type()} with ${os.arch()} architecture.

3. **Free Memory**:
   Your system has ${(os.freemem() / 1024 / 1024).toFixed(
     2
   )} MB of free memory available.

4. **Total Memory**:
   Your system's total memory is ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB.

5. **Uptime**:
   Your system has been running for ${(os.uptime() / 3600).toFixed(2)} hours.

6. **Current Weather**:
   The current temperature in ${city} is ${weather}°C.

7. **Currency Exchange Rate**:
   The exchange rate from USD to EUR is ${exchangeRate}.

8. **Bitcoin Price**:
   The current price of Bitcoin (BTC) is ${bitcoinPrice} USD.

9. **Sunrise and Sunset Times**:
   In ${city}, the sun rises at ${sunTimes.sunrise} and sets at ${
    sunTimes.sunset
  }.
  `;

  return generalKnowledge;
};

module.exports = { generateGeneralKnowledge };
