// api/ipify.js

export default async function handler(request, response) {
  // 1. Get the query from the URL
  const { query } = request.query;
  const searchQuery = query || '';

  // 2. Get the API key from Vercel's Environment Variables
  const apiKey = process.env.IPIFY_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "API key missing" });
  }

  // 3. Build the IPify URL
  let searchParam = '';
  if (searchQuery) {
    const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(searchQuery);
    searchParam = isIP ? `&ipAddress=${searchQuery}` : `&domain=${searchQuery}`;
  }

  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${searchParam}`;

  try {
    // 4. Fetch data from IPify
    const ipifyResponse = await fetch(url);
    const data = await ipifyResponse.json();

    // 5. Send it back to the frontend
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch IP data" });
  }
}