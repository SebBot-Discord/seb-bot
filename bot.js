var count = 0;
var cheerio = require('cheerio');
var stat = 0;
var ready = 0;
var setup = 0;
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
var Discord = require('discord.js');
var client = new Discord.Client();
const request = require('request')
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
var stat = 0;
 setInterval(function(){
	stat++;
	if (stat == 0){
		client.user.setPresence({ game: { name: 'Seb, help', type: 2 } });
	} else if (stat == 1){
		client.user.setPresence({ game: { name: `${client.guilds.size}	servers`, type: 3 } });
	} else if (stat == 2){
		client.user.setPresence({ game: { name: 'with Sebby', type: 1 } });
		stat = -1;
	}
},30000)
	//client.user.setPresence({ game: { name: 'with housestan17', type: 1 } });
  //stat = 1;
  //console.log("Finished!");
});
client.on('message', message => {
try {
	var cmd = false;
	if (message.content.substr(0,3) == "Seb"){
		if (message.member.guild.name == "Hebby"){
			if (message.channel.name != "bot-commands") if (message.channel.name != undefined){
				message.reply("Commands can only be used in #bot-commands and DMs").then((msg)=>{
					setTimeout(function(){
						msg.delete();
					}, 5000);
				});
				message.delete();
				return;
			};
		};
	};
    if (message == "Seb, help"){
		cmd = true;
		message.channel.startTyping();
        message.author.send({embed: {
            title: "ðŸ…’ðŸ…žðŸ…œðŸ…œðŸ…ðŸ…ðŸ…“ðŸ…¢",
            color: 3394815,
		description: "\n**Seb, invite**\n Get the link to invite Seb Bot to your server\n**Seb, help**\n Sends a list of commands\n**Seb, tell me a joke**\n Gives you a (not so) funny joke\n**Seb, search for {item}**\n Searches for {item} on google\n**Seb, tell me a fact about {number}**\n Gives you a random fact about {number}\n**Seb, random meme**\n Sends a random meme from imgflip\n**Seb, cat pic**\n Sends you an adorable cat picture from HTTP-Meow\n**Seb, fortune cookie**\n Reveal your true fate. The chinese are never wrong.\n**Seb, 8ball {question}**\n Test your luck.\n**Seb, trbmb**\n Generates a that really blank's my blank phrase\n**Seb, dog pic**\n Sends an adorable picture of a dog.\n**Seb, be like {name}**\n Generates a  be like bill image for {name}\n**Seb, firecracker**\n Amazing display of fireworks!\n**Seb, yo momma**\n Get an epic yo momma joke.\n**Seb, echo {msg}**\n Seb Bot will echo whatever you want!\n**Seb, stats**\n Shows the bot's status\n**Seb, image {query}**\n Searches for query with the flickr api\n**Seb, ping**\n Measures the latency of the bot\n**Seb, gif {query}**\n Searches for {query} on gfycat, then returns the first result\n:underage: **Seb, rule34 {query}**\n Searcges rule34 for {query}",
            footer: {
                text: "Seb Bot created by ð’ðžð›ð›ð²#0426",
                icon_url: "https://cdn.discordapp.com/avatars/408718297400475668/c7b9be183d4cf2029912533e3afc2e69.png"
            },
        }});
        message.reply("Check your DMs, I sent you a list of commands!");
		message.channel.stopTyping();
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
		}});
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
        }});
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
     }});
     } else
     message.reply("That number sucks!");
    });
	message.channel.stopTyping();
    };
    if (message.content.substr(0,16) == "Seb, search for "){
		cmd = true;
		message.channel.startTyping();
        var link = ('https://www.google.com/search?q=').concat(message.content.substr(16))
        message.reply({embed:{
        color: 3394815,
        title: "Google Search",
        provider: {
            name: "Google Search",
            url: link
        },
        footer: {
            text: `Requested by ${message.author.username}`,
            icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
        }
        }});
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
        }});
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
                    image: {
                        url: JSON.parse(body).image_original_url
                    },
                    footer: {
                        text: `Requested by ${message.author.username}`,
                        icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                    }
               }});
            } else
               message.reply("I can't find any memes right now");
        });
		message.channel.stopTyping();
    };
    if (message.content == "Seb, cat pic"){
		cmd = true;
		message.channel.startTyping();
        request("http://aws.random.cat/meow", function (error, response, body){
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
            }});
        });
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
            }});
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
            }});
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
            }});
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
            }});
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
            }});
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
		});
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
            }});
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
Running in ` + "`" + client.guilds.size + "`" + ` servers
Shards: ` + "`4/20`" + `
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
            }});
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
			request({url:data[0].link,headers:{Authorization: imgurToken}}, function(error, response, body){
				if(error) { message.reply(err); return; }
				$ = cheerio.load(body)
				var div = $('div[class=video-container]')
				var meta = div.find('meta[itemprop=embedURL]')
				var file = meta.attr('content')
				console.log(div)
				console.log(meta)
				console.log(file)
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
				}});
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
		}});
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
			});
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
            }});
        //});
		message.channel.stopTyping();
    };
	if (message.content.substr(0,9) == "Seb, gif "){
		if (!message.channel.nsfw){
			message.reply(":underage: This channel is not NSFW");
			return;
		}
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
			}});
			});
		message.channel.stopTyping();
    };
	if (message.content.substr(0,12) == "Seb, rule34 "){
		if (!message.channel.nsfw){
			message.reply(":underage: This channel is not NSFW");
			return;
		}
		cmd = true;
		var msg = message;
		message.channel.startTyping();
		//https://rbxutility.000webhostapp.com/get.php?url=
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
		message.channel.stopTyping();
    };																																																																																																													var nsfw = ['https://images-ext-1.discordapp.net/external/EdfKUPKJyFnpwIS1XsEg5Dxqs9YUj5HjejPD_1zbFN8/https/cdn.boobbot.us/Gifs/gif291.gif', 'https://images-ext-2.discordapp.net/external/Kki29Ze4XZyN7qUzdEMUsy48AII2Z1l7OhvLV4sIboM/https/cdn.boobbot.us/Gifs/gif643.gif', 'https://images-ext-1.discordapp.net/external/98Og-y3AwaqOHBbse9R--70kxr2PVERtbJ163VtMI98/https/cdn.boobbot.us/Gifs/gif459.gif', 'https://images-ext-1.discordapp.net/external/n35L5QA62j_RDOG7oek6VqNc0VjYRz4iC5nrd4eJaR0/https/cdn.boobbot.us/Gifs/gif473.gif', 'https://images-ext-1.discordapp.net/external/SbbAakQHuoz_FVQ1oiwjYT3BIPUGruCPNlzqGZm4ynM/https/cdn.boobbot.us/Gifs/gif835.gif', 'https://images-ext-2.discordapp.net/external/TAQ25XBvQuzh8UU85erfOzBfjR6aJgxUkJ6RNeWN_bo/https/cdn.boobbot.us/Gifs/gif610.gif', 'https://images-ext-2.discordapp.net/external/s9Xfo-tqLs1GxDS9VYelA6rCQ_cVYG5ew2d4o7oF-yg/https/cdn.boobbot.us/Gifs/gif638.gif', 'https://images-ext-2.discordapp.net/external/kBs4WaRA_56bqovUdrXIIPEWtuFb4z18mdyth2ySUXA/https/cdn.boobbot.us/Gifs/gif632.gif', 'https://images-ext-1.discordapp.net/external/mYXGOovRdUevu9pbxZzqHoe3du1Adr5gnp9z1wNmEZM/https/cdn.boobbot.us/Gifs/gif345.gif', 'https://images-ext-1.discordapp.net/external/YlP3ejdO60FvZZzu8j7gKVUY8Xxx4xhRE5Ivfvj8TxU/https/cdn.boobbot.us/Gifs/gif192.gif', 'https://images-ext-2.discordapp.net/external/4MWt5pt_UkpCSVuocXWvJnkrB2cCQNxdEH2eozBEGEA/https/cdn.boobbot.us/Gifs/gif982.gif']
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	if (message.content == "Seb, nsfw"){
		if (!message.channel.nsfw){
			message.reply(":underage: This channel is not NSFW");
			return;
		}
		cmd = true;
		var msg = message;
		message.channel.startTyping();
		var file = nsfw[getRandomInt(0,nsfw.size)]
		//https://rbxutility.000webhostapp.com/get.php?url=
		  message.reply({embed:{
			color: 3394815,
			title: "NSFW",
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
		message.channel.stopTyping();
    };
	//Default mix-up/error functions
	if (message.content.substr(0,4) == "seb,"){
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
  member.send('Welcome to ' + member.guild.name + '!\nI\'m Seb Bot, created by ð’ðžð›ð›ð²#0426\nSay \`Seb, help\` for a list of commands.');
});
//if (stat == 1){
//	client.user.setPresence({ game: { name: 'House, help', type: 2 } });
//} else if (stat == 2){
//	client.user.setPresence({ game: { name: `${client.guilds.size} servers`, type: 3 } });
//} else if (stat == 3){
//	client.user.setPresence({ game: { name: 'with housestan17', type: 1 } });
//	stat = 1
//};
if (setup == 0){
client.on('ready', () => {
/*setInterval(function(){
	if (ready == 1){
		if (stat == 1){
			client.user.setPresence({ game: { name: 'Seb, help', type: 2 } });
			stat = 2;
		};
		if (stat == 2){
			client.user.setPresence({ game: { name: `${client.guilds.size}	servers`, type: 3 } });
			stat = 3;
		};
		if (stat == 3){
			client.user.setPresence({ game: { name: 'with Sebby', type: 1 } });
			stat = 1;
		};
	};
},5000);*/
});
setup = 1;//NDA4NzE4Mjk3NDAwNDc1NjY4.DZLM3w.LqgF-e9s0FkiHskvE2XimreVyVI
};
stat++;
count++;
client.login(token);
console.log(`refreshed seb bot (${count})`);
}catch(err){console.log(`=== [ Error Encountered ] ===\n\n${err.message}\n\n=================`);};};
run();
//setInterval(run,60000);
