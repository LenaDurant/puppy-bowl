const state = {
  puppyData: []
};

const baseUrl = `https://fsa-puppy-bowl.herokuapp.com/api/2406-ftb-et-web-ft/players`;

const form = document.querySelector(`form`);

form.addEventListener(`submit`, async (event) => {
  event.preventDefault(); 
  const input = document.querySelector(`input`);
  const puppyName = input.value;
  await getPuppyData(puppyName);
});

window.onload = async () => {
  state.puppyData = await getAllPuppies();
  renderPuppyData(state.puppyData);
}

async function submitPlayer() {
  let puppy = {
    name: document.getElementById("playerName").value,
    breed: document.getElementById("breed").value, 
    status: document.getElementById("status").value,
    imageUrl: document.getElementById("imageUrl").value,
  };
  let result = await addPuppy(puppy); 
  state.puppyData = await getAllPuppies();
  renderPuppyDetail(result);
}

// --- API Functions

const getPuppyData = async (puppyId) => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-ftb-et-web-ft/players/${puppyId}`); 
  const responseJson = await response.json();
  return responseJson.data.player;
};

const getAllPuppies = async () => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-ftb-et-web-ft/players`); 
  const responseJson = await response.json();
  return responseJson.data.players;
};

const addPuppy = async (puppy) => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-ftb-et-web-ft/players`,
    {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(puppy)
    }
  ); 
  const responseJson = await response.json();
  return responseJson.data.newPlayer;
};

// -----

const renderPuppyData = () => {
  const main = document.querySelector(`main`);
  main.innerHTML = '<h2>Puppy Roster</h2>'; //
  const ol = document.createElement(`ol`);
  
  state.puppyData.forEach((puppy) => {
    const newLI = document.createElement(`li`);
    newLI.innerText = puppy.name;
    newLI.addEventListener(`click`, () => {
      renderPuppyDetail(puppy);
    });

    ol.append(newLI);
  });

  main.append(ol);
};

const renderPuppyDetail = (puppy) => {
  const main = document.querySelector(`main`);
  main.innerHTML = `
    <h2>${puppy.name}</h2>
    <h3>Breed: ${puppy.breed}</h3>
    <h3>Status: ${puppy.status.charAt(0).toUpperCase() + puppy.status.slice(1)}</h3>
    <h3>Doggy id: ${puppy.id}</h3>
    <h3>Created at: ${puppy.createdAt}</h3>
    <h3>Updated at: ${puppy.updatedAt}</h3>
    <h3>Team id: ${puppy.teamId}</h3>
    <h3>Cohort id: ${puppy.cohortId}</h3>
    <img src="${puppy.imageUrl}" />
    <button id="backButton">Return to Homepage</button>
  `;

  document.getElementById('backButton').addEventListener('click', renderPuppyData);
};


