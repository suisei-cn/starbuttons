for(var l=C,u=g,x=m,F=[],f=[],p=typeof Uint8Array!="undefined"?Uint8Array:Array,y="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=0,s=y.length;c<s;++c)F[c]=y[c],f[y.charCodeAt(c)]=c;f["-".charCodeAt(0)]=62,f["_".charCodeAt(0)]=63;function A(r){var e=r.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var a=r.indexOf("=");a===-1&&(a=e);var o=a===e?0:4-a%4;return[a,o]}function C(r){var e=A(r),a=e[0],o=e[1];return(a+o)*3/4-o}function L(r,e,a){return(e+a)*3/4-a}function g(r){var e,a=A(r),o=a[0],n=a[1],t=new p(L(r,o,n)),v=0,d=n>0?o-4:o,h;for(h=0;h<d;h+=4)e=f[r.charCodeAt(h)]<<18|f[r.charCodeAt(h+1)]<<12|f[r.charCodeAt(h+2)]<<6|f[r.charCodeAt(h+3)],t[v++]=e>>16&255,t[v++]=e>>8&255,t[v++]=e&255;return n===2&&(e=f[r.charCodeAt(h)]<<2|f[r.charCodeAt(h+1)]>>4,t[v++]=e&255),n===1&&(e=f[r.charCodeAt(h)]<<10|f[r.charCodeAt(h+1)]<<4|f[r.charCodeAt(h+2)]>>2,t[v++]=e>>8&255,t[v++]=e&255),t}function B(r){return F[r>>18&63]+F[r>>12&63]+F[r>>6&63]+F[r&63]}function i(r,e,a){for(var o,n=[],t=e;t<a;t+=3)o=(r[t]<<16&16711680)+(r[t+1]<<8&65280)+(r[t+2]&255),n.push(B(o));return n.join("")}function m(r){for(var e,a=r.length,o=a%3,n=[],t=16383,v=0,d=a-o;v<d;v+=t)n.push(i(r,v,v+t>d?d:v+t));return o===1?(e=r[a-1],n.push(F[e>>2]+F[e<<4&63]+"==")):o===2&&(e=(r[a-2]<<8)+r[a-1],n.push(F[e>>10]+F[e>>4&63]+F[e<<2&63]+"=")),n.join("")}var k={byteLength:l,toByteArray:u,fromByteArray:x};export default k;
