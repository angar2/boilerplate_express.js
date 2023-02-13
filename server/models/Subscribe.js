const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribeSchema = mongoose.Schema({
    subscribing: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    subscriber: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Subscribe = mongoose.model('Subscribe',subscribeSchema)

module.exports = { Subscribe }