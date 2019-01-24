const request = require('sync-request');

class MyPluginController {

    constructor(io){
        this.io = io;
    }

    postAction(req, res){
        var requestUrl="https://www.mangareader.net/";

        switch(req.params.actionId){

            case "exists":
                requestUrl += slugify(req.body.searchValue.toLowerCase());

                var wikiReq = request('GET', requestUrl,{cache:'file'});


                if(wikiReq.statusCode == 200){
                    var html = wikiReq.getBody('utf8');

                    var str = "class=\"mangaresultauthoritem\"";

                    var regex = new RegExp(str);

                    var found = html.match(regex);

                    if(found.length <= 0){
                        wikiReq.statusCode
                    }
                    var split = found[0].split("/");

                    var urls = requestUrl  + split[1] + "/" + split[2];

                    var test = request('GET', urls,{cache:'file'});

                    return wikiReq;
                }


                res.end(JSON.stringify({resultText: wikiReq}));
                break;
            case "lastChap":
                var name =  slugify(req.body.searchValue.toLowerCase());
                var url =  getUrl(requestUrl, name);

                res.end(JSON.stringify({resultText: url, tests: name}));

                break;
            case "showchap":
                var requestUrl="https://www.mangareader.net/";
                requestUrl += slugify(req.body.searchValue.toLowerCase());
                requestUrl += "/"+req.body.searchNum;
                //window.open(requestUrl,"_blank");
                //console.log(requestUrl);
                var wikiReq = request('GET', requestUrl,{cache:'file'});
                if(wikiReq.statusCode == "404"){
                    res.end(JSON.stringify({resultText: "pas de reponses"}));
                }
                else if(wikiReq.statusCode == "200"){
                    res.end(JSON.stringify({resultText: requestUrl }));
                }

                break;
            default:
                res.end(JSON.stringify({}));
                break;

        }
    }
}

function getUrl(requestUrl, name) {
    var url = requestUrl  + name;

    var wikiReq = request('GET', url,{cache:'file'});

    if(wikiReq.statusCode == 200){
        var html = wikiReq.getBody('utf8');

        var str = "href=\"\/" + name + "\/[0-9]{3}";

        var regex = new RegExp(str);

        var found = html.match(regex);

        var split = found[0].split("/");

        var urls = requestUrl  + split[1] + "/" + split[2];

        var test = request('GET', urls,{cache:'file'});

        return test;
    }else{
        return wikiReq;
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