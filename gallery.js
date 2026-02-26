const photos = [
  {src:"assets/mom1.jpg", msg:"Tu es notre lumière 💖", cadre:"#800000"},
  {src:"assets/mom2.jpg", msg:"Merci pour ta douceur 🌸", cadre:"#800000"},
  {src:"assets/mom3.jpg", msg:"On t’aime fort 🎂", cadre:"#800000"},
  {src:"assets/mom4.jpg", msg:"Tu es la plus merveilleuse 💕", cadre:"#800000"},
  {src:"assets/mom5.jpg", msg:"Toujours dans nos cœurs 💖", cadre:"#800000"},

  {src:"assets/dad1.jpg", msg:"Merci pour ta force 💪", cadre:"#00008B"},
  {src:"assets/dad2.jpg", msg:"Toujours protecteur 🌟", cadre:"#00008B"},

  {src:"assets/you1.jpg", msg:"Je suis fière de ce que je crée 🎨", cadre:"#4B5320"},
  {src:"assets/you2.jpg", msg:"Un projet pour vous 💖", cadre:"#4B5320"},
  {src:"assets/you3.jpg", msg:"Avec amour et passion 🌸", cadre:"#4B5320"},

  {src:"assets/bro1.jpg", msg:"Tu es mon inspiration 🌟", cadre:"#4B5320"},
  {src:"assets/bro2.jpg", msg:"Merci pour ton soutien 🤝", cadre:"#4B5320"},
  {src:"assets/bro3.jpg", msg:"Joyeux anniversaire", cadre:"#4B5320"},

  {src:"assets/sister1.jpg", msg:"Je t’admire 💖", cadre:"#00008B"},
  {src:"assets/sister.jpg", msg:"Toujours à mes côtés 💕", cadre:"#00008B"}
];

let index = 0;
const photo = document.getElementById("photo");
const message = document.getElementById("message");

function showNext() {
  const item = photos[index];
  photo.src = item.src;
  message.textContent = item.msg;
  photo.style.borderColor = item.cadre;

  index = (index + 1) % photos.length;
}

// Advance on click; also show first image immediately
photo.addEventListener('click', showNext);
showNext();
