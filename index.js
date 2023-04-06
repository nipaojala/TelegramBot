const { Telegraf } = require('telegraf');
require('dotenv').config();
const { XMLHttpRequest } = require('node-xmlhttprequest');
const bot = new Telegraf(process.env.AUTH_TOKEN);
bot.hears('sulis kaikki', (ctx) => {
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
const times = [
  "7.30 - 8.30",
  "8.30 - 9.30",
  "9.30 - 10.30",
  "10.30 - 11.30",
  "11.30 . 12.30",
  "12.30 - 13.30",
  "13.30 - 14.30",
  "14.30 - 15.30",
  "15.30 - 16.30",
  "16.30 - 17.30",
  "17.30 - 18.30",
  "18.30 - 19:30",
  "19:30 - 20:30",
  "20:30 - 21:30",
  "21:30 - 22:30"
]
let text = []
let schedule = []
let rows = []
let last = []
let final = []
const request = makeHttpObject();
request.open("GET", process.env.ESPORT_URL, true);
request.send(null);
request.onreadystatechange = () => {
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
    
    last = result
    last = last.map(element => (
      element.filter(element => element === 1)
      )
    )
    counter = 0
    answer = ""
    times.map(element => {
      answer = answer + `${element} löytyy ${last[counter].length} vapaata kenttää.\n`
      counter = counter + 1  
    })
    ctx.reply(answer)

  }
};


})
// bot.hears('sulis kaikki', (ctx) => {
//   if (last !== undefined) {
//     times.map(element => {
//       answer = answer + `${element} löytyy ${last[counter].length} vapaata kenttää.\n`
//       counter = counter + 1  
//     })
//     ctx.reply(answer)
//     ctx.reply(`21.30 - 22.30 löytyy ${last.length} vapaata kenttää. \n Tässä linkki varaussivustolle: ${process.env.ESPORT_URL}`)
// } else {
//   ctx.reply(`En kyennyt noutamaan tietoja Esportin sivulta. Sivusto ei ole auki 00.00-06-00.\nTai sitten se on vaan paskana as usual.`)
// }});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));




//   async function getReservations() {
//     const { data } = await axios.get(process.env.ESPORT_URL);

//     const $ = cheerio.load(data);
    
//     var reservations = []
//     var header = []

//     needs to be changed to work all time
//     const row_forheader = $('tbody')
//   };
//   console.log(header)
//     row_forheader.parent().children(":first").find('th').each((i, cell) => {
//         const $cell = $(cell);
//         header.push($cell.text().trim());
//     });

//     query_resources.split(",").forEach((resource_num) => {
//         const row = $('#'+resources[resource_num].id).parent();
//         const name = resources[resource_num].name;

//         reservations = parseRow($, row, name, reservations, header);
//     });

//     reservations.forEach((row) => {
//         console.log(row[0]+","+row[1]+","+row[2]+","+row[3]);
//     });
// getReservations()