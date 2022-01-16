const info = document.createElement('div');
info.classList.add('info');
let sName = 'Shravan.Kumar'.toUpperCase().split('');
let about = 'I am a Frontend Developer';
// let div1 = document.createElement('div');
let h2 = document.createElement('h2');
let h4 = document.createElement('h4');
const delays = {
  h2: 50,
  h4: 20,
};

info.appendChild(h2);
info.appendChild(h4);

let idx = 0;
let blurStep = 20 / (sName.length - 1);
let i = setInterval(() => {
  if (sName[idx] == '.') {
    h2.innerHTML += '&nbsp;';
    idx++;
  } else h2.innerHTML += sName[idx++];

  let blurVal = 20 - blurStep * idx;
  if (blurVal < 0) {
    document.getElementById('solarSystem').style.filter = `none`;
  } else
    document.getElementById('solarSystem').style.filter = `blur(${blurVal}px)`;
  if (idx == sName.length) {
    clearInterval(i);
    h2.innerHTML = sName
      .map((letter, idx) => {
        if (letter === '.') {
          letter = '&nbsp;';
        }
        return `<span style="transition-delay:${
          idx * delays.h2
        }ms;animation-delay:${idx * 100}ms">${letter}</span>`;
      })
      .join('');
  }
}, 200);

h4.innerHTML = about
  .split('')
  .map((letter, idx) => {
    if (letter === ' ') {
      letter = '&nbsp;';
    }
    return `<span style="transition-delay:${
      idx * delays.h4
    }ms;animation-delay:${idx * 20}ms">${letter}</span>`;
  })
  .join('');

let getDetails = () => {
  let button = document.createElement('button');
  button.innerText = 'More Details/';
  button.classList.add('detailsBtn');
  info.appendChild(button);
  button.addEventListener('click', () => {
    if (!button.classList.contains('hide')) {
      let aud = document.querySelector('audio');
      aud.currentTime = 0.6;
      aud.play();

      button.innerText = '../';
      info.appendChild(getTypes());
      info.appendChild(getSkills());
      info.appendChild(getContactMe());
    } else {
      button.innerText = 'More Details/';
      document.getElementById('contacts').remove();
      document.getElementById('skills').remove();
      document.getElementById('types').remove();
    }
    button.classList.toggle('hide');
  });
};
let getTypes = () => {
  let types = document.createElement('div');

  types.innerHTML = `Do you seek a cool portfolio? 
    ^Responsive E-Commerce Site? 
    ^Gallery to feature your artwork? 
    ^Perfect Landing Page to get you deals? 
    ^You are in the right place!
    ^I will build your sites with Creative Animations, 3D rendered Websites(Threejs) that convert.`
    .split('')
    .map((letter, idx) => {
      if (letter === ' ') {
        letter = '&nbsp;';
      }
      if (letter === '^') {
        return '<br>';
      }
      return `<span style="animation-delay:${idx * 3}ms">${letter}</span>`;
    })
    .join('');
  types.id = 'types';
  types.classList.add('types');
  return types;
};
let getSkills = () => {
  let skills = document.createElement('div');
  let skillSet = [
    '',
    'Javascript ES6',
    'Angular 6/7',
    'Three.js',
    'CSS3 & HTML',
    'Core Java & Spring boot',
  ];
  skills.innerHTML = `Major skills&nbsp;&nbsp;:&nbsp;&nbsp;[ ${skillSet.reduce(
    (a, b) => a + "<span class='skill'>" + b + '</span>'
  )} ] `;
  skills.id = 'skills';
  skills.classList.add('skills');
  return skills;
};

let getContactMe = () => {
  let contacts = document.createElement('div');
  contacts.innerHTML = ` Lets connect on 
    <span class="contact"><a target="_blank" href="https://twitter.com/shravankumarui"><i class="fab fa-twitter"></i></a></span>
    <span class="contact"><a target="_blank"  href="https://www.linkedin.com/in/shravan-kumar-udupa/"><i class="fab fa-linkedin-in"></i></a></span>
    <span class="contact"><a target="_blank" href="mailto:shravankumar.fs.dev@gmail.com"><i class="fas fa-envelope"></i></a></span>
  `;
  contacts.id = 'contacts';
  contacts.classList.add('contacts');
  return contacts;
};

setTimeout(() => {
  document.body.appendChild(info);
  getDetails();
}, 1000);

// document.body.addEventListener("mousemove", (e) => {
//   document.body
//     .querySelectorAll(".customCursor")
//     .forEach((item) => item.remove());
//   let cursor = document.createElement("div");
//   cursor.style.top = e.pageY + "px";
//   cursor.style.left = e.pageX + "px";
//   console.log(e.pageX, e.pageY);
//   cursor.classList.add("customCursor");
//   document.body.appendChild(cursor);
//   cursor.style.animation = "cursorfade 1s ease-out infinite";
// });
