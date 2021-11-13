const info = document.createElement("div");
info.classList.add("info");
let sName = "Shravan.Kumar".toUpperCase().split("");
let div1 = document.createElement("div");
let h2 = document.createElement("h2");
let h4 = document.createElement("h4");

info.appendChild(div1);
div1.appendChild(h2);
div1.appendChild(h4);
let idx = 0;
let i = setInterval(() => {
  if (sName[idx] == ".") {
    h2.innerHTML += "&nbsp;";
    idx++;
  } else h2.innerHTML += sName[idx++];
  let blurVal = 20 - idx * 3;
  if (blurVal < 0) {
    document.getElementById("solarSystem").style.filter = `none`;
  } else
    document.getElementById("solarSystem").style.filter = `blur(${
      20 - idx * 2
    }px)`;
  if (idx == sName.length) {
    clearInterval(i);
    h2.innerHTML = sName
      .map((letter, idx) => {
        if (letter === ".") {
          letter = "&nbsp;";
        }
        return `<span style="transition-delay:${idx * 50}ms">${letter}</span>`;
      })
      .join("");
  }
}, 200);

h4.innerText = "A Frontend Developer from India 🇮🇳";
setTimeout(() => {
  document.body.appendChild(info);
}, 1000);
