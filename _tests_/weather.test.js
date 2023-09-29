import { getWeatherByLocation, getWeatherByLatLong, getWeatherByCityAndCountry } from '../src/js/weather.js';

describe('getWeatherByLocation function', () => {
  test('should fetch weather data by location', () => {
    const city = 'New York';
    const Response = {
      data:
        {
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "main": {
                "temp": 288.81,
                "feels_like": 288.47,
                "temp_min": 282.48,
                "temp_max": 292.12,
                "pressure": 1026,
                "humidity": 78
            },
            "wind": {
                "speed": 4.02,
                "deg": 15,
                "gust": 5.81
            },
            "sys": {
                "type": 1,
                "id": 4610,
                "country": "US",
                "sunrise": 1695379395,
                "sunset": 1695423269
            },
            "timezone": -14400,
            "id": 5128581,
            "name": "New York",        }
      }
    });

    const result = getWeatherByLocation(city);

    expect(result.main.humidity).toBe(78);
    expect(result.main.temp).toBe(288.81);
    expect(result.weather[0].main).toBe('Clear');
    expect(result.weather[0].description).toBe('clear sky');
    expect(result.wind.speed).toBe(4.02);
    expect(result.sys.country).toBe('US');
    expect(result.timezone).toBe(-14400);
});

describe('getWeatherByLatLong function', () => {
  test('fetches weather data by latitude and longitude', async () => {
    const lat = 40.7128; // Replace with a valid latitude
    const long = -74.0060; // Replace with a valid longitude
    const mockResponse = {
      data: {
        // Replace with sample weather data
        main: { humidity: 70, temp: 22 },
        weather: [{ main: 'Clouds', description: 'Partly cloudy' }],
        wind: { speed: 4.2 },
        sys: { country: 'US' },
        timezone: -14400,
      },
    };

    const result = await getWeatherByLatLong(lat, long);

    // Add assertions here to check if the result matches the expected data
    expect(result.humidity).toBe(70);
    expect(result.temperature).toBe(22);
    expect(result.weatherCondition).toBe('Clouds');
    expect(result.weatherDescription).toBe('Partly cloudy');
    expect(result.windSpeed).toBe(4.2);
    expect(result.country).toBe('US');
    expect(result.timezone).toBe(-14400);
  });

  // Add more test cases for error handling and edge cases
});

describe('getWeatherByCityAndCountry function', () => {
  test('fetches weather data by city name and country code', async () => {
    const city = 'London'; // Replace with a valid city name
    const country = 'GB'; // Replace with a valid country code
    const mockResponse = {
      data: {
        // Replace with sample weather data
        main: { humidity: 60, temp: 18 },
        weather: [{ main: 'Rain', description: 'Light rain showers' }],
        wind: { speed: 3.5 },
        sys: { country: 'GB' },
        timezone: 3600,
      },
    };

    const result = await getWeatherByCityAndCountry(city, country);

    // Add assertions here to check if the result matches the expected data
    expect(result.humidity).toBe(60);
    expect(result.temperature).toBe(18);
    expect(result.weatherCondition).toBe('Rain');
    expect(result.weatherDescription).toBe('Light rain showers');
    expect(result.windSpeed).toBe(3.5);
    expect(result.country).toBe('GB');
    expect(result.timezone).toBe(3600);
  });
});
