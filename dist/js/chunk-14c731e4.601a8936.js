(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14c731e4"],{"0d71":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"trip-container"},[t("button",{staticClass:"back-button",on:{click:e.goBack}},[e._v(" Back ")]),t("h2",[e._v("Trip #{num}")]),t("div",{staticClass:"input-section"},[t("div",{staticClass:"tags"},[t("label",[e._v("Tags")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedGuides,expression:"selectedGuides"}],attrs:{multiple:""},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedGuides=t.target.multiple?n:n[0]}}},e._l(e.guides,(function(n){return t("option",{key:n,domProps:{value:n}},[e._v(e._s(n))])})),0)]),t("div",{staticClass:"group"},[t("label",[e._v("Group #")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedGroup,expression:"selectedGroup"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedGroup=t.target.multiple?n:n[0]}}},e._l(e.groups,(function(n){return t("option",{key:n,domProps:{value:n}},[e._v(e._s(n))])})),0)]),t("div",{staticClass:"pilot"},[t("label",[e._v("Pilot")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedPilot,expression:"selectedPilot"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedPilot=t.target.multiple?n:n[0]}}},e._l(e.pilots,(function(n){return t("option",{key:n,domProps:{value:n}},[e._v(e._s(n))])})),0)]),t("div",{staticClass:"helicopter"},[t("label",[e._v("Helicopter")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedHelicopter,expression:"selectedHelicopter"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedHelicopter=t.target.multiple?n:n[0]}}},e._l(e.helicopters,(function(n){return t("option",{key:n,domProps:{value:n}},[e._v(e._s(n))])})),0)])]),t("div",{staticClass:"input-section"},[t("div",{staticClass:"run-section"},[t("label",[e._v("Run Name:")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedRun,expression:"selectedRun"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedRun=t.target.multiple?n:n[0]}}},e._l(e.runs,(function(n){return t("option",{key:n,domProps:{value:n}},[e._v(e._s(n))])})),0),t("button",{on:{click:e.addRun}},[e._v("Add")]),t("div",{staticClass:"added-runs"},e._l(e.addedRuns,(function(n){return t("span",{key:n.id},[e._v(" "+e._s(n.name)+" "),t("button",{on:{click:function(t){return e.removeRun(n.id)}}},[e._v("X")])])})),0)])]),t("div",{staticClass:"input-section"},[t("div",{staticClass:"notes-section"},[t("label",[e._v("Group Notes:")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.notes,expression:"notes"}],attrs:{placeholder:"Placeholder"},domProps:{value:e.notes},on:{input:function(t){t.target.composing||(e.notes=t.target.value)}}})])])])},i=[],o=(n("14d9"),{data(){return{num:1,runId:0,guides:["Guide 1","Guide 2"],groups:["#1","#2","#3"],pilots:["Pilot 1","Pilot 2","Pilot 3"],helicopters:["Heli 1","Heli 2","Heli 3"],runs:["Run 1","Run 2","Run 3","Run 4"],selectedRun:"",selectedGuides:[],selectedGroup:null,selectedPilot:null,selectedHelicopter:null,addedRuns:[],notes:""}},methods:{goBack(){this.$router.go(-1)},removeGuide(e){this.guides.splice(e,1)},addRun(){this.selectedRun&&(this.addedRuns.push({id:this.runId++,name:this.selectedRun}),this.selectedRun="")},removeRun(e){this.addedRuns=this.addedRuns.filter(t=>t.id!==e)}}}),l=o,s=(n("1385"),n("2877")),a=Object(s["a"])(l,r,i,!1,null,"bab852ec",null);t["default"]=a.exports},1385:function(e,t,n){"use strict";n("97ef")},"14d9":function(e,t,n){"use strict";var r=n("23e7"),i=n("7b0b"),o=n("07fa"),l=n("3a34"),s=n("3511"),a=n("d039"),u=a((function(){return 4294967297!==[].push.call({length:4294967296},1)})),c=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},d=u||!c();r({target:"Array",proto:!0,arity:1,forced:d},{push:function(e){var t=i(this),n=o(t),r=arguments.length;s(n+r);for(var a=0;a<r;a++)t[n]=arguments[a],n++;return l(t,n),n}})},3511:function(e,t,n){"use strict";var r=TypeError,i=9007199254740991;e.exports=function(e){if(e>i)throw r("Maximum allowed index exceeded");return e}},"3a34":function(e,t,n){"use strict";var r=n("83ab"),i=n("e8b5"),o=TypeError,l=Object.getOwnPropertyDescriptor,s=r&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}();e.exports=s?function(e,t){if(i(e)&&!l(e,"length").writable)throw new o("Cannot set read only .length");return e.length=t}:function(e,t){return e.length=t}},"97ef":function(e,t,n){},e8b5:function(e,t,n){"use strict";var r=n("c6b6");e.exports=Array.isArray||function(e){return"Array"===r(e)}}}]);
//# sourceMappingURL=chunk-14c731e4.601a8936.js.map