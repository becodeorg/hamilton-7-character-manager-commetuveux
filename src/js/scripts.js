import axios from "axios";

async function getCharacters() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const urlId = url.search.split('?')[1];
    const resp = await axios.get(`https://character-database.becode.xyz/characters/${urlId}`);
    const chars = await resp.data;
    console.log(chars)
    console.log(urlId);
    const charName = document.querySelector('#card_charName');
    const charNickname = document.querySelector('#card_nickName');
    const charDesc = document.querySelector('#card_description');
    const charImg = document.querySelector('#card_image');
    charImg.setAttribute('src', `data:image;base64,${chars.image}`)
    charName.innerText = chars.name;
    charNickname.innerText = chars.shortDescription;
    charDesc.innerText = chars.description;
}
console.log('script ok')
document.querySelector('#readMore_button').addEventListener('click', getCharacters)
window.onload = getCharacters();

//Menu dropdown
function displayDropDown() {
let dropDown = document.querySelector("#dropdown");
document.body.addEventListener('click', dropDown.classList.add('hidden'));
dropDown.classList.remove('hidden');}

document.querySelector("#dropdownButton").addEventListener('click', displayDropDown) 
/* document.querySelector ('#dropdown').onclick = function() {dropdown()};
function dropdown(){
    document.querySelector ('#dropdown_list').classList.toggle("show");
console.log()} */

