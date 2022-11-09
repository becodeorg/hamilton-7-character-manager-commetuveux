import Trix from "trix"
document.addEventListener("trix-before-initialize", () => {
  })

document.querySelector("input[type=file]").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        picture = reader.result.replace('data:', '').replace(/^.+,/, '');
    };
    reader.readAsDataURL(file)
});
picture.onchange = () => {
    const [file] = picture.files
    if (file) {
        pictureImage.src = URL.createObjectURL(file)
    }
}