function generateGuidebookListings(win) {
    var year = win.years.selection.text ?  win.years.selection.text : 2017;
     if(!win.districts.selection){
        alert('You must select at least one district!');
        return;
    }
    
    win.districts.selection;
    var k = win.districts.selection.length;
    
    while(k--){
        var district = win.districts.selection[k];
        generateGuidebookListingsSingle(district, year);
    }

    alert('Finished! : )');
}

function generateGuidebookListingsSingle(district, year) {
    var region_name = loadData(district, year,  '/events/guidebookdata/get_region_name_public/' );
    if(!region_name){
        alert('The region name was empty for '+district);
    }
    
    var data = loadData(district, year,  '/events/guidebookdata/get_district_data_for_book/' );
    if(!data){
        //alert('The website sent no data for the '+district);
        return;
        }
    
    var i = data.length;
    
    var rs = openFile( baseFilePath+'/district.indt' );
    if(!rs){
        return;
    }
    var targetDocument = app.activeDocument;
    var targetFrame =  targetDocument.pages.item(0).textFrames.itemByName("AllDistrictDescriptionTextFrame");
    if(!targetFrame.isValid){
        alert('The AllDistrictDescriptionTextFrame frame is not found with the document district.indt.');
        return;
    }

    replaceTemplateTags(targetDocument, '{region_name}', region_name);
    replaceTemplateTags(targetDocument, '{district_name}', district.text);
    
    while( i-- ){
        
        var rs = openFile( baseFilePath+'/guidebooklisting.indt' );
        if(!rs){
            return;
        }
        var sourceDocument = app.activeDocument;
        var sourceFrame = sourceDocument.pages.item(0).textFrames.itemByName("MainTextFrame");
        if(!sourceFrame.isValid){
            alert('guidebooklisting.indt template is missing the MainTextFrame');
            return;
        }
        
        var row = data[i];
        row.guidebooklisting_phone_label = row.guidebooklisting_phone ? 'T: ' : '';
        row.guidebooklisting_phone = row.guidebooklisting_phone ? row.guidebooklisting_phone+'  ': '';
        row.guidebooklisting_email_label = row.guidebooklisting_email ? 'E: ' : '';
        row.guidebooklisting_email = row.guidebooklisting_email ? row.guidebooklisting_email+'  ': '';
        row.guidebooklisting_website_label = row.guidebooklisting_website ? 'W: ' : '';
        row.guidebooklisting_national_plant_collection = row.guidebooklisting_national_plant_collection ? row.guidebooklisting_national_plant_collection+'.': '';
        row.guidebooklisting_champion_trees = row.guidebooklisting_champion_trees ?  row.guidebooklisting_champion_trees + '.' : '';
        row.guidebooklisting_national_plant_collection_label = row.guidebooklisting_national_plant_collection ? '\nNational Plant Collection:  ': '';
        row.guidebooklisting_champion_trees_label = row.guidebooklisting_champion_trees ? '\nChampion Trees:  ': '';
        
        
        var name_end = (!row.guidebooklisting_address && !row.guidebooklisting_postcode) ? '^p' : '';
        var postcode_end = (!row.guidebooklisting_email && !row.guidebooklisting_phone && !row.guidebooklisting_opener_name) ? '^p' : '';
        var email_end = !row.guidebooklisting_website ? '^p' : '';
        
        var toReplace = [
            {datakey:'guidebooklisting_formated_description', template_key: '{formated_description}'},
            {datakey:'guidebooklisting_name', template_key: '{name}'+name_end},
            {datakey:'guidebooklisting_feature_icons', template_key: '0123456789'},
            {datakey:'guidebooklisting_opener_name' , template_key: '{opener_name}'},
            {datakey:'guidebooklisting_address', template_key: '{address}'},
            {datakey:'guidebooklisting_postcode', template_key: '{postcode}'+postcode_end},
            {datakey:'guidebooklisting_other_details', template_key: '{other_details}'},
            {datakey:'guidebooklisting_directions', template_key: '{directions}'},
            {datakey:'guidebooklisting_number', template_key: '$$'},
            {datakey:'guidebooklisting_charity_description', template_key: '{charity_description}'},
            {datakey:'guidebooklisting_national_plant_collection', template_key: '{national_plant_collection}'},
            {datakey:'guidebooklisting_national_plant_collection_label', template_key: 'National Plant Collection:  '},
            {datakey:'guidebooklisting_champion_trees', template_key: '{champion_trees}'},
            {datakey:'guidebooklisting_champion_trees_label', template_key: 'Champion Trees:  '},
            {datakey:'guidebooklisting_openings_description', template_key: '{openings_description}'},
            {datakey:'guidebooklisting_phone', template_key: '{phone}'},
            {datakey:'guidebooklisting_phone_label', template_key: '{T: }'},
            {datakey:'guidebooklisting_email', template_key: '{email}'+email_end},
            {datakey:'guidebooklisting_email_label', template_key: '{E: }'},
            {datakey:'guidebooklisting_website', template_key: '{website}'},
            {datakey:'guidebooklisting_website_label', template_key: '{W: }'},
        ];
        
        var j = toReplace.length;
        while(j--){
            var r = toReplace[j];
            
            if(typeof  row[r.datakey] != 'string'){
                alert(field+' was missing out of the data '+typeof str);
                }
            var str = row[r.datakey];
            replaceTemplateTags(sourceDocument, r.template_key, str);
            }
        
        var tags = [
              { removeGrep: '~b~b+', changeTo:"\r" },
              { removeGrep: '(<br />)', changeTo:"\r" },
              { removeGrep: '(<br>)', changeTo:"\r" },
              { removeGrep: '<div class="soft_return">', changeTo:"\n"},
              { removeGrep: '<div class=”hard_return”>', changeTo:"\r"},
              { removeGrep: "\r", removeSearchPs: 'guidebooklisting_formated_description'},
              { styleGrep: '(<i>).+?(</i>)', removeGrep: '(<\/*i>)', characterStyle:'html_italic'},
              { styleGrep: '(<b>).+?(</b>)', removeGrep: '(<\/*b>)', characterStyle:'html_bold'},
              { removeGrep: '<div class=”gardens_1”>' },
              { removeGrep: '<span class=”garden_name_1”>' },
              { removeGrep: '<span class=”garden_description_1”>' },
              { styleGrep: '(<span class="garden_description_2">).+(</span>)', removeGrep: '(<\/*span( class="garden_description_2")*>)'},
              { styleGrep: '(<span class="garden_description_3">).+(</span>)', removeGrep: '(<\/*span( class="garden_description_3")*>)'},
              { styleGrep: '(<span class="garden_description_4">).+(</span>)', removeGrep: '(<\/*span( class="garden_description_4")*>)'},
              { removeGrep: '(<\/*div( class="gardens_2")*>)' },
              { removeGrep: '(<\/*div( class="gardens_3")*>)' },
              { removeGrep: '(<\/*div( class="gardens_4")*>)' },
              { styleGrep: '(<span class="garden_name_2">).+(</span>)', removeGrep: '(<\/*span( class="garden_name_2")*>)', characterStyle:'guidebooklisting_garden_name'},
              { styleGrep: '(<span class="garden_name_3">).+(</span>)', removeGrep: '(<\/*span( class="garden_name_3")*>)', characterStyle:'guidebooklisting_garden_name'},
              { styleGrep: '(<span class="garden_name_4">).+(</span>)', removeGrep: '(<\/*span( class="garden_name_4")*>)', characterStyle:'guidebooklisting_garden_name'},
         ];
         
        replaceHtmlTagsWithStyles(sourceDocument, tags);
        sourceFrame.texts[0].duplicate(LocationOptions.AT_BEGINNING, targetFrame);
        sourceDocument.close(SaveOptions.NO);
        }
}