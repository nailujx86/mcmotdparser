classes = {
    "bold": "mc_bold",
    "italic": "mc_italic",
    "underlined": "mc_underlined",
    "strikethrough": "mc_strikethrough",
    "obfuscated": "mc_obfuscated"
};

function parsePartHTML(jsonPart) {
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
            for(jsonPartExtra of jsonPart.extra) {
                text += parsePartHTML(jsonPartExtra);
            }      
        }
    }
    var retText = "<span class=\"" + classlist.trim() + "\">" + text + "</span>";
    return retText;
}

function toHtml(jsonText, callback) {
    if(jsonText !== null && typeof jsonText !== 'object'){
        try{
            jsonText = jsonText.replace("\n", "<br>");
            jsonText = JSON.parse(jsonText);
        } catch(e) {
            callback(e);
        }
    }
    jsonText = parsePartHTML(jsonText);
    jsonText = "<div class=\"mc\">" + jsonText + "</div>";
    callback(null, jsonText);
}

exports.motdToHtml = toHtml;