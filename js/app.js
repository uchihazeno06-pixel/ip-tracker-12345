// js/app.js

// 1. Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// 2. Add the map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 3. Custom Marker Icon
const customIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize: [46, 56],
  iconAnchor: [23, 50]
});

// 4. Create the marker
let marker = L.marker([51.505, -0.09], { icon: customIcon }).addTo(map);

// 5. Fetch Data securely via Vercel API Route
async function fetchIPData(query = '') {
  
  // Safely encode the query and call the Vercel serverless function
  const url = `/api/ipify?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    
    // Catch server errors (like 500) before trying to parse JSON
    if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();

    // Handle API errors (e.g., invalid IP)
    if (data.code) {
      document.getElementById('ip-address').textContent = query;
      document.getElementById('ip-address').style.color = 'red';
      document.getElementById('location').textContent = "Invalid IP or Domain";
      document.getElementById('timezone').textContent = "—";
      document.getElementById('isp').textContent = "—";
      return;
    }

    // Reset color on success
    document.getElementById('ip-address').style.color = 'var(--gray-950)';

    // Update UI
    document.getElementById('ip-address').textContent = data.ip;
    
    const locationText = `${data.location.city}, ${data.location.region} ${data.location.postalCode || ''}`;
    document.getElementById('location').textContent = locationText;
    
    document.getElementById('timezone').textContent = `UTC ${data.location.timezone}`;
    document.getElementById('isp').textContent = data.isp;

    // Update Map
    const lat = data.location.lat;
    const lng = data.location.lng;
    
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);

  } catch (error) {
    console.error("Error fetching IP data:", error);
    document.getElementById('ip-address').textContent = "Network Error";
    document.getElementById('ip-address').style.color = 'red';
    document.getElementById('location').textContent = "Please check your connection";
  }
}

// 6. Form Submission
document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault(); 
  const query = document.getElementById('ip-input').value.trim();
  fetchIPData(query);
});

// 7. Page Load
window.addEventListener('load', () => {
  setTimeout(() => { map.invalidateSize(); }, 100);
  setTimeout(() => { map.invalidateSize(); }, 500);
  fetchIPData(); 
});