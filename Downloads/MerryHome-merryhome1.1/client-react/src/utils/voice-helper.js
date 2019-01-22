import PCRE  from "pcre-to-regexp";

export {searchRequest};

function searchRequest(recognitionText, requests){
    for(var plugin in requests){
        for(var  action in requests[plugin]){
           var keys = [];
           var re = PCRE("%^"+requests[plugin][action]+"$%ui", keys);
           var match = re.exec(recognitionText.trim());
           if(match){
                var data= mapKeysMatches(keys, match);
                return {"plugin": plugin,
                        "action": action,
                        "data": data };      
           }
        }
    }
    return null;
}


function mapKeysMatches(keys, match){
    var datas= {};
    for (var i = 0; i < keys.length; i++) {
      if ('string' === typeof keys[i]) {
        datas[keys[i]] = match[i + 1];
      }
    }
    return datas;
}
