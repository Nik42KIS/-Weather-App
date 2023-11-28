var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import dateFormat from './node_modules/dateformat/lib/dateformat.js';
const API_KEY = '1afed292301b4a71852195852232611';
const BASE_URL = 'http://api.weatherapi.com/v1';
const header = document.querySelector('.header_title');
const weatherSection = document.querySelector('.weather');
const dayList = document.querySelector('.weather_day_list');
const submitBtn = document.querySelector('.country_btn_submit');
const inputCountry = document.querySelector('.country_input');
const selectTemp = document.querySelector('select');
const sendRequest = (locationName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${locationName}&days=7`);
    const resultResponse = yield response.json();
    console.log(resultResponse);
    if (header) {
        header.textContent = 'The weather in ' + resultResponse.location.name;
    }
    return resultResponse.forecast.forecastday;
});
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (dayList) {
        dayList.innerHTML = '';
    }
    const inputValue = inputCountry === null || inputCountry === void 0 ? void 0 : inputCountry.value;
    if (inputCountry === null || inputCountry === void 0 ? void 0 : inputCountry.value) {
        inputCountry.value = '';
    }
    const selectTempValue = selectTemp === null || selectTemp === void 0 ? void 0 : selectTemp.value;
    const responseArr = sendRequest(inputValue).then((response) => {
        var _a;
        console.log(response);
        response.map((item) => {
            console.log(item.day);
            const weatherItem = document.createElement('li');
            weatherItem.classList.add('weather_item');
            const date = document.createElement('span');
            date.textContent = dateFormat(item.date, 'dddd, mmmm dS, yyyy');
            const avgHumidity = document.createElement('span');
            avgHumidity.textContent = 'Humidity:' + item.day.avghumidity;
            const avgTempC = document.createElement('span');
            avgTempC.textContent = item.day.avgtemp_c + ' °C';
            avgTempC.classList.add('temp');
            const avgTempF = document.createElement('span');
            avgTempF.textContent = item.day.avgtemp_f + ' ℉';
            avgTempF.classList.add('temp');
            const weatherDesc = document.createElement('span');
            weatherDesc.textContent = item.day.condition.text;
            const weatherImage = document.createElement('img');
            weatherImage.src = item.day.condition.icon;
            weatherItem.append(date, weatherImage, weatherDesc, avgHumidity);
            if (selectTempValue === 'celsius') {
                weatherImage.after(avgTempC);
            }
            else {
                weatherImage.after(avgTempF);
            }
            dayList === null || dayList === void 0 ? void 0 : dayList.append(weatherItem);
        });
        (_a = dayList === null || dayList === void 0 ? void 0 : dayList.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList.add('active_day');
    });
});
