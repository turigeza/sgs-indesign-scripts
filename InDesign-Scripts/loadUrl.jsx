function loadUrl(url, timeout) {

    var full_url = websiteProtocol + websiteUrl + url;
    var result = $$.Web.get(full_url, 1 /*text expected*/ );
    if(result.error){
        alert( result.error );
        return '';
    }

    return result.data;
}

function loadJson(url, timeout){
    var jsonString = loadUrl(url, timeout);
    //alert(jsonString);
    try{
        var json = JSON.parse(jsonString);
    }catch(err){
        alert('There was an error during the comunication to the server.' + jsonString);
    }

    return json;
}
