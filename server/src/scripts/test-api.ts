async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/certification');
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Data:', data);
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
