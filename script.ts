const API_KEY:string = "1afed292301b4a71852195852232611";    
const BASE_URL:string = "http://api.weatherapi.com/v1";

const weatherSection: Element | null = document.querySelector('.weather')
const dayList: Element | null = document.querySelector('.weather_day_list')
const submitBtn: Element | null = document.querySelector('.country_btn_submit')
const inputCountry: HTMLInputElement | null = document.querySelector('.country_input')

interface ConditionData {
  text:string,
  icon:string
}
interface DayData {
avghumidity: string,
avgtemp_c: string,
avgtemp_f: string,
condition: ConditionData
}
interface WeatherData {
  date:string,
  day:DayData,
}

const sendRequest = async (locationName:string | undefined) : Promise<WeatherData[]> =>{
  const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${locationName}&days=7`)
  const resultResponse = await response.json()
  console.log(resultResponse)
  return resultResponse.forecast.forecastday
}

submitBtn?.addEventListener('click', (event) =>{
    event.preventDefault()
    const inputValue :string | undefined = inputCountry?.value
    const responseArr = sendRequest(inputValue).then(response =>{
        console.log(response)
        response.map((item =>{
          console.log(item.day)
          const weatherItem: Element | null = document.createElement('div')
          const date = item.date;
 
            const avgHumidity: Element | null = document.createElement('span')
            avgHumidity.textContent = item.day.avghumidity
            
            const avgTempC: Element | null = document.createElement('span')
            avgTempC.textContent = item.day.avgtemp_c

            const avgTempF: Element | null = document.createElement('span')
            avgTempF.textContent = item.day.avgtemp_f

            weatherItem.append(avgHumidity, avgTempC, avgTempF)
            // const avgHumidity: Element | null = document.createElement('span')
            // avgHumidity.textContent = element.avghumidity

          dayList?.append(weatherItem)
        })
        )
    })

})