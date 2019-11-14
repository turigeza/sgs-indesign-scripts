function generateLeaflets(win) {

    var year = win.years.selection.text ?  win.years.selection.text : 2017;

    if(!win.districts.selection){
        alert('You must select at least one district!');
        return;
    }

    var districts = win.districts.selection.join('|');

    var data = loadData(districts, year, '/events/guidebookdata/get_leaflet_data/' );
    if(!data){
        return;
        }

    var i = data.length;

    if(!openFile( baseFilePath+'/leaflet.indt' )){
        return;
        }
    var targetDocument = app.activeDocument;
    var targetFrame =  targetDocument.pages.item(0).textFrames.itemByName("MainTextFrame");
    var dateFrame =  targetDocument.pages.item(0).textFrames.itemByName("DateFrame");
    var openingTypesFrame =  targetDocument.pages.item(0).textFrames.itemByName("OpeningTypes");
    if(!targetFrame.isValid){
        alert('The MainTextFrame frame is not found with the document leaflet.indt.');
        return;
    }
    if(!dateFrame.isValid){
        alert('The DateFrame text frame is not found with the document leaflet.indt.');
        return;
    }

    if(!openingTypesFrame.isValid){
        alert('The OpeningTypes text frame is not found with the document leaflet.indt.');
        return;
    }
    if(!dateFrame.isValid){
        alert('The DateFrame text frame is not found with the document leaflet.indt.');
        return;
    }

    if(data.by_arrangment_list.length > 0){
        render_dates(data.by_arrangment_list);
        openingTypesFrame.contents = "Gardens open by arrangement\r";
        openingTypesFrame.texts[0].duplicate(LocationOptions.AT_BEGINNING, targetFrame);
    }
    if(data.daterange_list.length > 0){
        render_dates(data.daterange_list);
        openingTypesFrame.contents = "Gardens open on a regular basis\r";
        openingTypesFrame.texts[0].duplicate(LocationOptions.AT_BEGINNING, targetFrame);
    }
    if(data.specific_date_list.length > 0){
        render_dates(data.specific_date_list);
        openingTypesFrame.contents = "Gardens open on specific dates\r";
        openingTypesFrame.texts[0].duplicate(LocationOptions.AT_BEGINNING, targetFrame);
    }

    dateFrame.remove();
    openingTypesFrame.remove();
    replaceTemplateTags(targetDocument, '{ }', '');
    replaceTemplateTags(targetDocument, ', children free', '');


    function render_dates(data){

        var i = data.length;
        while( i-- ){
            var date = data[i];
            var j = date.listings.length;

            while(j--){
                var listing = date.listings[j];
                if(!openFile( baseFilePath+'/leaflet_listing.indt' )){ return ; }
                var sourceDocument = app.activeDocument;
                var sourceFrame = sourceDocument.pages.item(0).textFrames.itemByName("MainTextFrame");
                if(!sourceFrame.isValid){
                    alert('leaflet_listing.indt template is missing the MainTextFrame');
                    return;
                }

                replaceTemplateTags(sourceDocument, '{listing_name}', listing.name+'\t');
                replaceTemplateTags(sourceDocument, '{listing_description}', listing.description+'\r');
                replaceTemplateTags(sourceDocument, '0123456789', listing.icons);

                sourceFrame.texts[0].duplicate(LocationOptions.AT_BEGINNING, targetFrame);
                sourceDocument.close(SaveOptions.NO);
            }

            dateFrame.contents = date.date_description+'\r';
            dateFrame.texts[0].duplicate(LocationOptions.AT_BEGINNING, targetFrame);
        }
    }

    alert('Finished! : )');
}
