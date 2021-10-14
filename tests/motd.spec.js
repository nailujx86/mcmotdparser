const mcmotd = require('../src/motdparsernode')

describe('JSON Parser', () => {
    test('parses a json-motd to a html div', async() => {
        let motd = await mcmotd.jsonToHtml({"text":"","extra":[{"text":"Hypixel Network ","extra":[{"text":"","extra":[{"text":"1.8/1.9/1.10/1.11/1.12 ","extra":[{"text":"","extra":[{"text":"NEW PTL GAME:","extra":[{"text":"","extra":[{"text":" THE BRIDGE","extra":[],"bold":true}],"color":"acqua"}],"bold":true}],"color":"yellow"}],"color":"red"}],"color":"gray"}],"color":"green"}]})
        expect(motd).toBeString()
        expect(motd).toStartWith('<div')
        expect(motd).toEndWith('</div>')
    })

    test('parses an array-motd to a html div', async() => {
        let motd = await mcmotd.jsonToHtml([{"text":"test"},{"text":"","extra":[{"text":"Hypixel Network ","extra":[{"text":"","extra":[{"text":"1.8/1.9/1.10/1.11/1.12 ","extra":[{"text":"","extra":[{"text":"NEW PTL GAME:","extra":[{"text":"","extra":[{"text":" THE BRIDGE","extra":[],"bold":true}],"color":"acqua"}],"bold":true}],"color":"yellow"}],"color":"red"}],"color":"gray"}],"color":"green"}]}])
        expect(motd).toBeString()
        expect(motd).toStartWith('<div')
        expect(motd).toEndWith('</div>')
    })

    test('calls the callback function if passed as second argument', (done) => {
        function callback(_err, result) {
            try {
                expect(result).toBeString()
                expect(result).toStartWith('<div')
                expect(result).toEndWith('</div>')
                done()
            } catch(error) {
                done(error)
            }
        }
        mcmotd.jsonToHtml({"text": "test"}, callback)
    })
})

describe('Text to JSON converter', () => {
    test('converts text to an object', async() => {
        let json = await mcmotd.textToJson("§aHypixel Network §7§c1.8/1.9/1.10/1.11/1.12 §e§lNEW PTL GAME:§b§l THE BRIDGE")
        console.log(JSON.stringify(json))
        expect(json).toBeObject()
        expect(json).toHaveProperty('text')
        expect(json).toHaveProperty('extra')
    })
})

describe('motd converter', () => {
    test('converts both text and objects (json) to a html string', async() => {
        let text = await mcmotd.toHtml("§aHypixel Network §7§c1.8/1.9/1.10/1.11/1.12 §e§lNEW PTL GAME:§b§l THE BRIDGE")
        let obj = await mcmotd.toHtml({"text": "test"})
        let reg = /^<div.*<\/div>$/
        expect(text).toBeString()
        expect(obj).toBeString()
        expect(text).toMatch(reg)
        expect(obj).toMatch(reg)
    })
})