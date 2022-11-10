// import Trix from "trix"
import axios from "axios";

document.addEventListener("trix-before-initialize", () => {
  })

function commande(nom, argument) {
  if (typeof argument === 'undefined') {
    argument = '';
  }
  switch (nom) {
    case "createLink":
      argument = prompt("Quelle est l'adresse du lien ?");
      break;
    case "insertImage":
      argument = prompt("Quelle est l'adresse de l'image ?");
      break;
  }
  // Exécuter la commande
  document.execCommand(nom, false, argument);
}

function resultat() {
  document.getElementById("resultat").value = document.getElementById("editeur").innerHTML;
}



document.querySelector("input[type=file]").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
      reader.result.replace('data:', '').replace(/^.+,/, '');
  };
  reader.readAsDataURL(file)
});
picture.onchange = () => {
  const [file] = picture.files
  if (file) {
      pictureImage.src = URL.createObjectURL(file)
  }
}

const url_string = window.location.href;
const url = new URL(url_string);
const urlId = url.search.split('?')[1];
if (urlId === undefined) {
  document.querySelector('#form_Submit').addEventListener("click", (event) => {
    event.preventDefault();
    const input = Array.from(document.querySelectorAll("input[type=text], textarea"));
    const values = input.map(({ value }) => value.trim());
    const [name, shortDescription, description] = values;
    console.log(values);
    if (confirm(`You are about to create a new entry for ${values[0]}. Is that what you want ?`)) {
      try {
        axios.post('https://character-database.becode.xyz/characters', {
            picture: picture,
            name: name,
            shortDescription:shortDescription,
            description: description
        });
        window.location.href = "index.html"
        alert('Character successfully added!')
    }
    catch (error) {
      console.log('There was une couille dans le pâté')
    }
  }
  })
}
else {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const urlId = url.search.split('?')[1];
  try {
  const resp = await axios.get(`https://character-database.becode.xyz/characters/${urlId}`);
  const char = await resp.data;
  console.log(char)
  console.log(urlId);
  const charName = document.querySelector('input[name="name"]');
  const charNickname = document.querySelector('input[name="nickname"]');
  const charDesc = document.querySelector('textarea');
  const charImg = document.querySelector('#pictureImage');
  console.log(charImg)
  charName.value = char.name;
  charNickname.value = char.shortDescription;
  charDesc.value = char.description;
  charImg.src = `data:image;base64,${char.image}`;
  }
  catch (error) {
    alert('There was an error while getting the character informations. Has it been removed by someone else ?');
    window.location.href = "index.html"
  }
  document.querySelector("#form_Submit").value = "Update Character!"
};