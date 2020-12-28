const api_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

const tilesURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Setting Icon for the map
var ISSicon = L.icon({
	iconUrl: './icons/iss200.png',
	iconSize: [50, 32],
	iconAnchor: [25, 16]
});

// Setting Map canves
const mymap = L.map('ISSmap').setView([0, 0], 3);

// Adding tiles to map
L.tileLayer(tilesURL, { attribution }).addTo(mymap);

// Setting ISS marker
var marker = L.marker([0, 0], { icon: ISSicon }).addTo(mymap);

// Function to set data in HTML
function setData(json) {
	let lat = json.latitude || 0;
	let long = json.longitude || 0;
	let alt = json.altitude || 0;
	let vel = json.velocity || 0;

	mymap.setView([lat, long], mymap.getZoom());
	marker.setLatLng([lat, long]);

	document.getElementById('lat').textContent = Math.abs(Number.parseFloat(lat).toFixed(2)) + '° South';
	document.getElementById('long').textContent = Math.abs(Number.parseFloat(long).toFixed(2)) + '° West';
	document.getElementById('alt').textContent = Number.parseFloat(alt).toFixed(2) + ' km';
	document.getElementById('vel').textContent = Number.parseFloat(vel).toFixed(2) + ' km/h';
}

// Function to get the data from api.
function getISS() {
	fetch(api_URL)
		.then(responce => responce.json())
		.then(json => setData(json))
		.catch(err => {
			alert("Sorry! Something Went Wrong");
			console.log(err);
		});

}
getISS();

setInterval(getISS, 1000);
