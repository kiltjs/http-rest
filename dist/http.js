!function e(t,n,r){function o(u,f){if(!n[u]){if(!t[u]){var c="function"==typeof require&&require;if(!f&&c)return c(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){var r=[].shift;t.exports=function(){for(var e,t=r.call(arguments),n=r.call(arguments);n;){for(e in n)t[e]=n[e];n=r.call(arguments)}return t}},{}],2:[function(e,t,n){function r(){for(var e,t=o.call(arguments),n=o.call(arguments);n;){if(typeof t!=typeof n&&(t=i.isArray(n)?[]:i.isObject(n)?{}:n),i.isObject(n))for(e in n)void 0!==n[e]&&(typeof t[e]!=typeof n[e]?t[e]=r(void 0,n[e]):i.isArray(t[e])?[].push.apply(t[e],n[e]):i.isObject(t[e])?t[e]=r(t[e],n[e]):t[e]=n[e]);n=o.call(arguments)}return t}var o=[].shift,i=e("./kit-type");t.exports={extend:e("./extend"),merge:r,copy:function(e){return r(void 0,e)}}},{"./extend":1,"./kit-type":3}],3:[function(e,t,n){"use strict";function r(e){return function(t){return typeof t===e}}function o(e){return function(t){return t instanceof e}}t.exports={isType:function(e,t){return void 0===t?r(e):r(e)(t)},instanceOf:function(e,t){return void 0===t?o(e):o(e)(t)},isObject:r("object"),isFunction:r("function"),isString:r("string"),isNumber:r("number"),isArray:Array.isArray||o(Array),isDate:o(Date),isRegExp:o(RegExp),isElement:function(e){return e&&1===e.nodeType},isUndefined:function(e){return void 0===e}}},{}],4:[function(e,t,n){function r(e,t,n){t&&t.then?t.then(function(t){e.deferred.resolve(t)},function(t){e.deferred.reject(t)}):e.deferred[n](t)}function o(e){if(void 0!==e.$$fulfilled){for(var t=(e.$$queue.length,e.$$queue.shift()),n=e.$$fulfilled?"resolve":"reject",o=!e.$$fulfilled&&e.$$uncought++;t;){if(t[n]){o=!1;try{r(t,t[n](e.$$value),"resolve")}catch(i){r(t,i,"reject")}}else r(t,e.$$value,n);t=e.$$queue.shift()}o&&setTimeout(function(){if(e.$$uncough===o)throw new Error("Uncaught (in promise)")},0)}}function i(e){if(!(e instanceof Function))throw new TypeError("Promise resolver undefined is not a function");var t=this;this.$$queue=[],this.$$uncough=0,e(function(e){t.$$fulfilled=!0,t.$$value=e,o(t)},function(e){t.$$fulfilled=!1,t.$$value=e,o(t)})}i.prototype.then=function(e,t){var n=this,r=new i(function(r,o){n.$$queue.push({resolve:e,reject:t,deferred:{resolve:r,reject:o}})});return o(this),r},i.prototype["catch"]=function(e){return this.then(void 0,e)},i.all=function(e){return new i(function(t,n){var r=e.length,o=[];e.forEach(function(e,u){(e.then?e:i.resolve(e)).then(function(e){o[u]=e,0===--r&&t(o)},function(e){-1!==r&&n(e)})})})},i.race=function(e){return new i(function(t,n){var r=!1;e.forEach(function(e,o){r||(e.then?e:i.resolve(e)).then(function(e){r||(r=!0,t(e))},function(e){r||(r=!0,n(e))})})})},i.resolve=function(e){return new i(function(t,n){t(e)})},i.reject=function(e){return new i(function(t,n){n(e)})},t.exports=i},{}],5:[function(e,t,n){(function(n){t.exports=e("./promise-qizer")(n.Promise||e("./promise-polyfill"))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./promise-polyfill":4,"./promise-qizer":6}],6:[function(e,t,n){t.exports=function(e){function t(t){return new e(t)}return["resolve","reject","all","race"].forEach(function(n){t[n]=e[n]}),t.when=function(t){return t&&t.then?t:e.resolve(t)},t}},{}],7:[function(e,t,n){(function(t){"function"==typeof define&&define.amd?define(["$http"],function(){return e("./http")}):t.$http=e("./http")}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./http":8}],8:[function(e,t,n){function r(e,t,n){for(var o in e)e[o]instanceof Function?e[o]=e[o].apply(t,n||[]):"string"==typeof e[o]&&(e[o]=r(e[o],t,n));return e}function o(e){console.log("headerToTitleSlug",e);var t=e.replace(/([a-z])([A-Z])/g,function(e,t,n){return t+"-"+n});return t=t[0].toUpperCase()+t.substr(1)}function i(e){var t=e[0].toLowerCase()+e.substr(1);return t.replace(/([a-z])-([A-Z])/g,function(e,t,n){return t+n})}function u(e,t,n){var r=e&&e.match(l);return r&&("json"===r[3]?JSON.parse(t):"xml"===r[3]?n:t)}function f(e){var t={};return e.getAllResponseHeaders().replace(/\s*([^\:]+)\s*\:\s*([^\;\n]+)/g,function(e,n,r){t[i(n)]=r.trim()}),t}function c(e,t){return void 0===t&&c.url(e),t=r(s.copy(t||{})),t.headers=t.headers||{},t.url=e,a(function(n,r){var i=null;try{i=new XMLHttpRequest}catch(c){try{i=new ActiveXObject("Msxml2.XMLHTTP")}catch(a){i=new ActiveXObject("Microsoft.XMLHTTP")}}if(null===i)throw"Browser does not support HTTP Request";if(t.params){var s=0;for(var l in t.params)e+=(s++?"&":/\?/.test(e)?"&":"?")+l+"="+encodeURIComponent(t.params[l])}i.open((t.method||"get").toUpperCase(),e),t.withCredentials&&(i.withCredentials=!0);for(var p in t.headers)i.setRequestHeader(o(p),t.headers[p]);i.onreadystatechange=function(){if("complete"===i.readyState||4===i.readyState){var e={config:i.config,data:u(i.getResponseHeader("content-type"),i.responseText,i.responseXML),status:i.status,headers:function(){var e;return function(){return e||(e=f(i)),e}}(),xhr:i};i.status>=200&&i.status<300?n(e):r(e)}},i.config=t,"string"!=typeof t.data,t.contentType?(i.setRequestHeader("Content-Type",t.contentType),"application/json"===t.contentType&&"string"!=typeof t.data&&(t.data=JSON.stringify(t.data))):"string"==typeof t.data?t.contentType="text/html":(t.contentType="application/json",t.data=JSON.stringify(t.data)),i.send(t.data)})}var a=e("promise-q"),s=e("nitro-tools/lib/kit-extend"),l=/([^\/]+)\/([^+]+\+)?(.*)/;c.noCache=function(e,t){return e+=(/\?/.test(e)?"&":"?")+"t="+(new Date).getTime(),c(e,t)},c.plainResponse=function(e){return{config:e.config,data:e.data,status:e.status,headers:e.headers()}},["get","delete"].forEach(function(e){c[e]=function(t,n){return n=s.copy(n||{}),n.method=e,c(n)}}),["post","put"].forEach(function(e){c[e]=function(t,n,r){return r=s.copy(r||{}),r.data=n||{},r.method=e,c(r)}}),c.url=function(e){["get","post","put","delete"].forEach(function(t){return c[t].apply(null,[e].concat([].slice.call(arguments)))})},t.exports=c},{"nitro-tools/lib/kit-extend":2,"promise-q":5}]},{},[7]);