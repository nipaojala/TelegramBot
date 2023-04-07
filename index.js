const { Telegraf } = require('telegraf');
require('dotenv').config();
const { XMLHttpRequest } = require('node-xmlhttprequest');
const bot = new Telegraf(process.env.AUTH_TOKEN);
function makeHttpObject() {
  try {
    return new XMLHttpRequest();
  }
  catch (_error) {console.log("1")}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (_error) {console.log("2")}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (_error) {console.log("3")}

  throw new Error("Could not create");
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

  const times2 = [
    "7.00 - 8.00",
    "8.00 - 9.00",
    "9.00 - 10.00",
    "10.00 - 11.00",
    "11.00 . 12.00",
    "12.00 - 13.00",
    "13.00 - 14.00",
    "14.00 - 15.00",
    "15.00 - 16.00",
    "16.00 - 17.00",
    "17.00 - 18.00",
    "18.00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
    "22:00 - 23:00"
  ]
bot.hears('Sulis kaikki', (ctx) => {
let text = []
let schedule = []
let rows = []
let last = []
let answer = ""
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
        resultArray[chunkIndex] = []
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

    times.map(element => {
      answer = answer + `${element} löytyy ${last[counter].length} vapaata kenttää.\n`
      counter = counter + 1  
    })
    ctx.reply(`${answer}\n Tässä linkki varaussivustolle: ${process.env.ESPORT_URL}`)
  }
}
})
bot.hears('Sulis', (ctx) => {
  let text = []
  let schedule = []
  let rows = []
  let last = []
  const request = makeHttpObject();
  request.open("GET", process.env.ESPORT_URL, true);
  request.send(null);
  request.onreadystatechange =  () => {
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
          resultArray[chunkIndex] = []
        }
      
        resultArray[chunkIndex].push(item)
      
        return resultArray
      }, [])
      
      last = result[14];
      last = last.filter(element => element === 1)
      ctx.reply(`21.30 - 22.30 löytyy ${last.length} vapaata kenttää. \n Tässä linkki varaussivustolle: ${process.env.ESPORT_URL}`)
    }
  }
})
bot.hears('Sulis2 kaikki', (ctx) => {
  let text = []
  let schedule = []
  let rows = []
  let last = []
  let answer = ""
  const request = makeHttpObject();
  request.open("GET", process.env.ESPORT_URL2, true);
  request.send(null);
  request.onreadystatechange =  () => {
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
          resultArray[chunkIndex] = []
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
  
      times2.map(element => {
        answer = answer + `${element} löytyy ${last[counter].length} vapaata kenttää.\n`
        counter = counter + 1  
      })
      ctx.reply(`${answer}\n Tässä linkki varaussivustolle: ${process.env.ESPORT_URL2}`)
    }
  }
})

bot.hears('Sulis2', (ctx) => {
  let text = []
  let schedule = []
  let rows = []
  let last = []
  let option = []
  const request = makeHttpObject();
  request.open("GET", process.env.ESPORT_URL2, true);
  request.send(null);
  request.onreadystatechange =  () => {
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
          resultArray[chunkIndex] = []
        }
      
        resultArray[chunkIndex].push(item)
      
        return resultArray
      }, [])
      
      last = result[15];
      option = result[14];
      last = last.filter(element => element === 1)
      option = option.filter(element => element === 1)


      ctx.reply(`21.00 - 22.00 löytyy ${option.length} vapaata kenttää.\n22.00 - 23.00 löytyy ${last.length} vapaata kenttää.\nTässä linkki varaussivustolle: ${process.env.ESPORT_URL2}`)

    }
  }
})
bot.hears('Miten tää toimii', (ctx) => {
  ctx.reply(`Botti näyttää tämän päivän sulisvuorot Tapiolan Esport hallilla.\nSulis: illan vuorot 21.30->\nSulis kaikki: kaikki puolen vuorot\nSulis2: illan vuorot 21.00->\nSulis2 kaikki: kaikki tasan vuorot`)

})
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));