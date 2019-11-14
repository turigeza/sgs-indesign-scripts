function generateIndexPages(win) {
    
    var year = win.years.selection.text ?  win.years.selection.text : 2017;
    var district = '';
    
    var data = loadData(district, year, '/events/guidebookdata/get_opening_index_data/');
    if(!data){
        alert('Data from the database was empty!')
        return;
    }

    var rs = openFile( baseFilePath+'/guidebooklisting_index.indt' );
    if(!rs){
        alert('The template was not found with the name '+guidebooklisting_index.indt);
        return false;
    }
    var doc = app.activeDocument;
    var frame =  doc.pages.item(0).textFrames.itemByName("MainTextFrame");
    if(!frame.isValid){
        'The MainTextFrame is missing out of the template!';
    }

    frame.contents = data['specific_date_list'];
    var tags = [
              { removeGrep: '\n', changeTo:""},
              { styleGrep: '(<new>).+?(</new>)', removeGrep: '(<\/*new>)', characterStyle:'listing_index_new'},
              { styleGrep: '(<months>).+?(</months>)', removeGrep: '(<\/*months>)', paragraphStyle:'listing_index_months'},
              { styleGrep: '(<dates>).+?(</dates>)', removeGrep: '(<\/*dates>)', paragraphStyle:'listing_index_date'},
              { styleGrep: '(<date_desc>).+?(</date_desc>)', removeGrep: '(<\/*date_desc>)', paragraphStyle:'listing_index_description'},
         ];
         
     replaceHtmlTagsWithStyles(doc, tags);
     alert('Finished! : )');
}