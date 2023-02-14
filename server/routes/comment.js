const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        console.log(comment)
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true, comment});
    });
});

module.exports = router;