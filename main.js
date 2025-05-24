// SVG ICONS FOR HTML INJECTION //
const hardwareIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>`;
const softwareIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z"/></svg>`;
const highIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/></svg>`;
const mediumIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"/></svg>`;
const lowIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z"/></svg>`;
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
const removeIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
// SVG ICONS FOR HTML INJECTION //

let resourcesArray = [
  {
    text: "Example",
    type: "software",
    priority: "low",
    checked: false,
  },
];

const resourcesContainer = document.getElementById("resourcesContainer");

const formName = document.getElementById("fname");
const hardwareRadio = document.getElementById("hardware");
const softwareRadio = document.getElementById("software");
const highRadio = document.getElementById("highPrio");
const mediumRadio = document.getElementById("mediumPrio");
const lowRadio = document.getElementById("lowPrio");

const phoneButton = document.getElementById("phoneBtn");
const formBox = document.getElementById("formBox");
const sidebar = document.getElementById("sidebar");

const updateResources = () => {
  resourcesContainer.innerHTML = ``;

  resourcesArray.forEach((element) => {
    let typeIcon = "";
    let prioIcon = "";
    let cssClass = "resource";

    switch (element.type) {
      case "hardware":
        typeIcon = hardwareIcon;
        break;
      case "software":
        typeIcon = softwareIcon;
        break;

      default:
        break;
    }

    switch (element.priority) {
      case "high":
        prioIcon = highIcon;
        break;
      case "medium":
        prioIcon = mediumIcon;
        break;
      case "low":
        prioIcon = lowIcon;
        break;

      default:
        break;
    }

    if (element.checked) cssClass = "checkedResource";

    resourcesContainer.innerHTML += `<li class=${cssClass}>
          <div class="resInfo">
            <span>${element.text}</span
            >${typeIcon}${prioIcon}
          </div>
          <div class="resActions">
            <button type="button" class="checkButton">
              ${checkIcon}
            </button>
            <button type="button" class="removeButton">
              ${removeIcon}
            </button>
          </div>
        </li>`;
  });

  const removeBtnList = [...document.getElementsByClassName("removeButton")];
  const checkBtnList = [...document.getElementsByClassName("checkButton")];

  removeBtnList.forEach((btn, i) => {
    btn.addEventListener("click", () => removeResource(i));
  });

  checkBtnList.forEach((btn, i) => {
    btn.addEventListener("click", () => checkResource(i));
  });

  saveResources();
};

//Called from form onsubmit(event)
const addResource = (e) => {
  e.preventDefault();

  let auxType;
  let auxPrio;

  if (hardwareRadio.checked) auxType = "hardware";

  if (softwareRadio.checked) auxType = "software";

  if (highRadio.checked) auxPrio = "high";

  if (mediumRadio.checked) auxPrio = "medium";

  if (lowRadio.checked) auxPrio = "low";

  resourcesArray.push({
    text: formName.value,
    type: auxType,
    priority: auxPrio,
    checked: false,
  });

  updateResources();
};

const removeResource = (i) => {
  resourcesArray.splice(i, 1);
  updateResources();
};

const checkResource = (i) => {
  resourcesArray[i].checked = true;
  updateResources();
};

const saveResources = () => {
  localStorage.setItem("ResourcesArray", JSON.stringify(resourcesArray));
};

const loadResources = () => {
  if (localStorage.getItem("ResourcesArray") != null) {
    resourcesArray = JSON.parse(localStorage.getItem("ResourcesArray"));
  }

  updateResources();
};

//MAIN, stuff to run on website loading
loadResources();

phoneButton.addEventListener("click", () => {
  if (sidebar.style.display == "none") {
    sidebar.style.display = "inline";
    formBox.style.display = "none";
  } else {
    sidebar.style.display = "none";
    formBox.style.display = "inline";
  }
});
