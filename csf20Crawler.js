const request  = require("request-promise");
const cheerio = require("cheerio");  
const json2csv = require("json2csv").Parser;
const fs = require("fs"); 

let wArr = [];


async function crawl(uri, unitName, lessonNumber){ 
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
    curriculum:"csf-20",
      unit: unitName,
      lesson: lessonNumber,
      data : k.trim()
  })
  
}

let p1 = ['a', 'b', 'c', 'd', 'e', 'f'];
let p1i;
for(let i=1; i<=6; i++){ 
p1i = p1[i-1];
let nLessons = 0;
let arr = [];

( async ()=>{  const response = await request({
  uri: `https://curriculum.code.org/csf-20/course${p1i}/`,
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
    curriculum:"csf-20",
    unit: 'course' + p1i.toUpperCase(),
    lesson: 0,
    data : k1.trim()
  });

  for(let j = 1; j<=n;j++ ){
    console.log(i, j);
    await crawl(`https://curriculum.code.org/csf-20/course${p1i}/${j}/`, `course${p1i.toUpperCase()}`, j);
   }  
})().then((res)=>{fs.writeFileSync("./csf20.json",  JSON.stringify(wArr));})

}




