
const searchForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherImg = document.querySelector('#weatherImage');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    weatherImg.src = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = location;
                messageTwo.textContent = 'The temperature is ' + data.temperature + ' and chance of rain is ' + data.rainChance + ' and the url to the image is ' + data.weatherIconUrl;
                weatherImg.src = data.weatherIconUrl;
            }
        })
    });
})