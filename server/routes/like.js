const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

router.post('/getLikes', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId};
    } else {
        variable = {commentId: req.body.commentId};
    }
    Like.find(variable)
    .exec((err, likes) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true, likes});
    });
});

router.post('/getDislikes', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId};
    } else {
        variable = {commentId: req.body.commentId};
    }
    Dislike.find(variable)
    .exec((err, dislikes) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true, dislikes});
    });
});

router.post('/upLike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId};
    }

    const like = new Like(req.body);
    like.save((err, like) => {
        if(err) return res.json({success: false, err});

        Dislike.findOneAndDelete(variable)
        .exec((err, dislike) => {
            if(err) return res.json({success: false, err});
            return res.status(200).json({success: true});
        });
    });
});

router.post('/downLike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId};
    }

    Like.findOneAndDelete(variable)
    .exec((err, like) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true});
    });
});

router.post('/upDislike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId};
    }

    const dislike = new Dislike(req.body);
    dislike.save((err, dislike) => {
        if(err) return res.json({success: false, err});

        Like.findOneAndDelete(variable)
        .exec((err, like) => {
            if(err) return res.json({success: false, err});
            return res.status(200).json({success: true});
        });
    });
});

router.post('/downDislike', (req, res) => {
    let variable = {};
    if(req.body.videoId) {
        variable = {videoId: req.body.videoId, userId: req.body.userId};
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId};
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, like) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true});
    });
});

module.exports = router;