import axios from "axios";

async function getCharacters() {
    const resp = await axios.get('https://character-database.becode.xyz/characters');
    const chars = await resp.data;
    const urlId = this.href.substring(this.href.lastIndexOf('?') + 1);
    console.log(urlId)
    console.log(chars.length)
    console.log(chars)
    const charName = document.querySelector('#card_charName');
    const charNickname = document.querySelector('#card_nickName');
    const charDesc = document.querySelector('#card_description');
    const charImg = document.querySelector('#card_image');
    let findIndex = chars.findIndex(elements => elements.id === urlId);
    charImg.setAttribute('src', `data:image;base64,${chars[findIndex].image}`)
    charName.innerText = chars[findIndex].name;
    charNickname.innerText = chars[findIndex].shortDescription;
    charDesc.innerText = chars[findIndex].description;
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

