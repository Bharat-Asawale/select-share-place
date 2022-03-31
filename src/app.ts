//api key is imported from secret.js file
import { config } from "./secret.js";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
declare var ol: any;
const APIKEY = config.APIKEY;

let coordinates = { lat: 18.516726, lng: 73.856255 }; //default coordinates of pune

//function fetching weather data response
async function myFunction(){
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${addressInput.value}&appid=${APIKEY}&units=metric`,
    { mode: "cors" }
  );
  const Response = await  res.json();
  console.log(Response);
  updateMap(Response);
}

//updating coordinates
function updateMap(res: any) {
  let lon = res.coord.lon + "00";
  let lat = res.coord.lat + "00";
  let newCoordinates = { lat: +lat, lng: +lon };
  showMap(newCoordinates);
}

//function for display map
function showMap(coordinates:any) {
  document.getElementById("map")!.innerHTML = "";
  new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
      zoom: 16,
    }),
  });
}

//handler function
function searchAddressHandler(event: Event) {
  myFunction();
  event.preventDefault();
  showMap(coordinates);
}

//event listener
form.addEventListener("submit", searchAddressHandler);