var svManager={getInstance:function(){var u=window.$vnc;if(u&&u.running&&u.running())return u;return null}};function connvertServer(u){var S=new Object;S.id=u.id;S.server=u.id;S.displayName=u.displayName||u.id;var O=u.vnc;if(O){for(var da in O)S[da]=O[da];S.pwd=O.password||""}return S}
svGlobal.Vnc=function(u,S,O,da){function aa(a){return a=="on"||a=="true"}function Ja(a,b){function e(a,b,c,e,f,d){var k=a+f;var n=b+d;for(var g=0;g<e;g++)h[n+g].set(h[b+g].subarray(a,a+c),k)}function c(a,b,c,e,f,d){var k=a+f;var n=b+d;for(var g=e-1;g>=0;g--)h[n+g].set(h[b+g].subarray(a,a+c),k)}function f(a,b,c,e,f,d){var k=a+f;var g=b+d;var n=h;var q;var m;var r;var p;for(q=c-1;q>=0;q--){r=k+q;p=a+q;for(m=0;m<e;m++)n[g+m][r]=n[b+m][p]}}function d(a,b,c,e,f,k){var n=a+f;var g=b+k;var q=h;var m;var r;
var p;var x;for(m=0;m<c;m++){p=n+m;x=a+m;for(r=0;r<e;r++)q[g+r][p]=q[b+r][x]}}function g(a){if(a-U>r)if(q.width>0){n.repaint(q.x,q.y,q.width,q.height);q.width=0;U=a}p=requestAnimationFrame(g)}var h=[];var m=null;var q=new hi5.graphic.Rectangle(0,0,0,0);var x="Uint8ClampedArray"in window;this.width=a;this.height=b;var r=D.animation||62;var J=false;var n=this;var Y=null;var U=0;var p=0;this.pause=function(a){J=a};this.release=function(){cancelAnimationFrame(p);n=null;m=null;h=null;Y=null};this.isPaused=
function(){return J};this.setContext=function(c){if(c==m)return;if(!m&&c&&!c.createImageData(1,1).data.buffer)x=false;m=c;if(m!=null)Y=m.createImageData(a,b)};this.getContext=function(){return m};this.resize=function(c,e){for(var f=0;f<e;f++)h[f]=new Uint32Array(c);n.width=a=c;n.height=b=e;if(m!=null)Y=m.createImageData(a,b)};n.resize(a,b);this.getBuffer=function(){return h};this.setRGB=function(a,b,c){h[b][a]=c|4278190080};this.getRGB=function(a,b){return h[b][a]};this.setRGBs=function(a,b,c,e,f,
d,k){var n=d;var g=0;var m=0;var q=a+c;var r=b+e;if(f.subarray)for(var p=b;p<r;p++,n+=k)h[p].set(f.subarray(n,n+c),a);else{var x;for(p=b;p<r;p++,n+=k){m=n;x=h[p];for(g=a;g<q;g++)x[g]=f[m++]}}};this.moveArea=function(a,b,n,g,h,m){if(m>0)c(a,b,n,g,h,m);else if(m<0)e(a,b,n,g,h,m);else if(h>0)f(a,b,n,g,h,m);else d(a,b,n,g,h,m)};this.getRGBs=function(a,b,c,e){var f=c*e;var d=_Uint32Array(f);d[0]=0;var n=h;var g=a+c;var k=b+e;var m=0;var q;for(var r=b;r<k;r++)for(q=a;q<g;q++)d[m++]=n[r][q];return d};this.repaint=
function(c,e,f,d){var n=Y.data;var g=0;var k=0;var q=0|0;var r=0;var p=0;var J=0|0;var U=0|0;if(c<0){f+=c;c=0}if(e<0){d+=e;e=0}if(c+f>a)f=a-c;if(e+d>b)d=b-e;g=c+f;k=e+d;if(x){var l=new Uint32Array(n.buffer);for(p=e;p<k;p++){l.set(h[p].subarray(c,g),q);q+=a}}else{U=(a-f)*4|0;for(p=e;p<k;p++){for(r=c;r<g;r++){J=h[p][r];n[q++]=J&255;n[q++]=J>>8&255;n[q++]=J>>16&255;n[q++]=255}q+=U}}m.putImageData(Y,c,e,0,0,f,d)};this.postPaint=function(a,b,c,e){if(q.width>0)q.union(a,b,c,e);else{q.x=a;q.y=b;q.width=
c;q.height=e}};this.startAnimation=function(){p=requestAnimationFrame(g)};this.fillRect=function(a,b,c,e,f){var d=a+c;var n=b+e;var g;for(var k=b;k<n;k++)if(h[k].fill)h[k].fill(f,a,d);else{var q=h[k];for(g=a;g<d;g++)q[g]=f}}}function Ka(a,b){if(y)y.resize(a,b);else y=new Ja(a,b);return y}function ra(){var a=u.indexOf("://");var b=u.substring(a+3);a=b.indexOf("/");if(a>0)b=b.substring(0,a);return location.protocol+"//"+b}function La(a){if(!sessionId)return"";var b=hi5.browser.httpGet(ra()+"/CLIP?s="+
sessionId+"&t="+Date.now(),false);setTimeout(function(){l.send("883")},999);return b}function Ma(){this.ws=null;this.capsLock=this.numLock=false;this.setJoinMode=d.setJoinMode;this.requestControl=d.requestControl;this.writeKeyComb=d.writeKeyComb;this.getAppMode=function(){return d.mode};this.send=function(a){if(!A)return;this.ws.send(a)};this.sendInput=function(a){d.writeRawInput(a);if(d.onactivity)d.onactivity(a)};this.getAppInfo=function(){return d.sessionInfo.appInfo};this.onresize=function(a){};
this.onorientationchange=function(a){};this.getClipData=La;this.onfocus=function(a){};this.fileCallback=[];this.getShareFiles=function(a,b){if(loggedin){this.ws.send("3A5"+a);this.fileCallback.push(b)}};this.notifyFiles=function(a){var b=this.fileCallback;var e=0;for(var c=b.length;e<c;e++)b[e](a)};this.getFile=function(a){window.open(d.getFileUrl(a))};this.removeFile=function(a){if(uploadMgr)uploadMgr.fileService.remove(a)};this.getFileLink=function(a){return ra()+"/DOWNLOAD?s="+sessionId+"&f="+
a};this.getGateway=function(){return u};this.reconnect=function(a,b,e){}}function Na(){return t.displayName||d.server}function sa(a){if(d.setTitle)document.title=a}function ba(a,b,e){this.need=a;this.handler=b;this.repeat=e||1}function ta(a){var b=0;var e=0;var c=new Uint8Array(a);var f=this;var d=new ba(0,null,0);this.release=function(){d=null;c=null;f=null};this.getHandler=function(){return d};this.getData=function(){return c};this.getPosition=function(){return b};this.setPosition=function(a){b=
a};this.getEnd=function(){return e};this.set=function(a,f,d){c=a;b=f;e=d};this.handle=function(){d.handler(f,d)};this.setHandler=function(a){if(a&&a.need<1)svGlobal.logger.warn("need < 1");d=a;if(a&&e-b>=a.need)a.handler(f,a)};this.getByte=function(){return c[b++]};this.peekByte=function(){return c[b]};this.getBE32=function(){return c[b++]<<24|c[b++]<<16|c[b++]<<8|c[b++]};this.getBE16=function(){return c[b++]<<8|c[b++]};this.skip=function(a){b+=a};this.skipBack=function(a){b-=a};this.getBytes=function(a,
e){if(!e){var f=b;b+=a;return c.subarray(f,b)}else for(var d=0;d<a;d++)e[d]=c[b++]};this.copyToByteArray=function(a,b,e,f){hi5.Arrays.arraycopy(c,e,a,b,f)};this.getString16LE=function(a,b){var e="";for(var f=a;f<b;){var d=c[f++]|c[f++]<<8;e+=String.fromCharCode(d)}return e}}function ua(){var a="";if(t&&aa(t.connectif)&&t.symlink&&"sessionStorage"in window){a="SV_"+t.symlink;if(t.user)a+=t.user}return a}function Oa(){var a=ua();var b="";if(a){b=sessionStorage[a]||"";if(b)b="&preSymJoin="+b}return b}
function Pa(){if(A)return;if(ia){l=ia;fa(t.width,t.height)}else{var a=hi5.tool.replaceQuery(u,"pwd","x")+Oa();var b=hi5.browser.binaryWS();if(b)a+="&binary=on";var e=window.opener;if(e){var c=null;try{c=e.__sparkUser}catch(d){}if(c){var f=c.account;var k=c.session;if(f)a+="&account="+f;if(k)a+="&session="+k}}var g=hi5.browser.isChrome&&hi5.browser.isDesktop;a+="&pasteCap="+(g?3:0);l=new WebSocket(a,"vnc");l.binaryType="arraybuffer"}ja.ws=l;svGlobal.logger.info(u);l.onopen=Qa;var h=new hi5.DataBuffer([],
0,0);l.onmessage=function(a){var b=a.data;var c=0;if(typeof b!="string"){var e=new Uint8Array(b);if(T!=null)T.add(new RecordingObj(e,0,b.byteLength));switch(e[0]){case 48:B.set(e,2,e-2);B.handle();break;case 60:if(ha){h.attach(e,2,e.length-2);Ra(h);break}case 146:h.attach(e,2,e.length-2);Sa(h);break;default:svGlobal.logger.warn("invalid type:"+e[0])}}else{c=parseInt(b.substring(0,2),16);var f=b.substring(2);switch(c){case 26:Ta(f);break;case 27:Ua(f);break;case 56:Va(f);break;case 59:Wa(f);break;
case 61:Xa(f);break;case 62:va(f);break;default:svGlobal.logger.warn("@TODO:"+b+"\n")}}};l.onclose=ga;l.onerror=Ya}function Ra(a){var b=a.getByte();switch(b){case 32:Za(a)}}function Za(a){if(y.isPaused())return;var b=a.getLittleEndian16();var e=a.getLittleEndian16();var c=a.getLittleEndian16();if(w)w.moveCursor(e,c,true)}function Sa(a){var b=a.getByte();switch(b){case 0:var e=new Uint8Array(2);e[0]=146;e[1]=1;l.send(e.buffer);break;case 1:if(L)L.check()}}function $a(a){T=new RecordingManager;var b=
a.server;var e={name:b,width:a.width,height:a.height,color:a.server_bpp,namesuffix:".vncv",filetag:"VNCV",duration:0};T.setHeader(e)}function Ua(a){if(D.drawLicense!=false)w.drawLicense(a)}function Wa(a){var b=hi5.Base64.dec(a,0);var e=b[0]|b[1]<<8|b[2]<<16|b[3]<<24;if(!(e&256))w.disableShadow()}function Va(a){var b=JSON.parse(a);var e=b;sessionId=b.session;e.server=d.server;var c=hi5.$("joinSelect");if(c)c.value=e.joinMode;c=hi5.$("requestControl");if(c)c.disabled=e.hasControl;if(!b.joined){d.mode=
0;B.setHandler(ka);M=new la}var f=D.page&&D.page.joinvnc||"joinvnc.html";f=location.protocol+"//"+location.host+"/"+f+"?id="+b.numericId;var k=b.webAddress;if(k&&k.length>0){var g=k.indexOf("://");var h=k.substring(g+3);g=h.indexOf("/");if(g>0)h=h.substring(0,g);if(h.toLowerCase()!=location.host.toLowerCase())f+="&gateway="+h}e.joinLink=f;d.sessionInfo.appInfo=e;if(b.ver&&b.ver!=svGlobal.version)svGlobal.logger.info("Client:"+svGlobal.version+" server:"+b.ver);if(d.onsessionstart)d.onsessionstart(d.sessionInfo)}
function wa(a){if(!ha)a.setCursor({"result":"url(data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAABQUFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAOAAAADgAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8f////H////x////8=) 0 0, none"});
else if(ma)a.setCursor({"system":"default","none":false,"result":"default"})}function Xa(a){var b=JSON.parse(a);switch(b.type){case 0:fa(b.width,b.height);H=b.color/8|0;if("ignoreCursor"in b)ma=b.ignoreCursor;if("trackCursorLocally"in b){ha=b.trackCursorLocally;wa(w)}var e=b.server;if(e){d.server=b.server;sa(Na())}playLength=b.length;if(w)w.setAutoScale(true);if(d.onopened)d.onopened(b);break;case 1:var c=b.duration;if(d.onprogress)d.onprogress(c,playLength);break;case 2:if(b.status==2){xa();A=true}else{var f=
b.status==0;y.pause(f);if(!f)y.repaint(0,0,y.width,y.height);if(b.warn)d.showMessage(f?__svi18n.info.sessionPaused:__svi18n.info.sessionResumed)}}}function lb(a){var b=__svi18n.errorCode[a];if(!b)b="error "+a;if(d.onerror)d.onerror({name:a,message:b});if(d.displayMsg)hi5.notifications.notify({"msg":b});if(svGlobal.log>0)console.error(b)}function Ta(a){var b=JSON.parse(a);if(!b.name){if(svGlobal.log>0)console.erro("No error code for message:"+a);return}svGlobal.logger.info("msg="+a);if(d.onerror)d.onerror(b);
var e=__svi18n.errorCode["S"+b.name]||"";e+=b.message;d.showMessage(e)}function Qa(a){svGlobal.logger.info("opened...");A=true;l.send("87"+navigator.userAgent);if(d.onopen)d.onopen()}function Ya(a){svGlobal.logger.warn(a)}function ga(a){if(!d)return;svGlobal.logger.warn("closed ...");var b=ua();if(b&&d.sessionInfo.appInfo&&d.mode==0)sessionStorage[b]=d.sessionInfo.appInfo.session;if(B&&B.getHandler()&&B.getHandler().handler==ya)d.onautherror&&d.onautherror();A=false;ca=false;if(L){L.stop();L=null}if(d&&
d.onclose)d.onclose(za);try{if(T!=null){T.exit();T=null}if(w){w.onclipdata=null;w.close();w=null}}catch(e){}u=null;Q=null;F=null;Aa=null;Ba=null;Ca=null;if(B){B.release();B=null}R=null;if(l){l.onopen=null;l.onmessage=null;l.onclose=null;l.onerror=null;l=null}if(W){W.release();W=null}if(M){M.release();M=null}F=null;v=null;ka=null;na=null;ja=null;w=null;if(y){y.release();y=null}if(d)d=null;if(window&&window.$vnc)window.$vnc=null;if(T!=null){T.exit();T=null}}function Da(){var a=new Uint8Array(2);a[0]=
147;a[1]=aa(t.share)?1:0;l.send(a.buffer);B.setHandler(new ba(24,function e(a){if(d.onloggedin)d.onloggedin();var f=d.sessionInfo;f.width=X=a.getBE16();f.height=V=a.getBE16();f.bpp=a.getByte();f.depth=a.getByte();f.bigEndian=a.getByte()!=0;f.trueColor=a.getByte()!=0;a.skip(12);var k=a.getBE32();var g="";for(var h=0;h<k;h++)g+=String.fromCharCode(a.getByte());f.name=g;svGlobal.logger.info("server name:"+g);sa(g);fa(X,V);ab()}))}function ya(a){var b=a.getBE32();svGlobal.logger.info("sec rst: "+b);var e=
{code:b,message:""};switch(b){case 0:Da();return;case 1:e.message=__svi18n.vnc.authError;break;case 2:e.message="Too many failed authentication";break;default:e.message="Unknown auth error"+b}B.setHandler(null);if(d.onautherror&&d.onautherror(e))return;d.showMessage(e.message);d.close()}function ab(){var a=[];var b=t.encoding;if(t.color==8&&b=="Tight")b="ZRLE";switch(b){case "Tight":a.push(7);a.push(16);break;case "Raw":a.push(0);a.push(16);break;default:a.push(16);a.push(7)}a.push(1);a.push(0);if(ha){a.push(4294967057);
a.push(4294967064)}a.push(4294967040+parseInt(t.compression||6));a.push(4294967264+parseInt(t.quality||5));var e=a.length;var c=new Uint8Array(5+e*4);c[0]=147;c[1]=2;c[3]=e>>8&255;c[4]=e&255;for(var f=0;f<e;f++){c[5+4*f]=a[f]>>24&255;c[6+4*f]=a[f]>>16&255;c[7+4*f]=a[f]>>8&255;c[8+4*f]=a[f]&255}l.send(c.buffer);bb();ca=true;if(t["recording"]!=undefined&&t["recording"]=="on")$a(t);cb()}function cb(a){if(D.pingInterval)d.startPing(D.pingInterval);if(d.onready)d.onready()}function Ea(a,b,e,c,f,d,g,h,
m,q){var x=new Uint8Array(21);x[0]=147;x[1]=0;x[5]=a;x[6]=b;x[7]=e?1:0;x[8]=c?1:0;x[9]=f>>8&255;x[10]=f&255;x[11]=d>>8&255;x[12]=d&255;x[13]=g>>8&255;x[14]=g&255;x[15]=h;x[16]=m;x[17]=q;l.send(x.buffer)}function bb(){var a=parseInt(t.color);switch(a){case 32:Ea(32,24,false,true,255,255,255,0,8,16);break;case 8:Ea(8,8,false,true,7,7,3,0,3,6);break;default:svGlobal.logger.warn("invliad color depath:"+a)}H=a/8|0;oa(0,0,X,V,false);B.setHandler(na)}function oa(a,b,e,c,f){var d=new Uint8Array(11);d[0]=
147;d[1]=3;d[2]=f?1:0;d[3]=a>>8&255;d[4]=a&255;d[5]=b>>8&255;d[6]=b&255;d[7]=e>>8&255;d[8]=e&255;d[9]=c>>8&255;d[10]=c&255;l.send(d.buffer)}function mb(a){return"rgb("+(a&255)+","+(a>>8&255)+","+(a>>16&255)+")"}function nb(a,b,e){return"rgb("+a+","+b+","+e+")"}function la(){var a=new TINF;a.init(d.mode==2?120:0);var b=new ta(0);var e=new Uint32Array(4096);var c=new Uint32Array(128);this.release=function(){e=null;c=null;a.release();a=null;b.release();b=null};this.getHistory=function(){return a.getHistory()};
this.setHistory=function(b){a.setHistory(b)};this.decode=function(d,k,g,h,m,q){var x=d.getBE32();var r=d.getBytes(x);var J=a.uncompress(r,0);var n=0;var Y=0;b.set(J.dest,0,J.destIndex);var U=g;var p=k;var l=0;var t=0;var u=0;var w=false;var v=0;var A=c;var K=0;var B=0;var D=0;var I=b.getByte;var C=e;for(U=g;U<g+m;U+=64){l=Math.min(g+m-U,64);for(p=k;p<k+h;p+=64){t=Math.min(k+h-p,64);u=I();w=(u&128)!=0;v=u&127;if(H==1)for(n=0;n<v;n++)A[n]=ea[I()];else for(n=0;n<v;n++)A[n]=I()|I()<<8|I()<<16|4278190080;
if(v==1&&!q){y.fillRect(p,U,t,l,A[0]);continue}if(!w){Y=t*l;if(v==0)if(H==1)for(n=0;n<Y;n++)C[n]=ea[I()];else for(n=0;n<Y;n++)C[n]=I()|I()<<8|I()<<16|4278190080;else{var z=v>16?8:v>4?4:v>2?2:1;K=0;for(n=0;n<l;n++){var G=K+t;var E=0;for(var F=0;K<G;){if(F==0){E=I();F=8}F-=z;C[K++]=A[E>>F&(1<<z)-1&127]}}}}else if(v==0){K=0;for(B=K+t*l;K<B;){D=H==1?ea[I()]:I()|I()<<8|I()<<16|4278190080;var P=1;do{E=I();P+=E}while(E==255);if(C.fill){C.fill(D,K,K+P);K+=P}else for(;P-- >0;)C[K++]=D}}else{K=0;for(B=K+t*
l;K<B;){var R=I();P=1;if((R&128)!=0){do{E=I();P+=E}while(E==255)}R&=127;D=A[R];if(C.fill){C.fill(D,K,K+P);K+=P}else for(;P-- >0;)C[K++]=D}}if(!q)y.setRGBs(p,U,t,l,C,0,t)}}if(!q)y.postPaint(k,g,h,m)}}function Fa(){function a(a,b,c,e,d){this.draw=function(){R.fillStyle=d;R.fillRect(a,b,c,e)};this.type=0;this.ready=function(){return true}}function b(a,b,c){this.draw=function(){R.putImageData(c,a,b)};this.type=1;this.ready=function(){return true}}function e(a,b,c){this.draw=function(){R.drawImage(c,a,
b)};this.type=2;this.ready=function(){return!!c.src&&c.complete};this.image=c}function c(){function a(){for(;b.length>0;){var c=b[0];if(!c.ready())break;c.draw();b.shift()}}var b=[];this.push=function(c){b.push(c);if(c.type==2)c.image.onload=a;else a()}}function f(){var a=m[h];if(!a){a=new TINF;a.init(d.mode==2?120:0);m[h]=a}return a}function k(a){var b=a.getByte();var c=b&127;if(b&128){b=a.getByte();c|=(b&127)<<7;if(b&128)c|=a.getByte()<<14}return c}function g(a,b){if(b<12){q.data=a.getBytes(b);
q.length=b}else{var c=k(a);var e=f().uncompress(a.getBytes(c),0);q.data=e.dest;q.length=e.destIndex}}var h=0;var m={};var q={data:[0],length:0};var x=new Array(256);x[0]=0;this.inUse=false;var r=this;var J=new c;this.release=function(){J=null;r=null;x=null;q=null;m=null};this.drawImageData=function(a,c,e){J.push(new b(c,e,a))};this.decode=function(c,d,m,p,l,t){if(!r.inUse){r.inUse=true;if(y){y.release();y=null}}var u=c.getByte();switch(u>>4){case 8:if(t)c.skip(3);else J.push(new a(d,m,p,l,"rgb("+
c.getByte()+","+c.getByte()+","+c.getByte()+")"));break;case 9:var w=k(c);var v=hi5.Base64.enc(c.getData(),w,c.getPosition());c.skip(w);if(!t){var D=new Image;J.push(new e(d,m,D));D.src="data:image/jpeg;base64,"+v}break;default:h=(u&48)>>4;var A=u&64?c.getByte():0;if(A==1){var B=c.getByte;var F=B()+1;var I=F!=2?p*l:l*((p+7)/8|0);var C=0;var z=0;var G=0;for(var E=0;C<F;C++)x[C]=B()|B()<<8|B()<<16|4278190080;g(c,I);var H=q.data;var P=R.createImageData(p,l);if("Uint8ClampedArray"in window){var S=new Uint32Array(P.data.buffer);
if(F!=2)for(C=0;C<I;C++)S[C]=x[H[C]];else{G=0;var T=(p+7)/8|0;var L=0;var Q=0;for(var O=0;O<l;O++){L=O*T;for(var Z=0;Z<(p/8|0);Z++){z=H[L+Z];for(E=7;E>=0;E--)S[G++]=x[z>>E&1]}Q=8-p%8;for(E=7;E>=Q;E--)S[G++]=x[H[L+Z]>>E&1]}}}else{var N=P.data;G=0;if(F!=2)for(C=0;C<I;C++){z=x[H[C]];N[G++]=z&255;N[G++]=z>>8&255;N[G++]=z>>16&255;N[G++]=255}else{G=0;T=(p+7)/8|0;L=0;Q=0;var M=0;for(O=0;O<l;O++){L=O*T;for(Z=0;Z<(p/8|0);Z++){z=H[L+Z];for(E=7;E>=0;E--){M=x[z>>E&1];N[G++]=M&255;N[G++]=M>>8&255;N[G++]=M>>16&
255;N[G++]=255}}Q=8-p%8;for(E=7;E>=Q;E--){M=x[H[L+Z]>>E&1];N[G++]=M&255;N[G++]=M>>8&255;N[G++]=M>>16&255;N[G++]=255}}}}if(!t)J.push(new b(d,m,P))}else if(A==0){w=p*l*3;if(w>11)w=k(c);var W=p*l;var X=W*3;H=X>11?f().uncompress(c.getBytes(w),0).dest:c.getBytes(X);P=R.createImageData(p,l);N=P.data;G=0;var V=0;for(C=0;C<W;C++){N[G++]=H[V++];N[G++]=H[V++];N[G++]=H[V++];N[G++]=255}if(!t)J.push(new b(d,m,P))}else svGlobal.logger.info("xx filter:"+A)}}}function va(a){var b=parseInt(a.substring(0,1),16);var e;
var c;var f=a.substring(1);var k=false;var g=d.sessionInfo.appInfo;switch(b){case 0:c=JSON.parse(f);xa();A=true;var h=c.width;var m=c.height;if(h==X&&m==V)break;fa(h,m);break;case 1:_reconnectOnResize=d.reconnectOnResize;d.reconnectOnResize=false;c=JSON.parse(f);if(d.onsessionjoin)k=d.onsessionjoin(c);if(k)break;d.showMessage(__svi18n.info.joinsession.applyArgs([c.numericId,c.__ip,c.name]));break;case 2:c=JSON.parse(f);if(c.joined==0)d.reconnectOnResize=_reconnectOnResize;if(d.onsessionexit)k=d.onsessionexit(c);
if(k)break;d.showMessage(__svi18n.info.exitsession.applyArgs([c.numericId,c.__ip,c.name]));break;case 3:c=JSON.parse(f);if(g.joinMode!=c.mode){g.joinMode=c.mode;var q=hi5.$("joinSelect");if(q)q.value=c.mode}if(g.hasControl)return;w.setReadOnly(false);e=hi5.$("requestControl");if(e)e.disabled=true;if(d.ongivecontrol)k=d.ongivecontrol();if(k)break;d.showMessage(__svi18n.info.givecontrol);break;case 4:w.setReadOnly(true);g.hasControl=false;e=hi5.$("requestControl");if(e)e.disabled=false;if(d.ontakebackcontrol)k=
d.ontakebackcontrol();if(k)break;d.showMessage(__svi18n.info.nocontrol);break;case 5:var x=function(){d.refuseControl(c.numericId);this.destroy()};var r=function(){d.giveControl(c.numericId);this.destroy()};c=JSON.parse(f);if(d.onrequirecontrol)k=d.onrequirecontrol(c);if(k)break;var J=__svi18n.info.title.applyArgs([c.name,c.numericId,c.__ip]);hi5.notifications.notify({"title":J,"msg":__svi18n.info.recontrol,"cbYes":r,"cbNo":x});break;case 10:if(a.length==1)l.send("8E8"+hi5.Base64.enc(M.getHistory()));
else{M.setHistory(hi5.Base64.dec(a.substring(1),0));d.refreshOutput();ca=true;if(d.onloggedin)d.onloggedin()}break;case 11:var n=function(){d.allowJoin(c.numericId,false);this.destroy()};var t=function(){d.allowJoin(c.numericId,true);this.destroy()};c=JSON.parse(f);if(d.onrequirejoin)k=d.onrequirejoin(c);if(k)break;J=__svi18n.info.title.applyArgs([c.name,c.numericId,c.__ip]);hi5.notifications.notify({"title":J,"msg":__svi18n.info.reqjoin,"cbYes":t,"cbNo":n})}}function db(a){if(!d.openLink)return false;
var b=a;a=a.toLowerCase();var e=a.indexOf("http://")==0||a.indexOf("https://")==0||a.indexOf("ftp://")==0||a.indexOf("mailto:")==0||a.indexOf("tel:")==0||a.indexOf("callto:")==0;if(!e)if(a.indexOf("www.")==0){e=true;a="http://"+a}else if(a.indexOf("ftp.")==0){e=true;a="ftp://"+a}if(e){if(a.indexOf("\r")>0||a.indexOf("\n")>0)return false;if(d.onurlredirection&&d.onurlredirection(e))return true;w.processLink(b);return true}return false}function eb(a,b,e,c,d,k,g,h,m){function q(){var a=0|0;if(b){var c=
0;for(var e=b.length;c<e;c++)if(b[c]!=0)a+=c%d+(c/d|0)}return a}function x(a){if(a==507)return"text";else return""}this.cache_idx=a;this.rawData=b;this.none=!b;this.hotX=e;this.hotY=c;this.width=d;this.height=k;this.xorSize=h;this.andSize=m;this.result="";this.distance=0;this.bpp=g;this.system="";this.init=function(){if(this.distance)this.distance=q();if(!this.system)this.system=x(this.distance)};var r="";if(!this.system&&b){var l=40;var n=d*k*4;var t=22+l+n+h+m;var u=new Uint8Array(t);var p=new hi5.DataBuffer(u,
0,t);p.setLittleEndian16(0);p.setLittleEndian16(2);p.setLittleEndian16(1);p.setByte(d);p.setByte(k);p.setByte(0);p.setByte(0);p.setLittleEndian16(e);p.setLittleEndian16(c);p.setLittleEndian32(l+n+h+m);p.setLittleEndian32(22);p.setLittleEndian32(l);p.setLittleEndian32(d);p.setLittleEndian32(k*2);p.setLittleEndian16(1);p.setLittleEndian16(32);p.setLittleEndian32(0);p.setLittleEndian32(h+m);p.setLittleEndian32(0);p.setLittleEndian32(0);p.setLittleEndian32(0);p.setLittleEndian32(0);var w;var v;for(w=
k-1;w>=0;w--)for(v=0;v<d;v++){var y=b[d*w+v];p.setByte(y&255);p.setByte(y>>8&255);p.setByte(y>>16&255);p.setByte(y>>24&255)}if(hi5.browser.isIE);else r="data:image/x-icon;base64,"+hi5.Base64.enc(p.getData())}this.url=r}function fb(a,b,e,c,d){var k=(c+7)/8|0;var g=k*d;var h=c*d;var m=new Uint32Array(h);var q=a.getBytes(h*H);var l=a.getBytes(g);var r=0;var t;var n;var u;var v=0;var p=0;for(n=0;n<d;n++){for(t=0;t<c/8;t++){r=l[n*k+t];for(u=7;u>=0;u--){if((r>>u&1)!=0)if(H==1);else v=4278190080|(q[p*4+
2]&255)<<16|(q[p*4+1]&255)<<8|q[p*4]&255;else v=0;m[p++]=v}}for(u=7;u>=8-c%8;u--){if((l[n*k+t]>>u&1)!=0)if(H==1)v=0;else v=4278190080|(q[p*4+2]&255)<<16|(q[p*4+1]&255)<<8|q[p*4]&255;else v=0;m[p++]=v}}var y=new eb(0,m,b,e,c,d,4,h*4,h/8|0);w.setCursor(y)}function gb(a){var b=0;var e=0;var c=0;var f=0;var k=0;var g="";var h=a.getByte();var m=false;switch(h){case 0:a.skip(1);var q=a.getBE16();for(var l=0;l<q;l++){b=a.getBE16();e=a.getBE16();c=a.getBE16();f=a.getBE16();k=a.getBE32()>>>0;switch(k){case 4294967073:fa(c,
f);break;case 240:case 4294967056:if(c*f!=0)a.skip(((c+7)/8|0)*f*2+6);break;case 4294967057:if(c*f!=0)if(ma||m)a.skip(c*f*H+((c+7)/8|0)*f);else fb(a,b,e,c,f);break;case 4294967064:break;case 0:if(c*f>0)hb(a,b,e,c,f);break;case 1:var r=a.getBE16();var t=a.getBE16();if(!m)if(W.inUse)R.putImageData(R.getImageData(r,t,c,f),b,e);else{y.moveArea(r,t,c,f,b-r,e-t);y.repaint(b,e,c,f)}break;case 7:W.decode(a,b,e,c,f,m);break;case 16:M.decode(a,b,e,c,f,m);break;default:svGlobal.logger.warn("Encoding "+k+" is not supported");
d.close()}}oa(0,0,X,V,true);return;case 1:svGlobal.logger.warn("xxx color map");break;case 2:break;case 3:a.skip(3);var n=a.getBE32();if(n>0){var u=a.getBytes(n);g=String.fromCharCode.apply(null,u);if(d.onservercopy&&d.onservercopy(g))return;if(!db(g))w.copyToClip("text/plain;"+g)}break;case 48:g=a.getString16LE(0,a.getEnd());va(g);a.skip(a.getEnd()-a.getPosition());break;default:svGlobal.logger.warn("XX PDU:"+h)}}function hb(a,b,e,c,d){var k=null;var g=c*d;var h=0;var m=a.getPosition();var q=a.getData();
var l;if(W.inUse){var r=R.createImageData(c,d);if(H==4){if("Uint8ClampedArray"in window){l=new Uint32Array(r.data.buffer);for(h=0;h<g;h++){l[h]=q[m++]<<16|q[m++]<<8|q[m++]|4278190080;m++}}else{l=r.data;for(var t=g*4;h<t;){l[h++]=q[m+2];l[h++]=q[m+1];l[h++]=q[m];l[h++]=255;m+=4}}a.skip(g*4)}else if(H==1){if("Uint8ClampedArray"in window){l=new Uint32Array(r.data.buffer);for(h=0;h<g;h++)l[h]=ea[q[m++]]}else{l=r.data;t=g*4;for(var n=0;h<t;){n=ea[q[m++]];l[h++]=n&255;l[h++]=n>>8&255;l[h++]=n>>16&255;l[h++]=
255}}a.skip(g)}W.drawImageData(r,b,e);return}switch(H){case 4:if(m%4==0){m+=3;for(h=0;h<g;h++){q[m]=255;m+=4}k=new Uint32Array(a.getData().buffer,a.getPosition(),g)}else{k=new Uint32Array(g);for(h=0;h<g;h++){k[h]=q[m++]|q[m++]<<8|q[m++]<<16|4278190080;m++}}a.skip(g*4);break;case 1:k=new Uint32Array(g);for(h=0;h<g;h++)k[h]=ea[q[m++]];a.skip(g)}y.setRGBs(b,e,c,d,k,0,c);y.postPaint(b,e,c,d)}function ob(a,b,e,c,d){}function pb(a,b,e,c,d){var k=40;var g=a*b*4;var h=a*b/8|0;var m=h;var l=22+k+g+h+m;var t=
new Array(l);t[0]=0;var r=new hi5.DataBuffer(t,0,l);r.setLittleEndian16(0);r.setLittleEndian16(2);r.setLittleEndian16(1);r.setByte(a);r.setByte(b);r.setByte(0);r.setByte(0);r.setLittleEndian16(e);r.setLittleEndian16(c);r.setLittleEndian32(k+g+h+m);r.setLittleEndian32(22);r.setLittleEndian32(k);r.setLittleEndian32(a);r.setLittleEndian32(b*2);r.setLittleEndian16(1);r.setLittleEndian16(32);r.setLittleEndian32(0);r.setLittleEndian32(h+m);r.setLittleEndian32(0);r.setLittleEndian32(0);r.setLittleEndian32(0);
r.setLittleEndian32(0);var u;var n;for(u=b-1;u>=0;u--)for(n=0;n<a;n++){var v=d[a*u+n];r.setByte(v&255);r.setByte(v>>8&255);r.setByte(v>>16&255);r.setByte(v>>24&255)}var w=a/8>>0;for(u=0;u<b;u+=1)for(n=0;n<w;n+=1)r.setByte(0);for(u=0;u<b;u+=1)for(n=0;n<w;n+=1)r.setByte(0);return{"data":"data:image/x-icon;base64,"+hi5.Base64.enc(r.getData()),"hotX":e,"hotY":c}}function fa(a,b){X=a;V=b;t.width=a;t.height=b;y.resize(a,b);if(w)w.setSize(a,b);if(d.onresolutionchange)d.onresolutionchange(a,b)}function ib(a){if(!ca)return;
var b=a.getData("text/plain");if(b){var e=b.length;var c=new Int8Array(9+e);c[0]=147;c[1]=6;c[5]=e>>24&255;c[6]=e>>16&255;c[7]=e>>8&255;c[8]=e&255;for(var d=0;d<e;d++)c[9+d]=b.charCodeAt(d);l.send(c.buffer)}}function xa(){A=false;loggedin=false;W=new Fa;M=new la}function jb(a,b,e){if(!ca)return;v[2]=a?16:8;v[3]=b>>8&255;v[4]=b&255;v[5]=e>>8&255;v[6]=e&255;v[9]=v[3];v[10]=v[4];v[11]=v[5];v[12]=v[6];l.send(v.buffer)}function pa(a,b,e,c){if(!ca)return;Ga=a;var d=a?1<<b:0;if(d==F[1]&&e==(F[2]<<8|F[3])&&
c==(F[4]<<8|F[5]))return;F[2]=a?1<<b:0;F[3]=e>>8&255;F[4]=e&255;F[5]=c>>8&255;F[6]=c&255;l.send(F.buffer)}function qa(a,b){Q[2]=a?1:0;Q[5]=b>>24&255;Q[6]=b>>16&255;Q[7]=b>>8&255;Q[8]=b&255;l.send(Q.buffer);z.preKey=b;switch(b){case 65505:case 65506:z.shiftDown=a;break;case 65507:case 65508:z.ctrlDown=a;break;case 65513:case 65514:z.altDown=a;if(a&&z.altNumpad){z.altNumpad=false;z.ignoreUnicode=true}}}function Ha(a,b){var e=Aa[b.toLowerCase()];if(e)d.writeScancode(a,e);else{var c=b.length;if(c==0)return;
if(c==1)d.writeKeyCode(a,b.toUpperCase().charCodeAt(0));else if(a)d.writeText(b)}}this.displayMsg=true;this.reconnectTimes=0;this.openLink=true;this.setTitle=true;this.mode=0;var ia=typeof u=="object"?u:null;var Ia=typeof u=="object"||u.indexOf("/PLAY?")>0;if(Ia){this.mode=1;if(ia)u="";u+="&touchpad=on"}else if(u.indexOf("/JOIN?")>0){this.mode=2;this.reconnectOnResize=false}var D=hi5.appcfg||{img:{},toolbar:{fadable:true}};var t=hi5.tool.queryToObj(u.substring(u.indexOf("?")+1));var L=null;var za=
false;if(!t.width&&S){t.width=S;u+="&width="+S}if(!t.wHeight&&O){t.height=O;u+="&height="+O}if(!t.color&&da){t.color=da;u+="&color="+da}if(!t.color)t.color=32;var ma=t.ignoreCursor==undefined||aa(t.ignoreCursor);var ha=t.trackCursorLocally==undefined||aa(t.trackCursorLocally);this.server=t["server"];this.port=parseInt(t["port"],10);this.sessionInfo={major:0,minor:0,width:0,height:0,bpp:0,bigEndian:true,trueColor:true};var w=null;var A=false;var ca=false;var T=null;window.$vnc=this;var B=new ta(4194304);
this.running=function(){return A};var d=this;var l=null;var H=4;var X=1024;var V=768;var ea=[-16777216,-16777180,-16777143,-16777107,-16777070,-16777034,-16776997,-16776961,-16768E3,-16767964,-16767927,-16767891,-16767854,-16767818,-16767781,-16767745,-16758528,-16758492,-16758455,-16758419,-16758382,-16758346,-16758309,-16758273,-16749312,-16749276,-16749239,-16749203,-16749166,-16749130,-16749093,-16749057,-16739840,-16739804,-16739767,-16739731,-16739694,-16739658,-16739621,-16739585,-16730624,
-16730588,-16730551,-16730515,-16730478,-16730442,-16730405,-16730369,-16721152,-16721116,-16721079,-16721043,-16721006,-16720970,-16720933,-16720897,-16711936,-16711900,-16711863,-16711827,-16711790,-16711754,-16711717,-16711681,-11206656,-11206620,-11206583,-11206547,-11206510,-11206474,-11206437,-11206401,-11197440,-11197404,-11197367,-11197331,-11197294,-11197258,-11197221,-11197185,-11187968,-11187932,-11187895,-11187859,-11187822,-11187786,-11187749,-11187713,-11178752,-11178716,-11178679,-11178643,
-11178606,-11178570,-11178533,-11178497,-11169280,-11169244,-11169207,-11169171,-11169134,-11169098,-11169061,-11169025,-11160064,-11160028,-11159991,-11159955,-11159918,-11159882,-11159845,-11159809,-11150592,-11150556,-11150519,-11150483,-11150446,-11150410,-11150373,-11150337,-11141376,-11141340,-11141303,-11141267,-11141230,-11141194,-11141157,-11141121,-5636096,-5636060,-5636023,-5635987,-5635950,-5635914,-5635877,-5635841,-5626880,-5626844,-5626807,-5626771,-5626734,-5626698,-5626661,-5626625,
-5617408,-5617372,-5617335,-5617299,-5617262,-5617226,-5617189,-5617153,-5608192,-5608156,-5608119,-5608083,-5608046,-5608010,-5607973,-5607937,-5598720,-5598684,-5598647,-5598611,-5598574,-5598538,-5598501,-5598465,-5589504,-5589468,-5589431,-5589395,-5589358,-5589322,-5589285,-5589249,-5580032,-5579996,-5579959,-5579923,-5579886,-5579850,-5579813,-5579777,-5570816,-5570780,-5570743,-5570707,-5570670,-5570634,-5570597,-5570561,-65536,-65500,-65463,-65427,-65390,-65354,-65317,-65281,-56320,-56284,
-56247,-56211,-56174,-56138,-56101,-56065,-46848,-46812,-46775,-46739,-46702,-46666,-46629,-46593,-37632,-37596,-37559,-37523,-37486,-37450,-37413,-37377,-28160,-28124,-28087,-28051,-28014,-27978,-27941,-27905,-18944,-18908,-18871,-18835,-18798,-18762,-18725,-18689,-9472,-9436,-9399,-9363,-9326,-9290,-9253,-9217,-256,-220,-183,-147,-110,-74,-37,-1];var y=Ka(1024,768);var R=y.getContext();this.writeKeyComb=function(a){var b=a.split("+");var e=b.length;if(e==0)return;var c=null;for(var d=0;d<e;d++){var k=
b[d];if(k==""&&c=="")k="Add";if(k!="")Ha(true,k);c=k}for(d=e-1;d>=0;d--){k=b[d];if(k==""&&c=="")k="Add";if(k!="")Ha(false,k);c=k}};var ja=new Ma;if(D.displayMsg!=undefined)this.displayMsg=D.displayMsg;if(D.reconnectTimes!=undefined)this.reconnectTimes=D.reconnectTimes;if(D.openLink!=undefined)this.openLink=D.openLink;if(D.setTitle!=undefined)this.setTitle=D.setTitle;if(typeof D.useWSS=="boolean")u=(D.useWSS?"wss":"ws")+u.substring(u.indexOf("://"));this.getURL=function(){return u};var kb=parseInt(t.server_bpp||
t.color||24);this.getColor=function(){return kb};this.sendPing=function(a){var b=a?2+a.length:2;var d=new Uint8Array(b);d[0]=146;d[1]=0;if(a)d.set(a,2);l.send(d.buffer)};this.startPing=function(a,b){b=b||0;if(!L)L=new hi5.tool.ResponseMonitor(function(){d.sendPing()},function(){if(!A)return;if(d.onnoresponse)return d.onnoresponse()});L.setInterval(a,b);var e=new Uint8Array(4);e[0]=146;e[1]=2;e[2]=a;e[3]=b;l.send(e.buffer);d.sendPing()};this.stopPing=function(){if(L)L.stop()};this.setJoinMode=function(a){if(!A)return;
l.send("8E1"+a)};this.refuseControl=function(a){if(!A)return;l.send("8E3"+a)};this.giveControl=function(a){if(!A)return;l.send("8E4"+a)};this.requestControl=function(){if(!A)return;l.send("8E2")};this.allowJoin=function(a,b){if(!A)return;l.send("8EA"+a+"\t"+(b?1:0))};this.play=function(){l.send("F3")};this.pause=function(){l.send("F2")};this.scan=function(a){l.send("F4"+(a?"1":"0"))};this.seek=function(a){if(w&&A){l.send("F4"+(a?"1":"0")+"\t"+(a/w.getScale()|0));y.pause(true)}};this.run=function(){Pa();
y.startAnimation()};this.hide=function(){if(!w)return;w.hide()};this.showMessage=function(a){if(!d.displayMsg||!a)return;hi5.notifications.notify({"msg":a})};this.close=function(){za=true;if(l&&A)try{for(;l&&l.readyState!=WebSocket.CLOSING&&l.readyState!=WebSocket.CLOSED;){l.send("85");l.close()}}finally{ga()}else ga()};if(!hi5.browser.isChromeApp)window.addEventListener("unload",ga,false);else chrome.runtime.onSuspend.addListener(ga);var ka=new ba(12,function b(e){var c=e.getByte()==82&&e.getByte()==
70&&e.getByte()==66;if(!c){d.showMessage(__svi18n.vnc.notvnc);d.close();return}e.skip(1);d.sessionInfo.major=(e.getByte()-48)*100+(e.getByte()-48)*10+(e.getByte()-48);e.skip(1);d.sessionInfo.minor=(e.getByte()-48)*100+(e.getByte()-48)*10+(e.getByte()-48);svGlobal.logger.info("RFB major: "+d.sessionInfo.major+" minor: "+d.sessionInfo.minor);e.skip(1);var f="\u0093RFB 003.003\n";var k=new Uint8Array(13);for(var g=0;g<13;g++)k[g]=f.charCodeAt(g);l.send(k.buffer);B.setHandler(new ba(4,function m(b){var c=
b.getBE32();svGlobal.logger.info("sec type:"+c);switch(c){case 1:Da();break;case 2:B.setHandler(new ba(12,function(){svGlobal.logger.info("vnc auth");var c=new Int8Array(17);c[0]=147;b.copyToByteArray(c,1,b.getPosition(),16);b.skip(16);var d=t.pwd||"";if(d.length>8)d=d.substring(0,8);var e=[0,0,0,0,0,0,0,0];var f=0;for(var g=d.length;f<g;f++)e[f]=d.charCodeAt(f);var k=new DesCipher(e);k.encrypt(c,1,c,1);k.encrypt(c,9,c,9);l.send(c.buffer);B.setHandler(new ba(4,ya))}));break;default:d.showMessage(__svi18n.vnc.securityError);
d.close()}}))});B.setHandler(ka);this.refreshOutput=function(b,d,c,f){b=b||0;d=d||0;var k=c?c-b+1:X;var g=f?f-d+1:V;oa(b,d,k,g,false)};var na=new ba(1,gb);if(d.mode==2||d.mode==1)B.setHandler(na);var W=new Fa;var M=new la;this.addSurface=function(b){w=b;if(Ia)b.setPlayerMode();y.setContext(w.context);R=y.getContext();b.setAutoScale(d.mode>0);b.setSize(X,V);b.setController(ja);b.setFastCopy(aa(t["fastCopy"]));b.setTouchpad(aa(t["touchpad"]));b.setClipboard(aa(t["mapClipboard"]));b.run(99997);wa(w);
b.onclipdata=ib};var F=new Uint8Array(7);F[0]=147;F[1]=5;var Ga=false;var v=new Uint8Array(13);v[0]=147;v[1]=5;v[7]=5;v[8]=0;this.mouseDown=function(b,d,c){pa(true,c,b,d)};this.mouseMove=function(b,d){pa(Ga,0,b,d)};this.mouseUp=function(b,d,c){pa(false,c,b,d)};this.writeKeyCode=function(b,e){d.writeRawInput("8B"+(b?0:49152)+"\t"+e)};this.writeScancode=function(b,e){if(!A)return;if(typeof b=="number"){d.writeRawInput("84"+"0\t"+b);d.writeRawInput("84"+"49152\t"+b);return}d.writeRawInput("84"+(b?0:
49152)+"\t"+e)};this.writeText=function(b){d.writeRawInput("86"+b)};var Ca={57:32,201:65365,209:65366,207:65367,199:65360,203:65361,200:65362,205:65363,208:65364,183:65377,210:65379,211:65535,184:65514,219:65511,220:65512,1:65307,14:65288,15:65289,28:65293,29:65507,42:65505,54:65506,56:65513,59:65470,60:65471,61:65472,62:65473,63:65474,64:65475,65:65476,66:65477,67:65478,68:65479,87:65480,88:65481,70:65300,157:65508};var Ba={96:65438,97:65436,98:65433,99:65435,100:65430,101:65437,102:65432,103:65429,
104:65431,105:65434,110:65439};var z={altDown:false,altNumpad:false,ignoreUnicode:false,ctrlDown:false,shiftDown:false,preKey:0,hasModifier:function(b){if(z.ctrlDown||z.altDown)return true;if(!b&&z.preKey>65506&&z.preKey<65515)return true;return false}};var Q=new Uint8Array(9);Q[0]=147;Q[1]=4;this.writeRawInput=function(b){if(!ca)return;var e=parseInt(b.substring(0,2),16);var c=b.substring(2).split("\t");var f=0;var k=false;var g="";switch(e){case 128:d.mouseDown(parseInt(c[0]),parseInt(c[1]),parseInt(c[2]));
return;case 129:d.mouseUp(parseInt(c[0]),parseInt(c[1]),parseInt(c[2]));return;case 130:d.mouseMove(parseInt(c[0]),parseInt(c[1]));return;case 131:jb(parseInt(c[2])!=0,parseInt(c[0]),parseInt(c[1]));return;case 132:f=Ca[c[1]]||0;k=c[0]==0;break;case 139:k=c[0]==0;f=parseInt(c[1]);if(z.altDown&&f>95&&f<106){f=Ba[c[1]];z.altNumpad=true}else{g=c.length>2&&c[2].length==1?c[2]:String.fromCharCode(f);f=z.shiftDown?g.toUpperCase().charCodeAt(0):g.toLowerCase().charCodeAt(0)}break;case 134:if(z.ignoreUnicode){z.ignoreUnicode=
false;return}var h=0;for(var l=c[0].length;h<l;h++){f=c[0].charCodeAt(h);qa(true,f);qa(false,f)}return}if(f>0)qa(k,f);else svGlobal.logger.info("Unknowncode: "+c[1]+" type:"+e)};var Aa={" ":57,"space":57,"pageup":201,"pagedown":209,"end":207,"home":199,"left":203,"up":200,"right":205,"down":208,"printscreen":183,"insert":210,"del":211,"delete":211,"altgr":184,"windows":219,"windowsright":220,"context":221,"esc":1,"backspace":14,"tab":15,"enter":28,"meta":29,"command":29,"ctrl":29,"shift":42,"alt":56,
"capslock":58,"f1":59,"f2":60,"f3":61,"f4":62,"f5":63,"f6":64,"f7":65,"f8":66,"f9":67,"f10":68,"f11":87,"f12":88,"numlock":69,"scrolllock":70,"add":78}};
