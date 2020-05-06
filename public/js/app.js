const weatherForm = document.querySelector('form'),
      search = document.querySelector('input'),
      messageOne = document.querySelector('#message-1'),
      messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`)
    .then(response => {
        response.json()
        .then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
            }
        });
    });
    console.log(location);
});