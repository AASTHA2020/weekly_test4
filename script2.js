const input = document.querySelector("input"); 
const search_btn = document.querySelector(".search"); 
const show_all_cards = document.querySelector(".show_all_cards"); 
const phone_container = document.querySelector(".phones"); 

search_btn.addEventListener("click", () => { // Adding click event listener to search button
    logPhones(); // Calling logPhones function when search button is clicked
});


/*----------------all phones display on the screen-------------*/

default_mobiles(); // Calling default_mobiles function

async function default_mobiles() { // Asynchronous function to fetch and display default mobiles
    const response = await fetch("https://openapi.programming-hero.com/api/phones?search=Oppo"); // Fetching default mobiles data
    const phones = await response.json(); // Parsing response to JSON
    console.log(phones); // Logging fetched data
    phones.data.forEach((element, index) => { // Iterating through fetched data
        const card = document.createElement("div"); // Creating card element
        card.setAttribute("class", "card"); // Setting class attribute for card
        card.innerHTML = `<img src="${element.image}" alt="">
    <h2>${element.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <button class="show_detail_btn" onClick=showDetails("${element.slug}")>show details</button>`; // Adding HTML content to card

        if (index >= 9) { // Checking if index is greater than or equal to 9
            show_all_cards.appendChild(card); // Appending card to show all cards container
        } else {
            phone_container.appendChild(card); // Appending card to phone container
        }
    });
}

/* ---------------------------------------*/



async function showDetails(slug) { // Asynchronous function to fetch and display details of a phone
    const details = await fetch("https://openapi.programming-hero.com/api/phone/" + slug); // Fetching phone details
    const detailsInfo = await details.json(); // Parsing response to JSON
    console.log(detailsInfo); // Logging phone details
}



/*---------This is for search button-------------*/
const show_container = document.createElement("div"); // Creating container to store search results

async function logPhones() { // Asynchronous function to fetch and display phones based on search input
    const response = await fetch("https://openapi.programming-hero.com/api/phones?search=" + input.value); // Fetching phones based on search input
    const phones = await response.json(); // Parsing response to JSON

/*------------------------------------------*/



/*--------new container to store search results---------*/
    const new_container = document.createElement("div");  
    phones.data.forEach((element, index) => { // Iterating through fetched data
        const card = document.createElement("div"); // Creating card element
        card.setAttribute("class", "card"); // Setting class attribute for card
        card.innerHTML = `<img src="${element.image}" alt="">
    <h2>${element.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <button class="show_detail_btn" onClick=showDetails("${element.slug}")>show details</button>`; // Adding HTML content to card

        if (index >= 9) { // Checking if index is greater than or equal to 9
            show_all_cards.appendChild(card); // Appending card to show all cards container
        } else {
            show_container.appendChild(card); // Appending card to search results container
        }
    });

    new_container.innerHTML = show_container.innerHTML; // Copying search results to new container
    phone_container.innerHTML = new_container.innerHTML; // Updating phone container with search results
}


/*---------------show details----------------*/

async function showDetails(slug) {
    // Fetch details from API based on slug
    const details = await fetch("https://openapi.programming-hero.com/api/phone/" + slug);
    // Convert response to JSON
    const detailsInfo = await details.json();
    // Add fetched details to container
    addDetailsToContainer(detailsInfo.data);
}

function addDetailsToContainer(data) {
    // Log the fetched data
    console.log(data);
    // Get reference to dialog element
    const dialog = document.querySelector("dialog");
    // Get reference to dialog container element
    const dialog_container = document.querySelector(".dialog_container");
    // Populate dialog with fetched data
    dialog.innerHTML = `<img src="${data.image}" alt="">
   <h2>${data.name}</h2>
   <p>Brand :${data.brand}<p>
   
   <p class="phone_name">Storage :${data.mainFeatures.storage} </p>
   <p>Display : ${data.mainFeatures.displaySize}</p>
   <p>Chipset : ${data.mainFeatures.chipSet}</p>
   <span>Memory : ${data.mainFeatures.memory}</span>
   <span>Release date</span>
   <br>
   <button id="close">Close</button>`;
   
    // Make dialog container visible
    dialog_container.style.display = "block";
    // Get reference to close button
    const close_btn = document.querySelector("#close");
    // Add event listener to close button
    close_btn.addEventListener("click", () => {
        // Log when dialog is closed
        console.log("closed");
        // Hide dialog container
        dialog_container.style.display = "none";
    });
}





const show_All_btn = document.querySelector("#show_btn"); // Selecting show all button
show_All_btn.addEventListener("click", () => { // Adding click event listener to show all button
    if (show_All_btn.innerText == "SHOW ALL") { // Checking text of show all button
        show_All_btn.innerText = "SHOW LESS"; // Changing text of show all button
        show_all_cards.style.display = "flex"; // Displaying all cards
    } else {
        show_All_btn.innerText = "SHOW ALL"; // Changing text of show all button
        show_all_cards.style.display = "none"; // Hiding all cards
    }
});
