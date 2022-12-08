const express = require('express');
const router = express.Router();
const logic = require('../services/logic');
var http = require('http');


async function getRaspored(options,postData){
  
}

router.post('/', async function(req, res, next) {

  console.log("Poceo process");

    
  const options = {
    "method": "POST",
    "hostname": "159.69.23.94",
    "port": "3002",
    "path": "/timeTable/solve?=",
    "headers": {
      "Content-Type": "application/json"
      // "Content-Length": "5250"
    }
  };

  const _req = http.request(options, async function (_res) {
    const chunks = [];
  
    _res.on("data", async function (chunk) {
      chunks.push(chunk);
    });
  
    _res.on("end", async function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      console.log("LUDOOO LUUDAA");
      var resp=JSON.parse(body.toString());
      res.json(resp);
      var temp = await JSON.parse(body.toString());
    });
  });
  _req.write(JSON.stringify(req.body));
  _req.end();
  


    // try {
    //   var test=await logic.send(req.body);
    //   console.log(test);
    //   } catch (err) {
    //     console.error(`GRESKA `, err.message);
    //     next(err);
    //   }
    //   console.log("Zavrsio process");

//   try {
//     res.json(await logic.send(req.body));
//   } catch (err) {
//     console.error(`Greska`, err.message);
//     next(err);
//   }
});

module.exports = router;