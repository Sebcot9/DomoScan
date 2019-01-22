const request = require('sync-request');

class MyPluginController {
    
    constructor(io){
            this.io = io;
    }
    
    postAction(req, res){
        switch(req.params.actionId){
            case "nextchap":
            case "anim":
                var requestUrl="https://www.mangareader.net/";
                requestUrl += slugify(req.body.searchValue.toLowerCase());
                //window.open(requestUrl,"_blank");
                //console.log(requestUrl);
                //var wikiReq = request('GET', requestUrl,{cache:'file'});
                //var response = wikiReq.getBody('utf8');
                console.log(response);
                //var textResponse= parseDataResponse(response);
                
                    res.end(JSON.stringify({resultText: requestUrl}));
                
                break;
            default:
                res.end(JSON.stringify({}));
                break;
            
        }
    }
}

function parseDataSend(data){
	if(data.indexOf(" ")){
		var pieces = data.split(" ");
		data="";
		for ( var i in pieces){
			if(pieces[i].length>3){
				data += pieces[i].charAt(0).toUpperCase();
				data += pieces[i].substr(1);
				/*if(i!==pieces.length - 1){
					data+="_";
				}*/
			}
		}
	}
	return data;
}

function parseDataResponse(response){
	if(response){
		if(response.query){
			for(var i in response.query.pages){
				if(response.query.pages[i].extract){
					if(response.query.pages[i].extract.indexOf('\n')!==-1){
						var textResponse= response.query.pages[i].extract.substr(0, response.query.pages[i].extract.indexOf('\n'));
					}else{
						var textResponse= response.query.pages[i].extract;
					}
					if(textResponse.length > 300){
							textResponse= textResponse.substr(0, textResponse.indexOf("."));
					}
					console.log(textResponse);
					return textResponse;
				}
			}
		}
		console.log(response);
	}
	return false;
}

function slugify(str)
{
    return str
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}

module.exports = MyPluginController;