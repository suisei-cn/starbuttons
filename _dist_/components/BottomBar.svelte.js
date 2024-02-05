import"./BottomBar.svelte.css.proxy.js";import{SvelteComponent as T,append as r,attr as e,create_component as q,destroy_component as H,detach as L,element as p,init as M,insert as y,mount_component as $,noop as x,safe_not_equal as C,space as S,text as m,transition_in as j,transition_out as B}from"../../_snowpack/pkg/svelte/internal.js";import"../../_snowpack/pkg/svelte-i18n.js";import G from"./LanguageSwitch.svelte.js";function F(w){let t,n,f,s,g,a,b,o,_,i,d,l,k,u,h;return u=new G({}),{c(){t=p("footer"),n=p("a"),n.innerHTML='<i class="icon-github"></i>',f=m(`
  /
  `),s=p("a"),s.innerHTML=`<i class="icon-telegram"></i> 
    <sup>(CN)</sup>`,g=m(`
  /
  `),a=p("a"),a.innerHTML=`<i class="icon-discord"></i> 
    <sup>(JP)</sup>`,b=m(`
  /
  `),o=p("a"),o.innerHTML=`<i class="icon-discord"></i> 
    <sup>(EN)</sup> 
  `,_=m(`/
  `),i=p("a"),i.innerHTML='<i class="icon-youtube"></i>',d=S(),l=p("a"),l.innerHTML='<i class="icon-twitter"></i>',k=m(`
  /
  `),q(u.$$.fragment),e(n,"href","https://github.com/suisei-cn/starbuttons"),e(n,"aria-label","GitHub repository of suisei.moe"),e(n,"target","_blank"),e(n,"rel","noopener noreferrer"),e(n,"class","svelte-14k0q7p"),e(s,"href","https://t.me/Hoshimachi_Suisei"),e(s,"aria-label","Telegram Fan Group"),e(s,"target","_blank"),e(s,"rel","noopener noreferrer"),e(s,"class","svelte-14k0q7p"),e(a,"href","https://discord.gg/suiseicord"),e(a,"aria-label","Discord Fan Group"),e(a,"target","_blank"),e(a,"rel","noopener noreferrer"),e(a,"class","svelte-14k0q7p"),e(o,"href","https://discord.gg/hoshiyomi"),e(o,"aria-label","Discord Fan Group"),e(o,"target","_blank"),e(o,"rel","noopener noreferrer"),e(o,"class","svelte-14k0q7p"),e(i,"href","https://www.youtube.com/channel/UC5CwaMl1eIgY8h02uZw7u8A"),e(i,"aria-label","YouTube: Suisei Channel"),e(i,"target","_blank"),e(i,"rel","noopener noreferrer"),e(i,"class","svelte-14k0q7p"),e(l,"href","https://twitter.com/suisei_hosimati"),e(l,"aria-label","Twitter: @suisei_hosimati"),e(l,"target","_blank"),e(l,"rel","noopener noreferrer"),e(l,"class","svelte-14k0q7p"),e(t,"class","svelte-14k0q7p")},m(c,v){y(c,t,v),r(t,n),r(t,f),r(t,s),r(t,g),r(t,a),r(t,b),r(t,o),r(t,_),r(t,i),r(t,d),r(t,l),r(t,k),$(u,t,null),h=!0},p:x,i(c){h||(j(u.$$.fragment,c),h=!0)},o(c){B(u.$$.fragment,c),h=!1},d(c){c&&L(t),H(u)}}}class D extends T{constructor(t){super();M(this,t,null,F,C,{})}}export default D;
