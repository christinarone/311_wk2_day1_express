const express = require('express');
const app = express();
app.get('/',(req, res) => {
  res.send('Users');
});

app.get('/api/Users', (req, res) => {
  res.send(["Jane", "Bob", "Phil"]);
});

app.listen(4000, () => console.log('Listening on port 4000...'));