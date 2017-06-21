import axios from 'axios';


const API_KEY = '0544b924af78ed2c1542e4a3578f528f';
const URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';
export default function fetchWeather(city) {
    const API_URL = `${URL}&q=${city},us`;
    const request = axios.get(API_URL);

    return ({
        type: FETCH_WEATHER,
        payload: request
    });
}
