const API =
"https://script.google.com/macros/s/AKfycbw5I0crqb3J_tcJp74-A2IIHHT5suyPlNQDr74nKC6FcEZJDTYoPu-ep54p9ksthzsE/exec";

const deviceId = "dev-" + Math.floor(Math.random()*1000);

document.getElementById("device").innerText = deviceId;

let map = L.map('map').setView([-7.2575,112.7521],13);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

let marker;
let path = [];
let polyline = L.polyline([], {color:'lime'}).addTo(map);


function startTracking(){

navigator.geolocation.watchPosition(

async position => {

const lat = position.coords.latitude;
const lng = position.coords.longitude;
const acc = position.coords.accuracy;

document.getElementById("lat").innerText = lat;
document.getElementById("lng").innerText = lng;
document.getElementById("acc").innerText = acc;

if(!marker){

marker = L.marker([lat,lng]).addTo(map);

}else{

marker.setLatLng([lat,lng]);

}

map.setView([lat,lng],16);

path.push([lat,lng]);

polyline.setLatLngs(path);

await sendGPS(lat,lng,acc);

},

error => {

alert("GPS Error");

},

{
enableHighAccuracy:true
}

);

}



async function sendGPS(lat,lng,acc){

await fetch(
API+"?path=gps/log",
{
method:"POST",
body:JSON.stringify({

device_id:deviceId,
lat:lat,
lng:lng,
accuracy_m:acc

})
}
);

}