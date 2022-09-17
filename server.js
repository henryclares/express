const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT;
mongoose.connect(process.env.DATABASE, {}).then((resp) => {
  console.log('Connected to mongodb');
});
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
