import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Logo from './assets/img/logo.jpeg';
import News from './assets/img/news.jpeg';
import Weather from './assets/img/weather.jpeg';
import WeatherService from './js/weather-services.js';
import BreakingNews from './js/news-services';

$("link").attr("href", Logo);
$("img").attr("src", News);
$(".forecast").attr("src", Weather);

function clearFields() {
  $('#location').val("");
  $('#latitude').val("");
  $('#longitude').val("");
  $('#town').val("");
  $('#code').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
  $('.showWeather').text("");
  $('.showDescription').text("");
  $('.showWindspeed').text("");
  $('.showCountry').text("");
  $('.showTimezone').text("");
}

function displayWeatherByCity(city) {
  clearFields();
  let promise = WeatherService.getWeatherByCity(city);
  promise.then(function (response) {
    const body = JSON.parse(response);
    const City = city.charAt(0).toUpperCase() + city.slice(1);
    $('.showHumidity').text(`The humidity in ${City} is ${body.main.humidity}%`);
    $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    $('.showWeather').text(`${City}'s weather condition is ${body.weather[0].main}.`);
    $('.showDescription').text(`${City} currently has ${body.weather[0].description}.`);
    $('.showWindspeed').text(`The wind speed is ${body.wind.speed}m/s.`);
    $('.showCountry').text(`${City} is located in ${body.sys.country}.`);
    $('.showTimezone').text(`${City}'s timezone is ${body.timezone}.`);
    $('.showErrors').text("");
  }, function (error) {
    $('.showErrors').text(`There was an error processing your request: ${error}`);
    $('.showHumidity').text("");
    $('.showTemp').text("");
    $('.showWeather').text("");
    $('.showDescription').text("");
    $('.showWindspeed').text("");
    $('.showCountry').text("");
    $('.showTimezone').text("");
  });
  $(".id1").show();
  $(".id2").hide();
  $(".id3").hide();
}

function displayWeatherByCoordinates(lat, lon) {
  clearFields();
  let promise = WeatherService.getWeatherByCoordinates(lat, lon);
  promise.then(function (response) {
    const body = JSON.parse(response);
    $('.newHumidity').text(`The humidity in ${body.name} is ${body.main.humidity}%`);
    $('.newTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    $('.newWeather').text(`${body.name}'s weather condition is ${body.weather[0].main}.`);
    $('.newDescription').text(`${body.name} currently has ${body.weather[0].description}.`);
    $('.newWindspeed').text(`The wind speed is ${body.wind.speed}m/s.`);
    $('.newCountry').text(`${body.name} is located in ${body.sys.country}.`);
    $('.newTimezone').text(`${body.name}'s timezone is ${body.timezone}.`);
    $('.newErrors').text("");
  }, function (error) {
    $('.newErrors').text(`There was an error processing your request: ${error}`);
    $('.newHumidity').text("");
    $('.newTemp').text("");
    $('.newWeather').text("");
    $('.newDescription').text("");
    $('.newWindspeed').text("");
    $('.newCountry').text("");
    $('.newTimezone').text("");
  });
  $(".id2").show();
  $(".id1").hide();
  $(".id3").hide()
}

function displayWeatherByTownCode(town, code) {
  clearFields();
  let promise = WeatherService.getWeatherByTownCode(town, code);
  promise.then(function (response) {
    const body = JSON.parse(response);
    const Town = town.charAt(0).toUpperCase() + town.slice(1);
    $('.otherHumidity').text(`The humidity in ${Town} is ${body.main.humidity}%`);
    $('.otherTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    $('.otherWeather').text(`${Town}'s weather condition is ${body.weather[0].main}.`);
    $('.otherDescription').text(`${Town} currently has ${body.weather[0].description}.`);
    $('.otherWindspeed').text(`The wind speed is ${body.wind.speed}m/s.`);
    $('.otherCountry').text(`${Town} is located in ${body.sys.country}.`);
    $('.otherTimezone').text(`${Town}'s timezone is ${body.timezone}.`);
    $('.otherErrors').text("");
  }, function (error) {
    $('.otherErrors').text(`There was an error processing your request: ${error}`);
    $('.otherHumidity').text("");
    $('.otherTemp').text("");
    $('.otherWeather').text("");
    $('.otherDescription').text("");
    $('.otherWindspeed').text("");
    $('.otherCountry').text("");
    $('.otherTimezone').text("");
  });
  $(".id3").show();
  $(".id1").hide()
  $(".id2").hide()
}

// function displayBreakingNews() {
//   let promise = BreakingNews.getBreakingNews();
//   promise.then(function (response) {
//     const body = JSON.parse(response);
//     $('.newsTitle1').text(`${body[0].title}`);
//   }, function (error) {
//     $('.newsErrors').text(`There was an error processing your request: ${error}`);
//   });
// }

$(document).ready(function () {
  $("#locationTab").click(function () {
    $(".location-method").show();
    $(".latlong-method").hide();
    $(".citycountry-method").hide();
    $("#locationTab").addClass("active");
    $("#latlongTab").removeClass("active");
    $("#citycountryTab").removeClass("active");
  });

  $("#latlongTab").click(function () {
    $(".location-method").hide();
    $(".latlong-method").show();
    $(".citycountry-method").hide();
    $("#latlongTab").addClass("active");
    $("#locationTab").removeClass("active");
    $("#citycountryTab").removeClass("active");
  });

  $("#citycountryTab").click(function () {
    $(".location-method").hide();
    $(".latlong-method").hide();
    $(".citycountry-method").show();
    $("#citycountryTab").addClass("active");
    $("#latlongTab").removeClass("active");
    $("#locationTab").removeClass("active");
  });

  $('#weatherLocation').click(function () {
    if ($('#locationTab').hasClass('active')) {
      let city = $('#location').val();
      displayWeatherByCity(city);
    } else if ($('#latlongTab').hasClass('active')) {
      let lat = $('#latitude').val();
      let lon = $('#longitude').val();
      displayWeatherByCoordinates(lat, lon);
    } else {
      let town = $('#town').val();
      let code = $('#code').val();
      displayWeatherByTownCode(town, code);
    }
  });
});