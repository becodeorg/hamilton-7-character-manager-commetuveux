// import Trix from "trix"
document.addEventListener("trix-before-initialize", () => {
  })

document.querySelector("input[type=file]").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        picture = reader.result.replace('data:', '').replace(/^.+,/, '');
    };
    reader.readAsDataURL(file)
});
picture.onchange = () => {
    const [file] = picture.files
    if (file) {
        pictureImage.src = URL.createObjectURL(file)
    }
}

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