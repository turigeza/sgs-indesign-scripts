function openFile(path){
    var theFile = File(path);    
    if(!theFile.exists){
        alert('We are looking for a file which does not exist. Here:'+path);
        return false;
    }

    return app.open(theFile);
}