/**
 * TODO:
 *      json-rendering:
 *          
 *      html-as-component-import:
 *          use id to mark component name
 *          match via json
 *          
 */

class OnInstance{
    Mounted;
    Debug = false;
    ObjList = [];
    ComponentProcessor = class {
    
    };

    EventCall = {
        ObjList: {
            _customCallbacks: [],
            ObjListChanged: function(describe = ''){
                console.log(describe);
                // run callbacks
            }
        }
    }

    setDebug(debug = false){
        this.Debug = debug;
        console.log(`On.JS Debug ${this.Debug ? 'ON' : 'OFF'}`);
    }

    addToObjList(source, useExtended = false){
        let comp = this.ObjList.length, jsonName = '..null', susList = (typeof source != 'string');
        if(susList){
            try {
                for(let item of source){
                    let subcomp = this.ObjList.length;
                    this.ObjList.push(On.GetParsed(item, useExtended));
                    if(!useExtended) jsonName = Util.afn(item);
                    if(subcomp != this.ObjList.length) this.EventCall.ObjList.ObjListChanged(`ObjList changed: added ${jsonName}`);
                }
                
                jsonName = '..null';
            } catch (ex) {
                if(!useExtended) jsonName = Util.afn(source);
                this.ObjList.push(On.GetParsed(source, useExtended));
            }
        }else this.ObjList.push(On.GetParsed(source, useExtended));
        if(!useExtended) jsonName = Util.afn(source);
        if(comp != this.ObjList.length) this.EventCall.ObjList.ObjListChanged(`ObjList changed: added ${(jsonName = '..null' && susList ? 'a list' : jsonName)}`);
    }

    constructor(hook){
        this.Mounted = document.getElementById(hook);
        console.log('On.JS Mounted the app-root element');
        
    }
}

var currentRoute = '/';
var On = {
    Router: {
        Route: function(operation = '/'){ // wip
            /* default to the root */
            currentRoute = operation;
            let pushing = window.history.pushState(history.state || {}, '', operation);
        },
    },
    I18n: {
        RunI18nRender: function(part, LangList){ // wip
            let rendered;
            return rendered;
        }
    },
    GetParsed: function(source, useExtended = false){
        let x;
        try {
            x = JSON.parse(On.Get(source, useExtended));
        } catch (ex) {
            
            return null;
        }
        return x;
    },
    Get: function(source, useExtended = false){
        let returnedJsonRawString = '', fetching;
        if(!useExtended){
            fetching = fetch(source).then(response => {
                if(response.ok){
                    returnedJsonRawString = response.text();
                    return returnedJsonRawString;
                }
                else return null;
            }).catch(ex => {
                console.error(ex);
                return null;
            });
        }
        //  else use created respObj
    },
}

var Util = {
    afn: function(fn){
        let analy = fn.split('/');
        let len = analy.length;
        return (analy[len - 1]);
    }
}