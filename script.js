const apiKeys = "efff1ed95ca8f8a524e4bf6962f6312c";

const inputTag = document.querySelector(".input_box");
const submitBtn = document.querySelector(".submit_btn");

let cityName;

// window.onload = () => {
//   cityName = localStorage.getItem("savedCity")
//     ? localStorage.getItem("savedCity")
//     : "Yangon";
//   console.log(cityName);
//   getWeather(cityName);
// };

inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (inputTag.value === "") {
      alert("Enter a City Name!");
      return;
    }
    cityName = inputTag.value.toLowerCase().trim();

    getWeather(cityName);
    inputTag.value = "";
  }
});

const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (parseInt(data.cod) !== 200) {
      const messageContainer = document.querySelector(".error_message");
      messageContainer.innerHTML = "";
      const errorMessage = document.createElement("i");
      errorMessage.textContent = data.cod + " : " + data.message;
      messageContainer.appendChild(errorMessage);
      return;
    } else {
      const weatherDetailDiv = document.querySelector(".weather_details");
      weatherDetailDiv.classList.add("trans");
      weatherDetailDiv.innerHTML = `
        <h4>${data.name}</h4>
        <i style="font-size:12px;">${data.sys.country}</i>
        <p class="temp">${data.main.temp} °C</p>
        <p class="icon">🌞</p>
        <p class="condition">${data.weather[0].main}</p>
        <p class="min_max"><i>Min-Max</i> - ${Math.floor(
          data.main.temp_min
        )} °C / ${Math.ceil(data.main.temp_max)} °C</p>
        <div class="hu_wind">
          <p>💧 Humidity - ${data.main.humidity} %</p>
          <p class="wind">༄. Wind - ${data.wind.speed} km/h</p>
        </div>
        `;
    }
  } catch (err) {
    console.log("error hit: ", err);
  }
};
