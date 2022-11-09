import axios from "axios";
const container = document.querySelector('template');

window.onload = getCharacters();

async function getCharacters() {
    const resp = await axios.get('https://character-database.becode.xyz/characters');
    const chars = await resp.data;
    console.log(chars.length)
    console.log(chars)
/*     const charName = document.querySelector('#card_charName');
    const charNickname = document.querySelector('#card_nickName');
    const charDesc = document.querySelector('#card_description');
    const charImg = document.querySelector('#card_image'); */
    console.log('script2 ok')
    for (let i = 0; i < chars.length; i++) {
        console.log('loop start ok')
        let Node = document.importNode(container.content, true);
        console.log(Node)
        Node.querySelector("#card_image").src = `data:image/gif;base64,${chars[i].image}`;
        Node.querySelector("#card_charName").innerText = `${chars[i].name}`;
        Node.querySelector("#card_nickName").innerText = `${chars[i].shortDescription}`;
        Node.querySelector("#card_description").innerHTML = `${chars[i].description}`;
        Node.querySelector("#readMore_button").href = `card.html?${chars[i].id}`;
        Node.querySelector("#readMore_button").innerText = `See the Character`;
        document.body.appendChild(Node)
        console.log('loop end ok')
    }
}
console.log('script ok')
document.querySelector('#readMore_button').addEventListener('click', getCharacters)