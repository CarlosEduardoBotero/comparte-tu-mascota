const addPet = document.querySelector(".add-pet");
const modalbg = document.querySelector(".modal-bg");
const closeBtn = document.querySelector(".close-btn");
const submitPet = document.getElementById("submit-pet");
const notification = document.querySelector(".notification");

addPet.addEventListener("click", function () {
  modalbg.classList.add("bg-active");
});

closeBtn.addEventListener("click", () => {
  modalbg.classList.remove("bg-active");
});

submitPet.addEventListener("click", () => {
  modalbg.classList.remove("bg-active");
});

function popUpPetUploaded() {
  notification.classList.add("notification-active");
  setTimeout(() => {
    notification.classList.remove("notification-active");
  }, 2000);
}

const API_KEY = "https://60cbc47b21337e0017e455ba.mockapi.io/";

async function getPets() {
  const url = API_KEY + "animals";
  const answer = await fetch(url);
  const data = await answer.json();
  return data;
}

function insertPetDiv(element) {
  const fatherPetDiv = document.getElementById("pets");
  const childDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const ageDiv = document.createElement("div");
  const breedDiv = document.createElement("div");
  const photoDiv = document.createElement("div");
  const photoAnchor = document.createElement("a");
  const image = document.createElement("img");

  nameDiv.innerText = "Nombre: " + element.name;
  ageDiv.innerText = "Edad (años): " + element.age;
  breedDiv.innerText = "Raza: " + element.breed;
  photoDiv.setAttribute("id", "div-pet-image");
  photoAnchor.setAttribute("href", element.photo);
  image.setAttribute("src", element.photo);

  childDiv.appendChild(nameDiv);
  childDiv.appendChild(ageDiv);
  childDiv.appendChild(breedDiv);
  childDiv.appendChild(photoDiv);
  photoDiv.appendChild(photoAnchor);
  photoAnchor.appendChild(image);

  fatherPetDiv.appendChild(childDiv);
}

function displayPets() {
  const pets = getPets();
  pets.then((data) => {
    data.map((animal) => {
      insertPetDiv(animal);
      console.log(animal);
    });
  });
}

displayPets();

function getFormValues() {
  const body = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    breed: document.getElementById("breed").value,
    photo: document.getElementById("image").value,
  };
  return body;
}

async function createPet(data) {
  const URL = API_KEY + "animals";
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const answer = await fetch(URL, request);

    if (answer.status == 201) {
      popUpPetUploaded();
      insertPetDiv(data);
      return "Pet sucessfully created.";
    } else {
      return "Something went wrong";
    }
  } catch (error) {
    return "An error occurr";
  }
}

submitPet.addEventListener("click", function () {
  const body = getFormValues();
  const apiResponse = createPet(body);
  apiResponse.then((result) => {
    console.log(result);
  });
});
