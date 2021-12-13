const express = require('express')
const cron = require('node-cron')
const axios = require('axios')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/randomCat', (req, res) => {

  const data = 	{
    "response_type": "in_channel",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Hi, have a cat :cat:"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": getRandomCatImageSource()
        }
      }
    ]
  };

  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const teamMemberIDs = [
  "U02QG12AG0M", // Kevin
  "U02Q4A4866T", // Taylor
  "U02Q4A4866T", // Chris
  "U02QM7H4BFW", // Kashyap
  "U02QC8DHCP8", // Sophie
  "U02QM7FPWBW", // Sam
  "U02QM7C867N", // Jonatan
  "U02QD43GPN2", // Daniel
];

function getRandomCatImageSource() {
  const maxId = 2008190;
  const catId = Math.floor(Math.random() * maxId);
  const imgSource = `https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${catId}.png`;
  return imgSource;
}

function postCatMessage() {
  const data = 	{
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Hi <@U02QM7C867N>, have a cat :cat:"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": getRandomCatImageSource()
        }
      }
    ]
  };
  axios.post('https://hooks.slack.com/services/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', data)
    .then((res) => {
      console.log("POST SENT: ", res);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
}

function postCatMessageToGeneral() {
  const randomUserId = teamMemberIDs[Math.floor(Math.random()*teamMemberIDs.length)];
  const data = 	{"blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hi <@${randomUserId}>, have a cat :cat:`
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": getRandomCatImageSource()
        }
      }
    ]
  };
  console.log("Random ID: ", randomUserId);
  axios.post('https://hooks.slack.com/services/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', data)
    .then((res) => {
      console.log("POST SENT: ", res);
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
}

cron.schedule('*/60 * * * * *', function() {
  console.log("Running cron job!");
  //postCatMessageToGeneral();
  //postCatMessage();
});
