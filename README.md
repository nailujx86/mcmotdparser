#MCMotdParser
###A parser for Minecraft motds which parses them to HTML
Usage NodeJS:

    const motdparser = require('mcmotdparser');
    var motd = "§aSuper cool Server §7§Come join us! §e§lNEW GAME:§b§l THE BRIDGE";
    var html = "";
    motdparser(motd, (err, res) => {
	    html = res;
    });
The CSS File and the Minecraft Fonts which help styling the output are in the ```css/``` Folder.