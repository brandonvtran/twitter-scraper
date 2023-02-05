// Topic: how dating affects how much a person is Tweeted about
// logic to scrape page page in a loop
let i = 1;
let dict = {};
let like_regex = /\b(\d+) Like|Likes\b/;
let retweet_regex = /\b(\d+) Retweet|Retweets\b/;
let reply_regex = /\b(\d+) Repl(ies|y)\. Reply\b/;
let time_regex =  /\btime datetime=\"(.*?)\">\b/;
let status_regex = /\b\/status\/(\d+)\b/;
            
function loop() {      
    setTimeout(function() {
        window.scrollBy(0,1000);
	let element = document.getElementsByClassName("css-1dbjc4n r-1iusvr4 r-16y2uox r-1777fci r-kzbkwu");
        for(let index=0; index<element.length; index++) {
            try {
	        let reply = element[index].innerHTML.match(reply_regex);
	        let like = element[index].innerHTML.match(like_regex);
	        let retweet = element[index].innerHTML.match(retweet_regex);
	        let time = element[index].innerHTML.match(time_regex);
	        let status = element[index].innerHTML.match(status_regex);
	        dict[element[index].innerText.split("\n")[1].concat("-"+time[1])] = {
		    "like":`${like[1]}`,
		    "reply":`${reply[1]}`,
		    "retweet":`${retweet[1]}`,
		    "time":`${time[1]}`,
		    "text":`${element[index].innerText}`,
		    "status":`${status[1]}`
	        };
           } 
           catch (error) {
	       console.log(error)
           }
        }
        i++;                
        if (i < 100000) {       
            loop();            
        }                      
    }, 500)
}
loop();

// logic to extract JSON to a text file
var dictstring = JSON.stringify(dict);
var myBlob = new Blob([dictstring], {type: 'text/plain'});
var url = window.URL.createObjectURL(myBlob);
var anchor = document.createElement("a");
anchor.href = url;
anchor.download = "tweets.txt";
anchor.click();
window.URL.revokeObjectURL(url);