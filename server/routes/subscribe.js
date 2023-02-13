const express = require('express');
const router = express.Router();
const { Subscribe } = require('../models/Subscribe');

router.post('/subscribeCount', (req, res) => {
    Subscribe.find({'subscriber': req.body.subscriber})
    .exec((err, subscribers) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, subscribers: subscribers.length});
    });
});

router.post('/isSubscribing', (req, res) => {
    Subscribe.find({'subscriber': req.body.subscriber, 'subscribing': req.body.subscribing})
    .exec((err, subscribers) => {
        if(err) return res.status(400).send(err);
        let result = false;
        if(subscribers !== 0){
            result = true
        }
        res.status(200).json({success: true, isSubscribing: result});
    });
});

module.exports = router;