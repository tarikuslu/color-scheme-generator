const colorInputEl = document.getElementById("color-input");
const schemeInputEl = document.getElementById("schemes");
const colorContainerEl = document.getElementById("colors-container");
const colorHexEl = document.getElementById("colors-hex");
const colorFormEl = document.getElementById("color-form");

let schemeArray = [];

colorFormEl.addEventListener("submit", handleFormSubmit);

document.addEventListener("click", handleCopyToClipboard);

colorContainerEl.addEventListener("mouseenter", function () {
  toggleHiddenClass();
});

colorContainerEl.addEventListener("mouseleave", function () {
  toggleHiddenClass();
});

colorHexEl.addEventListener("mouseenter", function (e) {
  console.log(e.target.classList);
  toggleHiddenClass();
});

colorHexEl.addEventListener("mouseleave", function (e) {
  toggleHiddenClass();
});

function toggleHiddenClass() {
  document.querySelector(".tooltip").textContent = "copy to clipboard!";
  document.querySelector(".tooltip").classList.toggle("hidden");
}
function firstRender() {
  colorContainerEl.innerHTML = `
    <div class="color col1"></div>
    <div class="color col2"></div>
    <div class="color col3"></div>
    <div class="color col4"></div>
    <div class="color col5"></div>  
    `;

  colorHexEl.innerHTML = `
    <div class="hex">#26C0F3</div>
    <div class="hex">#EA526F</div>
    <div class="hex">#070600</div>
    <div class="hex">#F7F7FF</div>
    <div class="hex">#4357AD</div>  
    `;
}

function renderInputs() {
  colorContainerEl.innerHTML = `
    <div class="color col1" style="background-color:${schemeArray[4]} "></div>
    <div class="color col2" style="background-color:${schemeArray[3]} "></div>
    <div class="color col3" style="background-color:${schemeArray[2]} "></div>
    <div class="color col4" style="background-color:${schemeArray[1]} "></div>
    <div class="color col5" style="background-color:${schemeArray[0]} "></div>  
    `;

  colorHexEl.innerHTML = `
    <div class="hex">${schemeArray[4]}</div>
    <div class="hex">${schemeArray[3]}</div>
    <div class="hex">${schemeArray[2]}</div>
    <div class="hex">${schemeArray[1]}</div>
    <div class="hex">${schemeArray[0]}</div>  
    `;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const formattedColorInput = colorInputEl.value.slice(1, colorInputEl.length);
  fetch(
    `https://www.thecolorapi.com/scheme/?hex=${formattedColorInput}&mode=${schemeInputEl.value}&count=5`
  )
    .then((response) => response.json())
    .then((data) => {
      schemeArray = [
        data.colors[0].hex.value,
        data.colors[1].hex.value,
        data.colors[2].hex.value,
        data.colors[3].hex.value,
        data.colors[4].hex.value,
      ];
      console.log(data.colors);
      renderInputs();
    })
    .catch((error) => console.log(error));
}

function handleCopyToClipboard(e) {
  if (e.target.textContent.length == 7) {
    navigator.clipboard.writeText(e.target.textContent).then(
      function () {
        document.querySelector(".tooltip").textContent = "copied!";
      },
      function (err) {}
    );
  } else if (e.target.classList.contains("color")) {
    navigator.clipboard
      .writeText(
        window.getComputedStyle(e.target).getPropertyValue("background-color")
      )
      .then(
        function () {
          document.querySelector(".tooltip").textContent = "copied!";
        },
        function (err) {}
      );
  }
}

firstRender();
