const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true, comment});
    });
});

router.post('/getcomments', (req, res) => {
    Comment.find({"videoId": req.body.videoId})
    .populate('writer')
    .exec((err, comments) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, comments});
    });
});

module.exports = router;