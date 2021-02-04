const request  = require("request-promise");
const cheerio = require("cheerio");  
const json2csv = require("json2csv").Parser;
const fs = require("fs");
const page = "https://curriculum.code.org/csd-20/unit2/1/";

let wArr = [[]];


async function crawl(uri, unitNumber, lessonNumber){ 
  const response = await request({
      uri: uri,
      headers: {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9"
      },
      gzip: true
  });



  let $  = cheerio.load(response)
  let k= $('div[class="content"]').html(); 
 
  k=k.replace(/(\r\n|\n|\r)/gm, "") 
  
  await wArr.push({
    curriculum:"csd-20",
      unit: unitNumber,
      lesson: lessonNumber,
      data : k
  })
  
}



 for(let i=1; i<=6; i++){ 
 let nLessons = 0;
let arr = [];

( async ()=>{  const response = await request({
  uri: `https://curriculum.code.org/csd-20/unit${i}/`,
  headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9"
  },
  gzip: true
});

let $  = cheerio.load(response)
  let k1 = $(`div[id="unit${i}"]`).html(); 
  let h = $('div[class="lessons"] > div > a').toString(); 
 //console.log( h.replace(/\s/g,''));  
 h = h.replace(/\s/g,'');
 let n = parseInt(h.substring(h.length - 6,h.length - 4));
 //console.log(n);  
  k1=k1.replace(/(\r\n|\n|\r)/gm, "") 
     
  // fs.writeFileSync("./data.json",  JSON.stringify(p));
   await wArr.push({
    curriculum:"csd-20",
    unit: i,
    lesson: 0,
    data : k1
  });

  for(let j = 1; j<=n;j++ ){
    console.log(i, j);
    await crawl(`https://curriculum.code.org/csd-20/unit${i}/${j}/`,i, j);
   }  
})().then((res)=>{fs.writeFileSync("./data.json",  JSON.stringify(wArr));})

}




