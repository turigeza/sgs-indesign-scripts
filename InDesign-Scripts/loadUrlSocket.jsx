
/* sloooooowwww not used */
function loadUrlSocket(url, timeout) {
    if(!timeout){
        timeout = 30;
    }

    var conn = new Socket;
    var cmd = "GET "+url+" HTTP/1.1\r\nHost:"+websiteUrl+"\r\n\r\n";

    var reply= '';

    conn.timeout = timeout;

    if (conn.open (websiteUrl +':'+websitePort, 'BINARY')) {

        conn.write (cmd);

        while (conn.connected && ! conn.eof) {
            var result = conn.read(1024) + "\n";
            reply += result;

            // alert(result);
        }

        reply = reply.slice(reply.indexOf('{')-1, reply.lastIndexOf('}')+1);
        alert(reply);
        alert(reply.slice(-200));
        conn.close();
        return reply;
    }
}
