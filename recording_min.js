RecordingManager=function(){function k(){f=0;0<h.length&&(h.length=0);0<g.length&&(g.length=0)}function p(a){if(0<f&&0<g.length)return r.exit(),(a||window.event).returnValue="Please download the recorded file first"}function l(a){for(var c=new Uint8Array(64),d=a.filetag||"RDPV",g=0,e=0;4>e;e++)c[g++]=d.charCodeAt(e);b(c,0,2,4);b(c,a.width,2,6);b(c,a.height,2,8);b(c,a.color,1,10);b(c,f,8,11);b(c,a.duration,8,19);b(c,1,4,27);h.push(c)}function b(a,c,d,b){for(--d;0<=d;d--)a[b++]=c>>8*d&255}function m(a){var c=
a.getType(),d=new Uint8Array(-1==c?8:10);b(d,a.getLen()+(-1==c?0:2),4,0);b(d,a.getTime()-f,4,4);-1!=c&&(b(d,a.getType()&255,1,8),b(d,a.getType()>>8,1,9));h.push(d);h.push(a.getData())}var g=[],n="",f=0,e,q="",h=[],r=this;this.setHeader=function(a){k();f=(new Date).getTime();e=a;n=".rdpv";null!=e.namesuffix&&void 0!=e.namesuffix&&(n=e.namesuffix);q=e.name+f+n;window.addEventListener("beforeunload",p,!1)};this.add=function(a){0<f&&g.push(a)};this.exit=function(){var a=g.length;if(0!=a&&0!=f){e.duration=
g[a-1].getTime()-f;l(e);for(var c=0;c<a;c++)m(g[c]);a=new Blob(h,{type:"application/octet-binary"});k();var b=URL.createObjectURL(a),a="";__svi18n&&__svi18n.info&&(a=__svi18n.info.recready);a||(a="Recorded file is ready. Please right click and save the link.");hi5.notifications.notify({msg:'<a href="'+b+'" target="_blank" download="'+q+'">'+a+"</a>",cbClose:function(){setTimeout(function(){(window.URL||window.webkitURL).revokeObjectURL(b)},999)}})}}};
RecordingObj=function(k,p,l,b){var m=(new Date).getTime();"undefined"==typeof b&&(b=48);this.strToInt=function(b){return parseInt(b,16)};this.getLen=function(){return l};this.getTime=function(){return m};this.getType=function(){return b};this.getData=function(){return k}};
