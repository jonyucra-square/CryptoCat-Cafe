const express = require('express')
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
