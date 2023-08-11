const path = require('path');

const index = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/home.html'));
};


module.exports = {
  index
};
