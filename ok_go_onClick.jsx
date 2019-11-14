function ok_go_onClick(sender, colour, districts, sides){
    if(colour == null)
    {
        alert("You must select a colour.");
        return false;
    }
    else if(districts == null)
    {
        alert("You must select at least one file.");
        return false;
    }
    else if(sides == null)
    {
        alert("You must select a number of sides.");
        return false;
    }
    else
    {
        sender.close();
        generateLeaflet(colour, districts, sides);
        return true;
    }
}