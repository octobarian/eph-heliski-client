(function(t){function e(e){for(var n,s,o=e[0],l=e[1],c=e[2],u=0,d=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);h&&h(e);while(d.length)d.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,s=1;s<a.length;s++){var o=a[s];0!==i[o]&&(n=!1)}n&&(r.splice(e--,1),t=l(l.s=a[0]))}return t}var n={},s={app:0},i={app:0},r=[];function o(t){return l.p+"js/"+({}[t]||t)+"."+{"chunk-14c731e4":"601a8936","chunk-572f52be":"9cfbebed","chunk-01b86845":"7d906300","chunk-23108d88":"1dd96067","chunk-2844f9f6":"244106e7","chunk-2d0e4da9":"d0bd1ddc","chunk-2dee3d8f":"c0469a3f","chunk-34ca95fa":"cf8ec16a","chunk-34ee8d46":"6412d956","chunk-39922db9":"8f79119a","chunk-4ed8b7a4":"721d0a5b","chunk-5ae8c7d3":"d873e5b9","chunk-62727fa8":"bcf53d5f","chunk-69de0a37":"a263dd6d","chunk-72997cb2":"bce513d3","chunk-a18a028c":"3453b844","chunk-ad7b8110":"18da1a69","chunk-e04a4524":"62609d63","chunk-ef696f5c":"d3cebe56","chunk-f4885948":"e1d53ba3","chunk-2d216214":"7be963e8","chunk-2d216257":"58872a85","chunk-8f321d1e":"86de0b7f"}[t]+".js"}function l(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(t){var e=[],a={"chunk-14c731e4":1,"chunk-01b86845":1,"chunk-23108d88":1,"chunk-2844f9f6":1,"chunk-2d0e4da9":1,"chunk-2dee3d8f":1,"chunk-34ca95fa":1,"chunk-34ee8d46":1,"chunk-39922db9":1,"chunk-4ed8b7a4":1,"chunk-5ae8c7d3":1,"chunk-62727fa8":1,"chunk-69de0a37":1,"chunk-72997cb2":1,"chunk-a18a028c":1,"chunk-ad7b8110":1,"chunk-e04a4524":1,"chunk-ef696f5c":1,"chunk-f4885948":1};s[t]?e.push(s[t]):0!==s[t]&&a[t]&&e.push(s[t]=new Promise((function(e,a){for(var n="css/"+({}[t]||t)+"."+{"chunk-14c731e4":"6c2c3261","chunk-572f52be":"31d6cfe0","chunk-01b86845":"01b20569","chunk-23108d88":"e7ed0439","chunk-2844f9f6":"054ca11d","chunk-2d0e4da9":"ee30a426","chunk-2dee3d8f":"42a6a6c8","chunk-34ca95fa":"1ae50cfb","chunk-34ee8d46":"e82ae397","chunk-39922db9":"fd5204e5","chunk-4ed8b7a4":"b62f5d4b","chunk-5ae8c7d3":"aefa0e31","chunk-62727fa8":"f916c841","chunk-69de0a37":"83703549","chunk-72997cb2":"41f1e916","chunk-a18a028c":"f916c841","chunk-ad7b8110":"4a6002cb","chunk-e04a4524":"f916c841","chunk-ef696f5c":"81d41ed4","chunk-f4885948":"ec58e4c0","chunk-2d216214":"31d6cfe0","chunk-2d216257":"31d6cfe0","chunk-8f321d1e":"31d6cfe0"}[t]+".css",i=l.p+n,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var c=r[o],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===n||u===i))return e()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){c=d[o],u=c.getAttribute("data-href");if(u===n||u===i)return e()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=e,h.onerror=function(e){var n=e&&e.target&&e.target.src||i,r=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=n,delete s[t],h.parentNode.removeChild(h),a(r)},h.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(h)})).then((function(){s[t]=0})));var n=i[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,a){n=i[t]=[e,a]}));e.push(n[2]=r);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=o(t);var d=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(h);var a=i[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+n+": "+s+")",d.name="ChunkLoadError",d.type=n,d.request=s,a[1](d)}i[t]=void 0}};var h=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},l.m=t,l.c=n,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)l.d(a,n,function(e){return t[e]}.bind(null,n));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var h=u;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0287":function(t,e,a){"use strict";a("a373")},"0b1e":function(t,e,a){},"1d22":function(t,e,a){},"43ab":function(t,e,a){"use strict";a("dbbc")},"4f91":function(t,e,a){"use strict";a("0b1e")},"56d7":function(t,e,a){"use strict";a.r(e);var n=a("2b0e"),s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[t.authenticated?t._e():e("div",{attrs:{id:"login"}},[t._m(0),e("div",{attrs:{id:"container"}},[e("Greet",{attrs:{email:t.email,authState:t.authState,boolShowSignOut:t.showSignOut}}),t.email?e("Update"):t._e()],1)]),t.authenticated&&"office"==t.role?e("div",[e("nav",{staticClass:"navbar navbar-expand-lg navbar-custom"},[e("div",{staticStyle:{"padding-left":"2%","padding-right":"50px"}},[e("img",{staticStyle:{height:"40px","margin-right":"px"},attrs:{src:a("9b19")}}),e("router-link",{staticClass:"navbar-brand",staticStyle:{color:"white","margin-left":"10px"},attrs:{to:"/"}},[t._v("EagleEX Office")])],1),t._m(1),e("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarNavDropdown"}},[e("ul",{staticClass:"navbar-nav me-auto mb-2 mb-lg-0"},[e("li",{staticClass:"nav-item dropdown"},[e("a",{staticClass:"nav-link dropdown-toggle",attrs:{href:"#",id:"bookingsDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}},[t._v(" Bookings ")]),e("ul",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"bookingsDropdown"}},[e("router-link",{staticClass:"dropdown-item",attrs:{to:"/reservationlist"}},[t._v("Reservations")]),e("router-link",{staticClass:"dropdown-item",attrs:{to:"/trips"}},[t._v("Trips")])],1)]),e("li",{staticClass:"nav-item dropdown"},[e("a",{staticClass:"nav-link dropdown-toggle",attrs:{href:"#",id:"peopleDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}},[t._v(" People ")]),e("ul",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"peopleDropdown"}},[e("router-link",{staticClass:"dropdown-item",attrs:{to:"/stafflist"}},[t._v("Staff")]),e("router-link",{staticClass:"dropdown-item",attrs:{to:"/passengers"}},[t._v("Clients")])],1)]),e("li",{staticClass:"nav-item dropdown"},[e("a",{staticClass:"nav-link dropdown-toggle",attrs:{href:"#",id:"equipmentDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}},[t._v(" Equipment ")]),e("ul",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"equipmentDropdown"}},[e("router-link",{staticClass:"dropdown-item",attrs:{to:"/beaconlist"}},[t._v("Beacons")]),e("router-link",{staticClass:"dropdown-item",attrs:{to:"/helicopterlist"}},[t._v("Helicopters")])],1)]),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/generatereports"}},[t._v("Reports")])],1),e("li",{staticClass:"nav-item dropdown"},[e("a",{staticClass:"nav-link dropdown-toggle",attrs:{href:"#",id:"testingDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}},[t._v(" Testing ")]),e("ul",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"testingDropdown"}},[e("router-link",{staticClass:"dropdown-item",attrs:{to:"/zaui"}},[t._v("Zaui Testing")])],1)])]),e("ul",{staticClass:"navbar-nav"},[e("li",[e("router-link",{staticClass:"nav-link zauicircle",staticStyle:{"padding-top":"7px"},attrs:{to:"/zauiinfo"}},[e("span",{class:t.zauiStatusClass})])],1),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",attrs:{href:t.logout_address}},[t._v("Sign Out")])])])])]),e("div",{staticClass:"container mt-3"},[e("router-view")],1)]):t._e(),t.authenticated&&"guide"==t.role?e("div",[e("nav",{staticClass:"navbar navbar-expand-lg navbar-custom"},[e("div",{staticStyle:{"padding-left":"2%","padding-right":"50px"}},[e("img",{staticStyle:{height:"40px","margin-right":"10px"},attrs:{src:a("9b19")}}),e("router-link",{staticClass:"navbar-brand",staticStyle:{color:"white","margin-left":"10px"},attrs:{to:"/"}},[t._v("EagleEx Guide")])],1),t._m(2),e("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarNavDropdownGuide"}},[e("ul",{staticClass:"navbar-nav me-auto mb-2 mb-lg-0"},[e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/trips"}},[t._v("Trips")])],1),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/generatereports"}},[t._v("Reports")])],1)]),e("ul",{staticClass:"navbar-nav ml-auto"},[e("li",[e("router-link",{staticClass:"nav-link zauicircle",staticStyle:{"padding-top":"7px"},attrs:{to:"/zauiinfo"}},[e("span",{class:t.zauiStatusClass})])],1),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",attrs:{href:t.logout_address}},[t._v("Sign Out")])])])])]),e("div",{staticClass:"container mt-3"},[e("router-view")],1)]):t._e()])},i=[function(){var t=this,e=t._self._c;return e("header",[e("h1",[e("i",{staticClass:"header-icon"}),t._v(" MECHSKI")])])},function(){var t=this,e=t._self._c;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavDropdown","aria-controls":"navbarNavDropdown","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])},function(){var t=this,e=t._self._c;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNavDropdownGuide","aria-controls":"navbarNavDropdownGuide","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])}],r=(a("d9e2"),function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"loginscreen"}},[e("div",{staticClass:"login-container"},[e("img",{attrs:{src:"https://eaglepassheli.com/resources/themes/eaglepass/img/logo.svg?m=1690981199"}}),e("h3",{staticClass:"login-message"},[t._v("You are not logged in")]),e("div",{staticClass:"authStateBox"},[t._v(t._s(t.authState))]),e("h1",[e("a",{attrs:{id:"signInButton",href:t.loginAddress}},[t._v("Sign In")])])]),e("div",{staticClass:"login-container"},[e("h3",[t._v(" DEBUGGING TIME:")]),e("p",{staticStyle:{color:"white"}},[t._v("Login URL: "+t._s(t.loginAddress))])])])}),o=[],l={name:"Greet",props:["email","authState","boolShowSignOut"],computed:{loginAddress(){var t="http://eebackend.azurewebsites.net:8080/login";return t}}},c=l,u=(a("0287"),a("2877")),d=Object(u["a"])(c,r,o,!1,null,null,null),h=d.exports,p=function(){var t=this,e=t._self._c;return e("form",{on:{submit:function(e){return e.preventDefault(),t.update.apply(null,arguments)}}},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.userData,expression:"userData"}],attrs:{placeholder:"Update user data."},domProps:{value:t.userData},on:{input:function(e){e.target.composing||(t.userData=e.target.value)}}}),e("button",{staticClass:"button",attrs:{type:"submit"}},[t._v("Submit")])])},f=[],b={name:"Update",data(){return{userData:""}},methods:{update:function(){fetch(`http://${Object({VUE_APP_ZAUI_API_BASE_URL:"http://http://eebackend.azurewebsites.net:8080",VUE_APP_SERVERIP:"http://eebackend.azurewebsites.net",VUE_APP_SERVERPORT:"8080",NODE_ENV:"production",BASE_URL:"/"}).OAUTHSERVERIP}:${Object({VUE_APP_ZAUI_API_BASE_URL:"http://http://eebackend.azurewebsites.net:8080",VUE_APP_SERVERIP:"http://eebackend.azurewebsites.net",VUE_APP_SERVERPORT:"8080",NODE_ENV:"production",BASE_URL:"/"}).OAUTHSERVERPORT}set-user-data`,{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userData:this.userData})}).catch(t=>{console.log(t)}),this.userData=""}}},m=b,v=(a("43ab"),Object(u["a"])(m,p,f,!1,null,null,null)),g=v.exports,k={name:"app",components:{Greet:h,Update:g},data(){return{email:null,body:null,showSignOut:!1,authenticated:!1,authState:null,role:null,zauiStatus:null,zauiStatusCheckInterval:null,vue_app_server_ip:"http://eebackend.azurewebsites.net:8080",logout_address:"http://eebackend.azurewebsites.net:8080/logout"}},computed:{zauiStatusClass(){return this.zauiStatus?"Pong"!==this.zauiStatus.responsemessage?"status-indicator red":this.zauiStatus.responsetime>1e3?"status-indicator yellow":"status-indicator green":"status-indicator grey"}},mounted(){this.fetchZauiStatus(),this.vue_app_server_ip="http://eebackend.azurewebsites.net:8080",this.logout_address="http://eebackend.azurewebsites.net:8080/logout",fetch(this.vue_app_server_ip+"/user",{credentials:"include"}).then(t=>t.json()).then(t=>{"Authorized"==t.authState?(console.log(JSON.stringify(t.introspectResponse)),t.introspectResponse.roles&&(console.log(t.introspectResponse.roles),t.introspectResponse.roles.includes("Office")?this.role="office":t.introspectResponse.roles.includes("Guide")?this.role="guide":t.introspectResponse.roles.includes("admin")?this.role="office":this.role=null,sessionStorage.setItem("role",this.role)),this.email=t.introspectResponse.email,sessionStorage.setItem("email",this.email),this.body=t.body,this.showSignOut=!0,this.authenticated=!0):"notAuthorized"==t.authState?(this.showSignOut=!0,this.authenticated=!1):"notAuthenticated"==t.authState&&(this.showSignOut=!1,this.authenticated=!1),this.authState=t.authState})},created(){this.startZauiStatusCheck()},beforeDestroy(){this.stopZauiStatusCheck()},methods:{fetchZauiStatus(){fetch(this.vue_app_server_ip+"/zaui/zaui-status",{credentials:"include",headers:{"Content-Type":"application/json"}}).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).then(t=>{this.zauiStatus=t}).catch(t=>{console.error(this.vue_app_server_ip),console.error("Error fetching Zaui status:",t)})},startZauiStatusCheck(){this.fetchZauiStatus(),this.zauiStatusCheckInterval=setInterval(this.fetchZauiStatus,15e5)},stopZauiStatusCheck(){this.zauiStatusCheckInterval&&clearInterval(this.zauiStatusCheckInterval)}}},_=k,w=(a("4f91"),Object(u["a"])(_,s,i,!1,null,null,null)),S=w.exports,C=a("8c4f");n["a"].use(C["a"]);const y=new C["a"]({mode:"history",routes:[{path:"/",name:"Default",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-ef696f5c"),a.e("chunk-f4885948")]).then(a.bind(null,"46f9"))},{path:"/main-office",name:"main-office",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-ef696f5c")]).then(a.bind(null,"2b8d"))},{path:"/main-guide",name:"main-guide",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-2d0e4da9")]).then(a.bind(null,"21bb"))},{path:"/beaconlist",name:"beaconlist",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-01b86845")]).then(a.bind(null,"b43e"))},{path:"/helicopterlist",name:"helicopterlist",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-ad7b8110")]).then(a.bind(null,"23eb"))},{path:"/reservationlist",name:"reservationlist",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-a18a028c")]).then(a.bind(null,"13cc"))},{path:"/reservation/:id",name:"reservation",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-5ae8c7d3")]).then(a.bind(null,"e7a8")),props:!0},{path:"/generatereports",name:"generatereports",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-2dee3d8f")]).then(a.bind(null,"3cb0"))},{path:"/trip",name:"trip",component:()=>a.e("chunk-14c731e4").then(a.bind(null,"0d71"))},{path:"/tutorials/:id",name:"tutorial-details",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-72997cb2")]).then(a.bind(null,"7a79"))},{path:"/add",name:"add",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-69de0a37")]).then(a.bind(null,"0496"))},{path:"/tutorials-page",name:"tutorials-page",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-2844f9f6")]).then(a.bind(null,"8d98"))},{path:"/tutorials-list",alias:"/tutorials",name:"tutorials",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-34ca95fa")]).then(a.bind(null,"17a3"))},{path:"/zaui",name:"zaui",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-23108d88")]).then(a.bind(null,"fc54"))},{path:"/zauiinfo",name:"zauiinfo",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-39922db9")]).then(a.bind(null,"ccff"))},{path:"/passengers",name:"passengers",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-62727fa8")]).then(a.bind(null,"061b"))},{path:"/clients/:id",name:"client",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-4ed8b7a4")]).then(a.bind(null,"d19b")),props:!0},{path:"/stafflist",name:"stafflist",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-e04a4524")]).then(a.bind(null,"963d"))},{path:"/staff/:id",name:"staff",component:()=>Promise.all([a.e("chunk-572f52be"),a.e("chunk-34ee8d46")]).then(a.bind(null,"9c00")),props:!0}]});var P=y;a("ab8b"),a("0deb"),a("1d22");n["a"].config.productionTip=!1,new n["a"]({router:P,render:t=>t(S)}).$mount("#app")},"9b19":function(t,e,a){t.exports=a.p+"img/logo.a6cc20b8.svg"},a373:function(t,e,a){},dbbc:function(t,e,a){}});
//# sourceMappingURL=app.fd40e42a.js.map