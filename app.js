const express = require('express')
const cron = require('node-cron')
const axios = require('axios')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/randomCat', (req, res) => {
  const maxId = 2008190;
  const catId = Math.floor(Math.random() * maxId);
  const imgSource = `https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${catId}.png`;
  const response = {
    "response_type": "in_channel",
    "text": imgSource
  }
  res.send(response)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function postCatMessage() {
  const data = {
    "text": "Hello Cat World"
  }
  axios.post('https://hooks.slack.com/services/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', data)
    .then((res) => {
      console.log("POST SENT: ", res);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
}

cron.schedule('*/45 * * * * *', function() {
  console.log("Running cron job!");
  postCatMessage();
});
