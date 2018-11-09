# MCMotdParser [![Build Status](https://travis-ci.com/nailujx86/mcmotdparser.svg?branch=master)](https://travis-ci.com/nailujx86/mcmotdparser)  
### A parser for Minecraft motds which parses them to HTML  

Supports parsing old and new format motds to HTML and parsing old format motds to new JSON format motds.  

Usage NodeJS:
```javascript
const motdparser = require('mcmotdparser');
var motd = "§aSuper cool Server §7Come join us! §e§lNEW GAME:§b§l THE BRIDGE";
var html = "";
motdparser.toHtml(motd, (err, res) => {
	html = res;
});
```
Usage Web:
 
```javascript
// Include this tag in your head or below your body
<script src="https://cdn.jsdelivr.net/gh/nailujx86/mcmotdparser@Build_22/dist/motdparserweb.js" type="text/javascript"></script>

<script>
	var motd = "§aSuper cool Server §7Come join us! §e§lNEW GAME:§b§l THE BRIDGE";
	var html = "";
	motdParser.toHtml(motd, function(err, res) {
		html = res; // Do with this whatever you want :)
	});
</script>
```
To convert a "text" style motd to a modern json motd one can use ```motdParser.textToJson("motdtext", callback);```  

The CSS File which helps styling the output are in the ```dist/``` Folder and on <https://cdn.jsdelivr.net/gh/nailujx86/mcmotdparser@Build_22/dist/mcmotd.css>.
Parsing is supported for motds in text format as well as motds in the Minecraft Json-Text Format.

### Renders:
Render of the example above:  
![Motd0](https://i.imgur.com/kw6JTwF.png)  
Another example:  
![Motd1](https://i.imgur.com/aXmKoLH.png)  
And one last example:  
![Motd2](https://i.imgur.com/HB3Pufj.png)

### Size (gipped):
| File | Size |
| ---- | ---- |
| motdparserweb.js.gz | 941 bytes |
| mcmotd.css.gz | 491 bytes |
=> 1.4 kB all together
