function pick_file_onClick(sender){
    var mask = "Comma-Separated Values:*.csv";
    var docFolder = Folder(baseDataPath);
    return docFolder.openDlg("Select one or more files.", mask, true);
}
