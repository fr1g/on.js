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
    Lang = null; // in the future, i18n using language will aspect the in-url-langcode(using router or param) > saved-localstorage-langcode > navigator. keeping null means i18n off, or save a langcode here.
    Route = null; // if null, means router off.
    Router = {


    };
    I18n = {

    };

    ObjList = [];
    ComponentProcessor = class {
    
    };

    EventCall = {
        ObjList: {
            _customCallbacks: [],
            ObjListChanged: function(info = ''){
                console.log(info);
                // run callbacks
            }
        }
    }

    EasyVariables = []; // name, value, includedNodesTrace
    getEV(name){}; // call read
    setEV(name, newValue){}; // call bind

    render(){
        /** render steps: 
         * 1 parse objects into tree
         * 2 determine: single page or using router
         * 3 determine: which page to show
         * 4 determine: using i18n or not (if yes, replace content and titles(override title and title of element, alt of element) and in-javascript string placeholder with the list-matched content)
         * 5 generate DOM element and push for render.
         * on bind-value changed:
         *      if is easy variable changed:
         *          get via trace and replace its content
        */

    }

    refresh(element){

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
                    this.ObjList.push({path: item, obj: On.GetParsed(item, useExtended)});
                    if(!useExtended) jsonName = Util.afn(item);
                    if(subcomp != this.ObjList.length) this.EventCall.ObjList.ObjListChanged(`ObjList changed: added ${jsonName}`);
                }
                
                jsonName = '..null';
            } catch (ex) {
                if(!useExtended) jsonName = Util.afn(source);
                this.ObjList.push({path: source, obj: On.GetParsed(source, useExtended)});
            }
        }else this.ObjList.push({path: source, obj: On.GetParsed(source, useExtended)});
        if(!useExtended) jsonName = Util.afn(source); // useExtended may invoke via a different way, and so the source should be parsed and only pick the json file path.
        if(comp != this.ObjList.length) this.EventCall.ObjList.ObjListChanged(`ObjList changed: added ${(jsonName = '..null' && susList ? 'a list' : jsonName)}`);
    }

    constructor(hook){
        this.Mounted = document.getElementById(hook);
        console.log('On.JS Mounted the app-root element');
    }
}

var currentPageRoute = '/';
var On = {
    Router: {
        Route: function(operation = '/'){ // wip
            /* default to the root */
            currentPageRoute = operation;
            let pushing = window.history.pushState(history.state || {}, '', operation);
        },
    },
    I18n: {
        RunI18nRender: function(part, lang){ // wip
            let rendered;
            return rendered;
        }
    },
    ON: {
        name: null,
        id: null,
        classList: null,
        slot: null,
        style: null,
        trace: null,
        title: null,
        attributes: [],
        additional: ''
    },
    ONodeFactory: function(name, slot, trace, id = null, classList = null, style = null, title = null, additional = '', attributes = [], ){
        let tmp = On.ON;
        tmp.name = name;
        tmp.slot = slot;
        tmp.trace = trace;
        tmp.id = id;
        tmp.classList = classList;
        tmp.style = style;
        tmp.additional = additional;
        tmp.attributes = attributes;
        tmp.title = title;
        return tmp;
    },
    ONewNode: function(name, slot = null, ...args){
        return On.ONodeFactory(name, slot, Util.uuid(name).substring(3, 12), args);
    },

    Render: function(on){
        /* on: the On.JS instance, to render the content inside the target mounted element */

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
    afn: function(fn, end = 1){
        let analy = `${fn}`.split('/');
        let 
            tmp = [],
            ind = 0;
        for(let sig of analy.reverse()){
            ind++;
            tmp.push(sig);
            if(ind == end) break;
            tmp.push('/');

        }

        return `${tmp.reverse()}`;
    },
    uuid: function(){
        return ((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((2 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + "-" + (((3 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + "-" + (((4 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + "-" + (((5 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + "-" + (((6 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((7 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((8 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
    }
}