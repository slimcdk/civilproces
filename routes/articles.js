var express = require('express');
var router = express.Router();

var fs = require('fs');
var blog_dir = "./views/blog";






// transmit database content
router.get('/data:id', function (req, res) {
    var id = req.params.id.substring(1, Infinity);
    fs.readdir(blog_dir, function(err, data) {
        if (id === 'length'){
            res.status(200).send({length: data.length});
        } else {
            res.status(404).send(null);
        }
    });
});

module.exports = router;