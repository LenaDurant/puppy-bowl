// grab the form
const form = document.querySelector(`form`);

//when the form is submitted we need an event listener
form.addEventListener (`submit`,  async (event) => {
    event.preventDefault();

    //grab the input
 const input = document.querySelector(`input`);

 //get the value from the input
 const puppyName = input.value;

 //call the api with value "https://fsa-puppy-bowl.herokuapp.com/api/2406-ftb-et-web-ft/players"
 const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-ftb-et-web-ft/players`);
 const puppyData = await response.json();
 console.log(puppyData);

 //create a new list item
 const puppyLI = document.createElement(`li`);

 //put party info in the list item
puppyLI.innterhtml = `
 <h4>${puppyData.name}</h4

`
//grab the ul
const ol = document.querySelector(`ol`);
console.log(ol);

})










//attach the list to the ol