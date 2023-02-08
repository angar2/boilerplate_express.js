const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    // 회원 타입(일반: 0, 관리자: 1)
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// 비밀번호 암호화
userSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// 비밀번호 비교 확인
userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// 로그인 토큰 생성
userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err);
        cb(null, user);
    });
};

// 인증 토큰 찾기
userSchema.statics.findByToken = function(token, cb) {
    jwt.verify(token, 'secretToken', function(err, decoded) {
        User.findOne({_id: decoded, token: token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model('User',userSchema)

module.exports = { User }