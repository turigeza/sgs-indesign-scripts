function readSettings(){
    var settings = new Array();
    var settingsFile = File(settingsPath);
    var line;
    settingsFile.open("r");
    while (line = settingsFile.readln())
    {
        line = line.split("=");
        settings[line[0]] = line[1];
    }
    settingsFile.close();
    return settings;
}
