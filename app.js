let timer;
let deleteFirstPhotoDelay;

//this function fetches the breed list
async function start() {
   try {
     const response = await fetch('https://dog.ceo/api/breeds/list/all'); //response is from the dog server 
     //fetch returns its promise as soon as hear back from the server
     //await makes it so JS will not run code below this until fetch promise is returned
     const data = await response.json();
     createBreedList(data.message);
   } catch {
     console.log("Oh no! There was a problem fetching the breed list.");
   }
}

//calling the start function to initiate
start();

//this function creates the select element 
function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Select a dog breed</option>
        ${Object.keys(breedList).map(function (breed) { //map returns a new array
            return `<option>${breed}</option>`
        }).join('')} 
    </select>
    `//join('') converts an array into one single string of text w/o any space
}


//this function loads the images for a breed (loads the data) 
async function loadByBreed(breed) {
    if (breed != "Select a dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json(); 
        createSlideshow(data.message);
    }
}

//this function creates the html for the empty slideshow div
function createSlideshow(images) {
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);
    
    if (images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPosition += 2;
    if (images.length == 2) {
        currentPosition = 0;
    }
    timer = setInterval(nextSlide, 3000)
    } else {
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `
    }

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `
        <div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
        deleteFirstPhotoDelay = setTimeout(function() {
            document.querySelector(".slide").remove;
        }, 1000);
        if (currentPosition + 1 >= images.length) {
            currentPosition = 0;
        } else {
            currentPosition++;
        }
    }
}



