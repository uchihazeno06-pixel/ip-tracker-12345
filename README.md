# Frontend Mentor - IP Address Tracker Solution

This is a fully functioning, production-ready solution to the [IP Address Tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). 

## 📖 Overview

### What is this tool?
The IP Address Tracker is a web application that allows users to search for any IP address or domain name and view its geographical location on an interactive map. On initial load, it automatically detects and displays the user's own IP address and location.

### The Challenge
Users should be able to:
- View the optimal layout for each page depending on their device's screen size (Desktop and Mobile).
- See hover states for all interactive elements on the page.
- See their own IP address on the map on the initial page load.
- Search for any IP addresses or domains and see the key information and location.
- Handle invalid IP addresses gracefully with visual error feedback.

### Links
- **Live Site URL:** [Add your deployed link here - e.g., https://your-name-ip-tracker.netlify.app]
- **GitHub Repository:** [Add your GitHub URL here]

---

## 🛠️ My Process

### Built With
- **Semantic HTML5:** Accessible form structure with visually hidden labels.
- **CSS Custom Properties:** For a maintainable color palette.
- **CSS Grid & Flexbox:** Used to build the complex overlapping card layout and search bar.
- **Vanilla JavaScript (ES6+):** Handled all asynchronous API calls and DOM manipulation without a framework.
- **IPify API:** Used to fetch accurate IP geolocation data.
- **LeafletJS:** Used to render the interactive OpenStreetMap tiles.

---

## 🧠 What I Learned

Building this project pushed my vanilla JavaScript and debugging skills significantly. Here are the major takeaways:

### 1. The "Invisible Map" Bug
When integrating LeafletJS, I encountered an issue where the map container rendered as a blank grey box. I learned that Leaflet requires the DOM container to have a definitive height and width *before* it initializes. I solved this by using a delayed `map.invalidateSize()` function to force Leaflet to recalculate its dimensions after the CSS had fully painted the layout.

### 2. The Reality of IP Geolocation
I learned that IP geolocation is not based on physical GPS coordinates, but on the routing infrastructure of the Internet Service Provider (ISP). During testing, my IP accurately resolved to Abuja, Nigeria. While I was physically in Osun, my ISP (Globacom) was routing my traffic through their Abuja hub. 

Similarly, when testing Chinese domains like `deepseek.com`, the map showed Washington, USA. This taught me about global CDNs (Content Delivery Networks)—the company is Chinese, but their public-facing servers (hosted by services like Cloudflare or AWS) are physically located in the US.

### 3. Network & DNS Debugging
During development, the OpenStreetMap tiles failed to load entirely, throwing `ERR_CONNECTION_TIMED_OUT` and `ERR_NAME_NOT_RESOLVED` errors in the console. I discovered this was caused by my local ISP's DNS servers failing to resolve the map servers. I successfully resolved the issue by switching my computer's DNS to Google Public DNS (`8.8.8.8`), proving that frontend developers must sometimes troubleshoot network infrastructure.

### 4. Map Customization
I learned how to override Leaflet's default marker icons (which frequently break in local development) by creating a custom `L.icon()` instance pointing to my own SVG asset. I also learned how to append `?lang=en` to the OpenStreetMap tile URL to force English labels across the map.

---

## 🚀 Continued Development
If I were to take this project further, I would:
- **Hide the API Key:** Currently, the API key is loaded via a `config.js` file that is ignored by Git. For a production app, I would move the fetch request to a serverless function (e.g., Netlify Functions) to completely hide the key from the client side.
- **Add a Loading State:** Add a spinner or skeleton loader inside the info card while the API fetch is in progress to improve perceived performance.
- **Error Toast:** Replace the inline red error text with a custom, accessible toast notification.

---

## 🤖 AI Collaboration
I used an AI assistant as an architectural mentor during this project. The AI did not write the application for me; instead, it guided my decision-making. It helped me understand the CSS stacking context required for the overlapping card, explained the `z-index` logic, and acted as a debugging partner when Leaflet rendered blank tiles. It taught me how to read the browser console to diagnose a network DNS issue.

---

## 👤 Author
- **Frontend Mentor:** uchihazeno06-pixel https://www.frontendmentor.io/profile/uchihazeno06-pixel
- **GitHub:** uchihazeno06-pixel https://github.com/uchihazeno06-pixel
