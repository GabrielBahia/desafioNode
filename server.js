require('dotenv').config();
const app = require('./src/app.js');
require('./redis/blacklist');

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})