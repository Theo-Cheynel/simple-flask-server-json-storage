function getFbx() {
  fetch('./get_fbx')
    .then((response) => response.json())
    .then((data) => {
      window.fbx = data['fbx'];
      window.loadFbx('/fbx/' + window.fbx);
    })
}


function setPrompt() {
  // Get the color from the color input
  const input = document.getElementById('text_input');
  const prompt_ = input.value;

  // Send a request to update the color in the server's database
  fetch('./set_prompt', {
    method: 'POST',
    body: JSON.stringify({ "fbx": window.fbx, "prompt": prompt_ })
  })
    .then((response) => { 
    	getFbx()
    })
}


// at the loading of the script, query the database and change the color of the text
getFbx()
