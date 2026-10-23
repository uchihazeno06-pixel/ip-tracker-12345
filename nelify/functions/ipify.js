// netlify/functions/ipify.js

exports.handler = async function (event, context) {
  // 1. Netlify stores query parameters in event.queryStringParameters
  const query = event.queryStringParameters.query || '';

  // 2. Get the API key from Netlify's Environment Variables
  const apiKey = process.env.IPIFY_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key missing. Please check Netlify environment variables." })
    };
  }

  // 3. Build the IPify URL
  let searchParam = '';
  if (query) {
    const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(query);
    searchParam = isIP ? `&ipAddress=${query}` : `&domain=${query}`;
  }

  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${searchParam}`;

  try {
    // 4. Fetch data from IPify (Node 18+ has built-in fetch)
    const ipifyResponse = await fetch(url);
    
    // Catch IPify errors (like invalid IPs)
    if (!ipifyResponse.ok) {
       const errorData = await ipifyResponse.json();
       return {
         statusCode: ipifyResponse.status,
         body: JSON.stringify(errorData)
       };
    }

    const data = await ipifyResponse.json();

    // 5. Send it back to the frontend
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch IP data", details: error.message })
    };
  }
};