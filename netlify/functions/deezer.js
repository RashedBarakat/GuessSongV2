// Proxy for the free Deezer API (browsers can't call it directly: CORS)
exports.handler = async (event) => {
  const path = (event.queryStringParameters || {}).path || "";
  if (!path.startsWith("/")) return { statusCode: 400, body: "bad path" };
  try {
    const r = await fetch("https://api.deezer.com" + path);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300" },
      body: await r.text(),
    };
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: String(e) }) };
  }
};
