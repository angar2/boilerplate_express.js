const express = require('express');
const router = express.Router();
const { Subscribe } = require('../models/Subscribe');
const Mongoose = require('mongoose');

router.post('/subscribeCount', (req, res) => {
    Subscribe.find({'subscribed': req.body.subscribed})
    .exec((err, subscribers) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, subscribers: subscribers.length});
    });
});

router.post('/isSubscriber', (req, res) => {
    Subscribe.find({'subscribed': req.body.subscribed, 'subscriber': req.body.subscriber})
    .exec((err, subscribers) => {
        if(err) return res.status(400).send(err);
        let result = false;
        if(subscribers.length !== 0){
            result = true
        }
        res.status(200).json({success: true, isSubscriber: result});
    });
});

router.post('/unSubscribe', (req, res) => {
    Subscribe.findOneAndDelete({'subscribed': req.body.subscribed, 'subscriber': req.body.subscriber})
    .exec((err, subscribe) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true});
    });
});

router.post('/subscribe', (req, res) => {
    const subscribe = new Subscribe(req.body);
    subscribe.save((err, subscribe) => {
        if(err) return res.json({success: false, err});
        return res.status(200).json({success: true});
    });
});

module.exports = router;