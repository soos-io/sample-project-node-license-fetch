#!/usr/bin/env node

import readline from 'readline';
import fetch from 'node-fetch';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = prompt => {
  return new Promise((resolve, reject) => {
    rl.question(prompt, resolve)
  });
}

const fetchIt = (spdxId) => {
  fetch(`https://api-stats.soos.io/api/licenses?spdxId=${spdxId}`)
    .then((response) => response.text())
    .then((body) => {
        console.log(body);
    }).catch((error) => {
        console.error('error fetching', error);
    }); 
}

(async () => {
  const spdxId = await question('Which SPDXID / license would you like to fetch? '); 

  console.log(`Looking for ${spdxId}...`);

  fetchIt(spdxId);
  
  rl.close();
})();