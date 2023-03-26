require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() =>
    console.log('Database Authenticated 🎶')
  )
  .catch((error) => console.log(error));

db.sync()
  .then(() => console.log('Database Synced 😎'))
  .catch((error) => console.log(error));

const port = 3003;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
