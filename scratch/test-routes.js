const http = require('http');

function checkURL(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: err.message });
    });
  });
}

async function test() {
  const routes = [
    'http://localhost:3006/fr',
    'http://localhost:3006/fr/institutions',
    'http://localhost:3006/fr/members',
    'http://localhost:3006/fr/about',
    'http://localhost:3006/fr/gallery'
  ];

  for (const url of routes) {
    const result = await checkURL(url);
    console.log(`${result.status} | ${result.url}`);
  }
}

test();
