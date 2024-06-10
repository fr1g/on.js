class OnInstance{
    Mounted;
    Debug = false;
    ComponentProcessor = class {
    
    };

    setDebug(debug = false){
        this.Debug = debug;
        console.log(`On.JS Debug ${this.Debug ? 'ON' : 'OFF'}`);
    }

    constructor(hook){
        this.Mounted = document.getElementById(hook);
        console.log('On.JS Mounted the app-root element');
        
        this.Mounted.style.backgroundColor = 'aliceblue';
    }
}

var currentRoute = '/';
var On = {
    Route: function(operation = '/'){ 
        /* default to the root */
        currentRoute = operation;
        let pushing = window.history.pushState(history.state || {}, '', operation);
    },
    
    Get: function(path, useExtended = false){
        let returnedJsonRawString = '', fetching;
        if(!useExtended){
            fetching = fetch(path).then(response => {
                returnedJsonRawString = response.text();
                console.log(response);
                console.log(returnedJsonRawString)
                return returnedJsonRawString;
            })
        }
        //  else use created respObj
    },
}