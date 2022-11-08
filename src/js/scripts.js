import axios from "axios";

async function getCharacters() {
    const resp = await axios.get('https://character-database.becode.xyz/characters');
    const chars = await resp.data;
    console.log(chars.length)
    console.log(chars)
}

document.querySelector('#clicky').addEventListener('click', getCharacters)