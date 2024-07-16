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

const getPuppyData = async (puppyName) => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-ftb-et-web-ft/players`); 
  const responseJson = await response.json();
  const puppyAPIData = responseJson.data.players;
  state.puppyData = puppyAPIData;
  renderPuppyData(); // 
};

const renderPuppyData = () => {
  const main = document.querySelector(`main`);
  main.innerHTML = ''; //
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
    <h1>${puppy.name}</h1>
    <h3>Breed: ${puppy.breed}</h3>
    <h3>Status: ${puppy.status}</h3>
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

