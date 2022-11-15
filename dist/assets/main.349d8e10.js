import{a as n}from"./axios.da025002.js";const i=document.querySelector("template");window.onload=l();async function l(){try{const r=await(await n.get("https://character-database.becode.xyz/characters")).data,a=new Remarkable;for(let e=0;e<r.length;e++){let t=document.importNode(i.content,!0);r[e].image==""||r[e].image==null?t.querySelector("#card_image").src="./src/assets/not-found.jpg":t.querySelector("#card_image").src=`data:image/gif;base64,${r[e].image}`,t.querySelector("#card_charName").innerText=`${r[e].name}`,t.querySelector("#card_nickName").innerText=`${r[e].shortDescription}`,t.querySelector("#card_description").innerHTML=a.render(`${r[e].description}`),t.querySelector("#readMore_button").href=`card.html?${r[e].id}`,t.querySelector("#readMore_button").innerText="See the Character",t.querySelector("#dropdown").id=`dropdown${[e]}`,t.querySelector("#container_card").id=`container_card${[e]}`,t.querySelector("#dropdownButton").setAttribute("data-dropdown-toggle",`dropdown${[e]}`),t.querySelector("#dropdownButton").addEventListener("click",function(){document.querySelector(`#container_card${[e]}`).vanillaTilt.destroy(),document.body.addEventListener("click",function(d){d.target.tagName!=="svg"&&VanillaTilt.init(document.querySelector(`#container_card${[e]}`))})}),t.querySelector("#dropdownDelete").addEventListener("click",async()=>{confirm(`You are about to delete ${r[e].name}'s entry. Are you sure you want to continue? This cannot be undone.`)&&(await n.delete(`https://character-database.becode.xyz/characters/${r[e].id}`),alert("The selected entry has been successfully removed."),window.location.href="index.html")}),t.querySelector("#dropdownEdit").href=`form.html?${r[e].id}`,document.body.insertBefore(t,document.querySelector("#newCard"))}document.querySelector("body").setAttribute("class","bg-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 m-auto gap-4"),document.querySelector("#newButton").classList.remove("hidden"),document.querySelector("#tilt").src="vanilla-tilt.js";let o=document.querySelector("#searchBar");o.classList.remove("hidden"),o.addEventListener("keyup",e=>{console.log(e.key),o.value.length==0}),document.querySelector("#flowbite").src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js",document.querySelector("#loading").classList.add("hidden")}catch(c){console.log(c)}}