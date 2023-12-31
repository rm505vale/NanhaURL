var express = require('express');
var router = express.Router();
var app = express();
const Url = require('../models/url');
const choices = require('./pagal');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/home',{title: 'nanhaurl'});
});

router.get('/:shortCode', async (req, res, next) => {
  var shortCode = req.params.shortCode;

/*----------------Bloom here for shortCode ------------*/

    if(!choices.chk(shortCode))
    {
      //Not found
      console.log("Bloom mai nhi hai");
      res.render('pages/error',{title: 'nanhaurl | Page Not Found'});
    }
    else
    {
      console.log("Haiga");
      await Url.findOneAndUpdate({"shortCode": shortCode},{
        
        $set: {
          "lastAccessed": new Date()
          }
        },
        { new: true })
        .then(
            (url) => {
            if(url){
              res.redirect(url.longUrl);
            }
            else {
              res.render('pages/error',{title: 'nanhaurl | Page Not Found'});
            }

        },(err) => next(err)
      )  
    .catch((err) => next(err));
  }
});

module.exports = router;
