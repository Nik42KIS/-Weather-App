// @ts-ignore
import dateFormat, { masks } from './node_modules/dateformat/lib/dateformat.js';

const API_KEY: string = '1afed292301b4a71852195852232611';
const BASE_URL: string = 'http://api.weatherapi.com/v1';

const header: Element | null = document.querySelector('.header_title');
const weatherSection: Element | null = document.querySelector('.weather');
const dayList: Element | null = document.querySelector('.weather_day_list');
const submitBtn: Element | null = document.querySelector('.country_btn_submit');
const inputCountry: HTMLInputElement | null = document.querySelector('.country_input');
const selectTemp: HTMLSelectElement | null = document.querySelector('select');

interface ConditionData {
  text: string;
  icon: string;
}
interface DayData {
  avghumidity: string;
  avgtemp_c: string;
  avgtemp_f: string;
  condition: ConditionData;
}
interface WeatherData {
  date: string;
  day: DayData;
}

const sendRequest = async (locationName: string | undefined): Promise<WeatherData[]> => {
  const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${locationName}&days=7`);
  const resultResponse = await response.json();
  console.log(resultResponse);
  if (header) {
    header.textContent = 'The weather in ' + resultResponse.location.name;
  }
  return resultResponse.forecast.forecastday;
};

submitBtn?.addEventListener('click', (event) => {
  event.preventDefault();
  if (dayList) {
    dayList.innerHTML = '';
  }
  const inputValue: string | undefined = inputCountry?.value;
  if (inputCountry?.value) {
    inputCountry.value = '';
  }
  const selectTempValue = selectTemp?.value;
  const responseArr = sendRequest(inputValue).then((response) => {
    console.log(response);
    response.map((item) => {
      console.log(item.day);
      const weatherItem: Element | null = document.createElement('li');
      weatherItem.classList.add('weather_item');
      const date: Element | null = document.createElement('span');
      date.textContent = dateFormat(item.date, 'dddd, mmmm dS, yyyy');

      const avgHumidity: Element | null = document.createElement('span');
      avgHumidity.textContent = 'Humidity:' + item.day.avghumidity;

      const avgTempC: Element | null = document.createElement('span');
      avgTempC.textContent = item.day.avgtemp_c + ' °C';
      avgTempC.classList.add('temp');

      const avgTempF: Element | null = document.createElement('span');
      avgTempF.textContent = item.day.avgtemp_f + ' ℉';
      avgTempF.classList.add('temp');

      const weatherDesc: Element | null = document.createElement('span');
      weatherDesc.textContent = item.day.condition.text;

      const weatherImage: HTMLImageElement = document.createElement('img');
      weatherImage.src = item.day.condition.icon;

      weatherItem.append(date, weatherImage, weatherDesc, avgHumidity);
      if (selectTempValue === 'celsius') {
        weatherImage.after(avgTempC);
      } else {
        weatherImage.after(avgTempF);
      }

      dayList?.append(weatherItem);
    });
    dayList?.firstElementChild?.classList.add('active_day');
  });
});
