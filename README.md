# MCMotdParser
### A parser for Minecraft motds which parses them to HTML
Usage NodeJS:

    const motdparser = require('mcmotdparser');
    var motd = "§aSuper cool Server §7Come join us! §e§lNEW GAME:§b§l THE BRIDGE";
    var html = "";
    motdparser.motdToHtml(motd, (err, res) => {
	    html = res;
    });
Usage Web:
 

    // Include this tag in your head or below your body
    <script src="https://cdn.jsdelivr.net/gh/nailujx86/mcmotdparser@v1.0/motdparserweb.js" type="text/javascript"></script>
    
    <script>
	    var motd = "§aSuper cool Server §7Come join us! §e§lNEW GAME:§b§l THE BRIDGE";
	    var html = "";
	    motdParser.motdToHtml(motd, function(err, res) {
		    html = res; // Do with this whatever you want :)
		});
	</script>

The CSS File and the Minecraft Fonts which help styling the output are in the ```css/``` Folder.
Parsing is supported for motds in text format as well as motds in the Minecraft Json-Text Format.

#### Renders:
Render of the example above:
![Motd0](https://i.imgur.com/kw6JTwF.png)
Another example: 
![Motd1](https://i.imgur.com/aXmKoLH.png)
And one last example:
![Motd2](https://i.imgur.com/HB3Pufj.png)
