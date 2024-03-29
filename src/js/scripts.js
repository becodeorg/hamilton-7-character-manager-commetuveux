import axios from "axios";
import VanillaTilt from "vanilla-tilt"

async function getCharacters() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const urlId = url.search.split("?")[1];
    try {
    const resp = await axios.get(`https://character-database.becode.xyz/characters/${urlId}`);
    const chars = await resp.data;
    document.title = `${chars.name}'s Card`
    const charName = document.querySelector("#card_charName");
    const charNickname = document.querySelector("#card_nickName");
    const charDesc = document.querySelector("#card_description");
    const charImg = document.querySelector("#card_image");
    const dropdownEdit = document.querySelector("#dropdown_Edit");
    const md = new Remarkable();
    //const dropdownDel = document.querySelector("dropdown_Delete");
    charImg.setAttribute("src", `data:image;base64,${chars.image}`)
    charName.innerText = chars.name;
    charNickname.innerText = chars.shortDescription;
    charDesc.innerHTML = md.render(chars.description);
    dropdownEdit.href = `form.html?${urlId}`
    }
    catch (error) {
    console.log("There was une couille dans le pâté")
    console.log(error);
    const charName = document.querySelector("#card_charName");
    const charNickname = document.querySelector("#card_nickName");
    const charDesc = document.querySelector("#card_description");
    const charImg = document.querySelector("#card_image");
    charImg.setAttribute("src", `./src/assets/not-found.jpg`)
    charName.innerText = "Invalid ID";
    charNickname.innerText = "Invalid ID";
    charDesc.innerText = "The ID you have entered is not valid, make sure to check out your link !";
    }
}

//Deletion script
document.getElementById("dropdown_Delete").addEventListener("click", async () => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const urlId = url.search.split("?")[1];
    const resp = await axios.get(`https://character-database.becode.xyz/characters/${urlId}`);
    const chars = await resp.data;
    if (confirm(`You are about to delete ${chars.name}'s entry. Are you sure you want to continue? This cannot be undone.`)) {
        await axios.delete(`https://character-database.becode.xyz/characters/${urlId}`);
        alert("The selected entry has been successfully removed.")
        window.location.href = "index.html"
    }
});

window.onload = getCharacters();

//Menu dropdown
/* function displayDropDown() {
let dropDown = document.querySelector("#dropdown");
document.body.addEventListener('click', dropDown.classList.add('hidden'));
dropDown.classList.remove('hidden');}

document.querySelector("#dropdownButton").addEventListener('click', displayDropDown)  */
/* document.querySelector ('#dropdown').onclick = function() {dropdown()};
function dropdown(){
    document.querySelector ('#dropdown_list').classList.toggle("show");
console.log()} */

// Vanilla- tilt

/* let scaleOnHover() {
    addEventListene.#card('hover', 'scaleOn'),
*/
/* VanillaTilt.init (document.querySelector("#card"), {
    max:5, 
    speed:400,
    glare: true,
}); */