var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=yVEm6tKvK0LWnRjfmFqJA10TGDrlfjTH0S4GblVyssM";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
    var x = new XMLHttpRequest();
    x.open("GET", corsApiUrl + options.url);
    x.send(options.data);
    return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
    new Promise((resolve, reject) => {
        const request = doCORSRequest({
            url: "https://trefle.io/api/v1/plants" + apiToken,
        });
        resolve(request);
    });

const turnToHTML = (plant) => {
    let plantImage = document.createElement("img");
    plantImage.src = plant.image_url;
    document.getElementById("plantList").appendChild(plantImage);
}

const handleResponse = (response) => {

    const data = JSON.parse(response);
    console.log("plants");
    const plants = data.data.filter((data) => { return data.year == 1753; });

    for (plant of plants) {
        turnToHTML(plant)
    }
}

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
    (request) =>
    (request.onload = request.onerror = function() {
        // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
        handleResponse(request.response)
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////