 function replaceTemplateTags(myDoc, key, value){
        //app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
        //app.findGrepPreferences.findWhat = key;                   
        //app.changeGrepPreferences.changeTo = value;  
        //myDoc.changeGrep();
        //app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
        
        app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
        app.findChangeTextOptions.includeMasterPages = true;
        app.findTextPreferences.findWhat = key;                   
        app.changeTextPreferences.changeTo = value;  
        myDoc.changeText();
        app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
    }