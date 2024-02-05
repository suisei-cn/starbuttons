export function getKey(t){try{return localStorage.getItem(t)}catch(e){return null}}export function setKey(t,e){try{return localStorage.setItem(t,e),!0}catch(r){return!1}}
