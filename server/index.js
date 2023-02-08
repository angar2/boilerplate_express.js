const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

app.use(bodyParser.urlencoded({extended: true})); // form
app.use(bodyParser.json()); // json
app.use(cookieParser());

mongoose.set("strictQuery", false);
mongoose.connect(config.mongoURI).then(
    () => console.log('MongoDB Connected...')).catch(
        (err => console.log(err)));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/auth', auth, (req, res) => {
    res.status(200).json({
        isAuth: true,
        isAdmin: req.user.role === 0 ? false : true,
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
      });
});

app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true, user});
    });
});

app.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.json({
                success: false,
                message: "이메일/비밀번호를 다시 확인해주세요."
            });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.json({
                    success: false,
                    message: "이메일/비밀번호를 다시 확인해주세요."
                });
            }
            user.generateToken((err, user) => {
                if(err) return res.status(400).json({success: false, err});
                res.cookie("x_auth", user.token).status(200).json({
                    success: true,
                    user_id: user._id
                });
            });
        });
    });
});

app.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
      if (err) return res.json({success: false, err});
      return res.status(200).json({success: true});
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});