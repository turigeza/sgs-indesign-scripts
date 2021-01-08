function bookDialog(action){
       if(!baseFilePath){
            var settings = readSettings();
            if(settings["baseFilePath"] != null){
                baseFilePath = settings["baseFilePath"];
            }
       }

       if(!checkFolders()){
            return;
        }

        var respond = loadJson('/events/guidebookdata/get_districts/');
        var districts = respond.data;
        var years = generateSelectableYears();

        var win = new Window("dialog");
        win.orientation = "column";
        win.add("staticText", undefined, "Choose the year.");
        win.years = win.add("dropdownlist", {x:0,y:0,width:70,height:0}, years);
        win.years.selection = 0;
        win.add("staticText", undefined, "Choose the district.");
        //win.districts = win.add("dropdownlist", {x:0,y:0,width:300,height:0}, districts);
        win.districts = win.add("listbox", undefined, districts,  {multiselect: true});
        win.buttons = win.add("group");
        win.cancel = win.buttons.add("button", undefined, "Cancel");
        win.confirm = win.buttons.add("button", undefined, "Generate");
        win.confirm.onClick = function() {
            win.close(1);
            }

        win.cancel.onClick = function() { win.close(0); }
        var rs = win.show();
        if(rs){
              if(action == 'book_listing'){
                  generateGuidebookListings(win);
              }else if(action == 'district_cover'){
                  generateGuidebookListingsCoverPage(win);
              }else if(action == 'leaflet'){
                  generateLeaflets(win);
              }else if(action == 'listing_index'){
                  generateIndexPages(win);
              }
        }
}
