var hi5=hi5||{};hi5.init={inited:!1,funcs:[],push:function(a){hi5.init.funcs.push(a)},start:function(a){if(!hi5.init.inited){hi5.browser.innerHeight=window.innerHeight;hi5.init.inited=!0;a=hi5.init.funcs;for(var b=0,d=a.length;b<d;b++)a[b]()}}};String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});Number.prototype.toByte||(Number.prototype.toByte=function(){var a=this&255;return 127<a?a-256:a});
String.prototype.applyArgs||(String.prototype.applyArgs=function(a){for(var b=this.split("%"),d,c,e=b[0],f=1,g=b.length;f<g;f++){d=b[f];var h=parseInt(d,10);isNaN(h)?e+=d:(c=d.substring((h+"").length),(d=a[h-1])&&(e+=d),e+=c)}return e});String.prototype.hashCode||(String.prototype.hashCode=function(){for(var a=0,b=0,d=this.length,c=0;c<d;c++)b=this.charCodeAt(c),a=(a<<5)-a+b|0;return a});Array.prototype.removeElm||(Array.prototype.removeElm=function(a){a=this.indexOf(a);-1!=a&&this.splice(a,1)});
Array.prototype.fill||(Array.prototype.fill=function(a){for(var b=this.length;0<=--b;)this[b]=a});Date.prototype.getStdTimezoneOffset||(Date.prototype.getStdTimezoneOffset=function(){var a=new Date(this.getFullYear(),0,1),b=new Date(this.getFullYear(),6,1);return Math.max(a.getTimezoneOffset(),b.getTimezoneOffset())});
hi5.DateUtils={formatNum:function(a){return 10>a?"0"+a:""+a},formatDate:function(a,b){if(!a)return"";var d=new Date(a),c=d.getFullYear()+"-"+hi5.DateUtils.formatNum(d.getMonth()+1)+"-"+hi5.DateUtils.formatNum(d.getDate());b&&(c+=0+d.getHours()+":"+d.getMinutes());return c},parseDate:function(a){var b=a.split(" ");a=b[0].split("-");return 3!=a.length?null:1<b.length?(b=b[1].split(":"),2!=b.length?null:new Date(a[0],a[1]-1,a[2],b[0],b[1])):new Date(a[0],a[1]-1,a[2])}};
hi5.WebSocket=window.WebSocket||window.MozWebSocket;hi5.$=function(a){return document.getElementById(a)};hi5.html={hasClass:function(a,b){return a.className.match(new RegExp("(\\s|^)"+b+"(\\s|$)"))},addClass:function(a,b){hi5.html.hasClass(a,b)||(a.className+=" "+b)},removeClass:function(a,b){hi5.html.hasClass(a,b)&&(a.className=a.className.replace(new RegExp("(\\s|^)"+b+"(\\s|$)")," "))}};
hi5.browser=new function(){var a=navigator.userAgent;this.innerHeight=0;this.isEdge=-1!=a.indexOf("Edge");var b=-1!=a.indexOf("MSIE")||-1!=a.indexOf("Trident")||this.isEdge;this.isIE=b;this.isTouch="ontouchstart"in window||"createTouch"in document||"DocumentTouch"in window&&window.document instanceof window.DocumentTouch||!!navigator.msMaxTouchPoints||1<navigator.maxTouchPoints||-1!=a.indexOf("Mobile");this.isFirefox=-1!=a.indexOf("Firefox")&&!b;this.isOpera=-1!=a.indexOf("Opera");this.isRIM=-1!=
a.indexOf(" RIM ");this.isChrome=-1!=a.indexOf("Chrome")&&!b;this.isMacOS=-1!=a.indexOf("Mac OS");this.isWindows=-1!=a.indexOf("Windows ");this.isiOS=navigator.userAgent.match(/(iPad|iPhone|iPod)/i)?!0:!1;this.isSafari=-1==a.indexOf("Chrome")&&-1!=a.indexOf("Safari")&&!b;this.isWebKit=-1!=a.indexOf("WebKit");this.isCrOS=-1!=a.indexOf("CrOS");this.isOperaNext=-1!=a.indexOf("Edition Next");this.isAndroid=-1!=a.indexOf("Android");this.isChromeApp="chrome"in window&&"app"in chrome&&"window"in chrome.app;
this.isDesktop=!a.match(/(iPhone|iPod|iPad|Android|BlackBerry|Mobile)/);b=window.outerHeight-window.innerHeight;this.isMetro=0==window.screenY&&(0==window.screenX||window.screenX+window.outerWidth==screen.width)&&3<b&&31>b;this.isMultitask=!(this.isiOS&&this.isSafari&&0<a.indexOf("Version/5"));this.binaryWS=function(){return hi5.browser.isChrome?!0:hi5.tool.hasProperty(hi5.WebSocket,"binaryType")};this.cookie2Obj=function(){var a=document.cookie,c={},e;if(""==a)return c;for(var b=a.split(";"),g=0,
h=b.length;g<h;g++){for(var k=b[g];" "==k.charAt(0);)k=k.substring(1,k.length);a=k.indexOf("=");if(0<a){e=decodeURIComponent(k.substring(a+1).replace(/\+/g," "));hi5.tool.isNumber(e)&&"0"!=e[0]&&parseFloat(e)==e&&(e=parseFloat(e));if("true"==e||"on"==e)e=!0;else if("false"==e||"off"==e)e=!1;c[k.substring(0,a)]=e}}return c};this.getLibPath=function(a){for(var c=document.getElementsByTagName("script"),e,b,g="",h=c.length,k=0;k<h;k++)if(b=c[k].src,e=b.indexOf(a),-1<e){g=b.substring(0,e);break}return g};
this.loadJS=function(a){0>a.indexOf("/")&&(a=hi5.libPath+a);if(!hi5.browser.getLibPath(a)){var c=document.createElement("script");c.type="text/javascript";c.src=a;(document.body||document.getElementsByTagName("script")[0].parentNode).appendChild(c)}};this.formToObj=function(a,c){var e=a.elements,b,g,h,k=e.length;c||(c={});for(var l=0;l<k;l++)if(b=e[l],h=b.name){g=b.type;switch(g){case "submit":case "button":case "reset":continue;case "checkbox":b=b.checked;break;case "radio":if(!b.checked)continue;
b=b.value;break;case "number":parseFloat(b.value);default:b=b.value}""!=b&&(c[h]=b)}return c};this.objToForm=function(a,c){var e,b,g=c.elements,h;for(h in a)if(e=g[h])b=a[h],"boolean"==typeof b?e.checked=b:e.value=b};this.objToCookie=function(a){for(var c in a)""!=a[c]&&(document.cookie=c+"="+a[c])};this.getScale=function(){return document.documentElement.clientWidth/window.innerWidth};this.httpGet=function(a,c){var b=new XMLHttpRequest;b.open("GET",a,c);b.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
b.send(null);return b.responseText};this.selectEditable=function(a){try{var c=document.createRange();c.selectNodeContents(a);var b=window.getSelection();b.removeAllRanges();b.addRange(c)}catch(f){console.log(f)}};this.setOrientaionHandler=function(a){"onorientationchange"in screen?screen.onorientationchange=a:"onmozorientationchange"in screen?screen.onmozorientationchange=a:"onmsorientationchange"in screen?screen.onmsorientationchange=a:window.addEventListener("orientationchange",a,!1)}};
hi5.libPath=hi5.browser.getLibPath("hi5_min.js");hi5.libPath||(hi5.libPath=hi5.browser.getLibPath("hi5.js"));
hi5.storage=new function(){function a(a,c){this._state=c||0;this._value=a}function b(a){return a&&0==a.indexOf("{")&&(a=JSON.parse(a))&&"_state"in a&&"_value"in a?a:null}var d="chrome"in window&&!!chrome.storage,c="localStorage"in window;if(c)try{localStorage.setItem("_t_s_t","1"),localStorage.removeItem("_t_s_t")}catch(e){c=this.isAvailable=!1}this.isAvailable=!!d||c;var f=d||!this.isAvailable?{}:localStorage;d&&chrome.storage.local.get(null,function(a){for(var c in a)f[c]=a[c]});this.set=function(c,
b){f[c]=JSON.stringify(new a(b,1))};this.get=function(a){a=f[a];var c=b(a);return c?c._value:a};this.clear=function(a){f={};d?chrome.storage.local.clear(a||function(){}):c&&localStorage.clear()};this.remove=function(a){if(f.removeItem)f.removeItem(a);else{var c=b(f[a]);c&&(c._state=2,f[a]=JSON.stringify(c))}};this.commit=function(a){a=a||function(){};if(d){var c={},e=[],l=!1,m;for(m in f){var n=b(f[m]);n&&(1==n._state?(c[m]=n._value,l=!0):2==n._state&&e.push(m))}0<e.length&&chrome.storage.local.remove(e,
function(){for(var c=0,b=e.length;c<b;c++)delete f[e[c]];a&&a()});l&&chrome.storage.local.set(c,a)}else a()}};
hi5.Arrays={fill:function(a,b,d,c){for(;b<d;b++)a[b]=c},arraycopy:function(a,b,d,c,e){for(var f=0;f<e;f++)d[c+f]=a[b+f]},equals:function(a,b){if(a==b)return!0;if(!a||!b)return!1;var d=a.length;if(d!=b.length)return!1;for(var c=0;c<d;c++)if(a[c]!=b[c])return!1;return!0},startWidth:function(a,b){for(var d=0,c=b.length;d<c;d++)if(a[d]!=b[d])return!1;return!0},__sortNumber:function(a,b){return a-b},sortNumber:function(a){return a.sort(hi5.Arrays.__sortNumber)},hashCode:function(a){for(var b=1,d=0,c=a.length;d<
c;d++)b=31*b+a[d]|0;return b}};hi5.callback={callbacks:{},no:0,put:function(a){var b="CB"+this.no++;this.callbacks[b]=a;return b},get:function(a){var b=this.callbacks[a];b&&delete this.callbacks[a];return b}};
hi5.tool={isNumber:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},cumulativePos:function(a){var b=0,d=0;do if(b+=a.offsetTop||0,d+=a.offsetLeft||0,b+=parseInt(a.style.borderLeftWidth)||0,d+=parseInt(a.style.borderTopWidth)||0,b-=a.scrollTop,d-=a.scrollLeft,a=a.offsetParent,a==document.body)break;while(a);return{x:d,y:b}},getPos:function(a,b){var d=0,c=0;if(a.offsetParent){do{if(b&&a.style.position)break;d+=a.offsetLeft;c+=a.offsetTop}while(a=a.offsetParent)}return{x:d,y:c}},bytesToSize:function(a){if(isNaN(a))return"";
var b=Math.floor(Math.log(+a)/Math.log(2));1>b&&(b=0);b=Math.floor(b/10);a=+a/Math.pow(2,10*b);a.toString().length>a.toFixed(3).toString().length&&(a=a.toFixed(3));return a+" bytes; KB; MB; GB; TB; PB; EB; ZB; YB".split(";")[b]},queryToObj:function(a){a||(a=location.search.substring(1));var b={};if(a){a=a.split("&");for(var d=a.length,c=0;c<d;c++){var e=a[c].split("=");b[e[0]]=decodeURIComponent(e[1])}}return b},replaceQuery:function(a,b,d){var c=a.indexOf(b+"="),e=!1;0<c&&(c=a.charAt(c-1),"&"==c||
"?"==c)&&(e=!0);return e?a.replace(new RegExp("[\\?&]"+b+"=([^&#]*)"),function(a){return a.charAt(0)+b+"="+encodeURIComponent(d)}):a+="&"+b+"="+d},disableInput:function(){var a=document.createElement("div");a.style.position="fixed";a.style.left=0;a.style.top=0;a.style.width="100%";a.style.height="100%";a.style.zIndex=99999;a.style.background="url("+hi5.libPath+"spinner.gif) no-repeat center center";document.body.appendChild(a);window.__hi5_bk=a},enableInput:function(){window.__hi5_bk&&(document.body.removeChild(window.__hi5_bk),
window.__hi5_bk=null)},scale:function(a,b,d,c,e){c=void 0===c?"left top":c+" "+e;d||(d=b);a.style.transformOrigin=c;a.style.MozTransformOrigin=c;a.style.webkitTransformOrigin=c;a.style.msTransformOrigin=c;a.style.OTransformOrigin=c;b="scale("+b+","+d+")";a.style.transform=b;a.style.MozTransform=b;a.style.webkitTransform=b;a.style.msTransform=b;a.style.OTransform=b},openWebSocket:function(a,b,d){var c=!1;d&&(d=hi5.callback.put(d),a+="&callback="+d);var e=new hi5.WebSocket(a);e.onopen=function(a){c=
!0;b&&e.send(b)};e.onclose=function(a){c||alert("Failed to connect")};e.onmessage=function(a){a=JSON.parse(a.data);e.close();a.callback?hi5.callback.get(a.callback)(a):console.log(a)};return e},getChildNodesByTag:function(a,b){for(var d=a.childNodes,c=[],e=0,f=d.length;e<f;e++)d[e].nodeName.toLowerCase()==b&&c.push(d[e]);return c},hasProperty:function(a,b){return b in a||b in a.prototype?!0:b in(a.__proto__||a.constructor.prototype)},isCapslock:function(a){var b=String.fromCharCode(a.keyCode||a.which);
return b.toUpperCase()!=b||b.toLowerCase()==b||a.shiftKey?!1:!0},getImage:function(a,b){b&&0!=b.indexOf("/")&&(b=hi5.libPath+b);return hi5&&hi5.appcfg&&hi5.appcfg.img?hi5.appcfg.img[a]||b:b},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})},text2html:function(a){return a.replace(/\n/g,"<br>")}};
navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;hi5.audio={recordable:!!navigator.getUserMedia,getAudioContext:function(){var a=window.__autoContextInstance;if(!a)try{a=window.parent.__autoContextInstance}catch(b){}if(!a){var d=window.AudioContext||window.webkitAudioContext||null;if(d){a=new d;window.__autoContextInstance=a;try{window.parent!=window&&(window.parent.__autoContextInstance=a)}catch(c){}}}return a}};
hi5.EventControl=function(a){a.addEvent=function(b,d){a[b]&&a[b]._evt_listeners||(a[b]=function(){a.fireEvent(b,arguments)},a[b]._evt_listeners=[]);a[b]._evt_listeners.push(d)};a.removeEvent=function(b,d){if(!a[b]&&!a[b]._evt_listeners)return!1;var c=a[b]._evt_listeners,e=c.indexOf(d);return-1<e?(c.removeElm(e),!0):!1};a.fireEvent=function(b,d){if(a[b]&&a[b]._evt_listeners){var c=a[b]._evt_listeners;d||(d=[]);for(var e=0,f=c.length;e<f;e++)c[e].apply(a,d)}};return a};hi5.ui=hi5.ui||{};
hi5.ui.confirm=function(a){return hi5.browser.isChromeApp?!0:confirm(a)};hi5.chromeapp={convertLink:function(a){for(var b=0,d=a.length;b<d;b++)a[b].onclick=function(a){a=a.target.href;var b=a.lastIndexOf("/");-1!=b&&(a=a.substring(b+1));chrome.app.window.create(a,{left:window.screenLeft+20,top:window.screenTop+20,width:window.innerWidth,height:window.innerHeight});return!1}}};
hi5.Dragable=function(a){function b(c){c.preventDefault&&c.preventDefault();c=getPos(a,!0);var b=c.y-d.y;a.style.left=a.offsetLeft+(c.x-d.x)+"px";a.style.top=a.offsetTop+b+"px";d.x=c.x;d.y=c.y}a.draggable=!0;var d={x:0,y:0},c=hi5.browser.isTouch;a.addEventListener(c?"touchstart":"dragstart",function(c){c.stopPropagation&&c.stopPropagation();c.touches&&(c=c.touches[0]);d.x=c.pageX;d.y=c.pageY;a.style.bottom="auto"},!1);a.addEventListener(c?"touchend":"dragend",function(c){c.stopPropagation&&c.stopPropagation();
if(!c.touches){var b=c.pageY-d.y;a.offsetLeft=a.offsetLeft+(c.pageX-d.x)+"px";a.offsetTop=a.offsetTop+b+"px"}},!1);c&&a.addEventListener("touchmove",b,!1);return a};
hi5.Fadable=function(a,b,d){function c(){document.activeElement==a.activeObj?setTimeout(c,g):a.style.display="none"}function e(){a.beforeDisplay&&a.beforeDisplay();a.style.display="block";k&&(null!=h&&clearTimeout(h),h=setTimeout(c,g))}0>a.tabIndex&&(a.tabIndex=999);var f=d||document,g=b||3E3,h=null,k=!0;a.setFadable=function(c){(k=c)?(c="mouseup",navigator.pointerEnabled?c="pointerup":navigator.msPointerEnabled?c="MSPointerUp":hi5.browser.isTouch&&(c="touchend"),f.addEventListener(c,e,!1)):a.style.display=
"block"};a.startFade=e};hi5.cancelDefault=function(a){a.preventDefault&&a.preventDefault();a.stopPropagation&&a.stopPropagation();return!1};
hi5.Toolbar=function(a){a.addButton=function(b,d,c){var e=document.createElement("img");e.src=b;hi5.browser.isTouch?navigator.msMaxTouchPoints||e.addEventListener("touchend",d,!1):e.onclick=d;a.appendChild(e);c&&(e.id=c);return e};a.getButton=function(b){for(var d=a.getElementsByTagName("img"),c=d.length,e=0;e<c;e++)if(d[e].id==b)return d[e];return null};a.removeButton=function(b){for(var d=a.getElementsByTagName("img"),c=d.length,e=0;e<c;e++)if(d[e].id==b){a.removeChild(d[e]);break}};return a};
hi5.ProgressBar=function(a){a.progress=0;a.maxValue=0;var b=a.getElementsByTagName("div")[0];a.setProgress=function(d){d=Math.floor(d/a.maxValue*100);d!=a.progress&&(a.progress=d,b.style.width=d/100*a.offsetWidth+"px")};return a};
hi5.Lightbox=function(a,b,d){function c(){var c=e.clientWidth,b=e.clientHeight,d=a.offsetWidth,l=a.offsetHeight;d>.96*c&&(d=.96*c,a.style.width=d+"px");l>.96*b&&(l=.96*b,a.style.height=l+"px",a.style.width=a.offsetWidth+22+"px");c=(c-d)/2;b=(b-l)/3;a.style.left=c+"px";a.style.top=b+"px";f.style.left=c+a.offsetWidth-6+"px";f.style.top=b-6+"px"}var e=document.createElement("div");e.id="divBackground";e.style.position="fixed";e.style.left=0;e.style.top=0;e.style.width="100%";e.style.height="100%";e.style.zIndex=
999;e.style.backgroundColor=d?d:"#222";b||(b=.4);1>b&&(e.style.opacity=b);a.style.position="absolute";a.style.zIndex=1E3;a.style.visibility="hidden";var f=document.createElement("div");f.id="divCloseButton";f.style.position="absolute";b=document.createElement("img");b.width=25;b.height=25;b.src=hi5.tool.getImage("del","del.png");b.style.cursor="pointer";f.style.zIndex=10001;b.align="top";f.appendChild(b);a.resize=c;a.show=function(){var b=document.body;b.appendChild(e);b.appendChild(f);a.style.display=
"block";a.style.visibility="visible";c();if(a.onopen)a.onopen(a)};a.visible=function(){return a&&"visible"==a.style.visibility};a.dismiss=function(c){function b(){var c=document.body;c.removeChild(e);c.removeChild(f);a.style.display="none";a.style.visibility="hidden";if(a.onclose)a.onclose()}"number"==typeof c?setTimeout(b,c):b()};a.background=e;b.addEventListener("click",a.dismiss,!1);return a};
hi5.DataTable=function(a){hi5.EventControl(a);"string"==typeof a&&(a=JSON.parse(a));var b=a.rows,d=a.cols;a.rowNo=-1;a.beforeGetValue=null;a.moveTo=function(c){a.rowNo=c};a.getColNo=function(a){for(var b=0,f=d.length;b<f;b++)if(d[b].name==a)return b;return-1};a.getValue=function(c){var e=b[a.rowNo][c];return a.beforeGetValue?a.beforeGetValue(c,e):e};a.setValue=function(c,e){a.beforeSetValue&&(e=a.beforeSetValue(c,e));b[a.rowNo][c]=e;a.fireEvent("onchange",[c,a.rowNo,e])};a.first=function(){a.moveTo(0)};
a.next=function(){a.moveTo(a.rowNo+1)};a.last=function(){a.moveTo(b.length-1)};a.hasNext=function(){return a.rowNo<b.length-1};a.remove=function(c){c||(c=a.rowNo);var e=[c];a.fireEvent("beforeremove",e);b.splice(c,1);a.fireEvent("onremove",e)};a.perform=function(c){"function"==typeof a[c]?a[c].apply(a):a.fireEvent("onaction",[c])};a.getObject=function(){for(var c={},b=0,f=d.length;b<f;b++)c[d[b].name]=a.getValue(b);return c};a.find=function(a,e){for(var d=0,g=b.length;d<g;d++)if(b[d][a]==e)return b[d];
return null};a.fireEvent("onopen");return a};
hi5.DataGrid=function(a){function b(c){var b=this.rowIndex;"number"==typeof b&&(d=b-=a.tHead.rows.length,a.dataTable.moveTo(b));if(a.onrowclick)a.onrowclick(c)}if("TABLE"!=a.nodeName)throw"Not HTML Table";a.dataTable=null;a.onrowclick=null;var d=-1;a.getValue=function(c){var b=a.dataTable;b.moveTo(d);return b.getValue(b.getColNo(c))};a.fillData=function(c){var e=c.rows,f=a.tBodies[0],g,h,k,l;a._rowTemp||(a._rowTemp=a.tBodies[0].rows[0].cloneNode(!0));l=a._rowTemp;var m=l.cells.length,n,p=f.cloneNode(!1),
q;h=e.length;for(g=0;g<h;g++){n=l.cloneNode(!0);q=n.cells;c.moveTo(g);for(e=0;e<m;e++)q[e].innerHTML||(k=c.getValue(e),a.beforeDisplayValue&&(k=a.beforeDisplayValue(e,k)),q[e].innerHTML=k);d=g;n.addEventListener("click",b,!1);a.beforeAppendRow&&a.beforeAppendRow(n);p.appendChild(n)}a.removeChild(f);a.appendChild(p)};a.open=function(){function c(c){var b=a.tBodies[0];(c=b.rows[c])&&b.removeChild(c)}a.dataTable&&(a.fillData(a.dataTable),a.dataTable.addEvent("onremove",c))};return a};
hi5.Select=function(a,b,d){var c=a.parentNode,e=document.createElement("div");e.style.padding="0";e.style.display="inline";c.insertBefore(e,a);var f=document.createElement("img");f.src=hi5.tool.getImage("select","select.png");f.height=a.offsetHeight;f.style.verticalAlign="-6px";e.appendChild(a);e.appendChild(f);var g=document.createElement("select");b&&(g.multiple=!0,d||(d=","));c=a.getAttribute("hi5_size");g.size=c?c:10;if(c=a.getAttribute("hi5_list"))if(c=c.split(";"),e=c.length,0<e)for(var h=g.options,
k=0;k<e;k++)h[k]=new Option(c[k]);g.style.position="absolute";g.style.zIndex=99999;g.style.display="none";document.body.appendChild(g);a.show=function(){a.beforedropdown&&a.beforedropdown(a);g.style.display="";g.focus()};a.hide=function(){g.style.display="none";a.focus()};f.onclick=function(){if("none"==g.style.display){if(0==g.options.length){var c=a.getAttribute("onfetchlist");c&&eval(c)}c=hi5.tool.getPos(a,!1);g.style.left=c.x+"px";g.style.top=c.y+a.offsetHeight+"px";g.style.width=a.offsetWidth+
f.width+3+"px";a.show()}else a.hide()};g.onchange=function(){if(b){for(var c=[],e,f=g.options,h=0,k=f.length;h<k;h++)e=f[h],e.selected&&c.push(e.value);a.value=c.join(d)}else a.value=g.value,g.style.display="none";if(a.onchange)a.onchange()};a.options=g.options;return a};hi5.init.push(function(){for(var a=document.getElementsByClassName("Hi5Select"),b=a.length,d=0;d<b;d++)new hi5.Select(a[d])});
hi5.Tab=function(a){function b(c){var b=f;f!=c&&(g[f].className="tab_back",h[f].className="tab_hide",f=c);g[c].className="tab_front";h[c].className="tab_show";g[c].focus();b!=c&&a.fireEvent("ontabchange",[c,b])}function d(a){a=g.indexOf(a.target);-1!=a&&b(a)}hi5.EventControl(a);for(var c=a.getElementsByClassName("tab")[0].getElementsByClassName("tab_title")[0].childNodes,e=c.length,f=0,g=[],h=[],k=0;k<e;k++){var l=c[k];"SPAN"==l.nodeName.toUpperCase()&&(l.className="tab_back",l.onclick=d,l.onfocus=
d,g[g.length]=l)}c=a.getElementsByClassName("tab_body")[0].childNodes;e=c.length;for(k=0;k<e;k++)l=c[k],"DIV"==l.nodeName.toUpperCase()&&(h[h.length]=l,l.className="tab_hide");b(f);a.setSelected=b;a.getSelected=function(){return f};return a};hi5.init.push(function(){for(var a=document.getElementsByClassName("tab_all"),b=a.length,d=0;d<b;d++)new hi5.Tab(a[d])});hi5.graphic={};hi5.graphic.Line=function(){this.y2=this.x2=this.y1=this.x1=0};
hi5.graphic.Line.prototype.set=function(a,b,d,c){this.x1=a;this.y1=b;this.x2=d;this.y2=c};hi5.graphic.Line.prototype.intersection=function(a,b,d,c){var e,f,g,h,k={x:null,y:null,onLine1:!1,onLine2:!1},l=this.x1,m=this.y1,n=this.x2,p=this.y2;e=(c-b)*(n-l)-(d-a)*(p-m);if(0==e)return k;f=m-b;g=l-a;h=(n-l)*f-(p-m)*g;f=((d-a)*f-(c-b)*g)/e;g=h/e;k.x=l+(f*(n-l)|0);k.y=m+(f*(p-m)|0);0<f&&1>f&&(k.onLine1=!0);0<g&&1>g&&(k.onLine2=!0);return k};
hi5.graphic.Rectangle=function(a,b,d,c){this.x=a;this.y=b;this.width=d;this.height=c;var e=this;this.union=function(a,c,b,d){var l=e.width,m=e.height;if(0>(l|m))e.x=a,e.y=c,e.width=b,e.height=d;else if(!(0>(b|d))){var n=e.x,p=e.y,l=l+n,m=m+p;b+=a;d+=c;n>a&&(n=a);p>c&&(p=c);l<b&&(l=b);m<d&&(m=d);e.x=n;e.y=p;e.width=l-n;e.height=m-p}};this.intersection=function(a,c,b,d,l){var m=e.x,n=e.y,p;p=m+e.width;var q;q=n+e.height;b=a+b;d=c+d;m<a&&(m=a);n<c&&(n=c);p>b&&(p=b);q>d&&(q=d);p-=m;q-=n;return l?(l.x=
m,l.y=n,l.width=p,l.height=q,l):new hi5.graphic.Rectangle(m,n,p,q)};this.isEmpty=function(){return 0>=e.width||0>=e.height}};
hi5.notifications=new function(){function a(d){function c(a,c){var b=document.createElement("img");b.src=a;b.className="hi5_notifer_button";b.onclick=function(a){c.apply(e,[a])};return b}var e=document.createElement("div");e.className="hi5_notifer slideUp";e.title=d.title;e.message=d.msg;e.msgCount=1;var f=document.createElement("div");f.className="hi5_notifer_title";var g=document.createElement("img");g.src=hi5.tool.getImage("info","info.png");g.className="hi5_notifer_icon";f.appendChild(g);f.appendChild(document.createTextNode(e.title));
e.appendChild(f);f=document.createElement("div");g=document.createElement("span");g.innerHTML=d.msg;f.appendChild(g);if(!b.disableCounter){var h=document.createElement("span");h.className="hi5_notifer_count";e.addCount=function(a){e.msgCount+=a||1;h.innerHTML="("+e.msgCount+")"};d.count&&1<d.count&&e.addCount(d.count-1);f.appendChild(h)}d.cbNo&&f.appendChild(c(hi5.tool.getImage("del","del.png"),d.cbNo));d.cbYes&&f.appendChild(c(hi5.tool.getImage("ok","ok.png"),d.cbYes));e.appendChild(f);e.destroy=
function(){if(e.parentNode){e.parentNode.removeChild(e);var c=b.notifyPool.shift();if(c)b.getElement().appendChild(new a(c));else if(b.onempty&&0==b.notifySize())b.onempty();d.cbClose&&d.cbClose()}};d.timeout&&setTimeout(function(){e.destroy()},d.timeout);d.cbYes||d.cbNo||(e.onclick=e.destroy);return e}this.notifyPool=[];this.disableCounter=!1;this.getElement=function(){var a=hi5.$("hi5_notifer_all");a||(a=document.createElement("div"),a.id="hi5_notifer_all",document.body.appendChild(a));return a};
var b=this;this.notify=function(d){d="string"==typeof d?{msg:d,title:"",count:1}:d;d.title||(d.title="");d.count||(d.count=1);if(!b.onnotify||!b.onnotify(d)){var c=hi5.tool.getChildNodesByTag(b.getElement(),"div"),e=c.length;if(!b.disableCounter&&0<e&&(c=c[e-1],c.title==d.title&&c.message==d.msg)){c.addCount();return}if(3>e)b.getElement().appendChild(new a(d));else{e=b.notifyPool;if(!b.disableCounter&&0<e.length&&(c=e[e.length-1],c.title==d.title&&c.msg==d.msg)){c.count++;return}e.push(d)}}};this.notifySize=
function(){return hi5.tool.getChildNodesByTag(b.getElement(),"div").length};this.clearAll=function(){b.notifyPool.length=0;for(var a=b.getElement();a.hasChildNodes();)a.removeChild(a.firstChild)}};
hi5.Base64={table:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),enc:function(a,b,d){var c="",e=this.table;b||(b=a.length);d||(d=0);for(var f=d,g=d+b-2,h=b%3;f<g;f+=3)c+=e[a[f]>>2],c+=e[((a[f]&3)<<4)+(a[f+1]>>4)],c+=e[((a[f+1]&15)<<2)+(a[f+2]>>6)],c+=e[a[f+2]&63];2==h?(f=d+b-2,c+=e[a[f]>>2],c+=e[((a[f]&3)<<4)+(a[f+1]>>4)],c+=e[(a[f+1]&15)<<2],c+="="):1==h&&(f=d+b-1,c+=e[a[f]>>2],c+=e[(a[f]&3)<<4],c+="==");return c},binaries:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1],dec:function(a,b){var d=this.binaries,c,e,f,g,h,k=0,l=0;c=a.indexOf("=")-b;var m=a.length;0>c&&(c=m-b);c=Array(3*(c>>2)+Math.floor(c%4/1.5));e=c[0]=0;for(f=b;f<m;f++)g=d[a.charCodeAt(f)&
127],h="="==a.charAt(f),-1==g?console.log("Illegal character '"+a.charCodeAt(f)+"'"):(l=l<<6|g,k+=6,8<=k&&(k-=8,h||(c[e++]=l>>k&255),l&=(1<<k)-1));return c}};
hi5.file={readAsArrayBuffer:function(a,b){var d=new FileReader;d.onloadend=function(a){b(new Uint8Array(a.target.result))};d.readAsArrayBuffer(a)},getEntries:function(a){var b=a.target&&(a.target.webkitEntries||a.target.entries||[]);if(!b.length&&(a=a.dataTransfer&&a.dataTransfer.items))for(var d=0,c;c=a[d];++d)if("file"==c.kind){c=c.webkitGetAsEntry()||c.getAsEntry();if(!c)break;b.push(c)}return b},DirectoryReader:function(a){function b(a,c){var b=a.createReader(),d=[],k=function(){b.readEntries(function(a){a.length?
(d=d.concat(Array.prototype.slice.call(a||[],0)),k()):c(d)})};k()}function d(a){for(var f=0,g=a.length;f<g;f++){var h=a[f];h.isFile?h.file(function(a){return function(b){c.onfile(b,a)}}(h.fullPath)):h.isDirectory&&b(h,function(a){d(a)})}}var c=this;this.start=function(){d(a)}}};
hi5.DataBuffer=function(a,b,d){b||(b=0);d||(d=a.length);this.size=d;var c=b,e=b+d,f=hi5.Arrays.arraycopy,g=this;this.attach=function(b,d,f){a&&(a=null);a=b;c=d;g.size=f;e=d+f};this.reset=function(a){c=0;g.size=e=a};this.markEnd=function(a){e=a||g.getPosition()};this.getEnd=function(){return e};this.has=function(a){return e-c>=a};this.getByte=function(){return a[c++]};this.getBytes=function(b){var d;if(a.slice)d=a.slice(c,c+b);else if(a.buffer&&a.buffer.slice)d=new Uint8Array(a.buffer.slice(c,c+b));
else{d=Uint8Array?new Uint8Array(b):Array(b);for(var e=d[0]=0;e<b;e++)d[e]=a[c+e]}c+=b;return d};this.copyToByteArray=function(c,b,d,e){f(a,d,c,b,e)};this.getCapacity=function(){return a.length};this.getPosition=function(){return c};this.getLittleEndian16=function(){var b=a[c+1]<<8|a[c];c+=2;return b};this.getBigEndian16=function(){var b=a[c]<<8|a[c+1];c+=2;return b};this.getLittleEndian32=function(){var b=a[c+3]<<24|a[c+2]<<16|a[c+1]<<8|a[c];c+=4;return b};this.getLittleEndian64=function(){var b=
a[c+7]<<56|a[c+6]<<48|a[c+5]<<40|a[c+4]<<32|a[c+3]<<24|a[c+2]<<16|a[c+1]<<8|a[c];c+=8;return b};this.getBigEndian32=function(){var b=a[c]<<24|a[c+1]<<16|a[c+2]<<8|a[c+3];c+=4;return b};this.getUnicodeString=function(a,c){for(var b=Math.floor(a/2),d="",e=0;e<b;e++){var f=this.getLittleEndian16();if(c&&0==f){this.skipPosition(2*(b-e-1));break}d+=String.fromCharCode(f)}return d};this.getAscllString=function(a){for(var c="",b=a||e,d=0;d<b;d++){var f=this.getByte();if(0==f){a&&this.skipPosition(a-d-1);
break}c+=String.fromCharCode(f)}return c};this.setAscllString=function(b){for(var d=0,e=b.length;d<e;d++)a[c++]=b.charCodeAt(d)};this.setUnicodeString=function(a){for(var c=a.length,b=0;b<c;b++)this.setLittleEndian16(a.charCodeAt(b))};this.skipPosition=function(a){c+=a};this.setPosition=function(a){c=a};this.getData=function(){return a};this.setByte=function(b){a[c++]=b};this.setBytes=function(b,d,e){e||(e=b.length);for(d||(d=0);d<e;d++)a[c++]=b[d]};this.setLittleEndian16=function(b){a[c++]=b&255;
a[c++]=b>>8&255};this.setLittleEndian32=function(b){a[c++]=b&255;a[c++]=b>>8&255;a[c++]=b>>16&255;a[c++]=b>>24&255}};
hi5.Chat=function(a,b){function d(a,b,c){var d=document.createElement("span");d.className=b;d.innerHTML=a;c.appendChild(d);return d}function c(){var a=f.value;h.add(a,b);f.value="";if(h.onchat)h.onchat(a,b)}var e=hi5.$("chatHistory"),f=hi5.$("chatText"),g=hi5.$("chatSend"),h=this;this.add=function(c,f){var g=document.createElement("div");d((f||b)+":","chatFrom",g);d(c,"chatMsg",g);var h=new Date;d(h.getHours()+":"+h.getMinutes()+":"+h.getSeconds(),"chatTime",g);"block"!=a.style.display&&(a.style.display=
"block");e.appendChild(g);e.scrollTop=e.scrollHeight};f.addEventListener("keydown",function(a){13==a.keyCode&&c()},!1);g.addEventListener("click",c,!1)};document.addEventListener("DOMContentLoaded",hi5.init.start,!1);
