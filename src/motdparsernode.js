//// https://github.com/nailujx86/mcmotdparser

const classes = {
    "bold": "mc_bold",
    "italic": "mc_italic",
    "underlined": "mc_underlined",
    "strikethrough": "mc_strikethrough",
    "obfuscated": "mc_obfuscated"
};
const colors = {
    '§0': 'black',
    '§1': 'dark_blue',
    '§2': 'dark_green',
    '§3': 'dark_aqua',
    '§4': 'dark_red',
    '§5': 'dark_purple',
    '§6': 'gold',
    '§7': 'gray',
    '§8': 'dark_gray',
    '§9': 'blue',
    '§a': 'green',
    '§b': 'aqua',
    '§c': 'red',
    '§d': 'light_purple',
    '§e': 'yellow',
    '§f': 'white',
};
const extras = {
    '§k': 'obfuscated',
    '§l': 'bold',
    '§m': 'strikethrough',
    '§n': 'underline',
    '§o': 'italic'
};

function parseJsonToHTML(jsonPart) {
    let classlist = "";
    let styleList = "";
    let text = "";
    for (var key of Object.keys(jsonPart)) {
        if (key == "text") {
            text += jsonPart.text;
            continue;
        }
        if (classes.hasOwnProperty(key)) {
            classlist += " " + classes[key];
            continue;
        }
        if (key == "color") {
            if (jsonPart[key].startsWith('#')) {
                styleList += "color: " + jsonPart[key];
            } else {
                classlist += " mc_" + jsonPart[key];
            }
            continue;
        }
        if (key == "extra") {
            for (var jsonPartExtra of jsonPart.extra) {
                text += parseJsonToHTML(jsonPartExtra);
            }
        }
    }
    const retText = `<span class="${classlist.trim()}" style="${styleList.trim()}">${text}</span>`;
    return retText;
}

function jsonToHtml(json, callback) {
    json = JSON.parse(JSON.stringify(json).split('\\n').join("<br>"));
    let motd = parseJsonToHTML(json);
    motd = "<div class=\"mc\">" + motd + "</div>";
    callback(null, motd);
}

function textToJson(text, callback) {
    let jsonObj = { text: "", extra: [] };
    let curObj = jsonObj;
    let arr = text.split("");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != '§') {
            curObj.text += arr[i];
        } else if (arr[i + 1] == 'r') {
            let innerObj = { text: "", extra: [] };
            jsonObj.extra.push(innerObj);
            curObj = innerObj;
            i++;
        } else {
            let codeStr = '§' + arr[i + 1];
            let innerObj = { text: "", extra: [] };
            if (colors.hasOwnProperty(codeStr)) {
                innerObj.color = colors[codeStr];
            }
            if (extras.hasOwnProperty(codeStr)) {
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
    if (typeof motd === 'object') {
        jsonToHtml(motd, (err, res) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, res);
        });
    } else if (typeof motd === 'string') {
        textToJson(motd, (err, json) => {
            if (err) {
                callback(err);
                return;
            }
            jsonToHtml(json, (err, res) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, res);
            });
        });
    }
}

//var text = "§aHypixel Network §7§c1.8/1.9/1.10/1.11/1.12 §e§lNEW PTL GAME:§b§l THE BRIDGE";
//var json = '{"text":"","extra":[{"text":"Hypixel Network ","extra":[{"text":"","extra":[{"text":"1.8/1.9/1.10/1.11/1.12 ","extra":[{"text":"","extra":[{"text":"NEW PTL GAME:","extra":[{"text":"","extra":[{"text":" THE BRIDGE","extra":[],"bold":true}],"color":"acqua"}],"bold":true}],"color":"yellow"}],"color":"red"}],"color":"gray"}],"color":"green"}]}';

exports.jsonToHtml = jsonToHtml;
exports.parseJsonToHTML = parseJsonToHTML;
exports.textToJson = textToJson;
exports.toHtml = toHtml;