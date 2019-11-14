BridgeTalk.prototype.sendSynch = function(timeout) {
	var self = this;
	self.onResult = function(res) {
	this.result = res.body;
	this.complete = true;
	}
	self.complete = false;
	self.send();

	if (timeout) {
		for (var i = 0; i < timeout; i++) {
			BridgeTalk.pump(); // process any outstanding messages
			if (!self.complete) {
				$.sleep(1000);
			} else {
				break;
			}
		}
	}
	var res = self.result;
	self.result = self.complete = self.onResult = undefined;
	return res;
}
// for typos, provide an alias
BridgeTalk.prototype.sendSync = BridgeTalk.prototype.sendSynch;

function loadUrl(url, timeout) {
    if(!timeout){
           timeout = 500;
    }
    var bt = new BridgeTalk();
    bt.target = 'bridge';
    var httpTimeout = timeout;
 
    var script = '';
    script += "if ( !ExternalObject.webaccesslib )\n";
    script += "  ExternalObject.webaccesslib = new ExternalObject('lib:webaccesslib');\n";
    script += "var response = null;\n";
    script += "var retry = true;\n";
    script += "while (retry) {\n";
    script += "  var http = new HttpConnection('" + url + "') ; \n";
    script += "  http.timeout  = " + httpTimeout + ";\n";
    script += "  http.execute() ;\n";
    script += "  try{\n";
    script += "    response = http.response;\n";
    script += "    retry = false;\n";
    script += "  } catch (e){\n";
    script += "    BridgeTalk.bringToFront('bridge');\n";
    script += "    if (!confirm('There was an error communicating with the server. Would you like to retry?'))\n";
    script += "      retry = false;\n";
    script += "  }\n";
    script += "}\n";
    script += "response;\n";
 	
    bt.body = script;
    return bt.sendSynch(timeout);
}

function loadJson(url, timeout){
    var jsonString = loadUrl(url, timeout);
    //alert(jsonString);
    try{
        var json = JSON.parse(jsonString);
    }catch(err){
        alert(jsonString);
    }
    
    return json;
}
