function dataDialog(){
    var win = new Window("dialog");
    var existingFilePath = baseFilePath ? baseFilePath: '<not yet set>';
    
    win.orientation = "column";
    win.pick_dataFolder = win.add("button", undefined, " Select the root folder for your templates.");
    win.warning =  win.add("staticText", undefined, "Currently set to: ");
    win.folderPath =  win.add("staticText", undefined, existingFilePath);
    win.warning1 =  win.add("staticText", undefined, "The above settings came from the file here (It may not yet exists!): "+settingsPath);
    
    win.pick_dataFolder.onClick = function() { 
        dataFolder = Folder.selectDialog("Select data folder");
        if (dataFolder == null){
            alert("No folder selected or the selected folder is not suitable - retaining current path of " + baseFilePath);
        }else{
            baseFilePath = dataFolder;
            writeSettings();
            win.close(1);
        }
    }
     
    win.show();
}