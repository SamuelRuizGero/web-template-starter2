var util = require('util');
var http = require('http');
var braintree = require('braintree');
var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var jsonParser = bodyParser.json();

//set port
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));

//var gateway = braintree.connect({
//    environment: braintree.Environment.Sandbox,
//    merchantId: '<>',
//    publicKey: '<>',
//    privateKey: '<>'
//});

app.post('/api/v1/token', function (request, response) {
    gateway.clientToken.generate({}, function (err, res) {
        if (err) throw err;
        response.json({
            "client_token": res.clientToken
        });
    });
});

app.post('/webhooks', jsonParser, function (req, res) {
//    console.log(req.body.bt_signature);
    gateway.webhookNotification.parse(
        req.body.bt_signature,
        req.body.bt_payload,
        function (err, webhookNotification) {
            if (webhookNotification) {
                res.send("[Webhook Received " + webhookNotification.timestamp);
            }
            if (err) {
                res.send(" Err: " + err);
            }
        });       
    res.status(200).send();
});

//routes
app.get("/", function(req,res){
    res.render("../app/index");
})

app.listen(port, function(){
    console.log("App listeing at port " + port);
})