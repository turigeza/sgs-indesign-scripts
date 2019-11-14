function checkFolders(){
     // check if the source and target folders are defined otherwise do not let proceed
        if(typeof baseFilePath === 'undefined'){
            var errorMessage = 'You must choose the folder where you templates are first.  Go to menu item SGS/Choose template folder. These setting will then be stored at '+settingsPath;
            alert(errorMessage);
            return false;
        }
        return true;
}