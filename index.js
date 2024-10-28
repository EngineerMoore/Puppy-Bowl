// Fetch data
const fetchPlayers = async () => {
  let response =  await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players`);
  response = await response.json();
  // console.log(response);
  const players = response.data.players;
  // console.log(players)
  return players;
}



// Render players to page
  // loop though players and add them to the table
    // seperate players based on status
    // grab the table
    // create a row and add player data

const leadCompetitors = async () => {
  const playerRoster = await fetchPlayers();
  const filterLeadCompetitors = playerRoster.filter((player) => {
    return player.status === "field"
  });
  return filterLeadCompetitors;
}

const renderLeadCompetitors = async () => {
  const leadCompetitorRoster = await leadCompetitors();
  // console.log(leadCompetitorRoster);
  leadCompetitorRoster.forEach((player) => {
    const tr = document.createElement(`tr`);
    const leadCompetitorTable = document.querySelector(`#lead-competitors`);
    leadCompetitorTable.append(tr);
      tr.innerHTML = `
          <td>${player.id}
          <td class="name">${player.name}</td>
          <td>${player.breed}</td>
       `;
  })
};
// renderLeadCompetitors()

const eliteReinforcement = async () => {
  const playerRoster = await fetchPlayers();
  const filterEliteReinforcement = playerRoster.filter((player) => {
    return player.status === "bench"
  });
  return filterEliteReinforcement;
}
// eliteReinforcement()

const renderEliteReinforcement = async () => {
  const eliteReinforcementRoster = await eliteReinforcement();
  eliteReinforcementRoster.forEach((player) => {
    const eliteReinforcementTable = document.querySelector(`#elite-reinforcement`);
    const tr = document.createElement(`tr`);
    eliteReinforcementTable.append(tr);
    tr.innerHTML =`
      <td>${player.id}</td>
      <td class="name">${player.name}</td>
      <td class="breed">${player.breed}</td>
      `;
  })
}


// On click of each player, populate only their info on a seperate page
  // add event listener to each td...loop

const selectSinglePlayer = async () => {
  await renderLeadCompetitors ();
  await renderEliteReinforcement();
  const nameTdNodeList = document.querySelectorAll(`.name`);
  nameTdNodeList.forEach((name) => {
    console.log(name.innerHTML);
    name.addEventListener(`click`, async (event) => {
      const singleName = event.target.innerHTML; //event.target.innerHTML = name.innerHTML

      const  response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2409-ftb-et-web-ft/players/`);
      const fetchAllPlayerData = await response.json();
      const allPlayers = fetchAllPlayerData.data.players;
      const sinlglePlayerData= allPlayers.find((player)=> player.name === singleName);

      console.log(sinlglePlayerData);
      const main = document.querySelector(`main`);
      main.innerHTML = `
      <img src="${sinlglePlayerData.imageUrl}" alt="${singleName}, a Puppy Bowl Player"/>
      <h2>${singleName}</h2>
      <section>
        <section>  
          <h3>ID Number</h3>
          <p>${sinlglePlayerData.id}</p>
        </section>
        <section>
          <h3>Breed</h3>
          <p>${sinlglePlayerData.breed}
        </section>
        <section>
          <h3>Status</h3>
          <p>${sinlglePlayerData.status}</p>
        </section>
        <section>
          <h3>About ${singleName}</h3>
          <p>
          Lorem ipsum odor amet, consectetuer adipiscing elit. 
          Felis aenean nibh placerat tincidunt hendrerit tristique aenean aptent maecenas. 
          Aptent sociosqu montes fermentum porttitor inceptos. Sodales bibendum 
          imperdiet quisque mattis suspendisse ut neque lobortis.
          </p>
      </section>
        `;

  })
})}
selectSinglePlayer()

// Create a search bar
  // when user types players name, their name will pop up
  // display list of players
  // render the player to the page
const searchBar = () => {

}