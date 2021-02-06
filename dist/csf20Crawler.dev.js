"use strict";

var request = require("request-promise");

var cheerio = require("cheerio");

var json2csv = require("json2csv").Parser;

var fs = require("fs");

var wArr = [];

function crawl(uri, letter, lessonNumber) {
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
            curriculum: "csf-20",
            unit: "course".concat(letter),
            lesson: lessonNumber,
            data: k.trim()
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

var p1 = ['a', 'b', 'c', 'd', 'e', 'f'];
var p1i;

var _loop = function _loop(i) {
  p1i = p1[i - 1];
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
              uri: "https://curriculum.code.org/csf-20/course".concat(p1i, "/"),
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
              curriculum: "csf-20",
              unit: "course".concat(p1[i - 1]),
              lesson: 0,
              data: k1.trim()
            }));

          case 11:
            j = 1;

          case 12:
            if (!(j <= n)) {
              _context2.next = 20;
              break;
            }

            p1i = p1[i - 1];
            console.log(i, j, p1i);
            _context2.next = 17;
            return regeneratorRuntime.awrap(crawl("https://curriculum.code.org/csf-20/course".concat(p1i, "/").concat(j, "/"), p1i, j));

          case 17:
            j++;
            _context2.next = 12;
            break;

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    });
  })().then(function (res) {
    fs.writeFileSync("./csf20.json", JSON.stringify(wArr));
  });
};

for (var i = 1; i <= 6; i++) {
  _loop(i);
}