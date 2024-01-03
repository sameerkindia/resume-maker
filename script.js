const inputName = document.getElementById("name");
const profilePicture = document.getElementById("profilePicture");
const city = document.getElementById("city");
const country = document.getElementById("country");
const phone = document.getElementById("phone");
const resume = document.getElementById("resume");
const linkedin = document.getElementById("linkedin");

const skillsSearch = document.getElementById("skillsSearch");
const skills = document.getElementById("skillsList");
const skillsDiv = document.querySelectorAll("#skillsList div");

const resumeForm = document.querySelector("#resumeForm");

const addBtn = document.getElementById("add");
const clearBtn = document.getElementById("clear");
const clearAllData = document.getElementById("clearAllData");

const resumeTable = document.querySelector("#resumeTable");
const resumeTableData = document.querySelector("#resumeTable tbody");

let resumeData = JSON.parse(localStorage.getItem("resumeData")) || [];

if (resumeData) {
  renderTable(resumeData);
}

function setLocalStorage(data) {
  localStorage.setItem("resumeData", JSON.stringify(data));
}

function renderTable(dataArr) {
  resumeTableData.textContent = "";

  dataArr.forEach((data) => {
    const tableRow = document.createElement("tr");

    tableRow.id = data.id;

    const image = document.createElement("img");
    image.src = data.profilePicture;
    tableRow.appendChild(image);

    const name = document.createElement("td");
    name.textContent = data.name;
    tableRow.appendChild(name);

    const country = document.createElement("td");
    country.textContent = data.country;
    tableRow.appendChild(country);

    const city = document.createElement("td");
    city.textContent = data.city;
    tableRow.appendChild(city);

    const phone = document.createElement("td");
    phone.textContent = data.phone;
    tableRow.appendChild(phone);

    const linkedin = document.createElement("td");
    linkedin.textContent = data.linkedin;
    tableRow.appendChild(linkedin);

    const skills = document.createElement("td");
    skills.textContent = data.skills;
    tableRow.appendChild(skills);

    const deleteBtn = document.createElement("td");
    deleteBtn.innerHTML = '<button class="deleteBtn" >Delete</button>';
    deleteBtn.id = data.id;
    tableRow.appendChild(deleteBtn);

    resumeTableData.appendChild(tableRow);
  });
  document.querySelectorAll(".deleteBtn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      deleteBtnFunc(e.target.parentElement.id);
    })
  );
}

function clearBtnFunc() {
  inputName.value = "";
  city.value = "";
  country.value = "";
  phone.value = "";
  fileName = "";
  resume.value = "";
  linkedin.value = "";
}

function clearAllDataFunc() {
  resumeData = [];
  renderTable(resumeData);
  setLocalStorage(resumeData);
}

function deleteBtnFunc(id) {
  const index = resumeData.findIndex((data) => {
    return data.id == id;
  });

  resumeData.splice(index, 1);
  renderTable(resumeData);
  setLocalStorage(resumeData);
}

skillsSearch.addEventListener("focus", (e) => {
  skills.style.display = "block";
});

resumeForm.addEventListener("click", (e) => {
  if (e.target.id !== skillsSearch.id) skills.style.display = "none";
});

let skillsValues = [];

skillsDiv.forEach((div) => {
  div.addEventListener("click", (e) => {
    if (!skillsValues.includes(e.target.textContent)) {
      div.style.backgroundColor = "rgb(224, 224, 224)";
      skillsValues.push(e.target.textContent);
    } else {
      div.style.backgroundColor = "";
      const index = skillsValues.indexOf(e.target.textContent);

      skillsValues.splice(index, 1);
    }

    skillsSearch.value = skillsValues.join(",");
  });
});

let fileName;

profilePicture.addEventListener("change", (e) => {
  fileName = e.target.files[0].name;
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const resumeObj = {};

  resumeObj.id = Date.now();
  resumeObj.name = inputName.value;
  resumeObj.city = city.value;
  resumeObj.country = country.value;
  resumeObj.phone = phone.value;
  resumeObj.profilePicture = fileName;
  resumeObj.resume = resume.value;
  resumeObj.linkedin = linkedin.value;
  resumeObj.skills = skillsValues.join(",");

  resumeData.push(resumeObj);
  renderTable(resumeData);
  setLocalStorage(resumeData);
});

clearBtn.addEventListener("click", clearBtnFunc);

clearAllData.addEventListener("click", clearAllDataFunc);
