const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribeSchema = mongoose.Schema({
    // 작성자
    subscribed: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    // 구독자
    subscriber: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Subscribe = mongoose.model('Subscribe',subscribeSchema)

module.exports = { Subscribe }