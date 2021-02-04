"use strict";

var request = require("request-promise");

var cheerio = require("cheerio");

var json2csv = require("json2csv").Parser;

var fs = require("fs");

var page = "https://curriculum.code.org/csd-20/unit2/1/";
var wArr = [[]];

function crawl(uri, unitNumber, lessonNumber) {
  var response, $, k;
  return regeneratorRuntime.async(function crawl$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(request({
            uri: uri,
            headers: {
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "en-US,en;q=0.9"
            },
            gzip: true
          }));

        case 2:
          response = _context.sent;
          $ = cheerio.load(response);
          k = $('div[class="content"]').html();
          k = k.replace(/(\r\n|\n|\r)/gm, "");
          _context.next = 8;
          return regeneratorRuntime.awrap(wArr.push({
            curriculum: "csd-20",
            unit: unitNumber,
            lesson: lessonNumber,
            data: k
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

var _loop = function _loop(i) {
  var nLessons = 0;
  var arr = [];
  (function _callee() {
    var response, $, k1, h, n, j;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(request({
              uri: "https://curriculum.code.org/csd-20/unit".concat(i, "/"),
              headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9"
              },
              gzip: true
            }));

          case 2:
            response = _context2.sent;
            $ = cheerio.load(response);
            k1 = $("div[id=\"unit".concat(i, "\"]")).html();
            h = $('div[class="lessons"] > div > a').toString(); //console.log( h.replace(/\s/g,''));  

            h = h.replace(/\s/g, '');
            n = parseInt(h.substring(h.length - 6, h.length - 4)); //console.log(n);  

            k1 = k1.replace(/(\r\n|\n|\r)/gm, ""); // fs.writeFileSync("./data.json",  JSON.stringify(p));

            _context2.next = 11;
            return regeneratorRuntime.awrap(wArr.push({
              curriculum: "csd-20",
              unit: i,
              lesson: 0,
              data: k1
            }));

          case 11:
            j = 1;

          case 12:
            if (!(j <= n)) {
              _context2.next = 19;
              break;
            }

            console.log(i, j);
            _context2.next = 16;
            return regeneratorRuntime.awrap(crawl("https://curriculum.code.org/csd-20/unit".concat(i, "/").concat(j, "/"), i, j));

          case 16:
            j++;
            _context2.next = 12;
            break;

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    });
  })().then(function (res) {
    fs.writeFileSync("./data.json", JSON.stringify(wArr));
  });
};

for (var i = 1; i <= 6; i++) {
  _loop(i);
}