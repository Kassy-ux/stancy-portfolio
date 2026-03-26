import "dotenv/config";

const BASE = "http://localhost:5000/api";

async function test() {
  const endpoints = [
    "/projects",
    "/skills",
    "/certification",
    "/testimonials",
    "/communities",
    "/contact",
    "/education"
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(`${BASE}${ep}`);
      console.log(`Endpoint ${ep}: Status ${res.status}`);
      if (res.status !== 200) {
        const text = await res.text();
        console.log(`  Response: ${text}`);
      }
    } catch (e: any) {
      console.log(`Endpoint ${ep}: Error - ${e.message}`);
    }
  }
}
test();
