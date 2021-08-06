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
motdParser.extras = {
    '§k': 'obfuscated',
    '§l': 'bold',
    '§m': 'strikethrough',
    '§n': 'underline',
    '§o': 'italic'
};
motdParser.parseJsonToHTML = function (jsonPart) {
    var toParse = Array.isArray(jsonPart) ? jsonPart : [jsonPart];
    var html = ""
    for (var parsePart of toParse) {
        var classlist = "";
        var styleList = "";
        var text = "";
        for (var key of Object.keys(parsePart)) {
            if (key == "text") {
                text += parsePart.text;
                continue;
            }
            if (motdParser.classes.hasOwnProperty(key)) {
                classlist += " " + motdParser.classes[key];
                continue;
            }
            if (key == "color") {
                if (parsePart[key].startsWith('#')) {
                    styleList += "color: " + parsePart[key];
                } else {
                    classlist += " mc_" + parsePart[key];
                }
                continue;
            }
            if (key == "extra") {
                for (var jsonPartExtra of parsePart.extra) {
                    text += motdParser.parseJsonToHTML(jsonPartExtra);
                }
            }
        }
        html += `<span class="${classlist.trim()}" style="${styleList.trim()}">${text}</span>`;
    }
    return html;
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
motdParser.toHtml = function (motd, callback) {
    if (typeof motd === 'object') {
        motdParser.jsonToHtml(motd, (err, res) => {
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
