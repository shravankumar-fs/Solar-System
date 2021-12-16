const info = document.createElement("div");
info.classList.add("info");
let sName = "Shravan.Kumar".toUpperCase().split("");
let about = "I am a Frontend Developer from India &";
let flagAppend = "🇮🇳";
let div1 = document.createElement("div");
let h2 = document.createElement("h2");
let h4 = document.createElement("h4");
const delays = {
  h2: 50,
  h4: 20,
};
info.appendChild(div1);
div1.appendChild(h2);
div1.appendChild(h4);

let idx = 0;
let blurStep = 20 / (sName.length - 1);
let i = setInterval(() => {
  if (sName[idx] == ".") {
    h2.innerHTML += "&nbsp;";
    idx++;
  } else h2.innerHTML += sName[idx++];

  let blurVal = 20 - blurStep * idx;
  if (blurVal < 0) {
    document.getElementById("solarSystem").style.filter = `none`;
  } else
    document.getElementById("solarSystem").style.filter = `blur(${blurVal}px)`;
  if (idx == sName.length) {
    clearInterval(i);
    h2.innerHTML = sName
      .map((letter, idx) => {
        if (letter === ".") {
          letter = "&nbsp;";
        }
        return `<span style="transition-delay:${
          idx * delays.h2
        }ms;animation-delay:${idx * 100}ms">${letter}</span>`;
      })
      .join("");
  }
}, 200);

h4.innerHTML = about
  .split("")
  .map((letter, idx) => {
    if (letter === " ") {
      letter = "&nbsp;";
    } else if (letter === "&") {
      return `<span style="transition-delay:${
        idx * delays.h4
      }ms" class="flag">${flagAppend}</span>`;
    }
    return `<span style="transition-delay:${
      idx * delays.h4
    }ms;animation-delay:${idx * 20}ms">${letter}</span>`;
  })
  .join("");

let getDetails = () => {
  let button = document.createElement("button");
  button.innerText = "More_Details/";
  button.classList.add("detailsBtn");
  div1.appendChild(button);
  button.addEventListener("click", () => {
    if (!button.classList.contains("hide")) {
      let aud = document.querySelector("audio");
      aud.currentTime = 0.6;
      aud.play();

      button.innerText = "../";
      div1.appendChild(getTypes());
      div1.appendChild(getSkills());
      div1.appendChild(getContactMe());
    } else {
      button.innerText = "More Details/";
      document.getElementById("contacts").remove();
      document.getElementById("skills").remove();
      document.getElementById("types").remove();
    }
    button.classList.toggle("hide");
  });
};
let getTypes = () => {
  let types = document.createElement("div");
  let typesSet = [
    "",
    "Responsive Web UIs",
    "Creative Animated UIs",
    "ThreeJS based 3D Websites",
  ];
  types.innerHTML =
    `I will build your sites with modern features like  ) ${typesSet
      .reduce((a, b) => a + " , " + b)
      .substring(2)}`
      .split("")
      .map((letter, idx) => {
        if (letter === " ") {
          letter = "&nbsp;";
        }
        if (letter === ")") {
          letter = "<br>";
        }
        return `<span style="animation-delay:${idx * 20}ms">${letter}</span>`;
      })
      .join("");
  types.id = "types";
  types.classList.add("types");
  return types;
};
let getSkills = () => {
  let skills = document.createElement("div");
  let skillSet = [
    "",
    "Javascript ES6",
    "Angular 6/7",
    "Three.js",
    "CSS3 & HTML",
    "Core Java & Spring boot",
  ];
  skills.innerHTML = `Major skills&nbsp;&nbsp;:&nbsp;&nbsp;[ ${skillSet.reduce(
    (a, b) => a + "<span class='skill'>" + b + "</span>"
  )} ] `;
  skills.id = "skills";
  skills.classList.add("skills");
  return skills;
};

let getContactMe = () => {
  let contacts = document.createElement("div");
  contacts.innerHTML = ` Lets connect on 
    <span class="contact"><a target="_blank" href="https://twitter.com/shravankumarui"><i class="fab fa-twitter"></i></a></span>
    <span class="contact"><a target="_blank"  href="https://www.linkedin.com/in/shravan-kumar-udupa/"><i class="fab fa-linkedin-in"></i></a></span>
    <span class="contact"><a target="_blank" href="mailto:shravankumar.fs.dev@gmail.com"><i class="far fa-envelope"></i></a></span>
  `;
  contacts.id = "contacts";
  contacts.classList.add("contacts");
  return contacts;
};

setTimeout(() => {
  document.body.appendChild(info);
  getDetails();
}, 1000);
