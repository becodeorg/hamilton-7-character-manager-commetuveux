// import Trix from "trix"
import axios from "axios";

document.addEventListener("trix-before-initialize", () => {
  })

function commande(nom, argument) {
  if (typeof argument === 'undefined') {
    argument = '';
  }
  switch (nom) {
    case "createLink":
      argument = prompt("Quelle est l'adresse du lien ?");
      break;
    case "insertImage":
      argument = prompt("Quelle est l'adresse de l'image ?");
      break;
  }
  // Exécuter la commande
  document.execCommand(nom, false, argument);
}

function resultat() {
  document.getElementById("resultat").value = document.getElementById("editeur").innerHTML;
}


// Transformation of the file to data URL
document.querySelector("input[type=file]").addEventListener("change", encode);
function encode() {
  let selectedfile = document.querySelector("input[type=file]").files;
  if (selectedfile.length > 0) {
    let imageFile = selectedfile[0];
    let fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      let srcData = fileLoadedEvent.target.result;
      pictureImage.src = srcData;
      console.log(document.getElementById("pictureImage").src);
    }
    fileReader.readAsDataURL(imageFile);
  }
}


const url_string = window.location.href;
const url = new URL(url_string);
const urlId = url.search.split('?')[1];
//New Character part
if (urlId === undefined) {
  document.querySelector('#form_Submit').addEventListener("click", (event) => {
    event.preventDefault();
    const input = Array.from(document.querySelectorAll("input[type=text], textarea"));
    const values = input.map(({ value }) => value.trim());
    const [name, shortDescription, description] = values;
    const picturez = document.getElementById("pictureImage").src.replace('data:image/', '').replace(/^.+,/, '');
    console.log(values);
    if (confirm(`You are about to create a new entry for ${values[0]}. Is that what you want ?`)) {
      try {
        axios.post('https://character-database.becode.xyz/characters', {
            image: picturez,
            name: name,
            shortDescription:shortDescription,
            description: description
        });
        alert('Character successfully added!')
        window.location.href = "index.html"
    }
    catch (error) {
      console.log('There was une couille dans le pâté')
    }
  }
  })
}
// Edit Character part
else {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const urlId = url.search.split('?')[1];
  try {
  const resp = await axios.get(`https://character-database.becode.xyz/characters/${urlId}`);
  const char = await resp.data;
  console.log(char)
  console.log(urlId);
  const charName = document.querySelector('input[name="name"]');
  const charNickname = document.querySelector('input[name="nickname"]');
  const charDesc = document.querySelector('textarea');
  const charImg = document.querySelector('#pictureImage');
  console.log(charImg)
  charName.value = char.name;
  charNickname.value = char.shortDescription;
  charDesc.value = char.description;
  charImg.src = `data:image;base64,${char.image}`;
  document.querySelector('#form_Submit').addEventListener("click", (event) => {
    event.preventDefault();
    const input = Array.from(document.querySelectorAll("input[type=text], textarea"));
    const values = input.map(({ value }) => value.trim());
    const [name, shortDescription, description] = values;
    const picturez = document.getElementById("pictureImage").src.replace('data:image/', '').replace(/^.+,/, '');
    console.log(values);
    console.log(picturez);
    if (confirm(`You are about to update ${values[0]}'s entry. Is that what you want ?`)) {
      try {
        axios.put(`https://character-database.becode.xyz/characters/${urlId}`, {
            image: picturez,
            name: name,
            shortDescription:shortDescription,
            description: description
        });
        alert('Character successfully updated!')
        window.location.href = "index.html";
    }
    catch (error) {
      console.log('There was une couille dans le pâté')
    }
  }
  })
  }
  catch (error) {
    alert('There was an error while getting the character informations. Has it been removed by someone else ?');
    window.location.href = "index.html"
  }
  document.querySelector("#form_Submit").value = "Update Character!"
};

//WYSIWYG

// define vars
const editor = document.getElementsByClassName('wp-webdeasy-comment-editor')[0];
const toolbar = editor.getElementsByClassName('toolbar')[0];
const buttons = toolbar.querySelectorAll('.editor-btn:not(.has-submenu)');
const contentArea = editor.getElementsByClassName('content-area')[0];
const visuellView = contentArea.getElementsByClassName('visuell-view')[0];
const htmlView = contentArea.getElementsByClassName('html-view')[0];
const modal = document.getElementsByClassName('modal')[0];

