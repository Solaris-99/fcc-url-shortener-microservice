require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('node:dns')
const app = express();
const urls = ['https://freeCodeCamp.org'];

// Basic Configuration
const port = process.env.PORT || 3000;
const bParser = bodyParser.urlencoded({extended: false});

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/shorturl/:url', function(req, res) {
  
  const ind = parseInt(req.params.url);
  if(isNaN(ind)){
    res.json({error: "Wrong format"})
  }

  if ( !urls[ind]){
    res.json({error: "No short URL found for the given input"})
  }

  res.redirect(urls[ind])
});

app.post('/api/shorturl', bParser)

app.post('/api/shorturl',(req,res)=>{
  let url = new URL(req.body.url).hostname
  dns.lookup(url,(err,add)=>{
    if(err) return res.json({ error: 'invalid url' });
    if (!urls.includes(req.body.url)){urls.push(req.body.url)}
    const ind = urls.indexOf(req.body.url)
    if (ind >= 0){
      payload = {
        original_url: req.body.url,
        short_url: ind
      }  
    }
  
    res.json(payload)
    
  })

})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
