import axios from "axios";

async function getCharacters() {
    const resp = await axios.get('https://character-database.becode.xyz/characters');
    const chars = await resp.data;
    console.log(chars.length)
    console.log(chars)
    const charName = document.querySelector('#card_charName');
    const charNickname = document.querySelector('#card_nickName');
    const charDesc = document.querySelector('#card_description');
    const charImg = document.querySelector('#card_image');
    charImg.setAttribute('src', `data:image/jpeg;base64,${chars[0].image}`)
    charName.innerText = chars[0].name;
    charNickname.innerText = chars[0].shortDescription;
    charDesc.innerText = chars[0].description;
}
console.log('script ok')
document.querySelector('#readMore_button').addEventListener('click', getCharacters)