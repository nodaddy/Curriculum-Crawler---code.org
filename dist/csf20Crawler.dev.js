"use strict";

var request = require("request-promise");

var cheerio = require("cheerio");

var json2csv = require("json2csv").Parser;

var fs = require("fs");

var crawlMeta = [{
  "lessonplan": "https://curriculum.code.org/csf-19/coursea/2/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Sequencing",
  "activity": "https://studio.code.org/s/coursea-2020/stage/2/puzzle/1",
  "lesson": " Learn to Drag and Drop",
  "id": 1,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://code.org/curriculum/course1/1/Teacher",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursea-2020/stage/3/puzzle/1",
  "lesson": "Happy Maps",
  "id": 2,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/courseb/2/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursea-2020/stage/4/puzzle/1",
  "lesson": "Sequencing with Scrat",
  "id": 3,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursea/5/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursea-2020/stage/5/puzzle/1",
  "lesson": "Programming with Scrat",
  "id": 4,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/courseb/7/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursea-2020/stage/6/puzzle/1",
  "lesson": " Programming with Rey and BB-8",
  "id": 5,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursea/7/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursea-2020/stage/7/puzzle/1",
  "lesson": "Happy Loops",
  "id": 6,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursea/8/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursea-2020/stage/8/puzzle/1",
  "lesson": "Loops with Scrat",
  "id": 7,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursea/9/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursea-2020/stage/9/puzzle/1",
  "lesson": " Loops with Laurel",
  "id": 8,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursea/12/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursea-2020/stage/10/puzzle/1",
  "lesson": "Ocean Scene \nwith Loops",
  "id": 9,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursea/11/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursea-2020/stage/11/puzzle/1",
  "lesson": " The Big Event Jr.",
  "id": 10,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursea/12/",
  "grade_id": 1,
  "level_id": 1,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursea-2020/stage/12/puzzle/1",
  "lesson": "On the Move with Events",
  "id": 11,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://code.org/curriculum/course1/2/Teacher",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/courseb-2020/stage/2/puzzle/1",
  "lesson": " Move It, Move It",
  "id": 12,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/courseb/3/#:~:text=Using%20characters%20from%20Angry%20Birds,together%20in%20a%20linear%20sequence.",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/courseb-2020/stage/3/puzzle/1",
  "lesson": "Sequencing with Angry Birds",
  "id": 13,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursec/4/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/courseb-2020/stage/4/puzzle/1",
  "lesson": "Programming with Angry Birds",
  "id": 14,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/courseb/5/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/courseb-2020/stage/5/puzzle/1",
  "lesson": "Programming with Harvester",
  "id": 15,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://code.org/curriculum/course1/12/Teacher",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/courseb-2020/stage/6/puzzle/1",
  "lesson": "Getting Loopy",
  "id": 16,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursea/8/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursea-2020/stage/8/puzzle/1",
  "lesson": "Loops with Scrat",
  "id": 17,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/courseb/7/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/courseb-2020/stage/7/puzzle/1",
  "lesson": "Loops with Harvester",
  "id": 18,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursea/9/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/courseb-2020/stage/9/puzzle/1",
  "lesson": "Loops with Laurel",
  "id": 19,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursea/12/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursea-2020/stage/10/puzzle/1",
  "lesson": "Ocean Scene \r\nwith Loops",
  "id": 20,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/courseb/9/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/courseb-2020/stage/9/puzzle/1",
  "lesson": "Drawing Gardens with Loops",
  "id": 21,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://code.org/curriculum/course2/12/Teacher",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/11/puzzle/1",
  "lesson": " Conditionals with Cards",
  "id": 22,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/14/#:~:text=Use%20the%20if%20at%20flower,there%20will%20be%20a%20honeycomb.&text=The%20bee%20should%20get%20nectar,if%20there%20is%20a%20honeycomb.",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/12/puzzle/1",
  "lesson": " If/Else with Bee",
  "id": 23,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-1718/coursed/9/#:~:text=While%20loops%20are%20loops%20that,the%20loop%20to%20continue%20repeating.",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/13/puzzle/1",
  "lesson": "While Loops in Farmer",
  "id": 24,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/12/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/14/puzzle/1",
  "lesson": " Until Loops in Maze",
  "id": 25,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/14/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/15/puzzle/1",
  "lesson": " Harvesting with Conditionals",
  "id": 26,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/courseb/12/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Events",
  "activity": "http://studio.code.org/s/courseb-2020/stage/11/puzzle/1",
  "lesson": "The Big Event Jr.",
  "id": 27,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursea/14/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursea-2020/stage/12/puzzle/1",
  "lesson": "On the Move with Events",
  "id": 28,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/courseb/12/",
  "grade_id": 1,
  "level_id": 2,
  "topic": "Events",
  "activity": "http://studio.code.org/s/courseb-2020/stage/12/puzzle/1",
  "lesson": "A Royal Battle with Events",
  "id": 29,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursea/2/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "https://studio.code.org/s/coursea-2020/stage/2/puzzle/1",
  "lesson": " Learn to Drag and Drop",
  "id": 30,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/courseb/4/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursec-2020/stage/3/puzzle/1",
  "lesson": "My Robotic Friends Jr.",
  "id": 31,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursec/4/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursec-2020/stage/4/puzzle/1",
  "lesson": "Programming with Angry Birds",
  "id": 32,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursec/3/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursec-2020/stage/5/puzzle/1",
  "lesson": "Debugging in Maze",
  "id": 33,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursec/6/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursec-2020/stage/6/puzzle/1",
  "lesson": "Collecting Treasure with Laurel",
  "id": 34,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursee/5/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursec-2020/stage/7/puzzle/1",
  "lesson": "Creating Art with Code",
  "id": 35,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://code.org/curriculum/course2/14/Teacher",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Binary",
  "activity": "http://studio.code.org/s/coursec-2020/stage/8/puzzle/1",
  "lesson": "Binary Bracelets",
  "id": 36,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://code.org/curriculum/course1/12/Teacher",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/courseb-2020/stage/6/puzzle/1",
  "lesson": "Getting Loopy",
  "id": 37,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursea/8/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursea-2020/stage/8/puzzle/1",
  "lesson": "Loops with Scrat",
  "id": 38,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/courseb/7/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/courseb-2020/stage/7/puzzle/1",
  "lesson": "Loops with Harvester",
  "id": 39,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursec/9/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursec-2020/stage/9/puzzle/1",
  "lesson": "My Loopy Robotic Friends Jr.",
  "id": 40,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursec/10/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursec-2020/stage/10/puzzle/1",
  "lesson": "Loops with Rey and BB-8",
  "id": 41,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursec/11/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursec-2020/stage/11/puzzle/1",
  "lesson": "Harvesting Crops with Loops",
  "id": 42,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/express/11/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursec-2020/stage/12/puzzle/1",
  "lesson": "Looking Ahead with Minecraft",
  "id": 43,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursec/13/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursec-2020/stage/13/puzzle/1",
  "lesson": "Sticker Art with Loops",
  "id": 44,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://code.org/curriculum/course2/12/Teacher",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/11/puzzle/1",
  "lesson": " Conditionals with Cards",
  "id": 45,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/14/#:~:text=Use%20the%20if%20at%20flower,there%20will%20be%20a%20honeycomb.&text=The%20bee%20should%20get%20nectar,if%20there%20is%20a%20honeycomb.",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/12/puzzle/1",
  "lesson": " If/Else with Bee",
  "id": 46,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/4/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursee-2020/stage/4/puzzle/1",
  "lesson": "Conditionals with the Farmer",
  "id": 47,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursed/14/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/14/puzzle/1",
  "lesson": " Until Loops in Maze",
  "id": 48,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/15/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/15/puzzle/1",
  "lesson": " Harvesting with Conditionals",
  "id": 49,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://code.org/curriculum/course1/15/Teacher",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursec-2020/stage/14/puzzle/1",
  "lesson": " The Big Event",
  "id": 50,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursec/12/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursec-2020/stage/15/puzzle/1",
  "lesson": "Build a Flappy Game",
  "id": 51,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursec/16/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursec-2020/stage/16/puzzle/1",
  "lesson": "Chase Game with Events",
  "id": 52,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/5/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursee-2020/stage/5/puzzle/1",
  "lesson": " Simon Says",
  "id": 53,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/2/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursee-2020/stage/6/puzzle/1",
  "lesson": " Swimming Fish with Sprite Lab",
  "id": 54,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/7/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursee-2020/stage/7/puzzle/1",
  "lesson": "Alien Dance Party with Sprite Lab",
  "id": 55,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursec/17/",
  "grade_id": 1,
  "level_id": 3,
  "topic": "Data",
  "activity": "http://studio.code.org/s/coursec-2020/stage/17/puzzle/1",
  "lesson": "Picturing Data",
  "id": 56,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/1/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/1/puzzle/1",
  "lesson": "Graph Paper Programming\n",
  "id": 57,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-1718/coursef/11/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/2/puzzle/1",
  "lesson": "Introduction to \nOnline Puzzles",
  "id": 58,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/3/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/3/puzzle/1",
  "lesson": "Relay \nProgramming",
  "id": 59,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/4/#:~:text=Students%20will%20be%20given%20pre,harder%20and%20harder%20programming%20projects.",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/4/puzzle/1",
  "lesson": " Debugging with\n Laurel",
  "id": 60,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/5/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursed-2020/stage/5/puzzle/1",
  "lesson": "Events in Bounce",
  "id": 61,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursee/13/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursed-2020/stage/6/puzzle/1",
  "lesson": "Build a Star Wars Game",
  "id": 62,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/18/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursed-2020/stage/7/puzzle/1",
  "lesson": " Dance Party",
  "id": 63,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/7/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursed-2020/stage/8/puzzle/1",
  "lesson": "Loops in Ice Age",
  "id": 64,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/8/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursed-2020/stage/9/puzzle/1",
  "lesson": " Drawing Shapes with Loops",
  "id": 65,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/5/#:~:text=In%20this%20introduction%20to%20nested,to%20develop%20these%20nested%20loops.",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursed-2020/stage/10/puzzle/1",
  "lesson": "Nested Loops in Maze",
  "id": 66,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/express/16/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/11/puzzle/1",
  "lesson": " Conditionals with Cards",
  "id": 67,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/11/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/12/puzzle/1",
  "lesson": " If/Else with Bee",
  "id": 68,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-1718/coursed/9/#:~:text=While%20loops%20are%20loops%20that,the%20loop%20to%20continue%20repeating.",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/13/puzzle/1",
  "lesson": "While Loops in Farmer",
  "id": 69,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/12/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/14/puzzle/1",
  "lesson": " Until Loops in Maze",
  "id": 70,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/14/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/15/puzzle/1",
  "lesson": " Harvesting with Conditionals",
  "id": 71,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/18/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Binary",
  "activity": "http://studio.code.org/s/coursed-2020/stage/16/puzzle/1",
  "lesson": "Binary Images",
  "id": 72,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/19/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Binary",
  "activity": "http://studio.code.org/s/coursed-2020/stage/17/puzzle/1",
  "lesson": " Binary Images with Artist",
  "id": 73,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursed/18/",
  "grade_id": 2,
  "level_id": 1,
  "topic": "Digital Citizenship",
  "activity": "http://studio.code.org/s/coursed-2020/stage/18/puzzle/1",
  "lesson": "Super Digital Citizen",
  "id": 74,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/1/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/1/puzzle/1",
  "lesson": "Graph Paper Programming\n",
  "id": 75,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-1718/coursef/11/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/2/puzzle/1",
  "lesson": "Introduction to \nOnline Puzzles",
  "id": 76,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/3/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/3/puzzle/1",
  "lesson": "Relay \nProgramming",
  "id": 77,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/4/#:~:text=Students%20will%20be%20given%20pre,harder%20and%20harder%20programming%20projects.",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/4/puzzle/1",
  "lesson": " Debugging with\n Laurel",
  "id": 78,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/1/#:~:text=Students%20will%20be%20able%20to,into%20the%20largest%20repeatable%20sequence.&text=Modify%20an%20existing%20program%20to%20solve%20errors.,-Reflect%20on%20the",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursee-2020/stage/1/puzzle/1",
  "lesson": "Sequencing in the Maze",
  "id": 79,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/5/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursed-2020/stage/5/puzzle/1",
  "lesson": "Events in Bounce",
  "id": 80,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursee/13/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursed-2020/stage/6/puzzle/1",
  "lesson": "Build a Star Wars Game",
  "id": 81,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/18/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursed-2020/stage/7/puzzle/1",
  "lesson": " Dance Party",
  "id": 82,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/7/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursed-2020/stage/8/puzzle/1",
  "lesson": "Loops in Ice Age",
  "id": 83,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/8/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursed-2020/stage/9/puzzle/1",
  "lesson": " Drawing Shapes with Loops",
  "id": 84,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/5/#:~:text=In%20this%20introduction%20to%20nested,to%20develop%20these%20nested%20loops.",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursed-2020/stage/10/puzzle/1",
  "lesson": "Nested Loops in Maze",
  "id": 85,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/express/16/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/11/puzzle/1",
  "lesson": " Conditionals with Cards",
  "id": 86,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/11/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/12/puzzle/1",
  "lesson": " If/Else with Bee",
  "id": 87,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/4/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursee-2020/stage/4/puzzle/1",
  "lesson": "Conditionals with the Farmer",
  "id": 88,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/12/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/14/puzzle/1",
  "lesson": " Until Loops in Maze",
  "id": 89,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/14/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/15/puzzle/1",
  "lesson": " Harvesting with Conditionals",
  "id": 90,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/18/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Binary",
  "activity": "http://studio.code.org/s/coursed-2020/stage/16/puzzle/1",
  "lesson": "Binary Images",
  "id": 91,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/19/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Binary",
  "activity": "http://studio.code.org/s/coursed-2020/stage/17/puzzle/1",
  "lesson": " Binary Images with Artist",
  "id": 92,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/5/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursee-2020/stage/5/puzzle/1",
  "lesson": " Simon Says",
  "id": 93,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/2/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursee-2020/stage/6/puzzle/1",
  "lesson": " Swimming Fish with Sprite Lab",
  "id": 94,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/7/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursee-2020/stage/7/puzzle/1",
  "lesson": "Alien Dance Party with Sprite Lab",
  "id": 95,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/8/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Digital Citizenship",
  "activity": "http://studio.code.org/s/coursee-2020/stage/8/puzzle/1",
  "lesson": "Private and Personal Information",
  "id": 96,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/9/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Digital Citizenship",
  "activity": "http://studio.code.org/s/coursee-2020/stage/9/puzzle/1",
  "lesson": "About Me with Sprite Lab",
  "id": 97,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursee/17/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Digital Citizenship",
  "activity": "http://studio.code.org/s/coursee-2020/stage/10/puzzle/1",
  "lesson": "Digital Sharing",
  "id": 98,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/5/#:~:text=In%20this%20introduction%20to%20nested,to%20develop%20these%20nested%20loops.",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Nested Loops",
  "activity": "http://studio.code.org/s/coursee-2020/stage/11/puzzle/1",
  "lesson": " Nested Loops in Maze",
  "id": 99,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/12/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Nested Loops",
  "activity": "http://studio.code.org/s/coursee-2020/stage/12/puzzle/1",
  "lesson": "Fancy Shapes using Nested Loops",
  "id": 100,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-1718/coursee/9/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Nested Loops",
  "activity": "http://studio.code.org/s/coursee-2020/stage/13/puzzle/1",
  "lesson": "Nested Loops with Frozen",
  "id": 101,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-1718/coursee/15/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Functions",
  "activity": "http://studio.code.org/s/coursee-2020/stage/14/puzzle/1",
  "lesson": "Songwriting",
  "id": 102,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/1/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Functions",
  "activity": "http://studio.code.org/s/coursee-2020/stage/15/puzzle/1",
  "lesson": "Functions in Minecraft",
  "id": 103,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/16/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Functions",
  "activity": "http://studio.code.org/s/coursee-2020/stage/16/puzzle/1",
  "lesson": "Functions with Harvester",
  "id": 104,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/17/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Functions",
  "activity": "http://studio.code.org/s/coursee-2020/stage/17/puzzle/1",
  "lesson": "Functions with Artist",
  "id": 105,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/10/",
  "grade_id": 2,
  "level_id": 2,
  "topic": "Impacts of Computing",
  "activity": "http://studio.code.org/s/coursee-2020/stage/18/puzzle/1",
  "lesson": "Designing for Accessibility",
  "id": 106,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/1/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/1/puzzle/1",
  "lesson": "Graph Paper Programming\n",
  "id": 107,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-1718/coursef/11/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/2/puzzle/1",
  "lesson": "Introduction to \nOnline Puzzles",
  "id": 108,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/3/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/3/puzzle/1",
  "lesson": "Relay \nProgramming",
  "id": 109,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/4/#:~:text=Students%20will%20be%20given%20pre,harder%20and%20harder%20programming%20projects.",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursed-2020/stage/4/puzzle/1",
  "lesson": " Debugging with\n Laurel",
  "id": 110,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/1/#:~:text=Students%20will%20be%20able%20to,into%20the%20largest%20repeatable%20sequence.&text=Modify%20an%20existing%20program%20to%20solve%20errors.,-Reflect%20on%20the",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sequencing",
  "activity": "http://studio.code.org/s/coursee-2020/stage/1/puzzle/1",
  "lesson": "Sequencing in the Maze",
  "id": 111,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursee/13/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursed-2020/stage/6/puzzle/1",
  "lesson": "Build a Star Wars Game",
  "id": 112,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/18/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Events",
  "activity": "http://studio.code.org/s/coursed-2020/stage/7/puzzle/1",
  "lesson": " Dance Party",
  "id": 113,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/6/#:~:text=Lesson%206%3A%20Envelope%20Variables&text=Variables%20are%20used%20as%20placeholders,use%20variables%20to%20reference%20them.",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Variables",
  "activity": "http://studio.code.org/s/coursef-2020/stage/7/puzzle/1",
  "lesson": "Envelope Variables",
  "id": 114,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/7/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Variables",
  "activity": "http://studio.code.org/s/coursef-2020/stage/8/puzzle/1",
  "lesson": "Variables with Artist",
  "id": 115,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/8/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Variables",
  "activity": "http://studio.code.org/s/coursef-2020/stage/9/puzzle/1",
  "lesson": "Changing Variables with Bee",
  "id": 116,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/express/21/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Variables",
  "activity": "http://studio.code.org/s/coursef-2020/stage/10/puzzle/1",
  "lesson": " Changing Variables with Artist",
  "id": 117,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursef/11/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Data",
  "activity": "http://studio.code.org/s/coursef-2020/stage/11/puzzle/1",
  "lesson": " Simulating Experiments",
  "id": 118,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/hoc/plugged/9/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Data",
  "activity": "http://studio.code.org/s/coursef-2020/stage/12/puzzle/1",
  "lesson": " AI for Oceans",
  "id": 119,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursee/27/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Data",
  "activity": "http://studio.code.org/s/coursef-2020/stage/13/puzzle/1",
  "lesson": " The Internet",
  "id": 120,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/11/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursef-2020/stage/14/puzzle/1",
  "lesson": "For Loop Fun",
  "id": 121,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursed/8/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursed-2020/stage/8/puzzle/1",
  "lesson": "Loops in Ice Age",
  "id": 122,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/12/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursef-2020/stage/15/puzzle/1",
  "lesson": "For Loops with Bee",
  "id": 123,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/8/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursed-2020/stage/9/puzzle/1",
  "lesson": " Drawing Shapes with Loops",
  "id": 124,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursee/8/#:~:text=In%20this%20introduction%20to%20nested,to%20develop%20these%20nested%20loops.",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursed-2020/stage/10/puzzle/1",
  "lesson": "Nested Loops in Maze",
  "id": 125,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/13/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Loops",
  "activity": "http://studio.code.org/s/coursef-2020/stage/16/puzzle/1",
  "lesson": "For Loops with Artist",
  "id": 126,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/express/16/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/11/puzzle/1",
  "lesson": " Conditionals with Cards",
  "id": 127,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/11/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/12/puzzle/1",
  "lesson": " If/Else with Bee",
  "id": 128,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/4/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursee-2020/stage/4/puzzle/1",
  "lesson": "Conditionals with the Farmer",
  "id": 129,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/12/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/14/puzzle/1",
  "lesson": " Until Loops in Maze",
  "id": 130,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursed/14/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Conditionals",
  "activity": "http://studio.code.org/s/coursed-2020/stage/15/puzzle/1",
  "lesson": " Harvesting with Conditionals",
  "id": 131,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/18/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Binary",
  "activity": "http://studio.code.org/s/coursed-2020/stage/16/puzzle/1",
  "lesson": "Binary Images",
  "id": 132,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursed/19/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Binary",
  "activity": "http://studio.code.org/s/coursed-2020/stage/17/puzzle/1",
  "lesson": " Binary Images with Artist",
  "id": 133,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/5/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursee-2020/stage/5/puzzle/1",
  "lesson": " Simon Says",
  "id": 134,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/2/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursee-2020/stage/6/puzzle/1",
  "lesson": " Swimming Fish with Sprite Lab",
  "id": 135,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/7/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursee-2020/stage/7/puzzle/1",
  "lesson": "Alien Dance Party with Sprite Lab",
  "id": 136,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursef/17/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursef-2020/stage/17/puzzle/1",
  "lesson": "Behaviors in Sprite Lab",
  "id": 137,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/16/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Sprites",
  "activity": "http://studio.code.org/s/coursef-2020/stage/18/puzzle/1",
  "lesson": "Virtual Pet with Sprite Lab",
  "id": 138,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/8/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Digital Citizenship",
  "activity": "http://studio.code.org/s/coursee-2020/stage/8/puzzle/1",
  "lesson": "Private and Personal Information",
  "id": 139,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/9/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Digital Citizenship",
  "activity": "http://studio.code.org/s/coursee-2020/stage/9/puzzle/1",
  "lesson": "About Me with Sprite Lab",
  "id": 140,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-18/coursee/17/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Digital Citizenship",
  "activity": "http://studio.code.org/s/coursee-2020/stage/10/puzzle/1",
  "lesson": "Digital Sharing",
  "id": 141,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursef/6/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Digital Citizenship",
  "activity": "http://studio.code.org/s/coursef-2020/stage/6/puzzle/1",
  "lesson": "The Power of Words",
  "id": 142,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/5/#:~:text=In%20this%20introduction%20to%20nested,to%20develop%20these%20nested%20loops.",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Nested Loops",
  "activity": "http://studio.code.org/s/coursee-2020/stage/11/puzzle/1",
  "lesson": " Nested Loops in Maze",
  "id": 143,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/12/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Nested Loops",
  "activity": "http://studio.code.org/s/coursee-2020/stage/12/puzzle/1",
  "lesson": "Fancy Shapes using Nested Loops",
  "id": 144,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-1718/coursee/9/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Nested Loops",
  "activity": "http://studio.code.org/s/coursee-2020/stage/13/puzzle/1",
  "lesson": "Nested Loops with Frozen",
  "id": 145,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-1718/coursee/15/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Functions",
  "activity": "http://studio.code.org/s/coursee-2020/stage/14/puzzle/1",
  "lesson": "Songwriting",
  "id": 146,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/1/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Functions",
  "activity": "http://studio.code.org/s/coursee-2020/stage/15/puzzle/1",
  "lesson": "Functions in Minecraft",
  "id": 147,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/16/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Functions",
  "activity": "http://studio.code.org/s/coursee-2020/stage/16/puzzle/1",
  "lesson": "Functions with Harvester",
  "id": 148,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/17/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Functions",
  "activity": "http://studio.code.org/s/coursee-2020/stage/17/puzzle/1",
  "lesson": "Functions with Artist",
  "id": 149,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/10/",
  "grade_id": 2,
  "level_id": 3,
  "topic": "Impacts of Computing",
  "activity": "http://studio.code.org/s/coursee-2020/stage/18/puzzle/1",
  "lesson": "Designing for Accessibility",
  "id": 150,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/1/#:~:text=Students%20will%20be%20able%20to,into%20the%20largest%20repeatable%20sequence.&text=Modify%20an%20existing%20program%20to%20solve%20errors.,-Reflect%20on%20the",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Ramp-up",
  "activity": "http://studio.code.org/s/coursee-2020/stage/1/puzzle/1",
  "lesson": "Sequencing in the Maze",
  "id": 151,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/2/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Ramp-up",
  "activity": "http://studio.code.org/s/coursee-2020/stage/2/puzzle/1",
  "lesson": " Drawing with Loops",
  "id": 152,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/3/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Ramp-up",
  "activity": "http://studio.code.org/s/coursee-2020/stage/3/puzzle/1",
  "lesson": "Conditionals in Minecraft: Voyage Aquatic\n",
  "id": 153,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/4/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Ramp-up",
  "activity": "http://studio.code.org/s/coursee-2020/stage/4/puzzle/1",
  "lesson": "Conditionals with the Farmer",
  "id": 154,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/1/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Getting started: Web content & HTML",
  "activity": "https://studio.code.org/s/csd2-2019/stage/1/puzzle/1",
  "lesson": "Exploring Websites",
  "id": 155,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/2/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Getting started: Web content & HTML",
  "activity": "https://studio.code.org/s/csd2-2019/stage/2/puzzle/1",
  "lesson": "Websites for Expression",
  "id": 156,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/3/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Intro to HTML",
  "activity": "https://studio.code.org/s/csd2-2019/stage/3/puzzle/1",
  "lesson": "Intro to HTML",
  "id": 157,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/4/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Headings",
  "activity": "https://studio.code.org/s/csd2-2019/stage/4/puzzle/1",
  "lesson": "Headings",
  "id": 158,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/6/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Lists",
  "activity": "https://studio.code.org/s/csd2-2019/stage/6/puzzle/1",
  "lesson": "Lists",
  "id": 159,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/7/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Intellectual Property and Images",
  "activity": "https://studio.code.org/s/csd2-2019/stage/7/puzzle/1",
  "lesson": "Intellectual Property and Images",
  "id": 160,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/8/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Clean Code and Debugging",
  "activity": "https://studio.code.org/s/csd2-2019/stage/8/puzzle/1",
  "lesson": "Clean Code and Debugging",
  "id": 161,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/9/",
  "grade_id": 3,
  "level_id": 1,
  "topic": "Project - Multi-Page Websites",
  "activity": "https://studio.code.org/s/csd2-2019/stage/9/puzzle/1",
  "lesson": "Project - Multi-Page Websites",
  "id": 162,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursef/1/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/1/puzzle/1",
  "lesson": "Functions in Minecraft",
  "id": 163,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/2/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/2/puzzle/1",
  "lesson": "Swimming Fish with Sprite Lab",
  "id": 164,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/7/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/3/puzzle/1",
  "lesson": "Alien Dance Party with Sprite Lab",
  "id": 165,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/2/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/4/puzzle/1",
  "lesson": "Drawing with Loops",
  "id": 166,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursef/5/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/5/puzzle/1",
  "lesson": "Nested Loops in Maze",
  "id": 167,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/1/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Getting started: Web content & HTML",
  "activity": "https://studio.code.org/s/csd2-2019/stage/1/puzzle/1",
  "lesson": "Exploring Websites",
  "id": 168,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/2/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Getting started: Web content & HTML",
  "activity": "https://studio.code.org/s/csd2-2019/stage/2/puzzle/1",
  "lesson": "Websites for Expression",
  "id": 169,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/3/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Intro to HTML",
  "activity": "https://studio.code.org/s/csd2-2019/stage/3/puzzle/1",
  "lesson": "Intro to HTML",
  "id": 170,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/4/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Headings",
  "activity": "https://studio.code.org/s/csd2-2019/stage/4/puzzle/1",
  "lesson": "Headings",
  "id": 171,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/6/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Lists",
  "activity": "https://studio.code.org/s/csd2-2019/stage/6/puzzle/1",
  "lesson": "Lists",
  "id": 172,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/7/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Intellectual Property and Images",
  "activity": "https://studio.code.org/s/csd2-2019/stage/7/puzzle/1",
  "lesson": "Intellectual Property and Images",
  "id": 173,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/8/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Clean Code and Debugging",
  "activity": "https://studio.code.org/s/csd2-2019/stage/8/puzzle/1",
  "lesson": "Clean Code and Debugging",
  "id": 174,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/9/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Project - Multi-Page Websites",
  "activity": "https://studio.code.org/s/csd2-2019/stage/9/puzzle/1",
  "lesson": "Project - Multi-Page Websites",
  "id": 175,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/10/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Styling Text with CSS",
  "activity": "https://studio.code.org/s/csd2-2019/stage/10/puzzle/1",
  "lesson": "Styling Text with CSS",
  "id": 176,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/11/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Styling Elements with CSS",
  "activity": "https://studio.code.org/s/csd2-2019/stage/11/puzzle/1",
  "lesson": "Styling Elements with CSS",
  "id": 177,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/12/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Sources and Search Engines",
  "activity": "https://studio.code.org/s/csd2-2019/stage/12/puzzle/1",
  "lesson": "Sources and Search Engines",
  "id": 178,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/13/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "RGB Colors and Classes",
  "activity": "https://studio.code.org/s/csd2-2019/stage/13/puzzle/1",
  "lesson": "RGB Colors and Classes",
  "id": 179,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/14/",
  "grade_id": 3,
  "level_id": 2,
  "topic": "Project - Personal Portfolio Website",
  "activity": "https://studio.code.org/s/csd2-2019/stage/14/puzzle/1",
  "lesson": "Project - Personal Portfolio Website",
  "id": 180,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursef/1/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/1/puzzle/1",
  "lesson": "Functions in Minecraft",
  "id": 181,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursef/2/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/2/puzzle/1",
  "lesson": "Swimming Fish with Sprite Lab",
  "id": 182,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/7/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/3/puzzle/1",
  "lesson": "Alien Dance Party with Sprite Lab",
  "id": 183,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/2/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/4/puzzle/1",
  "lesson": "Drawing with Loops",
  "id": 184,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/3/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursee-2020/stage/3/puzzle/1",
  "lesson": "Conditionals in Minecraft: Voyage Aquatic\r",
  "id": 185,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-19/coursee/4/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursee-2020/stage/4/puzzle/1",
  "lesson": "Conditionals with the Farmer",
  "id": 186,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csf-20/coursef/5/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Ramp-Up",
  "activity": "http://studio.code.org/s/coursef-2020/stage/5/puzzle/1",
  "lesson": "Nested Loops in Maze",
  "id": 187,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/1/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Getting started: Web content & HTML",
  "activity": "https://studio.code.org/s/csd2-2019/stage/1/puzzle/1",
  "lesson": "Exploring Websites",
  "id": 188,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/2/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Getting started: Web content & HTML",
  "activity": "https://studio.code.org/s/csd2-2019/stage/2/puzzle/1",
  "lesson": "Websites for Expression",
  "id": 189,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/3/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Intro to HTML",
  "activity": "https://studio.code.org/s/csd2-2019/stage/3/puzzle/1",
  "lesson": "Intro to HTML",
  "id": 190,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/4/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Headings",
  "activity": "https://studio.code.org/s/csd2-2019/stage/4/puzzle/1",
  "lesson": "Headings",
  "id": 191,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/6/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Lists",
  "activity": "https://studio.code.org/s/csd2-2019/stage/6/puzzle/1",
  "lesson": "Lists",
  "id": 192,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/7/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Intellectual Property and Images",
  "activity": "https://studio.code.org/s/csd2-2019/stage/7/puzzle/1",
  "lesson": "Intellectual Property and Images",
  "id": 193,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/8/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Clean Code and Debugging",
  "activity": "https://studio.code.org/s/csd2-2019/stage/8/puzzle/1",
  "lesson": "Clean Code and Debugging",
  "id": 194,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/9/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Project - Multi-Page Websites",
  "activity": "https://studio.code.org/s/csd2-2019/stage/9/puzzle/1",
  "lesson": "Project - Multi-Page Websites",
  "id": 195,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/10/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Styling Text with CSS",
  "activity": "https://studio.code.org/s/csd2-2019/stage/10/puzzle/1",
  "lesson": "Styling Text with CSS",
  "id": 196,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/11/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Styling Elements with CSS",
  "activity": "https://studio.code.org/s/csd2-2019/stage/11/puzzle/1",
  "lesson": "Styling Elements with CSS",
  "id": 197,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/12/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Sources and Search Engines",
  "activity": "https://studio.code.org/s/csd2-2019/stage/12/puzzle/1",
  "lesson": "Sources and Search Engines",
  "id": 198,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/13/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "RGB Colors and Classes",
  "activity": "https://studio.code.org/s/csd2-2019/stage/13/puzzle/1",
  "lesson": "RGB Colors and Classes",
  "id": 199,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csd-18/unit2/14/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Project - Personal Portfolio Website",
  "activity": "https://studio.code.org/s/csd2-2019/stage/14/puzzle/1",
  "lesson": "Project - Personal Portfolio Website",
  "id": 200,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/hoc/plugged/7/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Intro to App Lab",
  "activity": "https://studio.code.org/s/applab-intro/stage/1/puzzle/1",
  "lesson": "Intro to App Lab",
  "id": 201,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csp-18/unit3/4/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Using Simple Commands",
  "activity": "https://studio.code.org/s/csp3-virtual/stage/1/puzzle/1",
  "lesson": "Using Simple Commands",
  "id": 202,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csp-18/unit3/5/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Creating Functions",
  "activity": "https://studio.code.org/s/csp3-virtual/stage/2/puzzle/1",
  "lesson": "Creating Functions",
  "id": 203,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csp-18/unit3/7/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "APIs and Function Parameters",
  "activity": "https://studio.code.org/s/csp3-virtual/stage/3/puzzle/1",
  "lesson": "APIs and Function Parameters",
  "id": 204,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csp-18/unit3/8/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Creating Functions with Parameters",
  "activity": "https://studio.code.org/s/csp3-virtual/stage/4/puzzle/1",
  "lesson": "Creating Functions with Parameters",
  "id": 205,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}, {
  "lessonplan": "https://curriculum.code.org/csp-18/unit3/9/",
  "grade_id": 3,
  "level_id": 3,
  "topic": "Looping and Random Numbers",
  "activity": "https://studio.code.org/s/csp3-virtual/stage/5/puzzle/1",
  "lesson": "Looping and Random Numbers",
  "id": 206,
  "deleted_at": null,
  "created_at": null,
  "updated_at": null
}];
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