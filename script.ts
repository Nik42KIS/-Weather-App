const API_KEY:string = "1afed292301b4a71852195852232611";    
const BASE_URL:string = "http://api.weatherapi.com/v1";


const sendRequest = async ():Promise<void> =>{
  const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=london`)
  const resultResponse = await response.json()
  console.log(resultResponse)
}
sendRequest()   