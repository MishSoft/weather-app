window.onload = () => {
    const searchInput = document.querySelector(".searchinput")
    const form = document.querySelector("form")
    const frame = document.querySelector(".frame")
    const loadingImage = document.querySelector(".loading")
    const weather = document.querySelector(".weather")

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let input = searchInput
        checkInp(input, frame, loadingImage)
        showWeather(input.value)
    })

    searchInput.addEventListener("input", (e) => {
        let value = e.target.value
        checkInp(searchInput, frame, loadingImage, weather)
        showWeather(value, loadingImage)

        if(value.length == 0) {
            weather.style.display = "none"
        }
    })
}


function checkInp(inp, frm, loadImg, weather) {
    if(inp.value !== "") {
        weather.style.display = "none"
        frm.classList.add("frame-active")
        loadImg.style.display = "block"
        loading(loadImg)
    } else {
        loadImg.style.display = "none"
        frm.classList.remove("frame-active")
    }
}

function loading(img) {
    let imgData = [
        "./clear.png",
        "./cloud.png",
        "./rain.png"]
    let i = 0
    setInterval(() => {
        if(i >= imgData.length) i = 0
        img.style.backgroundImage = `url(${imgData[i]})`
        i++ 
    }, 300)
}


function showWeather(inp, loadimg) {
    let api = '7aee5177a359319f0dc66de764c35dc6'
    let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inp}&appid=${api}`
    
    fetch(url)
        .then(response => response.json())
        .then(res => {
            console.log(res.weather[0].main)
            loadimg.style.display = "none"
            let weatherImg = document.querySelector(".weather-img")
            let celss = document.querySelector(".fs")
            let wthT = document.querySelector(".wheter-text")
            let weather = document.querySelector(".weather")

            if(res.cod !== "404") {
                weather.style.display = "flex"
                switch(res.weather[0].main) {
                    case "Clear":
                        weatherImg.src = "./clear.png"
                        break
                    case "Clouds":                       
                        weatherImg.src = "./cloud.png"
                        break 
                    case "Rain":     
                        weatherImg.src = "./rain.png"
                        break
                    case "Snow":
                        weatherImg.src = "./snow.png"
                        break
                }
                celss.innerHTML = `${parseInt(res.main.temp)}<span class="ss">°C</span>`
                wthT.textContent = `${res.weather[0].description}`
            } else {
                weather.style.display = "none"
                loadimg.style.display = "block"
                
            }
        })
}



