const ver = "1.0.5";
const changelog = `
- Seb, stats :: Updates
`;

const CONFIG_COMMAND_DELAY = 5;

var previous = null;
var voice = null;
var count = 0;
var cheerio = require('cheerio');
const fs = require('fs');
var ytdl = require('ytdl-core');
var voice = null;
var connection = null;
var senders = {};
const randomPuppy = require('random-puppy');
const os = require('os');
const upgraded = ["299708692129906692"];
const DiscordRPC = require("discord-rpc");
const Emojis = {
	"loading": "<a:load" + "er:448541225860071444>",
	"error": "<:error:448547930094305281>",
	"warning": "<:warn:448548444026437645>",
	"online": "<:online:448555851943510016>",
	"idle": "<:idle:448555750378176526>",
	"dnd": "<:dnd:448555580454469644>"
}
var limiters = {};
var stat = 0;
var ready = 0;
var setup = 0;
var Discord = require('discord.js');
var htmlToJson = require("html-to-json");
var client = new Discord.Client();
const gm = require("gm").subClass({imageMagick: true});
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
function jparsestring(str){
	if (str.startsWith("<")){
		console.error("JSON parse has failed (a)");
		return {};
	} else
		var result = {};
		try {
			result = JSON.parse(str);
		} catch(err) {
			console.error("JSON parse has failed (b)");
			return {};
		}
		return result;
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
var seconds = 0;
client.on('ready', () => {
ready = 1;
console.log("SebBot " + ver + " ready!");
client.guilds.get("395371039779192842").channels.find("name", "bot-logs").send({embed:{
	title: "Seb Bot has restarted",
    color: 3750201,
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
 setInterval(function(){ seconds++; }, 1000);
 setInterval(function(){
	client.user.setStatus("online");
	stat++;
	if (stat == 0){
		client.user.setPresence({ game: { name: 'with Sebby', type: 1 } });
	} else if (stat == 1){
		client.user.setPresence({ game: { name: `${client.guilds.size} servers`, type: 3 } });
	} else if (stat == 2){
		client.user.setPresence({ game: { name: 'Seb, help', type: 2 } });
		stat = -1;
	}
},30000)
setInterval(() => {
    dbl.postStats(client.guilds.size);
}, 1800000);
	//client.user.setPresence({ game: { name: 'with housestan17', type: 1 } });
  //stat = 1;
  //console.log("Finished!");
});
client.on('message', message => {
try {
	var cmd = false;
	if (message.content.substr(0,5) == "Seb, "){
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
		if (new Date().getTime() - limiters[message.author.id] < CONFIG_COMMAND_DELAY * 1000){
			var success = false;
			for (i = 0; i < upgraded.length; i++){ if (upgraded[i] == message.author.id) success = true; }
			if (!success){
				var timeleft = Math.floor((new Date().getTime() - limiters[message.author.id]) / 1000);
				message.reply({embed:{
					color: 3750201,
					title: "OH SNAP",
							fields: [{
								name: "YOU JUST GOT...",
								value: "__***RATELIMITED SON!!***__"
							}, {
								name: "._.",
								value: `Retry that command in ${timeleft} seconds.`
							}],
							image: {
								url: "https://i.imgur.com/jOs6J2C.gif"
							},
					 footer: {
					     text: `${message.author.username} got rekt`,
					     icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
					 }
				}}).catch();
				return;
			}
		} else limiters[message.author.id] = new Date().getTime();
	};
	//message.mentions.members[0];
	if (message.content.substr(0, 15) == "Seb, geninvite "){
		var guild = client.guilds.find("name", message.content.substr(15));
		guild.channels.array()[0].createInvite({maxAge:0, maxUses:0})
		  .then(invit_ => {
			message.reply("https://discord.gg/" + invit_.code)
			  .then(msg => {
				var condition = (reaction, user) => (reaction.emoji.name == '❌' || reaction.emoji.name == 'x') && user.id != client.user.id;
				msg.react("❌").catch();
				msg.createReactionCollector(condition, { time: 60000 })
				  .on('collect', r => msg.delete());
			  })
			  .catch(() => {
				message.reply(Emojis.error + " An error ocurred sending the invite");
			  });
		  })
		  .catch(() => {
			message.reply(Emojis.error + " I don't have permission to create invites!");
		  });
	}
	if (message.content.substr(0, 15) == "Seb, broadcast "){
		if (message.author.id != 0){
			message.reply("Loading...");
			return;
		}
		for (i = 0; i < client.guilds.size; i++){
			var guild = client.guilds.array()[i];
			guild
				.channels
				.find("id", `${guild.channels.first(1)
					    .toString()
					    .match(/\d+/gi)}`)
						.send(message.content.substr(15))
							.catch(console.err);
			message.reply("Done");
		}
	}
	if (message.content.substr(0, 12) == "Seb, avatar "){
		message.channel.startTyping();
		var user = message.member.guild.members.find("id", message.content.match(/\d+/));
		if (!user) message.reply("Mention someone!"); return;
		var url = user.user.avatarURL;
		gm(request(url))
			.resize(1024, 1024)
			.write("tmpimg.png", function (err) {
				if (err) console.log(err); return;
				message.reply({files:["tmpimg.png"]});
				message.channel.stopTyping(true);
			});
	}
	if (message.content == "Seb, discordstatus"){
		request("https://srhpyqt94yxb.statuspage.io/api/v2/summary.json", function (err, resp, bod){
			var fields = [];
			var txt = jparsestring(bod);
			var components = txt.components;
			for (i = 0; i < components; i++){
				var indicator = ":white_check_mark:";
				var indicator_text = "Broken";
				if (components[i].status != "operational") indicator = ":x:";
				if (components[i].status == "operational") indicator_text = "Operational";
				fields.push({
					name: `${indicator} **|** ${components[i].name}`,
					value: `${indicator_text}`
				});
			}
			var incidents = txt.incidents;
			var incident = "None";
			if (incidents[0]){
				incident = incidents[0].incident_updates.body;
			}
			message.reply({embed:{
                color: 3750201,
                title: "Discord Status",
				url: "https://status.discordapp.com/",
				fields: fields,
				description: `${txt.status.description}\n~~--------------------------~~\nLatest incident: ${incident}`,
                 footer: {
                     text: `Requested by ${message.author.username}`,
                     icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                 }
            }}).catch();
		});
	}
    if (message.content == "Seb, fprestart"){
	    if (message.author.id != 299708692129906692){
			message.reply("Haha, nice try");
			return;
		} else {
			message.reply("Forcing process restart...");
			setTimeout(function(){process.exit(143);}, 1000);
		}
    }
    if (message.content.substr(0, 10) == "Seb, eval "){
	    if (message.author.id != 299708692129906692){
			message.reply("Haha, nice try");
			return;
		} else {
			try {
				var out = eval(message.content.substr(10).replace("--silent", ""));
				if (message.content.match(/--silent/)){
					return;
				}
				message.reply({embed:{
					color: 3750201,
					title: "JavaScript Evaluated",
					description: "```css\nNo problems while running the code\n```\n*Output:*\n```cs\n# " + out + "\n```"
				}}).catch();
			} catch(output){
				message.reply({embed:{
					color: 3750201,
					title: "JavaScript Evaluation Error",
					description: "```http\n" + output + "\n```"
				}}).catch();
			}
		}
    }
    if (message == "Seb, help"){
		cmd = true;
		message.channel.startTyping();
        message.reply({embed: {
            title: "Seb Bot",
            color: 3750201,
	    description: `**Running SebBot ${ver}**\nSeb Bot is an open-source multi-purpose discord bot with many fun + NSFW commands. You can see a list of all the commands at **__https://sebbot.tk/__**. Join the support service to speak to the owner and request help: **__https://discord.gg/8MQx6J7/__**`,
            footer: {
                text: "Seb Bot created by SebbyTheGODKid#0426",
                icon_url: "https://cdn.discordapp.com/avatars/408718297400475668/c7b9be183d4cf2029912533e3afc2e69.png"
            },
        }})
			.catch(console.error);
		message.channel.stopTyping(true);
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
            color: 3750201,
			url: "https://discordapp.com/api/oauth2/authorize?client_id=408718297400475668&permissions=67160064&scope=bot",
			//description: "(**Invite**)[https://discordapp.com/api/oauth2/authorize?client_id=408718297400475668&permissions=67160064&scope=bot] **Seb Bot to your server**",
			footer: {
                text: `Say "Seb, help" for a list of commands`,
                icon_url: "https://cdn.discordapp.com/avatars/408718297400475668/c7b9be183d4cf2029912533e3afc2e69.png"
            },
		}})
			.catch(console.error);
		message.channel.stopTyping(true);
	};
    if (message == "Seb, tell me a joke"){
		cmd = true;
		message.channel.startTyping();
    request('https://icanhazdadjoke.com/slack', function (error, response, body) {
		if (error){
			message.reply(error);
			return;
		};
        var joke = jparsestring(body).attachments[0].text.replace("Dad","Seb Bot")
        message.reply({embed:{
            color: 3750201,
            title: "Seb Joke",
            description: joke,
            footer: {
                text: `Requested by ${message.author.username}`,
                icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
            }
        }})
			.catch(console.error);
    });
	message.channel.stopTyping(true);
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
        color: 3750201,
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
	message.channel.stopTyping(true);
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
        color: 3750201,
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
		message.channel.stopTyping(true);
    };
	if (message.content.substr(0,10) == "Seb, echo "){
		cmd = true;
		message.channel.startTyping();
        message.reply({embed:{
        color: 3750201,
        //title: "Google Search",
        description: `**ECHO:** ${message.content.substr(10)}`,
        footer: {
            text: `Requested by ${message.author.username}`,
            icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
        }
        }})
			.catch(console.error);
		message.channel.stopTyping(true);
	};
	//https://api.duckduckgo.com/?q=DuckDuckGo&format=json
	if (message.content.substr(0,9) == "Seb, ddg "){
		cmd = true;
		message.channel.startTyping();
        /*request("https://api.duckduckgo.com/?q="+message.content.substr(9)+"&format=json", function (error, response, body){
			var data = jparsestring(body).Results
			if (error){
				message.reply(error);
				return;
			};
            if (body){
               message.reply({embed:{
                    color: 3750201,
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
		message.channel.stopTyping(true);
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
                    color: 3750201,
                    title: "Random Meme",
					url: jparsestring(body).data.url,
                    image: {
                        url: jparsestring(body).data.images.source.url
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
		message.channel.stopTyping(true);
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
            var file = jparsestring(body).file
            message.reply({embed:{
                color: 3750201,
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
		message.channel.stopTyping(true);
    };
    if (message.content == "Seb, fortune cookie"){
		cmd = true;
		message.channel.startTyping();
        request("http://www.yerkee.com/api/fortune", function (error, response, body){
			if (error){
			message.reply(error);
			return;
		};
            var fortune = jparsestring(body).fortune
            message.reply({embed:{
                color: 3750201,
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
		message.channel.stopTyping(true);
    };
	if (message.content.substr(0,12) == "Seb, pirate "){
		cmd = true;
		message.channel.startTyping();
        request(`http://api.funtranslations.com/translate/pirate.json?text=${message.content.substr(12)}`, function (error, response, body){
			if (error){
			message.reply(error);
			return;
		};
            var fortune = jparsestring(body).contents.translated
            message.reply({embed:{
                color: 3750201,
                title: "Pirate Translation",
                description: `**${fortune}**`,
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping(true);
    };
    if (message.content.substr(0,11) == "Seb, 8ball "){
		cmd = true;
		message.channel.startTyping();
        request(`https://8ball.delegator.com/magic/JSON/${message.content.substr(11)}`, function (error, response, body){
			if (error){
			message.reply(error);
			return;
		};
            var fortune = jparsestring(body).magic.answer
            message.reply({embed:{
                color: 3750201,
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
		message.channel.stopTyping(true);
    };
    if (message.content == "Seb, shut up"){
		cmd = true;
		message.channel.startTyping();
        message.reply("no, u!");
		message.channel.stopTyping(true);
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
                color: 3750201,
                title: "That really blanks my blank",
                description: jparsestring(body)[0],
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping(true);
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
                color: 3750201,
                title: "Dog Pic",
                image: {
                    url: jparsestring(body).message
                },
                url: jparsestring(body).message,
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping(true);
    };
    //
    if (message.content.substr(0,13) == "Seb, be like "){
		cmd = true;
		message.channel.startTyping();
        //request(`http://belikebill.azurewebsites.net/billgen-API.php?default=1&name=${message.content.substr(13)}`, function (error, response, body){
            message.reply({embed:{
                color: 3750201,
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
		message.channel.stopTyping(true);
    };
	if (message.content == "Seb, firecracker"){
		message.reply("That command has been removed"); return;
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
		message.channel.stopTyping(true);
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
                color: 3750201,
                title: "Yo Momma",
                description: jparsestring(body).joke,
                url: "http://yomomma.info/",
                footer: {
                    text: `Requested by ${message.author.username}`,
                    icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                }
            }})
				.catch(console.error);
        });
		message.channel.stopTyping(true);
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
		var nums = {"0":":zero:","1":":one:","2":":two:","3":":three:","4":":four:","5":":five:","6":":six:","7":":seven:","8":":eight:","9":":nine:"};
		var minutes = (Math.floor(seconds/60));
		var hours = (Math.floor(minutes/60));
		var days = (Math.floor(hours/24));
		var time = `${days} days **|** ${hours} hours **|** ${minutes} minutes **|** ${seconds} seconds`.replace(/[0-9]/g, function (x) {
                    return nums[x];
                });
                message.reply({embed:{
                  color: 3750201,
                  title: "Statistics",
                  description: `
**Seb Bot Stats**
Running in ` + `${client.guilds.size}` + ` servers
Running for ` + `:clock1: ${time}` + `
Endianness: ` + "`" + (os.endianness() == "LE" ? "Little Endian" : "Big Endian") + "`" + `
CPU: ` + os.cpus()[0].model + `
Platform: ` + os.platform() + `
Shard: ` + "`NaN`" + `
Prefix: ` + "`Seb,`" + `\n
**Server Stats**
Verification level: ` + "`" + verification + "`" + `
Explicit content filter: ` + "`" + explicit_filter + "`" + `
Member count: ` + "`" + member_count + "`" + `\n
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
		message.channel.stopTyping(true);
    };
	if (message.content.substr(0,11) == "Seb, image "){
		cmd = true;
		message.channel.startTyping();
		var tag = encodeURIComponent(message.content.substr(11))
		request({url:`https://api.imgur.com/3/gallery/search/top/1?q=${tag}`,headers:{Authorization: imgurToken}}, function(error, response, body){
			if(error) { message.reply(err); return; }
			var data = jparsestring(body).data
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
					color: 3750201,
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
		message.channel.stopTyping(true);
    };
	if (message.content == "Seb, ping"){
		cmd = true;
		message.channel.startTyping();
		message.reply({embed:{
			color: 3750201,
			description: `**Pong!** The latency is ` + "*`" + client.ping + "ms`*",
			footer: {
		        text: `Requested by ${message.author.username}`,
				icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
		    }
		}})
			.catch(console.error);
		message.channel.stopTyping(true);
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
                color: 3750201,
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
		message.channel.stopTyping(true);
    };
	if (message.content == "Seb, dblinfo"){
		cmd = true;
		message.channel.startTyping();
        //request({url: 'https://discordapp.com/api/users/@me/guilds',headers: {'Authorization': 'Bot NDA4NzE4Mjk3NDAwNDc1NjY4.DVUleg.VJV1fHSXPvXV_TX3CtJor-oAX8I'}};, function (error, response, body){
            message.reply({embed:{
                color: 3750201,
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
		message.channel.stopTyping(true);
    };
	if (message.content.substr(0,9) == "Seb, gif "){
		cmd = true;
		message.channel.startTyping();
        request("https://api.gfycat.com/v1/gfycats/search?search_text="+encodeURIComponent(message.content.substr(9)), function (error, response, body){
			if (error){
				message.reply(error);
				return;
			};
			var file = jparsestring(body).gfycats[0].gifUrl
			message.reply({embed:{
				color: 3750201,
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
		message.channel.stopTyping(true);
    };
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	if (message.content.substr(0,13) == "Seb, rule34b "){
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW");
			return;
		}
		message.channel.startTyping();
		cmd = true;
		try {
			var r = [];
			var found = false;
			htmlToJson.request("https://rule34.xxx/index.php?page=post&s=list&tags=" + encodeURIComponent(message.content.substr(13)), {
			  'images': ['a', function ($img) {
				var link = $img.attr('href')
				return link;
			  }]
			}, function (err, result) {
				console.log(result);
				var selector = getRandomInt(0,result.images.length);
				for (i = 0; i < result.images.length; i++) {
					var txt = result.images[i];
					found = true;
					if (txt == undefined || txt == null){
						console.log("err")
                    }
					if (txt.includes("\&s\=view")){
						if (i > selector){
                            htmlToJson.request("https://rule34.xxx/" + txt, {
                            'images': ['img', function ($img) {
                             var link = $img.attr('src')
                             return link;
                            }]
                            }, function (err, result) {
                                console.log(result.images[3])
                            })
                            return;
						}
					}
				}
			})
        }catch(err){}
	message.channel.stopTyping(true);
    };
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
							color: 3750201,
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
								color: 3750201,
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
						 	color: 3750201,
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
					color: 3750201,
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
				color: 3750201,
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
		message.channel.stopTyping(true);
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
			var file = "http://media.oboobs.ru/"+jparsestring(body)[0].preview
			message.reply("\n" + file)
				.catch(console.error);
		});
		message.channel.stopTyping(true);
    };
	if (message.content == "Seb, sex"){
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW").catch(console.error);
			return;
		}
		cmd = true;
		request('http://api.giphy.com/v1/gifs/search?q=sex&api_key=dc6zaTOxFJmzC&limit=125', function (error, response, body) {
			console.log(error, response, body);
			var b = jparsestring(body)
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
			var b = jparsestring(body)
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
		message.channel.startTyping();
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW").catch(console.error);
			return;
		}
		cmd = true;
		request('https://sheri.fun/api/v1/yiff', function (error, response, body) {
			var b = jparsestring(body).url
			message.reply({files:[b]})
				.catch(console.error);
		});
		message.channel.stopTyping(true);
	}
	if (message.content == "Seb, hentai"){
		if ((!message.channel.nsfw) && (message.channel.id != 402320341420212224)){
			message.reply(":underage: This channel is not NSFW").catch(console.error);
			return;
		}
		message.channel.startTyping();
		randomPuppy("HENTAI_GIF").then(url => {
			message.reply({files:[url]})
			  .catch((err) => {
				if (err.code == 40005){
					message.reply({embed:{color: 3750201,fields:[{name:"** Error **",value:"File too large to be shown, click [here](" + url + ") to view it"}]}});
				} else {
					console.error(err);
				}
			  });
		});
		message.channel.stopTyping(true);
	}
	if (message.content == "Seb, xkcd"){
		cmd = true;
		var index = getRandomInt(0, 1989);
		request(`https://xkcd.com/${index}/info.0.json`, function (error, response, body) {
			var b = jparsestring(body)
			message.reply({files: [b.img]})
				.catch(console.error);
		});
	}
	if (message.content == "Seb, news"){
		cmd = true;
		message.channel.startTyping();
		var tag = encodeURIComponent(message.content.substr(11))
		request.get({
			url: "https://api.nytimes.com/svc/topstories/v2/home.json",
			qs: {
				'api-key': "3c04bc2b825f4f419bfc6d368d661049"
			}
		}, function(error, response, body){
			if(error) { message.reply(err); return; }
			var data = jparsestring(body).results[0]
			if (!data){
				message.reply("An error ocurred")
				return;
			}
			message.reply({embed:{
				color: 3750201,
				fields: [
					{
						name: "Top Story",
						value: "[" + data.title + "](" + data.url + ")",
						inline: false
					},
					{
						name: "Description",
						value: "*" + data.abstract + "*",
						inline: false
					},
					{
						name: "Authors",
						value: data.byline,
						inline: true
					},
					{
						name: "Category",
						value: data.section,
						inline: true
					}
				],
				url: file,
				footer: {
					text: `Requested by ${message.author.username}`,
					icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
				}
			}})
				.catch(console.error);
		});
		message.channel.stopTyping(true);
    };
	if (message.content.substr(0, 13) == "Seb, crazyimg"){
		message.channel.startTyping();
		var img = undefined;
		var msg = message.content;
		if (message.attachments.length != 1){
			img = msg.replace(/https/g, "http").match(/http:\/\/\S+\.\w+/gi);
			if (!img){
				message.reply("Please attach an image file or supply an image URL as the second argument\ne.g. Seb, crazyimg http://example.com/image.png");
				return;
			}
			img = img[0];
		} else {
			img = message.attachments[0].url;
		}
		var load = null;
		message.channel.send(Emojis.loading + " Processing image, please wait...")
			.then((msg) => load = msg);
		var name = 'output-' + message.author.id + '.PNG';
		gm(request(img))
			.flip()
			.magnify()
			.rotate('green', 0)
			.blur(7, 3)
			.edge(3)
			.resize(1024, 1024)
			.stroke("#ffffff")
			.font("Dense-Regular.ttf", 130)
			.drawText(5, 5, "Generated with Seb Bot")
			.write('tmpimg.png', function (err) {
			  if (!err) console.log('done');
			  message.reply({files:['tmpimg.png']}).catch(console.error);
			  message.channel.stopTyping(true);
			  load.delete();
			  return;
			});
		//load.edit(Emojis.error + " Image processing failed");
	}
	if (message.content.substr(0, 9) == "Seb, blur"){
		var load = null;
		message.channel.send(Emojis.loading + " Processing image, please wait...")
			.then((msg) => load = msg);
		message.channel.startTyping();
		var img = undefined;
		var msg = message.content;
		if (message.attachments.length != 1){
			img = msg.replace(/https/g, "http").match(/http:\/\/\S+\.\w+/gi);
			if (!img){
				message.reply("Please attach an image file or supply an image URL as the second argument\ne.g. Seb, crazyimg http://example.com/image.png");
				return;
			}
			img = img[0];
		} else {
			img = message.attachments[0].url;
		}
		var name = 'output-' + message.author.id + '.PNG';
		var setting = message.content.match(/-size \d+/gi)[0];
		if (setting){ setting = message.content.match(/-size \d+/gi)[0].substr(6); } else { setting = 7; }
		gm(request(img.replace(/-size \d+/, "")))
			.blur(setting + 4, setting)
			//.resize(1024, 1024)
			.stroke("#ffffff")
			.font("Dense-Regular.ttf", 130)
			.drawText(0, 0, "Generated with Seb Bot")
			.write('tmpimg.png', function (err) {
			  if (!err) console.log('crazyimg done');
			  message.reply({files:['tmpimg.png']}).catch(console.error);
			  message.channel.stopTyping(true);
			  load.delete();
			});
	}
	if (message.content.substr(0, 10) == "Seb, merge"){
		var load = null;
		message.channel.send(Emojis.loading + " Processing image, please wait...")
			.then((msg) => load = msg);
		message.channel.startTyping();
		var img = undefined;
		var img2 = undefined;
		var msg = message.content;
		if (message.attachments.length != 1){
			img = msg.replace(/https/g, "http").match(/http:\/\/\S+\.\w+/gi);
			if (img.length != 2){
				message.reply("Please provide two image links to merge");
				return;
			}
			img2 = img[1];
			if (!img){
				message.reply("Please attach an image file or supply an image URL as the second argument\ne.g. Seb, crazyimg http://example.com/image.png");
				return;
			}
			img = img[0];
		} else {
			img = message.attachments[0].url;
		}
		var name = 'output-' + message.author.id + '.PNG';
		gm(request(img))
			.append(request(img2))
			//.resize(1024, 1024)
			.stroke("#ffffff")
			.font("Dense-Regular.ttf", 130)
			.drawText(0, 0, "Generated with Seb Bot")
			.write('tmpimg.png', function (err) {
			  if (!err) console.log('done');
			  message.reply({files:['tmpimg.png']}).catch(console.error);
			  message.channel.stopTyping(true);
			  load.delete();
			});
	}
	if (message.content.substr(0, 12) == "Seb, cowsay "){
		message.channel.startTyping();
		request("http://cowsay.morecode.org/say?message=" + encodeURIComponent(message.content.substr(12)) + "&format=json", function (err, resp, bod){
			var txt = jparsestring(bod).cow;
			message.reply({embed:{
				color: 3750201,
				title: "The Cow Says",
				description: "```\n" + txt + "\n```"
			}});
		})
		message.channel.stopTyping(true);
	}
//	 ////////////////////////////==============\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//      //////////////////////////// Voice Things \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//	\\\\\\\\\\\\\\\\\\\\\\\\\\\\===============/////////////////////////////////
	if (message.content === 'Seb, join') {
	  var loader = null;
	  if (message.member.voiceChannel) {
            message.reply(Emojis.loading + " Connecting...").then((msg) => loader = msg);
	    message.member.voiceChannel.join()
	    .then(_connection => { // Connection is an instance of VoiceConnection
	      senders[message.member.guild.id] = message.author.id;
	      connection = _connection;
	      voice = message.member.voiceChannel;
	      message.reply('Connected to ' + message.member.voiceChannel.name + "!");
	      setTimeout(function(){loader.delete()}, 500);
	      return;
	    })
	    .catch((err) => {
		    message.reply(Emojis.error + " I can't connect to this channel!");
		    return;
	    });
	  } else {
	    message.reply(Emojis.error + ' Join a voice channel!');
	  }
	}
	if (message.content === 'Seb, leave') {
	  var loader = null;
	  if (senders[message.member.guild.id] == message.author.id) {
            message.reply(Emojis.loading + " Disconnecting...").then((msg) => loader = msg);
	    if (voice){ voice.leave(); } else { message.reply(Emojis.error + " I'm not in a voice channel"); }
	  } else {
	    message.reply(Emojis.error + ' Only the person who added Seb Bot to the voice channel can do this');
	  }
	}
	if (message.content.startsWith('Seb, play')) {
		if (!voice){ message.reply(Emojis.error + " I'm not in a voice channel, say `Seb, join` first"); return; }
		var file = message.content.substr(10);
		var loader = null;
		var mp = null;
		console.log("audio: " + file);
		if (file.includes("youtube") || file.includes("youtu.be")){ //youtube
			message.reply(Emojis.loading + " Loading audio...").then((msg) => loader = msg);
			var stream = ytdl(file, { filter : 'audioonly' });
			message.reply("Playing audio");
			var dispatcher = connection.playStream(stream, {seek: 0, volume: 1})
			    dispatcher.setVolume(0.5);
			    dispatcher.on("end", end => {
				console.log("left channel");
				voice.leave();
			    });
			message.reply("Playing video");
			setTimeout(function(){loader.delete()}, 500);
		} else if (file.match(/\S+.\S+/)){ //file
			message.reply(Emojis.loading + " Loading audio...").then((msg) => loader = msg);
			var dispatcher = connection.playArbitraryInput(file);
			    dispatcher.setVolume(0.5);
			    dispatcher.on("end", end => {
				console.log("left channel");
				voice.leave();
			    });
			  message.reply("Playing file");
			setTimeout(function(){loader.delete()}, 500);
		} else
			message.reply(Emojis.error + " Please specify a file link or youtube video url");
			return;
	}
///////////////////////////////////////////////////////////////
	if (message.content.startsWith("Seb,")){
	  console.log("[" + message.member.guild.name + " @ " + message.channel.name + "]: {Author " + message.author.username + ", Bot? " + message.author.bot + ", Message '" + message + "', MessageLength " + message.content.length);
	}
///////////////////////////////////////////////////////////////
} catch(err) {
	console.log(`=== [ Error Encountered ] ===\n\n<${err.line}>: ${err.message}\n\n=================`);
	message.reply(Emojis.error + " An error ocurred!\n```fix\n" + err.message + "\n```\n");
};
});
client.on('guildMemberAdd', member => {
  if(member.guild.id == 264445053596991498) return;
  member.send('Welcome to ' + member.guild.name + '!\nI\'m Seb Bot, created by SebbyTheGODKid#0426\nSay \`Seb, help\` for a list of commands.');
});
client.on("guildCreate", (guild) => {
	var invite = "No invite";
	guild.channels.array()[0].createInvite({maxAge:0, maxUses:0})
	.then(invit_ => { invite = invit_ })
	.catch(console.error);
	var fields = [{name:"I joined",value:"[" + guild.name + "](https://discord.gg/"+invite+")" + " | " + guild.id}]
	if (invite === "No invite") fields = [{name:"I joined",value:guild.name+" | "+guild.id}]
	client.guilds.get("395371039779192842").channels.find("name", "bot-logs").send({embed:{
		title: "New Guild",
		color: 3750201,
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
process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", err => {
  console.log(err);
});
