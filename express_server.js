var express = require('express');


var PORT = process.env.PORT || 3000


var app = express();

app.use(express.static('public'));

app.listen(3000, () => {
  console.log(`Listening on port ${PORT}`);
});
