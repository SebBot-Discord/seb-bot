const ver = "13.1b";
const changelog = `
* New command: Seb, xkcd
`;

var previous = null;
var count = 0;
var cheerio = require('cheerio');
var stat = 0;
var ready = 0;
var setup = 0;
var Discord = require('discord.js');
var htmlToJson = require("html-to-json");
var client = new Discord.Client();
const DBL = require("dblapi.js");
const request = require('request')
const dbl = new DBL(process.env.DBL_TOKEN, client);
function getElementByAttribute(attr, root) {
    if(root.hasAttribute(attr)) {
        return root;
    }
    var children = root.children, 
        element;
    for(var i = children.length; i--; ) {
        element = getElementByAttribute(attr, children[i]);
        if(element) {
            return element;
        }
    }
    return null;
}

const imgurToken = process.env.IMGUR_TOKEN;
const token = process.env.BOT_TOKEN;
function n(){};
//const ytdl = require('ytdl-core');
//let voice = client.channels.find('name', 'music');
//var connection = undefined;
//voice.join().then((con)=>{
//	connection = con;
//});
/*var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "6b807a40da9758e417950fee0e68e728",
      secret: "b57d98136303a192"
    };
Flickr.authenticate(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
});*/
function run(){try{
function repeat(func, times) {
    func();
    --times && repeat(func, times);
}
function output(error, token) {
        if (error) {
                console.log(`There was an error logging in: ${error}`);
                return;
        } else
                console.log(`Logged in. Token: ${token}`);
}
client.on('ready', () => {
ready = 1;
  //console.log('I am ready!');
client.guilds.get("395371039779192842").channels.find("name", "bot-logs").send({embed:{
	title: "Seb Bot has restarted",
    color: 3394815,
	url: "https://discordapp.com/api/oauth2/authorize?client_id=408718297400475668&permissions=67160064&scope=bot",
	description: "**v"+ver+" Changelog:**\n```\n"+changelog+"\n```",
	footer: {
        text: `Say "Seb, help" for a list of commands`,
        icon_url: "https://cdn.discordapp.com/avatars/408718297400475668/c7b9be183d4cf2029912533e3afc2e69.png"
    },
}});
var stat = 0;
client.user.setStatus("idle");
client.user.setPresence({ game: { name: 'RESTARTING - PLEASE WAIT...', type: 1 } });
 setInterval(function(){
	client.user.setStatus("online");
	stat++;
	if (stat == 0){
		client.user.setPresence({ game: { name: 'with Sebby', type: 1 } });
	} else if (stat == 1){
		client.user.setPresence({ game: { name: `${client.guilds.size + 578} servers`, type: 3 } });
	} else if (stat == 2){
		client.user.setPresence({ game: { name: 'Seb, help', type: 2 } });
		stat = -1;
	}
},30000)
setInterval(() => {
    dbl.postStats(client.guilds.size + 578);
}, 1800000);
	//client.user.setPresence({ game: { name: 'with housestan17', type: 1 } });
  //stat = 1;
  //console.log("Finished!");
});
client.on('message', message => {
try {
	var cmd = false;
	if (message.content.substr(0,3) == "Seb"){
		if (message.member.guild.name == "Hebby"){
			if (message.channel.name != "bot-commands" && message.member.guild != null){
				message.reply("Commands can only be used in <#402320341420212224> on Hebby!").then((msg)=>{
					setTimeout(function(){
						msg.delete();
					}, 5000);
				}).catch(console.error);
				message.delete();
				return;
			};
		};
	};
    if (message == "Seb, help"){
		cmd = true;
		message.channel.startTyping();
        message.author.send({embed: {
            title: "Seb Bot",
            color: 3394815,
		description: "\n**Seb, invite**\n Get the link to invite Seb Bot to your server\n**Seb, cryptic {message}**\n Ecrypts {message} in emoji!\n**Seb, pirate {text}**\n Translates {text} to pirate speak\n**Seb, help**\n Sends a list of commands\n**Seb, tell me a joke**\n Gives you a (not so) funny joke\n**Seb, search for {item}**\n Searches for {item} on google\n**Seb, tell me a fact about {number}**\n Gives you a random fact about {number}\n**Seb, random meme**\n Sends a random meme from imgflip\n**Seb, cat pic**\n Sends you an adorable cat picture from HTTP-Meow\n**Seb, fortune cookie**\n Reveal your true fate. The chinese are never wrong.\n**Seb, 8ball {question}**\n Test your luck.\n**Seb, trbmb**\n Generates a that really blank's my blank phrase\n**Seb, dog pic**\n Sends an adorable picture of a dog.\n**Seb, be like {name}**\n Generates a  be like bill image for {name}\n**Seb, firecracker**\n Amazing display of fireworks!\n**Seb, yo momma**\n Get an epic yo momma joke.\n**Seb, echo {msg}**\n Seb Bot will echo whatever you want!\n**Seb, stats**\n Shows the bot's status\n**Seb, image {query}**\n Searches for query with the flickr api\n**Seb, ping**\n Measures the latency of the bot\n**Seb, gif {query}**\n Searches for {query} on gfycat, then returns the first result\n**Seb, ddg {query}**\n Searches {query} on duckduckgo and returns the first results\n**Seb, xkcd**\n Gets a random xkcd comic\n**Seb, news**\n Gets the latest NY Times article\n:underage: **Seb, boobs**\n Gets a great boob pic\n:underage: **Seb, rule34 {query}**\n Searches for {query} on rule34\n:underage: **Seb, ass**\n Gets a great ass pic\n:underage: **Seb, sex**\n Get a sexy gif\n:underage: **Seb, furry**\n Get a great furry pic",
            footer: {
                text: "Seb Bot created by SebbyTheGODKid#0426",
                icon_url: "https://cdn.discordapp.com/avatars/408718297400475668/c7b9be183d4cf2029912533e3afc2e69.png"
            },
        }})
			.catch(console.error);
        message.reply("Check your DMs, I sent you a list of commands!");
		message.channel.stopTyping();
    };
	if (message.content.substr(0,13) == "Seb, cryptic "){
		var input = message.content.substr(13);
		var k = [];k["a"] = "ðŸ‡¦";k["b"] = "ðŸ‡§";k["c"] = "ðŸ‡¨";k["d"] = "ðŸ‡©";k["e"] = "ðŸ‡ª";k["f"] = "ðŸ‡«";k["g"] = "ðŸ‡¬";k["h"];"ðŸ‡­";k["i"] = "ðŸ‡®";k["j"] = "ðŸ‡¯";k["k"] = "ðŸ‡°";k["l"] = "ðŸ‡±";k["m"] = "ðŸ‡²";k["n"] = "ðŸ‡³";k["o"] = "ðŸ‡´";k["p"] = "ðŸ‡µ";k["q"] = "ðŸ‡¶";k["r"] = "ðŸ‡·";k["s"] = "ðŸ‡¸";k["t"] = "ðŸ‡¹";k["u"] = "ðŸ‡º";k["v"] = "ðŸ‡»";k["w"] = "ðŸ‡¼";k["x"] = "ðŸ‡½";k["y"] = "ðŸ‡¾";k["z"] = "ðŸ‡¿";
		var _result = "";
		for (i = 0; i < input.length; i++) {
			var emoji = k[input.substr(i,i)];
			//if (emoji == null){
			//	emoji = "."
			//}
			if (input.substr(i,i) == " "){
				emoji = "   ";
			}
			_result = _result + emoji;
		}
		cmd = true;
		function r(time,emoji){
			setTimeout(function(){ message.react(emoji); }, time * 500);
		}
		function rem(time){
			setTimeout(function(){ message.clearReactions() }, time * 1000);
		}
		r(0, "ðŸ‡´");
		r(1, "ðŸ‡°");
		rem(2);
		setTimeout(function(){
			r(0, "ðŸ‡­");
			r(1, "ðŸ‡¦");
			rem(2);
		}, 3000);
		setTimeout(function(){
			r(0, "ðŸ‡­");
			r(1, "ðŸ‡¦");
			rem(2);
		}, 6000);
		setTimeout(function(){
			message.reply(_result)
				.catch(console.error);
		}, 7000);
    };
	if (message == "Seb, invite"){
		cmd = true;
		message.channel.startTyping();
		message.reply({embed:{
			title: "Invite Seb Bot",
            color: 3394815,
			url: "https://discordapp.com/api/oauth2/authorize?client_id=408718297400475668&permissions=67160064&scope=bot",
			//description: "(**Invite**)[https://discordapp.com/api/oauth2/authorize?client_id=408718297400475668&permissions=67160064&scope=bot] **Seb Bot to your server**",
			footer: {
                text: `Say "Seb, help" for a list of commands`,
                icon_url: "https://cdn.discordapp.com/avatars/408718297400475668/c7b9be183d4cf2029912533e3afc2e69.png"
            },
		}})
			.catch(console.error);
		message.channel.stopTyping();
	};
    if (message == "Seb, tell me a joke"){
		cmd = true;
		message.channel.startTyping();
    request('https://icanhazdadjoke.com/slack', function (error, response, body) {
		if (error){
			message.reply(error);
			return;
		};
        var joke = JSON.parse(body).attachments[0].text.replace("Dad","Seb Bot")
        message.reply({embed:{
            color: 3394815,
            title: "Seb Joke",
            description: joke,
            footer: {
                text: `Requested by ${message.author.username}`,
                icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
            }
        }})
			.catch(console.error);
    });
	message.channel.stopTyping();
    };
    if (message.content.substr(0,26) == "Seb, tell me a fact about "){
		cmd = true;
	message.channel.startTyping();
    request(('http://numbersapi.com/').concat(message.content.substr(26)), function (error, response, body) {
		if (error){
			message.reply(error);
			return;
		};
    if (body){
     message.reply({embed:{
        color: 3394815,
        title: `Fact about ${message.content.substr(26)}`,
        description: body,
        footer: {
            text: `Requested by ${message.author.username}`,
            icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
        }
     }})
		 .catch(console.error);
     } else
     message.reply("That number sucks!");
    });
	message.channel.stopTyping();
    };
    if (message.content.substr(0,16) == "Seb, search for "){
		cmd = true;
		message.channel.startTyping();
		var link = "about:blank";
		var name = "Search Failed";
		var desc = "Nothing here...";
        request({ headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) Gecko/20100101 Firefox/53.0' },'url':"https://google.com/search?lr=lang_en&hl=en&safe=on&q="+message.content.substr(16)}, function (error, response, body){
			var $ = cheerio.load(body);
			desc = $('span[class="st"]').text();
			if (desc.length > 30){
				desc = desc.replace("...", " ").substr(0,300)+"..."
			}
			link = $('h3[class="r"]').find('a').attr('href')
			name = $('h3[class="r"]').find('a').text()
		});
        message.reply({embed:{
        color: 3394815,
        title: "Google Search",
		description: desc,
        fields: [{
			name: "ï¾ ",
			value: "["+name+"]("+link+")"
		}],
        footer: {
            text: `Requested by ${message.author.username}`,
            icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
        }
        }})
			.catch(console.error);
		message.channel.stopTyping();
    };
	if (message.content.substr(0,10) == "Seb, echo "){
		cmd = true;
		message.channel.startTyping();
        message.reply({embed:{
        color: 3394815,
        //title: "Google Search",
        description: `**ECHO:** ${message.content.substr(10)}`,
        footer: {
            text: `Requested by ${message.author.username}`,
            icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
        }
        }})
			.catch(console.error);
		message.channel.stopTyping();
	};
	//https://api.duckduckgo.com/?q=DuckDuckGo&format=json
	if (message.content.substr(0,9) == "Seb, ddg "){
		cmd = true;
		message.channel.startTyping();
        /*request("https://api.duckduckgo.com/?q="+message.content.substr(9)+"&format=json", function (error, response, body){
			var data = JSON.parse(body).Results
			if (error){
				message.reply(error);
				return;
			};
            if (body){
               message.reply({embed:{
                    color: 3394815,
                    title: "DuckDuckGo",
					url: "https://duckduckgo.com",
                    description: `**${data.Text}**\n${data.FirstUrl}`,
					image: {
						url: data.Icon.URL,
						width: data.Icon.Width,
						height: data.Icon.Height
					},
                    footer: {
                        text: `Requested by ${message.author.username}`,
                        icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                    }
               }});
            } else
               message.reply("No results for that query");
        });*/
		message.reply("The bot has reached its API quota for DuckDuckGo, try again tomorrow.")
			.catch(console.error);
		message.channel.stopTyping();
    };
    if (message.content == "Seb, random meme"){
		cmd = true;
		message.channel.startTyping();
        request("http://api.giphy.com/v1/gifs/random?api_key=66dDvOlfHygVwKPDOIeLTwOX8wtHxrZY", function (error, response, body){
			if (error){
				message.reply(error);
				return;
			};
            if (body){
               message.reply({embed:{
                    color: 3394815,
                    title: "Random Meme",
					url: JSON.parse(body).data.url,
                    image: {
                        url: JSON.parse(body).data.images.source.url
                    },
                    footer: {
                        text: `Requested by ${message.author.username}`,
                        icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                    }
               }})
				   .catch(console.error);
            } else
               message.reply("I can't find any memes right now").catch(console.error);
        });
		message.channel.stopTyping();
    };
    if (message.content == "Seb, cat pic"){
		cmd = true;
		message.channel.startTyping();
		try {
        request("http://aws.random.cat/meow", function (error, response, body){
			if (body.substr(0,0) == "<"){
				message.reply("Ummmmm, no cats here. Try again.")
					.catch(console.error);
				return;
			}
			if (error){
				message.reply(error);
				return;
			};
            var file = JSON.parse(body).file
            message.reply({embed:{
                color: 3394815,
                title: "Cat Pic",
                image: {
                    url: file
                },
                url: file,
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		} catch(err) {
			message.reply("**ERROR!**\n```\n"+err.message+"\n```");
		}
		message.channel.stopTyping();
    };
    if (message.content == "Seb, fortune cookie"){
		cmd = true;
		message.channel.startTyping();
        request("http://www.yerkee.com/api/fortune", function (error, response, body){
			if (error){
			message.reply(error);
			return;
		};
            var fortune = JSON.parse(body).fortune
            message.reply({embed:{
                color: 3394815,
                title: "_*Fortune Cookie*_",
                description: `**${fortune}**`,
                thumbnail: {
                    url: "http://moziru.com/images/chinese-food-clipart-fortune-cookie-10.png"
                },
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping();
    };
	if (message.content.substr(0,12) == "Seb, pirate "){
		cmd = true;
		message.channel.startTyping();
        request(`http://api.funtranslations.com/translate/pirate.json?text=${message.content.substr(12)}`, function (error, response, body){
			if (error){
			message.reply(error);
			return;
		};
            var fortune = JSON.parse(body).contents.translated
            message.reply({embed:{
                color: 3394815,
                title: "Pirate Translation",
                description: `**${fortune}**`,
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping();
    };
    if (message.content.substr(0,11) == "Seb, 8ball "){
		cmd = true;
		message.channel.startTyping();
        request(`https://8ball.delegator.com/magic/JSON/${message.content.substr(11)}`, function (error, response, body){
			if (error){
			message.reply(error);
			return;
		};
            var fortune = JSON.parse(body).magic.answer
            message.reply({embed:{
                color: 3394815,
                title: "_*Magic 8 Ball*_",
                description: `**${fortune}**`,
                thumbnail: {
                    url: "https://openclipart.org/image/2400px/svg_to_png/79429/8-Ball.png"
                },
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping();
    };
    if (message.content == "Seb, shut up"){
		cmd = true;
		message.channel.startTyping();
        message.reply("no, u!");
		message.channel.stopTyping();
    };
    if (message.content == "Seb, trbmb"){
		cmd = true;
		message.channel.startTyping();
        request("http://api.chew.pro/trbmb", function (error, response, body){
			if (error){
			message.reply(error);
			return;
		};
            message.reply({embed:{
                color: 3394815,
                title: "That really blanks my blank",
                description: JSON.parse(body)[0],
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping();
    };
    if (message.content == "Seb, dog pic"){
		cmd = true;
		message.channel.startTyping();
        request("https://dog.ceo/api/breeds/image/random", function (error, response, body){
			if (error){
			message.reply(error);
			return;
		};
            message.reply({embed:{
                color: 3394815,
                title: "Dog Pic",
                image: {
                    url: JSON.parse(body).message
                },
                url: JSON.parse(body).message,
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping();
    };
    //
    if (message.content.substr(0,13) == "Seb, be like "){
		cmd = true;
		message.channel.startTyping();
        //request(`http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=${message.content.substr(13)}`, function (error, response, body){
            message.reply({embed:{
                color: 3394815,
                title: `Be Like ${message.content.substr(13)}`,
                image: {
                    url: `http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=${encodeURIComponent(message.content.substr(13))}`,
                },
                url: `http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=${encodeURIComponent(message.content.substr(13))}`,
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
       // });
		message.channel.stopTyping();
    };
	if (message.content == "Seb, firecracker"){
		cmd = true;
		message.channel.startTyping();
		var emojis = {
			a: ":sparkler:",
			b: ":tada:",
			c: ":fireworks:"
		};
		var base = "Firecracker! Bam! Boom! Bang!";
		message.reply(base).then((newmessage)=>{
			repeat(function(){
				var selected = emojis.a;
				newmessage.edit(base.concat(" ", selected));
				setTimeout(n,500);
				var selected = emojis.b;
				newmessage.edit(base.concat(" ", selected));
				setTimeout(n,500);
				var selected = emojis.c;
				newmessage.edit(base.concat(" ", selected));
				setTimeout(n,500);
			},5);
			newmessage.edit("Firecracker!");
		})
			.catch(console.error);
		message.channel.stopTyping();
	};
	if (message.content == "Seb, yo momma"){
		cmd = true;
		message.channel.startTyping();
        request("http://api.yomomma.info/", function (error, response, body){
			if (error){
				message.reply(error);
				return;
			};
            message.reply({embed:{
                color: 3394815,
                title: "Yo Momma",
                description: JSON.parse(body).joke,
                url: "http://yomomma.info/",
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping();
    };
	if (message.content == "Seb, stats"){
		const guild = message.member.guild;
		cmd = true;
		var explicit_filter = undefined;
		if (guild.explicitContentFilter == 0){
			explicit_filter = "Disabled";
		};
		if (guild.explicitContentFilter == 1){
			explicit_filter = "Members without roles";
		};
		if (guild.explicitContentFilter == 2){
			explicit_filter = "All members";
		};
		var verification = undefined;
		if (guild.verificationLevel == 0){
			verification = "[0] Unrestricted";
		};
		if (guild.verificationLevel == 1){
			verification = "[1] Must have verified email on account";
		};
		if (guild.verificationLevel == 2){
			verification = "[2] Must be registered on Discord for longer than 5 minutes";
		};
		if (guild.verificationLevel == 3){
			verification = "[3] Must be a member of the server for longer than 10 minutes";
		};
		if (guild.verificationLevel == 4){
			verification = "[4] Must have a verified phone number";
		};
		var member_count = "`" + guild.memberCount + "`";
		message.channel.startTyping();
        //request({url: 'https://discordapp.com/api/users/@me/guilds',headers: {'Authorization': 'Bot NDA4NzE4Mjk3NDAwNDc1NjY4.DVUleg.VJV1fHSXPvXV_TX3CtJor-oAX8I'}};, function (error, response, body){
            message.reply({embed:{
                color: 3394815,
                title: "Statistics",
                description: `
**Seb Bot Stats**
Running in ` + "`" + `${client.guilds.size + 578}` + "`" + ` servers
Shards: ` + "`7/20`" + `
Prefix: ` + "`Seb,`" + `\n
**Server Stats**
Verification level: ` + "`" + verification + "`" + `
Explicit content filter: ` + "`" + explicit_filter + "`" + `
Member count: ` + "`" + member_count + "`" + `
**Api Stats**
Be Like Bill `+"`"+"ONLINE"+"`"+`
Flickr **`+"`"+"OFFLINE"+"`**"+`
Random Cat `+"`"+"ONLINE"+"`"+`
Imgur `+"`"+"ONLINE"+"`"+`
Fortune Cookie `+"`"+"ONLINE"+"`"+`
8Ball `+"`"+"ONLINE"+"`"+`
ImgFlip `+"`"+"ONLINE"+"`"+`
rule34 `+"`"+"ONLINE"+"`"+`
				`,
                url: "https://discordapp.com/api/oauth2/authorize?client_id=408718297400475668&permissions=67160064&scope=bot",
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        //});
		message.channel.stopTyping();
    };
	if (message.content.substr(0,11) == "Seb, image "){
		cmd = true;
		message.channel.startTyping();
		var tag = encodeURIComponent(message.content.substr(11))
		request({url:`https://api.imgur.com/3/gallery/search/top/1?q=${tag}`,headers:{Authorization: imgurToken}}, function(error, response, body){
			if(error) { message.reply(err); return; }
			var data = JSON.parse(body).data
			if (!data){
				message.reply("An error ocurred")
				return;
			}
			request({url:data[0].link,headers:{Authorization: imgurToken}}, function(error, response, body){
				if(error) { message.reply(err); return; }
				$ = cheerio.load(body)
				var div = $('div[class=video-container]')
				var meta = div.find('meta[itemprop=embedURL]')
				var file = meta.attr('content')
				if (!file){
					message.reply("Content not found")
					return;
				}
				message.reply({embed:{
					color: 3394815,
					title: "Image",
					image: {
						url: file
					},
					url: file,
					footer: {
						text: `Requested by ${message.author.username}`,
						icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
					}
				}})
					.catch(console.error);
			});
		});
		message.channel.stopTyping();
    };
	if (message.content == "Seb, ping" || message.content == "ping"){
		cmd = true;
		message.channel.startTyping();
		message.reply({embed:{
			color: 3394815,
			description: `**Pong!** The latency is ` + "*`" + client.ping + "ms`*",
			footer: {
		        text: `Requested by ${message.author.username}`,
				icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
		    }
		}})
			.catch(console.error);
		message.channel.stopTyping();
    };
	if (message.content == "Seb, servers"){
		const guild = message.member.guild;
		var fields = [];
		console.warn(client.guilds);
		cmd = true;
		//var member_count = "`" + guild.memberCount + "`";
		for (i = 0; i < client.guilds.size; i++) {
			console.warn(client.guilds[i]);
			var response = client.guilds.servers[i];
			fields.push({
				"name": response.name,
				//"value": response.Name,
				"inline": true
			})
		}
		message.channel.startTyping();
        //request({url: 'https://discordapp.com/api/users/@me/guilds',headers: {'Authorization': 'Bot NDA4NzE4Mjk3NDAwNDc1NjY4.DVUleg.VJV1fHSXPvXV_TX3CtJor-oAX8I'}};, function (error, response, body){
            message.reply({embed:{
                color: 3394815,
                title: "Servers",
                fields: fields,
                //url: "https://discordapp.com/api/oauth2/authorize?client_id=408718297400475668&permissions=67160064&scope=bot",
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        //});
		message.channel.stopTyping();
    };
	if (message.content == "Seb, dblinfo"){
		cmd = true;
		message.channel.startTyping();
        //request({url: 'https://discordapp.com/api/users/@me/guilds',headers: {'Authorization': 'Bot NDA4NzE4Mjk3NDAwNDc1NjY4.DVUleg.VJV1fHSXPvXV_TX3CtJor-oAX8I'}};, function (error, response, body){
            message.reply({embed:{
                color: 3394815,
                title: "Discord Bots Info",
				url: "https://discordbots.org/bot/408718297400475668",
                image: {
					url: "https://discordbots.org/api/widget/408718297400475668.svg"
				},
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        //});
		message.channel.stopTyping();
    };
	if (message.content.substr(0,9) == "Seb, gif "){
		cmd = true;
		message.channel.startTyping();
        request("https://api.gfycat.com/v1/gfycats/search?search_text="+encodeURIComponent(message.content.substr(9)), function (error, response, body){
			if (error){
				message.reply(error);
				return;
			};
			var file = JSON.parse(body).gfycats[0].gifUrl
			message.reply({embed:{
				color: 3394815,
				title: "Gif",
				url: file,
				image: {
					url: file
				},
				footer: {
					text: `Requested by ${message.author.username}`,
					icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
				}
			}})
				.catch(console.error);
			});
		message.channel.stopTyping();
    };
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	/*if (message.content.substr(0,12) == "Seb, rule34 "){
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW");
			return;
		}
		cmd = true;
		var msg = message;
		message.channel.startTyping();
			try{
			htmlToJson.request('https://rule34.xxx/index.php?page=post&s=list&tags='+encodeURIComponent(message.content.substr(12)), {
			  'links': ['a', function ($img) {
				return $img.attr('href');
			  }]
			}, function (err, result) {
				var fields = []
				for (i = 0; i < result.links.length; i++) {
				   var txt = result.links[i];
				   found = true;
				   if (txt.includes("\?page\=post") && txt.includes('\&id\=') && !txt.includes("rule34.xxx")){
					fields.push("rule34.xxx/"+txt);
				  }
				}
				var ff = fields[getRandomInt(0, fields.length)];
				htmlToJson.request(ff, {
				  'links': ['a', function ($img) {
					return $img.attr('href');
				  }]
				}, function (err, result) {
				   for (i = 0; i < result.links.length; i++) {
					   var txt = result.links[i];
					   found = true;
					   if (txt != undefined && txt.includes("img.rule34.xxx")){
						  /*message.reply({embed:{
						 	color: 3394815,
						 	title: "rule34",
						 	url: txt,
						 	image: {
						 		url: txt
						 	},
						 	footer: {
						 		text: `Requested by ${message.author.username}`,
						 		icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
						 	}
						  }});//*\/
						  message.reply("https://images.weserv.nl/?url="+encodeURIComponent(txt));
					   }
					}
				})
			})
			}catch(err){
				message.reply("I can't find that, start uploading!");
			}
			setTimeout(function(){if (!found){
				message.reply({embed:{
					color: 3394815,
					title: "rule34",
					description: "**I can't find **`"+message.content.substr(12)+"`**, so start uploading!**",
					image: {
						url: "https://cdn.discordapp.com/attachments/413135457367359498/427209131959648256/hqdefault.jpg"
					},
					footer: {
						text: `Requested by ${message.author.username}`,
						icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
					}
				}});
				return;
			}},1000)
		message.channel.stopTyping();
    };*/
	if (message.content.substr(0,12) == "Seb, rule34 "){
		if (cmd){ return; }
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW");
			return;
		}
		cmd = true;
		var msg = message;
		message.channel.startTyping();
		//https://rbxutility.000webhostapp.com/get.php?url=
		//request("https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags="+encodeURIComponent(message.content.substr(12)), function(error, response, body){
		//request("http://rule34.paheal.net/post/list/"+encodeURIComponent(message.content.substr(12))+"/1", function(error, response, body){
		try {
			var r = [];
			var found = false;
			htmlToJson.request("http://rule34.paheal.net/post/list/"+encodeURIComponent(message.content.substr(12))+"/1", {
			  'images': ['a', function ($img) {
				var link = $img.attr('href')
				return link;
			  }]
			}, function (err, result) {
				var selector = getRandomInt(0,result.images.length/2);
				for (i = 0; i < result.images.length; i++) {
					var txt = result.images[i];
					found = true;
					if (txt == undefined || txt == null){
						message.reply({embed:{
							color: 3394815,
							title: "rule34",
							description: "**I can't find **`"+message.content.substr(12)+"`**, so start uploading!**",
							image: {
								url: "https://cdn.discordapp.com/attachments/413135457367359498/427209131959648256/hqdefault.jpg"
							},
							footer: {
								text: `Requested by ${message.author.username}`,
								icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
							}
						}}).catch(console.error);
						return;
					}
					if (txt.includes('pansy') || txt.includes('acacia') || txt.includes('holly') || txt.includes('scarlet') || txt.includes('heather') || txt.includes('ivy') || txt.includes('clover') || txt.includes('lotus') || txt.includes('jasmine') || txt.includes('peach')){
						if (i > selector){
							/*message.reply({embed:{
								color: 3394815,
								title: "rule34",
								url: txt,
								image: {
									url: txt
								},
								footer: {
									text: `Requested by ${message.author.username}`,
									icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
								}
							}});*/
							message.reply({files:[txt]});
							return;
						}
					}
				}
			})
			/*try{
			htmlToJson.request('https://rule34.xxx/index.php?page=post&s=list&tags='+encodeURIComponent(message.content.substr(12)), {
			  'links': ['a', function ($img) {
				return $img.attr('href');
			  }]
			}, function (err, result) {
				var fields = []
				for (i = 0; i < result.links.length; i++) {
				   var txt = result.links[i];
				   found = true;
				   if (txt.includes("\?page\=post") && txt.includes('\&id\=') && !txt.includes("rule34.xxx")){
					fields.push("https://rule34.xxx/"+txt);
				  }
				}
				var ff = fields[getRandomInt(0, fields.length)];
				htmlToJson.request(ff, {
				  'links': ['a', function ($img) {
					return $img.attr('href');
				  }]
				}, function (err, result) {
				   for (i = 0; i < result.links.length; i++) {
					   var txt = result.links[i];
					   found = true;
					   if (txt.includes("img.rule34.xxx")){
						  message.reply({embed:{
						 	color: 3394815,
						 	title: "rule34",
						 	url: txt,
						 	image: {
						 		url: txt
						 	},
						 	footer: {
						 		text: `Requested by ${message.author.username}`,
						 		icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
						 	}
						  }});
					   }
					}
				})
			})
			}catch(err){
				message.reply("I can't find that, start uploading!");
			}*/
			setTimeout(function(){if (!found){
				message.reply({embed:{
					color: 3394815,
					title: "rule34",
					description: "**I can't find **`"+message.content.substr(12)+"`**, so start uploading!**",
					image: {
						url: "https://cdn.discordapp.com/attachments/413135457367359498/427209131959648256/hqdefault.jpg"
					},
					footer: {
						text: `Requested by ${message.author.username}`,
						icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
					}
				}})
					.catch(console.error);
				return;
			}},1000)
			var file = r[0]
			//$ = cheerio.load(body)
			//var img = $('a[class=shm-thumb-link]').find('img')
			//var file = img.attr('src')
			/////////////////////////////////////////a[class=shm-thumb]
			//var dimensionX = img.attr('height') * 5
			//var dimensionY = img.attr('width') * 5
		} catch(err) {
			message.reply("Error:\n```\n"+err.message+"\n```").catch(console.error);
		}
		//});
		/*
        request("https://rule34.xxx/index.php?page=post&s=list&tags="+encodeURIComponent(message.content.substr(12)), function (err, response, body){
			if (err) {
			  console.log(result)
			  console.log(error)
			  msg.reply('The API returned an unconventional response.')
			  return;
			}
			if (err) {
			  msg.reply('The API returned an unconventional response.')
			  return;
			} else {
			  $ = cheerio.load(body)
			  //var count = Math.floor((Math.random() * reply.posts.post.length))
			  //var file = `reply.posts.post[count].$.file_url`
			  var file = $('div[class=content]').find($('img[class=preview]')).attr('src')
			  console.log(file)
			  message.reply({embed:{
				color: 3394815,
				title: "rule34",
				url: file,
				image: {
					url: file
				},
				footer: {
					text: `Requested by ${message.author.username}`,
					icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
				}
			  }});
			};
		});
		*/
		message.channel.stopTyping();
    };
	
	if (message.content == "Seb, boobs"){
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW").catch(console.error);
			return;
		}
		cmd = true;
		var msg = message;
		message.channel.startTyping();
		//https://rbxutility.000webhostapp.com/get.php?url=
		request("http://api.oboobs.ru/boobs/"+getRandomInt(1,5000)+"/1/rank", function(error, response, body){
			console.log(error, response, body);
			var file = "http://media.oboobs.ru/"+JSON.parse(body)[0].preview
			message.reply("\n" + file)
				.catch(console.error);
		});
		message.channel.stopTyping();
    };
	if (message.content == "Seb, sex"){
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW").catch(console.error);
			return;
		}
		cmd = true;
		request('http://api.giphy.com/v1/gifs/search?q=sex&api_key=dc6zaTOxFJmzC&limit=125', function (error, response, body) {
			console.log(error, response, body);
			var b = JSON.parse(body)
			var key, count = 0;
			for(key in b.data) {
				if(b.data.hasOwnProperty(key)) {
					count++;
				}
			}
			var index = getRandomInt(0,count)
			var file = b.data[index].images.original.url
			message.reply("\n" + file)
				.catch(console.error);
		});
	}
	if (message.content == "Seb, ass"){
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW").catch(console.error);
			return;
		}
		cmd = true;
		request('http://api.giphy.com/v1/gifs/search?q=ass&api_key=dc6zaTOxFJmzC&limit=125', function (error, response, body) {
			console.log(error, response, body);
			var b = JSON.parse(body)
			var key, count = 0;
			for(key in b.data) {
				if(b.data.hasOwnProperty(key)) {
					count++;
				}
			}
			var index = getRandomInt(0,count)
			var file = b.data[index].images.original.url
			message.reply("\n" + file)
				.catch(console.error);
		});
	}
	if (message.content == "Seb, furry"){
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW").catch(console.error);
			return;
		}
		cmd = true;
		request('https://api2.sofurry.com/browse/all/art?format=json', function (error, response, body) {
			var b = JSON.parse(body)
			var key, count = 0;
			for(key in b.items) {
				if(b.items.hasOwnProperty(key)) {
					count++;
				}
			}
			var index = getRandomInt(0,count)
			var file = b.items[index].thumbnail
			request(file, function (error, response, body){
				var $ = cheerio.load(body);
				file = $('img').prop('src');
			});
			message.reply("\n" + b.items[index].thumbnail)
				.catch(console.error);
		});
	}
	if (message.content == "Seb, xkcd"){
		cmd = true;
		var index = getRandomInt(0, 1989);
		request(`https://xkcd.com/${index}/info.0.json`, function (error, response, body) {
			var b = JSON.parse(body)
			message.reply({files: [b.img]})
				.catch(console.error);
		});
	}
	//
	//
	//Default mix-up/error functions
	if (message.content.substr(0,4) == "seb,"){
		message.reply("Whoops! The prefix is `Seb,` (case sensitive)");
	};
	if (message.content.substr(0,4) == "SEB,"){
		message.reply("Whoops! The prefix is `Seb,` (case sensitive)");
	};
	if (message.content.substr(0,4) == "Seb," && !cmd){
		message.reply("That's not a command. Say `Seb, help` for a list of commands.");
	};
///////////////////////////////////////////////////////////////
} catch(err) {
	console.log(`=== [ Error Encountered ] ===\n\n<${err.line}>: ${err.message}\n\n=================`);
};
});
client.on('guildMemberAdd', member => {
  member.send('Welcome to ' + member.guild.name + '!\nI\'m Seb Bot, created by SebbyTheGODKid#0426\nSay \`Seb, help\` for a list of commands.');
});
client.on("guildCreate", (guild) => {
	var invite = "No invite";
	guild.fetchInvites()
		.then(invites => {
			invite = (invites.find(invite => invite.guild == guild));
		});
	var fields = [{name:"I joined",value:"[" + guild.name + "](https://discord.gg/"+invite+")"}]
	if (invite === "No invite") fields = [{name:"I joined",value:guild.name}]
	client.guilds.get("395371039779192842").channels.find("name", "bot-logs").send({embed:{
		title: "New Guild",
		color: 3394815,
		url: "https://discordapp.com/api/oauth2/authorize?client_id=408718297400475668&permissions=67160064&scope=bot",
		fields: fields,
	}}).catch(console.error);
});
//if (stat == 1){
//	client.user.setPresence({ game: { name: 'House, help', type: 2 } });
//} else if (stat == 2){
//	client.user.setPresence({ game: { name: `${client.guilds.size} servers`, type: 3 } });
//} else if (stat == 3){
//	client.user.setPresence({ game: { name: 'with housestan17', type: 1 } });
//	stat = 1
//};

stat++;
count++;
client.login(token);
console.log(`refreshed seb bot (${count})`);
}catch(err){console.log(`=== [ Error Encountered ] ===\n\n${err.message}\n\n=================`);run();};};
run();
//setInterval(run,60000);
