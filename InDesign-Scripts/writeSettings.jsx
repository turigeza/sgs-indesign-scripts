function writeSettings(){
    var settingsFile = File(settingsPath);
    settingsFile.open("w");
    settingsFile.writeln("baseFilePath="+baseFilePath);
    settingsFile.close();
}