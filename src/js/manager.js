import axios from "axios";

const container = document.querySelector('template');

window.onload = getCharacters();

async function getCharacters() {
    const resp = await axios.get('https://character-database.becode.xyz/characters');
    const chars = await resp.data;
    for (let i = 0; i < chars.length; i++) {
        let Node = document.importNode(container.content, true);
        Node.querySelector("#card_image").src = `data:image/gif;base64,${chars[i].image}`;
        Node.querySelector("#card_charName").innerText = `${chars[i].name}`;
        Node.querySelector("#card_nickName").innerText = `${chars[i].shortDescription}`;
        Node.querySelector("#card_description").innerHTML = `${chars[i].description}`;
        Node.querySelector("#readMore_button").href = `card.html?${chars[i].id}`;
        Node.querySelector("#readMore_button").innerText = `See the Character`;
        document.body.appendChild(Node)
    }
}