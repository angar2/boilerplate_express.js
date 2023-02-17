const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true})); // form
app.use(bodyParser.json()); // json
app.use(cookieParser());

mongoose.set("strictQuery", false);
mongoose.connect(config.mongoURI).then(
    () => console.log('MongoDB Connected...')).catch(
        (err => console.log(err)));

app.use('/api/user', require('./routes/user'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});