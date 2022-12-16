const express = require('express');
const startSystem = require  ('./lib/index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

startSystem();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });