import "dotenv/config";

const BASE = "http://localhost:5000/api";

async function test() {
  const ep = "/contact";
  try {
    const res = await fetch(`${BASE}${ep}`);
    console.log(`Endpoint ${ep}: Status ${res.status}`);
    const text = await res.text();
    console.log(`Response: ${text}`);
  } catch (e: any) {
    console.log(`Endpoint ${ep}: Error - ${e.message}`);
  }
}
test();
