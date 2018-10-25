//// https://github.com/nailujx86/mcmotdparser

var motdParser = {};

motdParser.classes = {
    "bold": "mc_bold",
    "italic": "mc_italic",
    "underlined": "mc_underlined",
    "strikethrough": "mc_strikethrough",
    "obfuscated": "mc_obfuscated"
};
motdParser.colors = {
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
    '§b': 'aqua',
    '§c': 'red',
    '§d': 'light-purple',
    '§e': 'yellow',
    '§f': 'white',
};
motdParser.extras = {
    '§k': 'obfuscated',
    '§l': 'bold',
    '§m': 'strikethrough',
    '§n': 'underline',
    '§o': 'italic'
};
motdParser.parseJsonToHTML = function (jsonPart) {
    var classlist = "";
    var text = "";
    for (var key of Object.keys(jsonPart)) {
        if (key == "text") {
            text += jsonPart.text;
            continue;
        }
        if (motdParser.classes.hasOwnProperty(key)) {
            classlist += " " + motdParser.classes[key];
            continue;
        }
        if (key == "color") {
            classlist += " mc_" + jsonPart[key];
            continue;
        }
        if (key == "extra") {
            for (var jsonPartExtra of jsonPart.extra) {
                text += motdParser.parseJsonToHTML(jsonPartExtra);
            }
        }
    }
    var retText = "<span class=\"" + classlist.trim() + "\">" + text + "</span>";
    return retText;
};
motdParser.jsonToHtml = function (json, callback) {
    json = JSON.parse(JSON.stringify(json).split('\\n').join("<br>"));
    var motd = motdParser.parseJsonToHTML(json);
    motd = "<div class=\"mc\">" + motd + "</div>";
    callback(null, motd);
};
motdParser.textToJson = function (text, callback) {
    var jsonObj = {
        text: "",
        extra: []
    };
    var curObj = jsonObj;
    var arr = text.split("");
    for (var i = 0; i < arr.length; i++) {
        var innerObj = {};
        if (arr[i] != '§') {
            curObj.text += arr[i];
        } else if (arr[i + 1] == 'r') {
            innerObj = {
                text: "",
                extra: []
            };
            jsonObj.extra.push(innerObj);
            curObj = innerObj;
            i++;
        } else {
            var codeStr = '§' + arr[i + 1];
            innerObj = {
                text: "",
                extra: []
            };
            if (motdParser.colors.hasOwnProperty(codeStr)) {
                innerObj.color = motdParser.colors[codeStr];
            }
            if (motdParser.extras.hasOwnProperty(codeStr)) {
                innerObj[motdParser.extras[codeStr]] = true;
            }
            curObj.extra.push(innerObj);
            curObj = innerObj;
            i++;
        }
    }
    callback(null, jsonObj);
};
motdParser.motdToHtml = function (motd, callback) {
    if (typeof motd === 'object') {
        motdParser.jsonToHtml(motd, (err, res) => {
            console.log(res);
            if (err) {
                callback(err);
                return;
            }
            callback(null, res);
        });
    } else if (typeof motd === 'string') {
        motdParser.textToJson(motd, (err, json) => {
            if (err) {
                callback(err);
                return;
            }
            motdParser.jsonToHtml(json, (err, res) => {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, res);
            });
        });
    }
};
