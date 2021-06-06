// script.js

import { router } from './router.js';

function randomKey(length) {
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  var rKey = result.join('');
}

window.onload()= randomKey();


var SplitFactory = require('@splitsoftware/splitio').SplitFactory;
// Instantiate the SDK
var factory = SplitFactory({ 
  core: {
    authorizationKey: 'k5na1f28j0dnibh2e0gl5nrjl1lpulnqtcp1',
    // the key can be the logged in
    // user id, or the account id that 
    // the logged in user belongs to. 
    // The type of customer (user, account, custom)
    // is chosen during Split's sign-up process.
    key: rKey
  },
  startup: {
    readyTimeout: 1.5 // 1.5 sec
  }
});
// And get the client instance you'll use
var client = factory.client();

client.on(client.Event.SDK_READY, function() {
  var treatment = client.getTreatment("double-column2");
  if (treatment == "on") {
      // insert code here to show on treatment
      var main = document.querySelector('main');
      main.className = 'double-column';
  } else if (treatment == "off") {
      // insert code here to show off treatment
      var main = document.querySelector('main');
      main.className = 'single-column';
  } else {
      // insert your control treatment code here
      console.log("yo");
  }
});



const headerText = document.querySelector('header > h1');
const settings = document.querySelector('header > img');

// When the back button is hit, set the state with the new page
window.addEventListener('popstate', e => {
  if (e.state?.page && e.state.page.startsWith('entry')) {
    router.setState('entry', true, Number(e.state.page.substr(5, e.state.page.length)));
  } else {
    router.setState(e.state?.page, true);
  }
});

// Go to header page when header button is clicked
headerText.addEventListener('click', () => {
  router.setState('home', false);
});

// Go to settings page when settings button is clicked
settings.addEventListener('click', () => {
  router.setState('settings', false);
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.addEventListener('click', () => {
          let numEntry = Array.from(document.querySelector('main').childNodes).indexOf(newPost);
          router.setState('entry', false, numEntry + 1);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});
