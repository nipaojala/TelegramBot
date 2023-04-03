const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();
const { XMLHttpRequest } = require('node-xmlhttprequest');

function makeHttpObject() {
  try {
    return new XMLHttpRequest();
  }
  catch (_error) {console.log("1")}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (_error) {console.log("2")}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (_error) {console.log("3")}

  throw new Error("Could not crete");
}
let text = []
let schedule = []
let rows = []
let last = []
const request = makeHttpObject();
request.open("GET", process.env.ESPORT_URL, true);
request.send(null);
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    text = request.responseText.split('"datarow"');
    text.shift()
    text.map(element => {
      rows = element.split("<td")
      rows.map(x => {
        if (x.includes("white"))
          schedule.push(1)
        if (x.includes("red"))
          schedule.push(0)
      })
      schedule.push("väli")
})
    const result = schedule.reduce((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/9)
    
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
    
      resultArray[chunkIndex].push(item)
    
      return resultArray
    }, [])
    
    last = result[14];
    last = last.filter(element => element === 1)
  }
};
console.log(last)
console.log(

  new Date().toISOString().split('T')[0]
  
  )
const bot = new Telegraf(process.env.AUTH_TOKEN);
bot.hears('sulis', (ctx) => {
  if (last !== undefined) {
    ctx.reply(`21.30 - 22.30 löytyy ${last.length} vapaata kenttää. \n Tässä linkki varaussivustolle: ${process.env.ESPORT_URL}`)
} else {
  ctx.reply(`En kyennyt noutamaan tietoja Esportin sivulta. Sivusto ei ole auki 00.00-06-00.\nTai sitten se on vaan paskana as usual.`)
}});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));