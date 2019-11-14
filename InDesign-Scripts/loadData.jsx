function loadData(district, year, url) {
    
    var url = websiteUrl + url +'?d=' + encodeURIComponent(district) + '&y=' + year;
    var respond = loadJson(url);
    if (respond.result !== 'ok') {
        var message = respond.messages[0] ? respond.messages[0] : 'Something gone wrong with getting the data from the website.';
        alert(message);
        return;
    }

    var data = respond.data;

    if (data.length == 0) {
        //alert('The website generated data was empty nothing has been done.');
        return false;
    }

    return data;
}