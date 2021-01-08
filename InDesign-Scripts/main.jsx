#targetengine "session"
#include "includes.jsx"
// #include "JSInterface.jsx" abandoned because it needs to be reinstalled every December just when we need it the most
#include '../Scripts Panel/IdExtenso/$$.jsxinc'
#include '../Scripts Panel/IdExtenso/etc/$$.Web.jsxlib'
$$.load();

// the data for the book and leaflet always comes from a remote endpoint
var websiteUrl = 'http.scotlandsgardens.org';
var websiteProtocol = 'http://';
var settingsPath = "~\indesign_script_settings.txt";
var baseFilePath;

main();

function main() {
    //app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
    app.scriptMenuActions.everyItem().remove();
    if (app.menus.item("$ID/Main").submenus.item("SGS").isValid){
        app.menus.item("$ID/Main").submenus.item("SGS").remove();
    }

    // all it does is reads the settings of your chosen folder where the data comes from and where the generated files going to be

    var aaa = null; // for easy debug because it will be the first in object browser;
    BuildMenus();
    //bookDialog('listing_index');
    //dataDialog(');
    //bookDialog('leaflet');
    //district_cover book_listing
}
