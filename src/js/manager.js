import axios from "axios";

const container = document.querySelector('template');

window.onload = getCharacters();

async function getCharacters() {
    try {
    const resp = await axios.get('https://character-database.becode.xyz/characters');
    const chars = await resp.data;
    console.log(chars);
    for (let i = 0; i < chars.length; i++) {
        let Node = document.importNode(container.content, true);
        Node.querySelector("#card_image").src = `data:image/gif;base64,${chars[i].image}`;
        Node.querySelector("#card_charName").innerText = `${chars[i].name}`;
        Node.querySelector("#card_nickName").innerText = `${chars[i].shortDescription}`;
        Node.querySelector("#card_description").innerHTML = `${chars[i].description}`;
        Node.querySelector("#readMore_button").href = `card.html?${chars[i].id}`;
        Node.querySelector("#readMore_button").innerText = `See the Character`;
        Node.querySelector("#dropdown").id = `dropdown${[i]}`;
        Node.querySelector("#dropdownButton").setAttribute('data-dropdown-toggle', `dropdown${[i]}`);
        document.body.prepend(Node)
    }
    }
    catch {
        if (chars[i].image === "") {
            let Node = document.importNode(container.content, true);
            Node.querySelector("#card_image").src = `./src/assets/not-found.jpg`;
        }
    }
    document.querySelector("body").setAttribute('class', 'bg-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 m-auto gap-4')
    document.querySelector("#newButton").classList.remove('hidden')
}