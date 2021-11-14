const info = document.createElement("div");
info.classList.add("info");
let sName = "Shravan.Kumar".toUpperCase().split("");
let about = "A Frontend Developer from India &";
let aboutAppend = "🇮🇳";
let div1 = document.createElement("div");
let h2 = document.createElement("h2");
let h4 = document.createElement("h4");
const delays = {
  h2: 30,
  h4: 20,
};
info.appendChild(div1);
div1.appendChild(h2);
div1.appendChild(h4);
let idx = 0;
let i = setInterval(() => {
  if (sName[idx] == ".") {
    h2.innerHTML += "&nbsp;";
    idx++;
  } else h2.innerHTML += sName[idx++];

  let blurVal = 20 - idx * 2;
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
        }ms">${letter}</span>`;
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
      }ms">${aboutAppend}</span>`;
    }
    return `<span style="transition-delay:${
      idx * delays.h4
    }ms">${letter}</span>`;
  })
  .join("");

setTimeout(() => {
  document.body.appendChild(info);
}, 1000);
