const ver = "1.2.7";
const changelog = `
Seb, play :: Now accepts text instead of a link
`;

const CONFIG_COMMAND_DELAY = 5;

var previous = null;
var voice = null;
var count = 0;
var cheerio = require('cheerio');
const fs = require('fs');
var ytdl = require('ytdl-core');
var cats = require("cats-js");
var catapi = new cats();
var voice = null;
var connection = null;
var senders = {};
const randomPuppy = require('random-puppy');
const os = require('os');
var upgraded = ["299708692129906692"];
const DiscordRPC = require("discord-rpc");
const Emojis = {
	"loading": "<a:load" + "er:448541225860071444>",
	"error": "<:error:448547930094305281>",
	"warning": "<:warn:448548444026437645>",
	"online": "<:online:448555851943510016>",
	"idle": "<:idle:448555750378176526>",
	"dnd": "<:dnd:448555580454469644>",
	"partyparrot": "<a:party_parrot:449602721369030657>"
}
const ksoft = process.env.KSOFT_TOKEN;
var voiceNotif = null;
var playlist = [];
var limiters = {};
var stat = 0;
var ready = 0;
var setup = 0;
var Discord = require('discord.js');
var htmlToJson = require("html-to-json");
var client = new Discord.Client();
const gm = require("gm").subClass({imageMagick: true});
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, { webhookPort: 5000, webhookAuth: process.env.WHPW });
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(vote);
  upgraded.push(vote.id);
});
const request = require('request')
//const dbl = new DBL(process.env.DBL_TOKEN, client);
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
function youtubeSearchEngine(query){
    return new Promise(function(fulfill, reject){
        request("https://www.youtube.com/results?search_query=" + encodeURIComponent(query), function(e, r, b){
            var $ = cheerio.load(b);
            var _results = $('img[data-ytimg="1"]').slice(9, 14);
            var results = $('img[data-ytimg="1"]').toArray().slice(9, 14);
            var names = $('a[class="ytd-video-renderer"]');
            var end = [];
            var __results = [];
            _results.each(function(i, elem) {
              __results[i] = $(this);
            });
            for(i = 0; i < results.length; i++){
                var r = results[i];
                var link = "https://youtube.com" + r.parent.parent.parent.attribs.href;
                var thumb = r.attribs.src//.match(/https:\/\/i.ytimg.com\/vi\/\w+\/\w+.\w+/gi)[0];
                var _t = r.parent.parent.parent.parent.parent.children[1].children[0];
                var title = _t.children[0].attribs.title;
                var dur = __results[i].parent().children('.video-time').text();
                end.push({title: title, link: link, thumbnail: thumb, duration: dur});
            }
            fulfill(end);
        });
    });
}
function googleSearchEngine(query){
    return new Promise(function(fulfill, reject){
        request("https://www.google.com/search?q=" + encodeURIComponent(query) + "&source=lnms&sa=X&ved=0ahUKEwiz8LWY67bbAhUizlkKHSBYBbMQ_AUICSgA&biw=1536&bih=770&dpr=1.25", function(e, r, b){
            var $ = cheerio.load(b);
            var results = $("h3[class=r]").toArray();
            var end = [];
            for (i = 0; i < results.length; i++){
                var selection = results[i].children[0];
                var link = selection.attribs.href.replace("/url?q=", "");
                var title = selection.parent.children[0].children[0].data;
                end.push({link: link, title: title});
            }
            end = end.slice(1);
            fulfill(end);
        });
    });
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
function startAsyncTasks(){
	//none
}
client.on('ready', () => {
startAsyncTasks();
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
//setTimeout(() => { message.chanenl.stopTyping(true) }, 10000);
try {
	if (message.content.substr(0, 10) == "Seb, eval "){
	    if (message.author.id != 299708692129906692 && message.author.id != client.user.id){
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
	if (message.author.bot){ return; }
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
								name: `Retry that command in ${timeleft} seconds.`,
								value: "Vote [here](https://discordbots.org/bot/408718297400475668/vote) to remove this limitation"
							}],
							image: {
								width: 512,
								height: 512,
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
	var args = message.content.match(/\S+/g);
	if (message.content.startsWith("s!kick")){
		var user = message.member.guild.members.find("id", message.content.match(/\d+/)[0]);
		var reason = args.slice(2).join(" ");
		if (!user){
			message.reply(Emojis.error + " User not found, did you follow the format? (`s!kick @User#1337 reason here`)");
			return;
		}
		if (!user.bannable){
			message.reply(Emojis.error + " I don't have permission to kick this user. Please give me the **`Administrator`** permission so I can manage members.");
			return;
		}
		var uname = user.username;
		user.user.send("You have been kicked from " + message.member.guild.name + ", reason:\n**```\n" + reason + "\n```**").catch();
		setTimeout(function(){user.kick()
  		  .then(() => {message.reply(`Successfully kicked user`)})
		  .catch(() => {message.reply(Emojis.warning + " I can't kick this user")});}, 2000);
	}
	if (message.content.startsWith("s!ban")){
		var user = message.member.guild.members.find("id", message.content.match(/\d+/)[0]);
		var reason = args.slice(2).join(" ");
		if (!user){
			message.reply(Emojis.error + " User not found, did you follow the format? (`s!ban @User#1337 reason here`)");
			return;
		}
		if (!user.bannable){
			message.reply(Emojis.error + " I don't have permission to ban this user. Please give me the **`Administrator`** permission so I can manage members.");
			return;
		}
		var uname = user.username;
		user.user.send("You have been banned from " + message.member.guild.name + ", reason:\n**```\n" + reason + "\n```**").catch();
		setTimeout(function(){user.ban()
  		  .then(() => {message.reply(`Successfully banned user`)})
		  .catch(() => {message.reply(Emojis.warning + " I can't ban this user")});}, 2000);
	}
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
	if (message.content == "Seb, avatar"){
		message.channel.startTyping();
		//var user = message.member.guild.members.find("id", message.content.match(/\d+/));
		//if (!user) message.reply("Mention someone!"); return;
		var url = message.author.avatarURL;
		gm(request(url))
			.resize(1024, 1024)
			.write("tmpimg.png", function (err) {
				if (err) console.log(err); return;
				message.reply({files:["tmpimg.png"]});
				message.channel.stopTyping(true);
			});
	}
	if (message.content == "Seb, lenny"){
		message.channel.startTyping();
		request("https://api.lenny.today/v1/random", function(e,r,b){
		    message.reply("**`" + JSON.parse(b)[0].face + "`**");
		});
		message.channel.stopTyping();
	}
	if (message.content == "Seb, wikihow"){
		message.channel.startTyping();
		request({url:"https://api.ksoft.si/meme/random-wikihow",headers:{"Authorization": ksoft}}, function(e,r,b){
			var json = JSON.parse(b);
			message.channel.send({embed:{
				color: 3750201,
				title: json.title,
				url: json.article_url,
				image: {
					url: json.url
				},
				footer: {
				     text: `Requested by ${message.author.username}`,
				     icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
				 }
			}});
		});
		message.channel.stopTyping();
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
			message.reply(Emojis.loading + " Forcing process restart...");
			setTimeout(function(){process.exit(143);}, 1000);
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
	    		.then(() => {
				if (message.member.hasPermission("MANAGE_GUILD")){
					message.reply({embed: {
					    title: "Moderator Commands",
					    color: 3750201,
					    description: "```yml"+`
"s!kick <@user> <reason>":
  - Kicks <user> from the server with reason <reason>
"s!ban <@user> <reason>":
  - Bans <user> from the server with reason <reason>
`+"```",
					    footer: {
						text: "Seb Bot created by SebbyTheGODKid#0426",
						icon_url: "https://cdn.discordapp.com/avatars/408718297400475668/c7b9be183d4cf2029912533e3afc2e69.png"
					    },
					}})
				}
			})
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
	     catapi.get().then((cat) => {
                    message.reply({embed:{
                        color: 3750201,
                        title: "Cat Pic",
                        image: {
                            url: cat.images.image.url
                        },
                        url: cat.images.image.url,
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
			//.resize(1024, 1024)
			.write('tmpimg.png', function (err) {
			  if (!err) console.log('done');
			  message.reply({files:['tmpimg.png']}).catch(console.error);
			  message.channel.stopTyping(true);
			  load.delete();
			  return;
			});
		//load.edit(Emojis.error + " Image processing failed");
	}
	if (message.content.startsWith("Seb, oil")){
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
			.paint(3)
			.write('tmpimg.png', function (err) {
			  if (!err) console.log('done');
			  message.reply({files:['tmpimg.png']}).catch(console.error);
			  message.channel.stopTyping(true);
			  load.delete();
			  return;
			});
		//load.edit(Emojis.error + " Image processing failed");
	}
	if (message.content.substr(0, 10) == "Seb, sepia"){
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
			.sepia()
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
			.write('tmpimg.png', function (err) {
			  if (!err) console.log('done');
			  message.reply({files:['tmpimg.png']}).catch(console.error);
			  message.channel.stopTyping(true);
			  load.delete();
			});
	}
	if (message.content.substr(0, 17) == "Seb, achievement "){
		var load = null;
		var texts = message.content.match(/\S+|\S+/g).join(" ").replace("Seb, achievement ", "").split("|");
		var topText = texts[0];
		var bottomText = texts[1];
		if (!topText || !bottomText){
			message.reply(Emojis.error + " Please format your command like so: `Seb, achievement <top text>|<bottom text>`");
			return;
		}
		message.channel.send(Emojis.loading + " Generating image, please wait...")
			.then((msg) => load = msg);
		message.channel.startTyping();
		var img = undefined;
		var img2 = undefined;
		var msg = message.content;
		var name = 'output-' + message.author.id + '.PNG';
		var selector = getRandomInt(0, 39);
		gm(request(`https://www.minecraftskinstealer.com/achievement/a.php?i=${selector}&h=${topText}&t=${bottomText}`))
			.write('tmpimg.png', function (err) {
			  if (!err) console.log('done');
			  message.reply({files:['tmpimg.png']}).catch(console.error);
			  message.channel.stopTyping(true);
	      		  setTimeout(function(){load.delete()}, 500);
			});
	}
	if (message.content.substr(0, 12) == "Seb, qrcode "){
		var load = null;
		var text = encodeURIComponent(message.content.substr(12));
		message.channel.send(Emojis.loading + " Generating qrcode, please wait...")
			.then((msg) => load = msg);
		message.channel.startTyping();
		var msg = message.content;
		var name = 'output-' + message.author.id + '.PNG';
		gm(request(`https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${text}`))
			.write('tmpimg.png', function (err) {
			  if (!err) console.log('done');
			  message.reply({files:['tmpimg.png']}).catch(console.error);
			  message.channel.stopTyping(true);
	      		  setTimeout(function(){load.delete()}, 500);
			});
	}
	if (message.content.startsWith("Seb, edge")){
		var load = null;
		message.channel.send(Emojis.loading + " Processing image, please wait...")
			.then((msg) => load = msg);
		message.channel.startTyping();
		var img = undefined;
		var msg = message.content;
		img = msg.replace(/https/g, "http").match(/http:\/\/\S+\.\w+/gi);
		if (!img){
			message.reply("Please attach an image file or supply an image URL as the second argument\ne.g. Seb, crazyimg http://example.com/image.png");
			return;
		}
		img = img[0];
		var name = 'output-' + message.author.id + '.PNG';
		gm(request(img.replace(/-size \d+/, "")))
			.edge(10)
			//.resize(1024, 1024)
			.write('tmpimg.png', function (err) {
			  if (!err) console.log('crazyimg done');
			  message.reply({files:['tmpimg.png']}).catch(console.error);
			  message.channel.stopTyping(true);
			  load.delete();
			});
	}
	//Seb, eval gm(request(`https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=yash&t=herllo`))
	//.write("temp.png", function(){
	//setTimeout(function(){message.reply({files:["temp.png"]});},1000);
	//});
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
	if (message.content == "Seb, partyparrots"){
		message.channel.send(Emojis.partyparrot.repeat(50));
	}
//	 ////////////////////////////==============\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\	\\
//      //////////////////////////// Voice Things \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\	\\
//	\\\\\\\\\\\\\\\\\\\\\\\\\\\\===============/////////////////////////////////	\\
	if (message.content === 'Seb, join') {
	  var loader = null;
	  if (message.member.voiceChannel) {
	    if (voice){
		    message.reply(Emojis.warning + " I'm already in a voice channel!");
		    return;
	    }
            message.reply(Emojis.loading + " Connecting...").then((msg) => loader = msg);
	    message.member.voiceChannel.join()
	    .then(_connection => { // Connection is an instance of VoiceConnection
	      senders[message.member.guild.id] = message.author.id;
	      connection = _connection;
	      voiceNotif = message.channel;
	      voice = message.member.voiceChannel;
	      playlist = [];
	      message.reply('Connected to ' + message.member.voiceChannel.name + "!");
	      setTimeout(function(){loader.delete()}, 500);
	      setInterval(() => {
	      	if (voice.members.size < 2){
	      		voice.leave();
	      		voice = null;
	      		voiceNotif.send(Emojis.warning + " I left the voice channel because I was all alone.");
	      		voiceNotif = null;
	      		return;
	      	}
	      	if (!voice) { console.log("voice channel null"); return; }
	      }, 1000);
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
            message.reply(Emojis.loading + " Disconnecting...").then((msg) => { voice = null; loader = msg });
	    if (voice){ voice.leave(); setTimeout(function(){ loader.delete(); }, 500); message.reply("Disconnected successfully!"); } else { message.reply(Emojis.error + " I'm not in a voice channel"); }
	  } else {
	    message.reply(Emojis.warning + ' Only the person who added Seb Bot to the voice channel can do this');
	  }
	}
	/*if (message.content.startsWith('Seb, play')) {
		if (!voice){ message.reply(Emojis.error + " I'm not in a voice channel, say `Seb, join` first"); return; }
		//if (senders[message.member.guild.id] != message.author.id){ message.reply(Emojis.warning + " Only the person controlling Seb Bot, " + message.member.guild.members.find('id', senders[message.member.guild.id]).username + ", can change the song."); }
		var file = message.content.substr(10);
		var loader = null;
		var mp = null;
		console.log("audio: " + file);
		var first = true;
		var callback = (end) => {
		    if (playlist.length < 2){
			console.log("left channel");
			voice.leave();
			message.reply(Emojis.warning + " Since the playlist ended, I left the voice channel");
			voice = null;
		    } else {
			    if (first){
				    playlist.shift();
				    first = false;
			    }
			    console.log( playlist.shift() );
			    console.log("loading next");
			    var pl = playlist[0];
			    var dispatcher = connection.playStream(ytdl(pl));
				dispatcher.setVolume(0.5);
		    		dispatcher.on("end", callback);
			    console.log("now playing: " + playlist[0]);
			    voiceNotif.send(":loud_sound: Now playing: " + playlist[0]);
		    }
		}
		if (file.includes("youtube") || file.includes("youtu.be")){ //youtube
			message.reply(Emojis.loading + " Loading audio...").then((msg) => loader = msg);
			var stream = ytdl(file, { filter : 'audioonly' });
			if (file.includes(",")){
				if (senders[message.member.guild.id] != message.author.id){ message.reply(Emojis.warning + " Only the person controlling Seb Bot, " + message.member.guild.members.find('id', senders[message.member.guild.id]).username + ", can change the que."); return; }
				playlist = file.replace(/\n/g, "").replace(/ /g, "").split(",");
				playlist.shift();
				voice.leave();
			    	console.log("now playing: " + playlist[0]);
				voiceNotif.send(":loud_sound: Now playing: " + playlist[0]);
				setTimeout(() => {
					voice.join();
					connection.playStream(ytdl(playlist[0]), {seek: 0, volume: 1})
						  .on("end", callback);
					message.reply("Set playlist");
				}, 1000);
				return;
			}
			if (playlist.length > 0){
				console.log("playlist is here");
				playlist.push(file);
				message.reply(":loud_sound: Added to que");
				setTimeout(function(){loader.delete()}, 500);
				return;
			}
			try{playlist.shift()}catch(er){console.log("nothing to shift")};
			//playlist.push("skipped");
			var dispatcher = connection.playStream(stream, {seek: 0, volume: 1})
			    dispatcher.setVolume(0.5);
			    dispatcher.on("end", callback);
			message.reply("Playing video");
			setTimeout(function(){loader.delete()}, 500);
		} else
			message.reply(Emojis.error + " Please specify a youtube video url");
			return;
	}*/
	if (message.content == 'Seb, que') {
		message.channel.startTyping();
		var fields = [];
		var pl = playlist.slice(0, 5);
		var thumb = playlist[0] ? playlist[0].thumbnail : "https://images.emojiterra.com/mozilla/512px/1f50a.png"
		for (i = 0; i < pl.length; i++){
			var link = pl[i];
			fields.push({name:`${i + 1}`,value:`[${link.name}](${link.url})`});
		}
		if (fields.length == 0){
			fields = [{
				name: "Oops!",
				value: "[There are no songs in the que](https://sebbot.tk/ErrorAPI?!=There%20are%20no%20songs%20in%20the%20que)"
			}]
		}
		message.reply({embed:{
			title: "Up Next",
			color: 3750201,
			fields: fields,
			thumbnail: {
				url: thumb
			},
			footer: {
			     text: `Requested by ${message.author.username}`,
			     icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
			}
		}});
		message.channel.stopTyping(true);
	}
	if (message.content.startsWith('Seb, play')) {
		if (!voice){ message.reply(Emojis.error + " I'm not in a voice channel, say `Seb, join` first"); return; }
		//if (senders[message.member.guild.id] != message.author.id){ message.reply(Emojis.warning + " Only the person controlling Seb Bot, " + message.member.guild.members.find('id', senders[message.member.guild.id]).username + ", can change the song."); }
		var _file = message.content.substr(10);
		var loader = null;
		var mp = null;
		console.log("audio: " + file);
		function c_run(file){
			message.reply(Emojis.loading + " Loading audio...").then((msg) => loader = msg);
			var stream = ytdl(file, { filter : 'audioonly' });
			if (playlist.length > 0){
				console.log("playlist is here");
				var title = "PaTCH Error";
				var thumb = "";
				request(file, function(e, r, b){
				    var $ = cheerio.load(b);
				    title = $('title').text().replace(" - YouTube", "");
				    thumb = $("meta[property='og:image']").attr('content');
				});
				playlist.push({name:title,url:file,thumbnail:thumb});
				message.reply(":loud_sound: Added to que");
				setTimeout(function(){loader.delete()}, 500);
				return;
			}
			try{playlist.shift()}catch(er){console.log("nothing to shift")};
			playlist.push({name:"skipped",url:"_blank"});
			var first = true;
			var dispatcher = connection.playStream(stream, {seek: 0, volume: 1})
			    dispatcher.setVolume(0.5);
			    var callback = (end) => {
				    if (playlist.length < 2){
					console.log("left channel");
					voice.leave();
					message.reply(Emojis.warning + " Since the playlist ended, I left the voice channel");
					voice = null;
				    } else {
					    if (first){
						    playlist.shift();
						    first = false;
					    }
					    console.log( playlist.shift() );
					    console.log("loading next");
					    var dispatcher = connection.playStream(ytdl(playlist[0].url));
			    			dispatcher.setVolume(0.5);
				    		dispatcher.on("end", callback);
					    console.log("now playing: " + playlist[0]);
					    voiceNotif.send(":loud_sound: Now playing: " + playlist[0].url);
				    }
			    }
			    dispatcher.on("end", callback);
			message.reply(":loud_sound: Playing video");
			setTimeout(function(){loader.delete()}, 500);
			setInterval(function(){
				if (voice.members.size == 1){
					voice.leave();
					voice = null;
					voiceNotif = null;
					voiceNotif.send(Emojis.warning + " I left the voice channel because I was all alone");
					return;
				}
				if (!voice) { console.log("voice channel null"); return; }
			}, 1000);
		}
		if (_file.includes("youtube") || _file.includes("youtu.be")){ //youtube
			c_run(_file);
		} else {
			youtubeSearchEngine(_file).then((r) => {
				var fields = [];
				for (i = 0; i < r.length; i++){
					fields.push({
						name: `${i + 1}`,
						value: `[${r[i].title}](${r[i].link}) | ${r[i].duration}`
					});
				}
				message.reply({embed:{
					title: `"${_file}"`,
					color: 3750201,
					fields: fields
				}}).then((msg) => {
					var condition = (reaction, user) => user.id == message.author.id;
					var remoji = process.env.REMOJI.split(",");
					msg.react(remoji[0]).catch(() => {message.channel.send("Can't react, aborting process");return;});
					setTimeout(() => { msg.react(remoji[1]) }, 500);
					setTimeout(() => { msg.react(remoji[2]) }, 1000);
					setTimeout(() => { msg.react(remoji[3]) }, 1500);
					setTimeout(() => { msg.react(remoji[4]) }, 2000);
					msg.createReactionCollector(condition, { time: 15000 })
					  .on('collect', (_r) => {
						console.log(_r.emoji.name);
						var emoji = _r.emoji.name;
						var selected = 0;
						if (emoji == remoji[0]){
							selected = r[0];
							console.log(emoji, 1);
						} else if (emoji == remoji[1]){
							selected = r[1];
							console.log(emoji, 2);
						} else if (emoji == remoji[2]){
							selected = r[2];
							console.log(emoji, 3);
						} else if (emoji == remoji[3]){
							selected = r[3];
							console.log(emoji, 4);
						} else if (emoji == remoji[4]){
							selected = r[4];
							console.log(emoji, 5);
						}
						console.log(selected);
						message.reply({embed:{
							title: `${selected.title}`,
							url: selected.link,
							color: 3750201,
							description: `${selected.duration}`,
							thumbnail: {
								url: `${selected.thumbnail}`
							}
						}});
						c_run(selected.link);
						msg.delete();
					  });
				});
			});
		}
	}
///////////////////////////////////////////////////////////////
	if (message.content.startsWith("Seb,")){
	  try {
		  console.log("[" + message.member.guild.name + " @ " + message.channel.name + "]: {Author " + message.author.username + ", Bot? " + message.author.bot + ", Message '" + message + "', MessageLength " + message.content.length);
	  } catch(e) { }
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