// add active tag event
document.addEventListener('selectionchange', selectionChange);

// add paste event
visuellView.addEventListener('paste', pasteEvent);

// add toolbar button actions
for(let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  
  button.addEventListener('click', function(e) {
    let action = this.dataset.action;
    
    switch(action) {
      case 'bold':
        execCodeAction(this, editor);
        console.log (this)
        break;
      case 'italic':
        execCodeAction(this, editor);
        console.log (this)
        break;
      case 'underline':
        execCodeAction(this, editor);
        console.log (this)
        break;
      default:
        execDefaultAction(action);
    }
    
  });
}

/** 
 * This function toggles between visual and html view
 */
function execCodeAction(button, editor) {

  if(button.classList.contains('active')) { // show visuell view
    visuellView.innerHTML = htmlView.value;
    htmlView.style.display = 'none';
    visuellView.style.display = 'block';

    button.classList.remove('active');     
  } else {  // show html view
    htmlView.innerText = visuellView.innerHTML;
    visuellView.style.display = 'none';
    htmlView.style.display = 'block';

    button.classList.add('active'); 
  }
}


/**
 * This function executes all 'normal' actions
 */
function execDefaultAction(action) {
  document.navigator.write(action, false);
}

/**
 * Saves the current selection
 */
function saveSelection() {
    if(window.getSelection) {
        sel = window.getSelection();
        if(sel.getRangeAt && sel.rangeCount) {
            let ranges = [];
            for(var i = 0, len = sel.rangeCount; i < len; ++i) {
                ranges.push(sel.getRangeAt(i));
            }
            return ranges;
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
}

/**
 *  Loads a saved selection
 */
function restoreSelection(savedSel) {
    if(savedSel) {
        if(window.getSelection) {
            sel = window.getSelection();
            sel.removeAllRanges();
            for(var i = 0, len = savedSel.length; i < len; ++i) {
                sel.addRange(savedSel[i]);
            }
        } else if(document.selection && savedSel.select) {
            savedSel.select();
        }
    }
}

/**
 * Sets the current selected format buttons active/inactive
 */ 
function selectionChange(e) {
  
  for(let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    
    // don't remove active class on code toggle button
    if(button.dataset.action === 'toggle-view') continue;
    
    button.classList.remove('active');
  }
  
  if(!childOf(window.getSelection().anchorNode.parentNode, editor)) return false;
  
  parentTagActive(window.getSelection().anchorNode.parentNode);
}

/**
 * Checks if the passed child has the passed parent
 */
function childOf(child, parent) {
  return parent.contains(child);
}

/**
 * Sets the tag active that is responsible for the current element
 */
function parentTagActive(elem) {
  if(!elem ||!elem.classList || elem.classList.contains('visuell-view')) return false;
  
  let toolbarButton;
  
  // active by tag names
  let tagName = elem.tagName.toLowerCase();
  toolbarButton = document.querySelectorAll(`.toolbar .editor-btn[data-tag-name="${tagName}"]`)[0];
  if(toolbarButton) {
    toolbarButton.classList.add('active');
  }
  
  // active by text-align
  let textAlign = elem.style.textAlign;
  toolbarButton = document.querySelectorAll(`.toolbar .editor-btn[data-style="textAlign:${textAlign}"]`)[0];
  if(toolbarButton) {
    toolbarButton.classList.add('active');
  }
  
  return parentTagActive(elem.parentNode);
}

/**
 * Handles the paste event and removes all HTML tags
 */
function pasteEvent(e) {
  e.preventDefault();
  
  let text = (e.originalEvent || e).clipboardData.getData('text/plain');
  document.execCommand('insertHTML', false, text);
}

/**
 * This functions adds a paragraph tag when the enter key is pressed
 */
function addParagraphTag(evt) {
  if (evt.keyCode == '13') {
    
    // don't add a p tag on list item
    if(window.getSelection().anchorNode.parentNode.tagName === 'LI') return;
    document.execCommand('formatBlock', false, 'p');
  }
}