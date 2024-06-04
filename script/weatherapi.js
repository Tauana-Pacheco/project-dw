
async function tempo() {
    try {
    
      const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=092b340fe15a4947932224358240406&q=Sao Paulo&days=1&aqi=no&alerts=no"
    );
  
      if (!response.ok) {
        throw new Error("Unable to fetch weather data.");
      }
      const data = await response.json();

      document.getElementById("localizacao").innerHTML = data.location.region;
      document.getElementById("temperatura").innerHTML = data.current.temp_c;
    } catch (error) {
      console.error(error);
    }
}

tempo()