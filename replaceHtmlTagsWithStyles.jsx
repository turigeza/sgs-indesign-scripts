 function replaceHtmlTagsWithStyles(myDoc, tags){
        var i = tags.length;
        while(i--){
                var characterStyle = null;
                var paragraphStyle = null;
                
                if(tags[i].characterStyle){
                    characterStyle = myDoc.characterStyles.itemByName(tags[i].characterStyle);
                    if(!characterStyle.isValid){
                         alert('The character style "'+tags[i].characterStyle+'" was not found within the document. Make sure it is not grouped and it exists.');
                         return;
                    }
                }
                
                if(tags[i].paragraphStyle){
                    paragraphStyle = myDoc.paragraphStyles.itemByName(tags[i].paragraphStyle);
                    if(!paragraphStyle.isValid){
                         alert('The paragraph style "'+tags[i].paragraphStyle+'" was not found within the document. Make sure it is not grouped and it exists.');
                         return;
                    }
                }
            
                if(tags[i].styleGrep){
                    // style text between tags
                    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
                    app.findGrepPreferences.findWhat = tags[i].styleGrep;
                    if(characterStyle){
                        app.changeGrepPreferences.appliedCharacterStyle = characterStyle;
                        myDoc.changeGrep();
                    }
                
                    if(paragraphStyle){
                        app.changeGrepPreferences.appliedParagraphStyle = paragraphStyle;
                        myDoc.changeGrep();
                    }
                }
            app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
        }
        
        var i = tags.length;
        while(i--){
                // remove tags
                app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
                app.findGrepPreferences.findWhat = tags[i].removeGrep;
                if(tags[i].removeSearchPs){
                    app.findGrepPreferences.appliedParagraphStyle = tags[i].removeSearchPs;
                }
                var changeTo = '';
                if(tags[i].changeTo){
                    changeTo = tags[i].changeTo
                }
                app.changeGrepPreferences.changeTo = changeTo;
                myDoc.changeGrep();
 
                app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
        }
    }

//replaceHtmlTagsWithStyles( app.activeDocument );