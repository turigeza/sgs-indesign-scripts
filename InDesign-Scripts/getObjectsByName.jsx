function getObjectsByName(myDoc, name){
    
    var items = myDoc.allPageItems;
    var i = items.length;  
    var found = {};
    if(typeof name === 'string'){
        while (i--){
            if (items[i].name == name){
                 return items[i];
            } 
        } 
        return false;
    }else if(typeof name === 'object'){
         while (i--){
            if (name[items[i].name]){
                 found[items[i].name] = items[i];
            } 
        } 
        
        return found;
    }
}