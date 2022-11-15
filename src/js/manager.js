import axios from "axios";

const container = document.querySelector('template');

window.onload = getCharacters();

async function getCharacters() {
    try {
    const resp = await axios.get('https://character-database.becode.xyz/characters');
    const chars = await resp.data;
    // console.log(chars);
    for (let i = 0; i < chars.length; i++) {
        // console.log(chars[i].image)
        let Node = document.importNode(container.content, true);
        if (chars[i].image == "" || chars[i].image == undefined) {
            Node.querySelector("#card_image").src = `./src/assets/not-found.jpg`;
        }
        else {
            Node.querySelector("#card_image").src = `data:image/gif;base64,${chars[i].image}`
        }
        Node.querySelector("#card_charName").innerText = `${chars[i].name}`;
        Node.querySelector("#card_nickName").innerText = `${chars[i].shortDescription}`;
        Node.querySelector("#card_description").innerHTML = `${chars[i].description}`;
        Node.querySelector("#readMore_button").href = `card.html?${chars[i].id}`;
        Node.querySelector("#readMore_button").innerText = `See the Character`;
        Node.querySelector("#dropdown").id = `dropdown${[i]}`;
        Node.querySelector("#container_card").id = `container_card${[i]}`;
        Node.querySelector("#dropdownButton").setAttribute('data-dropdown-toggle', `dropdown${[i]}`);
        Node.querySelector("#dropdownButton").addEventListener("click", function() {
            document.querySelector(`#container_card${[i]}`).vanillaTilt.destroy();
            document.body.addEventListener("click", function(e) {
                if(e.target.tagName !== "svg") {
                    VanillaTilt.init(document.querySelector(`#container_card${[i]}`));
                }
            })
        })
        Node.querySelector("#dropdownDelete").addEventListener("click", async () => {
            if (confirm(`You are about to delete ${chars[i].name}'s entry. Are you sure you want to continue? This cannot be undone.`)) {
                await axios.delete(`https://character-database.becode.xyz/characters/${chars[i].id}`);
                alert("The selected entry has been successfully removed.")
                window.location.href = "index.html"
            }
        });
        Node.querySelector("#dropdownEdit").href = `form.html?${chars[i].id}`
        document.body.insertBefore(Node, document.querySelector("#newCard"));
    }
    document.querySelector("body").setAttribute("class", "bg-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 m-auto gap-4");
    document.querySelector("#newButton").classList.remove("hidden");
    document.querySelector("#tilt").src = "vanilla-tilt.js";
    let searchBar = document.querySelector("#searchBar");
    searchBar.classList.remove("hidden");
    searchBar.addEventListener('keyup', (event) => {
        console.log(event.key)
            if (searchBar.value.length == 0) {
                
            }
    });
    document.querySelector("#flowbite").src = "https://unpkg.com/flowbite@1.5.3/dist/flowbite.js";
    document.querySelector("#loading").classList.add('hidden')
    }
    catch (error) {
        console.log(error);
        }
}

    // Swiper part, broken for now
    // document.querySelector("#swiper").src = "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js";
    /* const swiper = new swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,},); */