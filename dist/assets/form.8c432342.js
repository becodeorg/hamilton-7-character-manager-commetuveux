import{a as i}from"./axios.da025002.js";(async()=>{document.addEventListener("trix-before-initialize",()=>{}),document.querySelector("input[type=file]").addEventListener("change",d);function d(){let o=document.querySelector("input[type=file]").files;if(o.length>0){let t=o[0],e=new FileReader;e.onload=function(a){let r=a.target.result;pictureImage.src=r,console.log(document.getElementById("pictureImage").src)},e.readAsDataURL(t)}}const u=window.location.href;if(new URL(u).search.split("?")[1]===void 0)document.querySelector("#form_Submit").addEventListener("click",o=>{o.preventDefault();const t=Array.from(document.querySelectorAll("input[type=text]")).map(({value:c})=>c.trim()),[e,a]=t,r=document.querySelector(".ql-editor").innerHTML;console.log(r);const n=document.getElementById("pictureImage").src.replace("data:image/","").replace(/^.+,/,"");if(console.log(t),confirm(`You are about to create a new entry for ${t[0]}. Is that what you want ?`))try{i.post("https://character-database.becode.xyz/characters",{image:n,name:e,shortDescription:a,description:r}),alert("Character successfully added!"),window.location.href="index.html"}catch{console.log("There was une couille dans le p\xE2t\xE9")}});else{const o=window.location.href,t=new URL(o).search.split("?")[1];try{const e=await(await i.get(`https://character-database.becode.xyz/characters/${t}`)).data;console.log(e),console.log(t);const a=document.querySelector('input[name="name"]'),r=document.querySelector('input[name="nickname"]'),n=document.querySelector("#editor"),c=document.querySelector("#pictureImage");console.log(c),a.value=e.name,r.value=e.shortDescription,n.innerHTML=e.description,c.src=`data:image;base64,${e.image}`,document.querySelector("#form_Submit").addEventListener("click",m=>{m.preventDefault();const l=Array.from(document.querySelectorAll("input[type=text]")).map(({value:g})=>g.trim()),[h,p]=l,y=document.querySelector(".ql-editor").innerHTML,s=document.getElementById("pictureImage").src.replace("data:image/","").replace(/^.+,/,"");if(console.log(l),console.log(s),confirm(`You are about to update ${l[0]}'s entry. Is that what you want ?`))try{i.put(`https://character-database.becode.xyz/characters/${t}`,{image:s,name:h,shortDescription:p,description:y}),alert("Character successfully updated!"),window.location.href="index.html"}catch{console.log("There was une couille dans le p\xE2t\xE9")}})}catch{alert("There was an error while getting the character informations. Has it been removed by someone else ?"),window.location.href="index.html"}document.querySelector("#form_Submit").value="Update Character!"}new Quill("#editor",{modules:{toolbar:[[{header:[1,2,3,4,5,6]}],["bold","italic","underline"],["code-block"]]},placeholder:"Please enter the character's description.",theme:"snow"})})();
