"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "1afed292301b4a71852195852232611";
const BASE_URL = "http://api.weatherapi.com/v1";
const weatherSection = document.querySelector('.weather');
const dayList = document.querySelector('.weather_day_list');
const submitBtn = document.querySelector('.country_btn_submit');
const inputCountry = document.querySelector('.country_input');
const sendRequest = (locationName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${locationName}&days=7`);
    const resultResponse = yield response.json();
    console.log(resultResponse);
    return resultResponse.forecast.forecastday;
});
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputValue = inputCountry === null || inputCountry === void 0 ? void 0 : inputCountry.value;
    const responseArr = sendRequest(inputValue).then(response => {
        console.log(response);
        response.map((item => {
            const weatherItem = document.createElement('div');
            const date = item.date;
            item.day.map(element => {
                const avgHumidity = document.createElement('span');
                avgHumidity.textContent = element.avghumidity;
                const avgTempC = document.createElement('span');
                avgHumidity.textContent = element.avgtemp_c;
                const avgTempF = document.createElement('span');
                avgHumidity.textContent = element.avgtemp_f;
                // const avgHumidity: Element | null = document.createElement('span')
                // avgHumidity.textContent = element.avghumidity
            });
        }));
    });
});
