function generateGuidebookListingsCoverPage(win) {
    
    var year = win.years.selection.text ?  win.years.selection.text : 2017;
    if(!win.districts.selection){
        alert('You must select at least one district!');
        return;
    }
    
    win.districts.selection;
    var k = win.districts.selection.length;
    while(k--){
        var district = win.districts.selection[k];
        var data = loadData(district, year, '/events/guidebookdata/get_district_cover_data_for_book/');
        if(!data){
            return;
            }
        
        var rs = openFile( baseFilePath+'/guidebooklisting_cover.indt' );
        if(!rs){
            return false;
        }
        var doc = app.activeDocument;
        
        replaceTemplateTags(doc, '{region_name}', data.region_name);
        replaceTemplateTags(doc, '{district_name}', data.district_name);
        replaceTemplateTags(doc, '{volunteers_list}', data.volunteers_list);
        replaceTemplateTags(doc, '{specific_date_list}', data.specific_date_list);
        replaceTemplateTags(doc, '{daterange_list}', data.daterange_list);
        replaceTemplateTags(doc, '{by_arrangment_list}', data.by_arrangment_list);
    }

    alert('Finished! : )');
}