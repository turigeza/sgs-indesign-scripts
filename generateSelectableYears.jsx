function generateSelectableYears() {
    var d = new Date();
    var year = d.getFullYear();
    var start = year - 20;
    var end = year + 1;
    var years = Array();

    for (i = end; i > start; i--) {
        // there will not be any data printable before hand because of the database change
        if(i>2017){
            years.push(i);
        };
    }

    return years;
}