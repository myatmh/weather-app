const apiKeys = "efff1ed95ca8f8a524e4bf6962f6312c";

const inputTag = document.querySelector(".input_box");
const submitBtn = document.querySelector(".submit_btn");

const weatherIcons = {
  Clear: "icons/clear.png",
  Clouds: "icons/clouds.png",
  Drizzle: "icons/drizzle.png",
  Mist: "icons/mist.png",
  Rain: "icons/rain.png",
  Snow: "icons/snow.png",
  Thunderstorm: "icons/thunderstorm.png",
  Ash: "icons/default.png",
};

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
    inputCheck();
  }
});

submitBtn.addEventListener("click", () => {
  inputCheck();
});

function inputCheck() {
  if (inputTag.value === "") {
    alert("Enter a City Name!");
    return;
  }
  cityName = inputTag.value.toLowerCase().trim();

  getWeather(cityName);
  inputTag.value = "";
}

const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    const weatherDetailDiv = document.querySelector(".weather_details");
    const messageContainer = document.querySelector(".error_message");
    if (parseInt(data.cod) !== 200) {
      messageContainer.innerHTML = "";

      const errorMessage = document.createElement("i");
      errorMessage.textContent = data.cod + " : " + data.message;
      errorMessage.style.display = "block";
      messageContainer.appendChild(errorMessage);
      alert("Enter a valid city name !");
      return;
    } else {
      weatherDetailDiv.innerHTML = "";
      weatherDetailDiv.classList.add("trans");
      messageContainer.style.display = "none";
      const condition = data.weather[0].main;
      // console.log("imgurl :", weatherIcons[condition]);
      weatherDetailDiv.innerHTML = `
        <h4>${data.name}</h4>
        <i style="font-size:12px;">${data.sys.country}</i>
        <p class="temp">${data.main.temp} °C</p>
        <img src="${weatherIcons[condition]}" class="icon" alt="weather-icon" />
        <p class="condition">${
          data.weather[0].main
        } <span style="font-size:12px;"> - ( ${
        data.weather[0].description
      } )</span></p>
        <p class="min_max"><i>Min-Max</i> - ${Math.floor(
          data.main.temp_min
        )} °C / ${Math.ceil(data.main.temp_max)} °C</p>
        <div class="hu_wind">
          <p>💧 Humidity - ${data.main.humidity} %</p>
          <p class="wind">༄. Wind - ${(data.wind.speed * 3.6).toFixed(
            1
          )} km/h</p>
        </div>
        `;
    }
  } catch (err) {
    console.log("error hit: ", err);
  }
};
