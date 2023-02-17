const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

router.get('/auth', auth, (req, res) => {
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

router.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true, user});
    });
});

router.post('/login', (req, res) => {
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

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
      if (err) return res.json({success: false, err});
      return res.status(200).json({success: true});
    });
});

module.exports = router;