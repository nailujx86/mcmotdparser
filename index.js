//// https://github.com/nailujx86/mcmotdparser

var classes = {
    "bold": "mc_bold",
    "italic": "mc_italic",
    "underlined": "mc_underlined",
    "strikethrough": "mc_strikethrough",
    "obfuscated": "mc_obfuscated"
};
var colors = {
  '§0': 'black',
  '§1': 'dark-blue',
  '§2': 'dark-green',
  '§3': 'dark-acqua',
  '§4': 'dark-red',
  '§5': 'dark-purple',
  '§6': 'gold',  
  '§7': 'gray',
  '§8': 'dark-gray',
  '§9': 'blue',
  '§a': 'green',
  '§b': 'acqua',
  '§c': 'red',
  '§d': 'light-purple',
  '§e': 'yellow',
  '§f': 'white',
};
var extras = {
  '§k': 'obfuscated',
  '§l': 'bold',
  '§m': 'strikethrough',
  '§n': 'underline',
  '§o': 'italic'
};

function parseJsonToHTML(jsonPart) {
    var classlist= "";
    var text = "";
    for(var key of Object.keys(jsonPart)) {
        if(key == "text") {
            text += jsonPart.text;
            continue;
        }
        if(classes.hasOwnProperty(key)) {
            classlist += " " + classes[key];
            continue;
        }
        if(key == "color") {
            classlist += " mc_" + jsonPart[key];
            continue;
        }
        if(key == "extra") {
            for(var jsonPartExtra of jsonPart.extra) {
                text += parseJsonToHTML(jsonPartExtra);
            }      
        }
    }
    var retText = "<span class=\"" + classlist.trim() + "\">" + text + "</span>";
    return retText;
}

function jsonToHtml(json, callback) {
  json = JSON.parse(JSON.stringify(json).split('\\n').join("<br>"));
  var motd = parseJsonToHTML(json);
  motd = "<div class=\"mc\">" + motd + "</div>";
  callback(null, motd);
}

function textToJson(text, callback) {
  var jsonObj = {text: "", extra: []};
  var curObj = jsonObj;
  var arr = text.split("");
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] != '§') {
        curObj.text += arr[i];
    } else if (arr[i+1] == 'r'){ 
        let innerObj = {text: "", extra: []};
        jsonObj.extra.push(innerObj);
        curObj = innerObj;
        i++;
    } else {
        var codeStr = '§' + arr[i+1];
        let innerObj = {text: "", extra: []};
        if(colors.hasOwnProperty(codeStr)) {
            innerObj.color = colors[codeStr];
        }
        if(extras.hasOwnProperty(codeStr)) {
            innerObj[extras[codeStr]] = true;
        }
        curObj.extra.push(innerObj);
        curObj = innerObj;
        i++;
    }
  }
  callback(null, jsonObj);
}

function toHtml(motd, callback) {
    /*if(jsonText !== null && typeof jsonText !== 'object'){
      *  try{
      *      jsonText = jsonText.split('\n').join("<br>");
       *     jsonText = JSON.parse(jsonText);
        *} catch(e) {
        *    callback(e);
        *}
    *} else {
     * jsonText = JSON.parse(JSON.stringify(jsonText).split('\\n').join("<br>"));
    }*/
  if(typeof motd === 'object') {
    jsonToHtml(motd, (err, res) => {
      callback(null, res);
    });
  }
}

var text = "§aHypixel Network §7§c1.8/1.9/1.10/1.11/1.12 §e§lNEW PTL GAME:§b§l THE BRIDGE";
var json = '{"text":"","extra":[{"text":"Hypixel Network ","extra":[{"text":"","extra":[{"text":"1.8/1.9/1.10/1.11/1.12 ","extra":[{"text":"","extra":[{"text":"NEW PTL GAME:","extra":[{"text":"","extra":[{"text":" THE BRIDGE","extra":[],"bold":true}],"color":"acqua"}],"bold":true}],"color":"yellow"}],"color":"red"}],"color":"gray"}],"color":"green"}]}';
function lel () {
    textToJson(text, (err, res) => {
        console.log(JSON.stringify(res));
    });
    jsonToHtml(JSON.parse(json), (err, res) => {
        console.log(res);
    });
} 
lel();

exports.motdToHtml = toHtml;