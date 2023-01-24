function fetchAndChangeColor() {
  fetch('./data')
    .then((response) => response.json())
    .then((data) => {
      document.body.style.color = data.color;
      document.getElementById('colorpicker').value = data.color;
    })
}


function setColor() {
  // Get the color from the color input
  const picker = document.getElementById('colorpicker');
  const color = picker.value;

  // Send a request to update the color in the server's database
  fetch('./set_color', {
    method: 'POST',
    body: JSON.stringify({ "color": color })
  })
    .then((response) => { 
      if (!response.ok) {
	alert('Change not taken into account, check connection with server !')
      }
      else {
        document.body.style.color = color;
      }
    })
}


// at the loading of the script, query the database and change the color of the text
fetchAndChangeColor()
