/**
 * Created by jadeljerdy1 on 5/25/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
    title: String, /* Label - For reference*/
    slug: String, /* Unique Reference - For Code */
    enabled: Boolean, /* On/Off trigger */
    templateid: Number, /* Reference to a template ID - defined in XCODE */
    initialtrigger: {
        /* 3 Triggers with on-off, combo triggers are in a FIFO queue */
        session: Number,
        question_enabled: Boolean,
        question: Number,
        time_enabled: Boolean,
        time: Number
    },
    /* 3 Top level Triggers with on-off, combo triggers are in a FIFO queue */
    reshowtrigger: {
        session_enabled: Boolean,
        session: {
            /* 3 Triggers with on-off, combo triggers are in a FIFO queue */
            session: Number,
            question_enabled: Boolean,
            question: Number,
            time_enabled: Boolean,
            time: Number
        },
        question_enabled: Boolean,
        question: Number,
        time_enabled: Boolean,
        time: Number
    }
});

module.exports = mongoose.model('Offer', OfferSchema);