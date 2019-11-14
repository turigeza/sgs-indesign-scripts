function BuildMenus(){
    var sgsMenu;
    var sgsMenu_Leaflets;
    var sgsMenu_Districts;
    var sgsMenu_Cover;
    var sgsMenu_Index;
    var sgsMenu_Book;
    var sgsMenu_Data;
    
    if((sgsMenu = app.menus.item("$ID/Main").submenus.item("SGS")) == null){
        sgsMenu = app.menus.item("$ID/Main").submenus.add("SGS");
    }

    var leafletsAction = app.scriptMenuActions.add("Generate Leaflets");
    var coverAction = app.scriptMenuActions.add("Generate District Cover Pages");
    var bookAction = app.scriptMenuActions.add("Generate Listings");
    var indexAction = app.scriptMenuActions.add("Listings Index");
    var dataAction = app.scriptMenuActions.add("Choose template folder");
    
    var leafletsEventListener = leafletsAction.eventListeners.add("onInvoke", function(){bookDialog('leaflet');});
    var coverEventListener = coverAction.eventListeners.add("onInvoke", function(){bookDialog('district_cover');});
    var bookEventListener = bookAction.eventListeners.add("onInvoke", function(){bookDialog('book_listing');});
    var indexEventListener = indexAction.eventListeners.add("onInvoke", function(){bookDialog('listing_index');});
    var dataEventListener = dataAction.eventListeners.add("onInvoke", function(){dataDialog();});

    if((sgsMenu_Book = sgsMenu.menuItems.item(bookAction.name)) == null){
        sgsMenu_Book = sgsMenu.menuItems.add(bookAction);
    }

    if((sgsMenu_Book = sgsMenu.menuItems.item(coverAction.name)) == null){
        sgsMenu_Cover = sgsMenu.menuItems.add(coverAction);
    }
      if((sgsMenu_Index = sgsMenu.menuItems.item(indexAction.name)) == null){
        sgsMenu_Index = sgsMenu.menuItems.add(indexAction);
    }
    if((sgsMenu_Leaflets =sgsMenu.menuItems.item(leafletsAction.name)) == null){
        sgsMenu_Leaflets = sgsMenu.menuItems.add(leafletsAction);
    }

    if((sgsMenu_Data = sgsMenu.menuItems.item(dataAction.name)) == null){
        sgsMenu_Data = sgsMenu.menuItems.add(dataAction);
    } 
   
}
