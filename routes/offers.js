/**
 * Created by jadeljerdy1 on 5/25/17.
 */

var express = require('express');
var router = express.Router();
var Offers = require('../models/offers.js');

/***************** * ******************/
/********** RESTFUL ROUTES ***********/
/***************** * ****************/

/* GET all offers */
router.get('/', function(req,res){
    Offers.find().lean().exec(function(err,offers){
        if(err)
            res.send(err);

        res.json(offers);
    });
});

/* GET offer by ID */
router.get('/:id', function(req,res){
    Offers.findOne({"_id":req.params.id}).lean().exec(function(err,offer){
       if(err)
           res.send(err);

       res.json(offer);
    });
});

/* POST a new offer */
router.post('/', function(req,res){
    var offer = new Offers(req.body);
    console.log(req.data);
    offer.save(function(err){
        if(err)
            res.send(err);

        res.sendStatus(200);
    });
});

/* Edit an offer */
router.put("/:id", function(req,res){
    Offers.findById(req.params.id, function(err,result) {
        if(err)
            res.send(err);

        /* Mains - Layer 1 */
        if(req.body.title)
            result.title = req.body.title;

        if(req.body.slug)
            result.slug = req.body.slug;

        if(req.body.enabled)
            result.enabled = req.body.enabled;

        if(req.body.templateid)
            result.templateid = req.templateid.title;

        /* Initial Trigger - Layer 2 */
        if(req.body.initialtrigger && req.body.initialtrigger.session)
            result.initialtrigger.session = req.body.initialtrigger.session;

        if(req.body.initialtrigger && req.body.initialtrigger.question_enabled)
            result.initialtrigger.question_enabled = req.body.initialtrigger.question_enabled;

        if(req.body.initialtrigger && req.body.initialtrigger.question)
            result.initialtrigger.question = req.body.initialtrigger.question;

        if(req.body.initialtrigger && req.body.initialtrigger.time_enabled)
            result.initialtrigger.time_enabled = req.body.initialtrigger.time_enabled;

        if(req.body.initialtrigger && req.body.initialtrigger.time)
            result.initialtrigger.time = req.body.initialtrigger.time;


        /* Reshow - Layer 3 */
        if(req.body.reshowtrigger && req.body.reshowtrigger.session && req.body.reshowtrigger.session.session )
            result.reshowtrigger.session.session = req.body.reshowtrigger.session.session;

        if(req.body.reshowtrigger && req.body.reshowtrigger.session && req.body.reshowtrigger.session.question_enabled )
            result.reshowtrigger.session.question_enabled = req.body.reshowtrigger.session.question_enabled;

        if(req.body.reshowtrigger && req.body.reshowtrigger.session && req.body.reshowtrigger.session.question )
            result.reshowtrigger.session.question = req.body.reshowtrigger.session.question;

        if(req.body.reshowtrigger && req.body.reshowtrigger.session && req.body.reshowtrigger.session.time_enabled )
            result.reshowtrigger.session.time_enabled = req.body.reshowtrigger.session.time_enabled;

        if(req.body.reshowtrigger && req.body.reshowtrigger.session && req.body.reshowtrigger.session.time )
            result.reshowtrigger.session.time = req.body.reshowtrigger.session.time;

        /* Reshow - shallow layer */
        if(req.body.reshowtrigger && req.body.reshowtrigger.question_enabled)
            result.reshowtrigger.question_enabled = req.body.reshowtrigger.question_enabled;

        if(req.body.reshowtrigger && req.body.reshowtrigger.question)
            result.reshowtrigger.question = req.body.reshowtrigger.question;

        if(req.body.reshowtrigger && req.body.reshowtrigger.time_enabled)
            result.reshowtrigger.time_enabled = req.body.reshowtrigger.time_enabled;

        if(req.body.reshowtrigger && req.body.reshowtrigger.time)
            result.reshowtrigger.time = req.body.reshowtrigger.time;


        result.save(function(err){
            if(err)
                res.send(err);
            res.sendStatus(200);
        });
    });
});

/* Delete a offer */
router.delete('/:id', function(req,res){
    Offers.remove({_id:req.params.id}, function(err){
        if(err)
            res.send(err);
        res.sendStatus(200);
    });
});

/***************** * ******************/
/******** END RESTFUL ROUTES *********/
/***************** * ****************/

// Get by slug
router.get('/:slug', function(req,res){
    Offers.findOne({"slug":req.params.slug}).lean().exec(function(err,offer){
        if(err)
            res.send(err);

        res.json(offer);
    });
});

module.exports = router;