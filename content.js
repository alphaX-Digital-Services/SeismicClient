/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {

        // The node to be monitored
        /*
         var target = document.body;
         (
         new MutationObserver(function(mutationEventList){
         console.log(mutationEventList)
         })
         )
         .observe(document.body, {
         childList: true,
         attributes: true,
         characterData: true,
         subtree:true
         });
         Create an observer instance
         var observer = new MutationObserver(function( mutations ) {
         mutations.forEach(function( mutation ) {
         alert(mutation);
         var newNodes = mutation.addedNodes; // DOM NodeList
         if( newNodes !== null ) { // If there are new nodes added
         var $nodes = $( newNodes ); // jQuery set
         $nodes.each(function() {
         var $node = $( this );
         console.log($node.html());
         if( $node.hasClass( "message" ) ) {
         // do something
         }
         });
         }
         });
         });

         // Configuration of the observer:
         var config = {
         attributes: true,
         childList: true,
         characterData: true,
         subtree:true
         };
         // Pass in the target node, as well as the observer options
         observer.observe(target, config);

         // Later, you can stop observing
         //observer.disconnect();

         /* Call the specified callback, passing
         the web-pages DOM content as argument */

        $("span#strike").on("DOMSubtreeModified", function() {
            var rawInput = $("span#strike").html();
            var data = $("span#strike").html().obfuscate();
            var type = ($("span#asset.asset-value").html()).hashCode();
            var timeStamp = new Date().getTime();

            if(typeof rawInput !== "undefined" && rawInput !="" && !isNaN(data))
                $.ajax({
                    type: "GET",
                    //url: "http://echo.jsontest.com/type/"+type+"/data/"+data+"/time/"+new Date().getTime(),
                    url: "http://ec2-35-157-238-180.eu-central-1.compute.amazonaws.com/insert/sensorId="+type+"&decimal="+data+"&timestamp="+timeStamp,
                    ///data: {"sensorId": type, "decimal" : data, "timestamp": new Date().getTime()},
                    success: function() {
                        console.log("sent post data");
                        console.log("Data: "+data);
                        console.log("SensorID: "+type);
                        console.log("Timestamp:"+new Date().getTime());
                    },
                    error: function() {
                        console.error("could not send post data");
                    },
                    dataType: "json"
                });
        });
        sendResponse("Watcher initialized");
    }
});

String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

String.prototype.obfuscate = function() {
    var float = parseFloat(this);
    return float/1000*2;
};
