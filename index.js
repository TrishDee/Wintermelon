const adyenEncrypt = require('node-adyen-encrypt')(25)
const express = require('express')
const app = express()
const port = process.env.PORT;
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.post('/', function (req, res) { 
  var data = req.body;
  var cc = data.cc;
  console.log(`hoe just encrypted: ${cc}`);
  var key = data.key;
  var list = cc.split("|")
  var cc= list[0]
  var mm = list[1]
  var yy = list[2]
  var cvc = list[3]
  var options = {};
  var generationtime = new Date().toISOString()
  const cardData = {
        number : cc, 
        cvc : cvc,   
        holderName : "Kim Sunoo", 
        expiryMonth : mm, 
        expiryYear : yy,  
        generationtime : generationtime 
    };
  var cseInstance = adyenEncrypt.createEncryption(key, options);
  var cc = cseInstance.encrypt(cardData);
  var yy = cseInstance.encrypt(cardData);
  var mm = cseInstance.encrypt(cardData);
  var cvc = cseInstance.encrypt(cardData);
  res.json({
    'cc': cc,
    'mm': mm,
    'yy': yy,
    'cvc': cvc,
    'made_by': 'bad bitch @kimchunwooooooooooooo'
  }); 
}); 

app.get('/', function (req, res){
  res.json({
    'made_by': '@kimchunwooooooooooooo with love'
  });
});

app.listen(port, () => {
  console.log(`Bitchy app at http://localhost:${port}`)
})
    
    


            


